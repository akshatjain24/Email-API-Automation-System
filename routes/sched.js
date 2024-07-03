var express = require('express');
var router = express.Router();
const {get_schedule, upd_sched, get_sched_info, upd_sched_stat, del_sched} = require('../controllers/schedule');
const {get_sched_messages} = require('../controllers/messages');
const {get_sched_dash, submit_sched} = require('../controllers/dashboard');

router
    .route('/') 
    .get(get_sched_dash)
    .post(submit_sched);

router.get('/show', get_schedule);

router.post('/delete', del_sched);

router
    .route('/update')
    .get(get_sched_info)
    .post(upd_sched);

router.post('/upd_stat', upd_sched_stat);

router.get('/show/messages', get_sched_messages);

module.exports = router;