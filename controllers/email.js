var nodemailer = require('nodemailer');
var con = require('../models/connection');

function send_message(req, res, next) {
    var date = new Date();
    var istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    var today = new Date(date.getTime() + istOffset);
    var year = today.getUTCFullYear();
    var month = ('0' + (today.getUTCMonth() + 1)).slice(-2); // Months are zero-indexed
    var day = ('0' + today.getUTCDate()).slice(-2); // Add leading zero if needed
    var today_date = `${year}-${month}-${day}`;
    var hours = today.getUTCHours();
    var minutes = today.getUTCMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    var query = `SELECT leads.lead_id, schedule.sched_id, leads.category_ref, DATE_ADD(leads.ref_date, INTERVAL schedule.day_interval DAY) AS date, schedule.time, schedule.template, leads.phone, leads.email
                 FROM leads
                 INNER JOIN schedule
                 ON schedule.category_ref = leads.category_ref
                 WHERE leads.status = 1 AND schedule.sched_status = 1 AND lead_del = 0 AND sched_del = 0
                 AND DATE_ADD(leads.ref_date, INTERVAL schedule.day_interval DAY) = ? AND HOUR(schedule.time) = ? AND MINUTE(schedule.time) = ?;`;
    con.query(query, [today_date, hours, minutes], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            console.log(`Fetched all the leads which may have message scheduled at ${hours}:${minutes}`);
            if(handleLeads(result)){
                res.send("Email Sent");
            }else{
                res.send(`Message already sent: ${hours}:${minutes}`)
            }
        }else{
            res.send(`No leads to fetch, which may have message scheduled at ${hours}:${minutes}`);
        }
    });
};

function handleLeads(leads) {
    leads.forEach(lead => {
        var q1 = `SELECT mess_id FROM messages WHERE lead_ref = ? AND sched_ref = ?;`;
        con.query(q1, [lead.lead_id, lead.sched_id], (err, mess_data) => {
            if (err) throw err;
            if (mess_data.length == 0){
                var q2 = `INSERT INTO messages (lead_ref, sched_ref, mess_date, mess_time, mess_template) VALUES (?, ?, ?, ?, ?);`;
                con.query(q2, [lead.lead_id, lead.sched_id, lead.date, lead.time, lead.template, lead.phone, lead.email], (err, result) => {
                    if (err) throw err;
                    console.log(`Row inserted for lead_id = ${lead.lead_id} and sched_id = ${lead.sched_id}`);
                    send_email(lead.email, lead.template, lead.template);
                    return true;
                });
            }else{
                return false;
            }
        });
    });
};

function send_email(recipent, subject, text){
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: 'akshatjain23.csedvit@gmail.com',
            pass: "abcnwalmwgikioae"
        }
    });
    const receiver = {
        from: 'akshatjain23.csedvit@gmail.com',
        to: recipent,
        subject: subject,
        text: text
    };
    auth.sendMail(receiver, (err, emres) => {
        if (err) {
            console.log(err);
        }
        console.log("Email Sent to...", recipent);
    });
}

module.exports = send_message;