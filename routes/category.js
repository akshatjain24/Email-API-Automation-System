var express = require('express');
var router = express.Router();
var path = require('path');
var {categories, get_name, add_cat, upd_cat} = require('../controllers/categories');

router
    .route('/')
    .get(categories)
    .post(add_cat);

router
    .route('/update')
    .get(get_name)
    .post(upd_cat);

module.exports = router;