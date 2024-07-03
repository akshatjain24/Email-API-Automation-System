const con = require('../models/connection');

function get_lead_messages(req,res){
    var lead_id = req.query.id;
    const limit = 2;
    const page = parseInt(req.query.page) || 1;
    var search = req.query.search || "";
    var sort = parseInt(req.query.sort) || 0;
    var search_key = `%${search}%`;
    const offset = (page - 1) * limit;
    var tp, lead_name;
    switch(sort){
        case 0:
            var sort_subquery = "ORDER BY mess_id ASC";
            break;
        case 1 :
            var sort_subquery = `ORDER BY sched_name ASC`
            break;
        case 2:
            var sort_subquery = `ORDER BY mess_date ASC`
            break;
        case 3:
            var sort_subquery = `ORDER BY mess_time ASC`
            break;
        case 4:
            var sort_subquery = `ORDER BY cat_name ASC`
            break;;
        case 5:
            var sort_subquery = `ORDER BY sched_name DESC`
            break;
        case 6:
            var sort_subquery = `ORDER BY mess_date DESC`
            break;
        case 7:
            var sort_subquery = `ORDER BY mess_time DESC`
            break;
        case 8:
            var sort_subquery = `ORDER BY cat_name DESC`
            break;
        case 9:
            var sort_subquery = `ORDER BY template ASC`
            break;
        case 10:
            var sort_subquery = 'ORDER BY template DESC'
            break;
    }
    con.query('SELECT lead_name FROM leads WHERE lead_id = ?', [lead_id], (err,result)=>{
        if (err) throw err;
        lead_name = result[0].lead_name;
    });
    var like_subquery = `LOWER(sched_name) LIKE LOWER('${search_key}') OR LOWER(cat_name) LIKE LOWER('${search_key}') OR LOWER(template) LIKE LOWER('${search_key}')`
    con.query(`SELECT COUNT(*) AS count FROM messages LEFT JOIN schedule ON messages.sched_ref = schedule.sched_id LEFT JOIN categories ON schedule.category_ref = categories.cat_name WHERE  lead_ref = ? AND (${like_subquery})`,[lead_id], (err, countResult) => {
        if (err) throw err;
        const totalItems = countResult[0].count;
        tp = Math.ceil(totalItems / limit);
    });
    var query = `SELECT messages.*, schedule.sched_name, categories.cat_name FROM messages LEFT JOIN schedule ON messages.sched_ref = schedule.sched_id LEFT JOIN categories ON schedule.category_ref = categories.cat_id WHERE lead_ref = ? AND (${like_subquery}) ${sort_subquery} LIMIT ? OFFSET ?`;
    con.query(query, [lead_id, limit, offset], (err, result)=>{
        if (err) throw err;
        res.render('lead_mess',{ data: result, curr_pg: page, t_pg: tp, offset: offset + 1, search_key: search, sort: sort, id: lead_id, name: lead_name})
    });
}

function get_sched_messages(req, res){
    var sched_id = req.query.id;
    const limit = 2;
    const page = parseInt(req.query.page) || 1;
    var search = req.query.search || "";
    var sort = parseInt(req.query.sort) || 0;
    var search_key = `%${search}%`;
    const offset = (page - 1) * limit;
    var tp, sched_name;
    switch(sort){
        case 0:
            var sort_subquery = "ORDER BY mess_id ASC";
            break;
        case 1 :
            var sort_subquery = `ORDER BY lead_name ASC`
            break;
        case 2:
            var sort_subquery = `ORDER BY mess_date ASC`
            break;
        case 3:
            var sort_subquery = `ORDER BY mess_time ASC`
            break;
        case 4:
            var sort_subquery = `ORDER BY cat_name ASC`
            break;;
        case 5:
            var sort_subquery = `ORDER BY lead_name DESC`
            break;
        case 6:
            var sort_subquery = `ORDER BY mess_date DESC`
            break;
        case 7:
            var sort_subquery = `ORDER BY mess_time DESC`
            break;
        case 8:
            var sort_subquery = `ORDER BY cat_name DESC`
            break;
        case 9:
            var sort_subquery = `ORDER BY mess_template ASC`
            break;
        case 10:
            var sort_subquery = 'ORDER BY mess_template DESC'
            break;
    }
    con.query('SELECT sched_name FROM schedule WHERE sched_id = ?', [sched_id], (err,result)=>{
        if (err) throw err;
        sched_name = result[0].sched_name;
    });
    var like_subquery = `LOWER(lead_name) LIKE LOWER('${search_key}') OR LOWER(cat_name) LIKE LOWER('${search_key}') OR LOWER(mess_template) LIKE LOWER('${search_key}')`
    con.query(`SELECT COUNT(*) AS count FROM messages LEFT JOIN leads ON messages.lead_ref = leads.lead_id LEFT JOIN categories ON leads.category_ref = categories.cat_name WHERE sched_ref = ? AND (${like_subquery})`,[sched_id], (err, countResult) => {
        if (err) throw err;
        const totalItems = countResult[0].count;
        tp = Math.ceil(totalItems / limit);
    });
    var query = `SELECT messages.*, leads.lead_name, categories.cat_name FROM messages LEFT JOIN leads ON messages.lead_ref = leads.lead_id LEFT JOIN categories ON leads.category_ref = categories.cat_id WHERE sched_ref = ? AND (${like_subquery}) ${sort_subquery} LIMIT ? OFFSET ?`;
    con.query(query, [sched_id, limit, offset], (err, result)=>{
        if (err) throw err;
        console.log(query)
        res.render('sched_mess', {data: result, curr_pg: page, t_pg: tp, offset: offset + 1, search_key: search, sort: sort, id: sched_id, name: sched_name})
    });
}

module.exports = {get_lead_messages, get_sched_messages};