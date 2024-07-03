const con = require('../models/connection');

function get_categories(req,res){
    var query = 'SELECT cat_id, cat_name FROM categories';
    con.query(query, (err, result)=>{
        if (err) throw err;
        console.log("Fetched Categories");
        res.json(result)
    })
}

function categories(req,res){
    var query = `SELECT * FROM categories`;
    con.query(query, (err, result)=>{
        if (err) throw err;
        res.render('categories', {data: result})
    })
}

function get_name(req,res){
    var cat_id = req.query.id;
    var query = "SELECT cat_name FROM categories WHERE cat_id = ?";
    con.query(query, [cat_id], (err, result)=>{
        if (err) throw err;
        res.json(result[0]);
    })
}

function add_cat(req,res){
    var {cat_name} = req.body;
    console.log(cat_name)
    var query = `INSERT INTO categories (cat_name) VALUES (?)`;
    con.query(query, [cat_name], (err,result)=>{
        if (err) throw err;
        console.log("Added category");
        res.redirect('/categories');
    })
}

function upd_cat(req,res){
    var {cat_name, id} = req.body;
    console.log(cat_name)
    var query = `UPDATE categories SET cat_name = ? WHERE cat_id = ?`;
    con.query(query, [cat_name, id], (err,result)=>{
        if (err) throw err;
        console.log("Updated category");
        res.redirect('/categories');
    })
}

module.exports = {get_categories, categories, get_name, add_cat, upd_cat};