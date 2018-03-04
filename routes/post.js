var router = require('express').Router();
var mail = require('./mail.js');
// sendMail = function(name, recipient, sender, subject, text, message)

router.post('/quotes', (req, res) => {
	console.log('body: ' + req.body);
	res.render('email/quote', { layout: null } , function(err,html){
        if( err ) console.log('error in email template');
		mail.sendMail('Michael Gibson', 'rajonwitness@gmail.com', 'rajonwitness@gmail.com', 'Someone requested a quote!', html, req.body);
		res.redirect('/');
    });
});

router.post('/subscribe', (req, res) => {
	res.render('email/thank-you', { layout: null } , function(err,html){
        if( err ) console.log('error in email template');
        mail.sendMail('Michael Gibson', req.body.email, 'rajonwitness@gmail.com', 'Thanks for subscribing!', html);
		res.redirect('/');
    });
});

router.post('/contact', (req, res) => {
	res.render('email/contact', { layout: null } , function(err,html){
        if( err ) console.log('error in email template');
        mail.sendMail(req.body.name, 'rajonwitness@gmail.com', req.body.email, req.body.subject, html, req.body.message);
		res.redirect('/');
    });
});

module.exports = router;
