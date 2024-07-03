const con = require('../models/connection');

function get_dash_data(req, res) {
    let e, l, s;

    const q1 = `SELECT COUNT(*) AS count FROM messages`;
    const q2 = `SELECT COUNT(*) AS count FROM leads`;
    const q3 = `SELECT COUNT(*) AS count FROM schedule`;

    const query = (sql) => {
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0].count);
            });
        });
    };

    Promise.all([query(q1), query(q2), query(q3)])
        .then(([messagesCount, leadsCount, scheduleCount]) => {
            e = messagesCount;
            l = leadsCount;
            s = scheduleCount;
            res.render('dashboard', { email: e, leads: l, sched: s });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving data');
        });
}

function get_lead_dash(req, res) {
    let a, l, i;

    const q1 = `SELECT COUNT(*) AS count FROM leads`;
    const q2 = `SELECT COUNT(*) AS count FROM leads WHERE status = 1;`;
    const q3 = `SELECT COUNT(*) AS count FROM leads WHERE status = 0;`;

    const query = (sql) => {
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0].count);
            });
        });
    };

    Promise.all([query(q1), query(q2), query(q3)])
        .then(([lCount, lActive, lInactive]) => {
            l = lCount;
            a = lActive;
            i = lInactive;
            res.render('lead_dash', { active: a, leads: l, inactive: i });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving data');
        });
}

function get_sched_dash(req, res) {
    let a, i, s;

    const q1 = `SELECT COUNT(*) AS count FROM schedule`;
    const q2 = `SELECT COUNT(*) AS count FROM schedule WHERE sched_status = 1;`;
    const q3 = `SELECT COUNT(*) AS count FROM schedule WHERE sched_status = 0;`;

    const query = (sql) => {
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0].count);
            });
        });
    };

    Promise.all([query(q1), query(q2), query(q3)])
        .then(([sCount, sActive, sInactive]) => {
            s = sCount;
            a = sActive;
            i = sInactive;
            res.render('sched_dash', { active: a, sched: s, inactive: i });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving data');
        });
}

function submit_lead(req,res){
    var {lead_name, lead_email, lead_phone, category} = req.body;
    var query = `INSERT INTO leads (lead_name, email, phone, category_ref) VALUES (?, ?, ?, ?);`;
    con.query(query, [lead_name, lead_email, lead_phone, category], (err,result)=>{
        if (err) throw err;
        console.log("Added Lead to Database");
        res.redirect('/leads');
    })
}

function submit_sched(req,res){
    var {sched_name, cat_id, interval, message, time} = req.body;
    var query = `INSERT INTO schedule (sched_name, template, day_interval, time, category_ref) VALUES (?, ?, ?, ?, ?);`;
    con.query(query, [sched_name, message, interval, time, cat_id], (err,result)=>{
        if (err) throw err;
        console.log("Added Schedule to Database");
        res.redirect('/schedules');
    })
}

module.exports = { get_dash_data, get_lead_dash, get_sched_dash, submit_lead, submit_sched};