const con = require('../models/connection');

function get_schedule(req,res){
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    var search = req.query.search || "";
    var sort = parseInt(req.query.sort) || 0;
    var search_key = `%${search}%`;
    const offset = (page - 1) * limit;
    var tp;
    switch(sort){
        case 0:
            var sort_subquery = "ORDER BY sched_id ASC";
            break;
        case 1 :
            var sort_subquery = `ORDER BY sched_name ASC`
            break;
        case 2:
            var sort_subquery = `ORDER BY day_interval ASC`
            break;
        case 3:
            var sort_subquery = `ORDER BY time ASC`
            break;
        case 4:
            var sort_subquery = `ORDER BY template ASC`
            break;
        case 5:
            var sort_subquery = `ORDER BY sched_status ASC`
            break;
        case 6:
            var sort_subquery = `ORDER BY cat_name ASC`
            break;
        case 7:
            var sort_subquery = `ORDER BY sched_name DESC`
            break;
        case 8:
            var sort_subquery = `ORDER BY day_interval DESC`
            break;
        case 9:
            var sort_subquery = `ORDER BY time DESC`
            break;
        case 10:
            var sort_subquery = `ORDER BY template DESC`
            break;
        case 11:
            var sort_subquery = `ORDER BY sched_status DESC`
            break;
        case 12:
            var sort_subquery = `ORDER BY cat_name DESC`
            break;
    }
    var like_subquery = `LOWER(sched_name) LIKE LOWER('${search_key}') OR LOWER(cat_name) LIKE LOWER('${search_key}') OR LOWER(template) LIKE LOWER('${search_key}')`
    con.query(`SELECT COUNT(*) AS count FROM schedule LEFT JOIN categories ON schedule.category_ref = categories.cat_id WHERE ${like_subquery}`, (err, countResult) => {
        if (err) throw err;
        const totalItems = countResult[0].count;
        tp = Math.ceil(totalItems / limit);
    });
    var query = `SELECT schedule.*, categories.cat_name FROM schedule LEFT JOIN categories ON schedule.category_ref = categories.cat_id WHERE sched_del = 0 AND (${like_subquery}) ${sort_subquery} LIMIT ? OFFSET ?;`;
    console.log(query);
    con.query(query, [limit, offset], (err, result) => {
        if (err) throw err;
        console.log("Fetched list of all the Schedules");
        res.render('schedule', { data: result, curr_pg: page, t_pg: tp, offset: offset + 1, search_key: search, sort: sort});
    });
}

function upd_sched(req,res){
    var {id, sort, search, pg, name, days, time, template, cat} = req.body;
    var query= `UPDATE schedule SET sched_name = ?, template = ?, day_interval = ?, time = ?, category_ref = ? WHERE sched_id = ?`;
    con.query(query, [name, template, days, time, cat, id], (err, result)=>{
        if (err) throw err;
        console.log(`id=${id}, sort=${sort}, search=${search}, pg=${pg}, name=${name}, days=${days}, time=${time}, template=${template}, cat=${cat}`)
        console.log("Updated Schedule details");
        res.redirect(`/schedules/show?search=${search}&sort=${sort}&page=${pg}`);
    })
}

function del_sched(req,res){
    var sched_id = req.body.sched_id;
    var query = 'UPDATE schedule SET sched_del = 1 WHERE sched_id = ?';
    con.query(query, [sched_id], (err, result)=>{
        if (err) throw err;
        console.log("Deleted sched_id: ", sched_id);
        res.send("Deleted schedule");
    })
}

function upd_sched_stat(req, res) {
    var { sched_id, status} = req.body;
    var query = `UPDATE schedule SET sched_status = ? WHERE sched_id = ?;`;
    con.query(query, [status, sched_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log("Updated lead Status"); 
        res.send('Updated Status');
    })
}

function get_sched_info(req, res){
    var id = req.query.sched_id;
    var query = `SELECT * FROM schedule WHERE sched_id = ?`;
    con.query(query, [id], (err,result)=>{
        if (err) throw err;
        console.log("Retrieved Schedule info");
        res.json(result[0]);
    })
}

module.exports = {get_schedule, upd_sched, get_sched_info, upd_sched_stat, del_sched};