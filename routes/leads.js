var express = require('express');
var router = express.Router();

var {get_leads, upd_lead_stat, get_lead_info, upd_lead_info, del_lead} = require('../controllers/leads');
var {get_categories} = require('../controllers/categories');
var {get_lead_messages} = require('../controllers/messages');
var {get_lead_dash, submit_lead} = require('../controllers/dashboard');

router
  .route('/')
  .get(get_lead_dash)
  .post(submit_lead);

router.get('/show', get_leads);

router.post('/upd_stat', upd_lead_stat)

router.post('/delete', del_lead)

router.get('/show/messages', get_lead_messages)

router
  .route('/update')
  .get(get_lead_info)
  .post(upd_lead_info);

router.get('/get_cat', get_categories);

module.exports = router;