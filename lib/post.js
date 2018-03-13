const router = require('express').Router();
const fs = require('fs');
const formidable = require('formidable');
const multer = require('multer');
const mail = require('./mail.js');
const fileType = require('file-type');
const readChunk = require('read-chunk');
const path = require("path");
const util = require('util');
const db = require('./mongo.js');
db.on('error', console.error.bind(console, 'connection error:'));

// sendMail = function(name, recipient, sender, subject, text, message)
require('dotenv').config({path: '../config/.env'})

router.post('/quotes', (req, res) => {
	console.log('body: ' + req.body);
	res.render('email/request', { layout: null } , function(err,html){
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

router.post('/admin', (req, res) => {
	if(req.body.password == process.env.password){
		req.session.user = true;
		res.send(true);
	}
	else{
		res.send(false);
	}
});

router.post('/post', (req, res) => {
	if(req.body.title == '' || req.body.message == '' || req.body.file == '' || req.body.title == undefined || req.body.message == undefined || req.body.file == undefined){
		console.log('1');
		res.send(false);
	}
	else{
	    var Blog = require('../models/Blog.js')
		var NewBlog = new Blog({ author: 'Michael Gibson', title: req.body.title, post: req.body.message, thumbnail: req.body.file });
		NewBlog.save(function (err, first) {
			if (err){
				 res.send(false);
			}
			else{
				res.send(true);
			}
		});
	}
});

router.post('/upload', (req, res) => {
    var photos = [],
        form = new formidable.IncomingForm();

    // Tells formidable that there will be multiple files sent.
    form.multiples = true;
    // Upload directory for the images
    form.uploadDir = path.join(__dirname, 'tmp_uploads');

    // Invoked when a file has finished uploading.
    form.on('file', function (name, file) {
        // Allow only 3 files to be uploaded.
        if (photos.length === 3) {
            fs.unlink(file.path);
            return true;
        }

        var buffer = null,
            type = null,
            filename = '';

        // Read a chunk of the file.
        buffer = readChunk.sync(file.path, 0, 262);
        // Get the file type using the buffer read using read-chunk
        type = fileType(buffer);
		console.log(file.path, type.ext);


        // Check the file type, must be either png,jpg or jpeg
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            // Assign new file name
            filename = file.name;

            // Move the file with the new file name
            fs.rename(file.path, './public/images/' + filename);

            // Add to the list of photos
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'uploads/' + filename
            });
        } else {
            photos.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path);
        }
    });

    form.on('error', function(err) {
        console.log('Error occurred during processing - ' + err);
    });

    // Invoked when all the fields have been processed.
    form.on('end', function() {
        console.log('All the request fields have been processed.');
    });

    // Parse the incoming form fields.
    form.parse(req, function (err, fields, files) {
        res.send(true);
    });
});

router.post('/delete', (req, res) => {
	var Blog = require('../models/Blog.js');
	Blog.findOne({title: req.body.blog},'post',function(err, blog){
		if (err){
			res.send(false);
			return handleError(err);
		}
		res.render('email/deleted', { layout: null } , function(err,html){
			if( err ) console.log('error in email template');
			mail.sendMail('Chris Murphy', 'rajonwitness@gmail.com', 'rajonwitness@gmail.com', 'BLOG DELETED: ' + req.body.blog, html, blog.post);
		});
	});
	Blog.remove({ title: req.body.blog }, function (err) {
	  if (err){
		  res.send(false);
		  return handleError(err);
	  }
	  else
	  	res.send(true);
	});
});

module.exports = router;
