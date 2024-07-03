const con = require('../models/connection');

function get_leads(req, res) {
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    var search = req.query.search || "";
    var sort = parseInt(req.query.sort) || 0;
    var search_key = `%${search}%`;
    const offset = (page - 1) * limit;
    var tp;
    switch(sort){
        case 0:
            var sort_subquery = "ORDER BY lead_id ASC";
            break;
        case 1 :
            var sort_subquery = `ORDER BY lead_name ASC`
            break;
        case 2:
            var sort_subquery = `ORDER BY date ASC`
            break;
        case 3:
            var sort_subquery = `ORDER BY cat_name ASC`
            break;
        case 4:
            var sort_subquery = `ORDER BY email ASC`
            break;
        case 5:
            var sort_subquery = `ORDER BY status ASC`
            break;
        case 6:
            var sort_subquery = `ORDER BY lead_name DESC`
            break;
        case 7:
            var sort_subquery = `ORDER BY date DESC`
            break;
        case 8:
            var sort_subquery = `ORDER BY cat_name DeSC`
            break;
        case 9:
            var sort_subquery = `ORDER BY email DESC`
            break;
        case 10:
            var sort_subquery = `ORDER BY status DESC`
            break;
    }
    var like_subquery = `LOWER(lead_name) LIKE LOWER('${search_key}') OR LOWER(email) LIKE LOWER('${search_key}') OR phone LIKE '${search_key}' OR LOWER(cat_name) LIKE LOWER('${search_key}')`
    con.query(`SELECT COUNT(*) AS count FROM leads LEFT JOIN categories ON leads.category_ref = categories.cat_id WHERE ${like_subquery}`, (err, countResult) => {
        if (err) throw err;
        const totalItems = countResult[0].count;
        tp = Math.ceil(totalItems / limit);
    });
    var query = `SELECT leads.lead_name, leads.lead_id, leads.email, leads.phone, leads.status, DATE(leads.ref_date) AS date, categories.cat_name FROM leads LEFT JOIN categories ON leads.category_ref = categories.cat_id WHERE lead_del = 0 AND (${like_subquery}) ${sort_subquery} LIMIT ? OFFSET ?;`;
    console.log(query);
    con.query(query, [limit, offset], (err, result) => {
        if (err) throw err;
        console.log("Fetched list of all leads");
        res.render('leads_table', { data: result, curr_pg: page, t_pg: tp, offset: offset + 1, search_key: search, sort: sort});
    });
}

function upd_lead_stat(req, res) {
    var { lead_id, status, date, page, search_key, sort_key } = req.body;
    if (status == 1) {
        const current = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const istTime = new Date(current.getTime() + istOffset);
        const year = istTime.getUTCFullYear();
        const month = ('0' + (istTime.getUTCMonth() + 1)).slice(-2); // Months are zero-indexed
        const day = ('0' + istTime.getUTCDate()).slice(-2); // Add leading zero if needed
        var upd_date = `${year}-${month}-${day}`;
        var query = `UPDATE leads SET status = ?, ref_date = '${upd_date}' WHERE lead_id = ?;`;
    }
    else {
        var query = `UPDATE leads SET status = ? WHERE lead_id = ?;`;
        var upd_date = date;
    }
    con.query(query, [status, lead_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log("Updated lead Status"); 
        res.send('Updated Status');
    })
}

function del_lead(req,res){
    var lead_id = req.body.lead_id;
    var query = 'UPDATE leads SET lead_del = 1 WHERE lead_id = ?';
    con.query(query, [lead_id], (err, result)=>{
        if (err) throw err;
        console.log("Deleted lead_id: ", lead_id);
        res.send("Deleted lead");
    })
}

function get_lead_info(req, res) {
    var id = req.query.lead_id;
    var query = `SELECT lead_id, lead_name, email, phone, category_ref FROM leads WHERE lead_id = ?`;
    con.query(query, [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
}

function upd_lead_info(req, res) {
    var { lead_name, email, phone, new_cat, old_cat, id, sort, search, pg } = req.body;
    if (old_cat == new_cat) {
        var query = `UPDATE leads SET lead_name = ?, email = ?, phone = ? WHERE lead_id = ?;`;
        con.query(query, [lead_name, email, phone, id], (err, result) => {
            if (err) throw err;
        })
    } else {
        const current = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const istTime = new Date(current.getTime() + istOffset);
        const year = istTime.getUTCFullYear();
        const month = ('0' + (istTime.getUTCMonth() + 1)).slice(-2); // Months are zero-indexed
        const day = ('0' + istTime.getUTCDate()).slice(-2); // Add leading zero if needed
        var upd_date = `${year}-${month}-${day}`;
        var query = `UPDATE leads SET lead_name = ?, email = ?, phone = ?, category_ref = ?, ref_date = ? WHERE lead_id = ?;`
        con.query(query, [lead_name, email, phone, new_cat, upd_date, id], (err, result) => {
            if (err) throw err;
        })
    }
    console.log("Updated lead info");
    res.redirect(`/leads/show?search=${search}&sort=${sort}&page=${pg}`);
}

module.exports = { get_leads, upd_lead_stat, get_lead_info, upd_lead_info, del_lead };