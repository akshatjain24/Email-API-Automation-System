var express = require('express');
var router = express.Router();
var path = require('path');
var {get_dash_data} = require('../controllers/dashboard');
var send_message = require('../controllers/email');

router
    .route('/')
    .get(get_dash_data)

router.get('/send', send_message);

router.post('/test', (req, res)=>{
    console.log(req.body.text);
    res.status(200).send("Email Sent Successfully");
});

module.exports = router;