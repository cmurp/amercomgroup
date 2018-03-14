const mongoose = require('mongoose');
const mail = require('../lib/mail.js');

//create schema
var BlogSchema = mongoose.Schema({
    author: String,
    title: String,
    post: String,
    thumbnail: String,
    date: { type: Date, default: Date.now }
});
BlogSchema.methods.posted = function(){
    res.render('email/blog', { layout: null } , function(err,html){
        if( err ) console.log('error in email template');
        mail.sendMail('Michael Gibson', 'rajonwitness@gmail.com', 'rajonwitness@gmail.com', this.title, html, this.post);
    });
}
// compile schema into model, used to create documents in the db
var Blog = mongoose.model('BlogPost', BlogSchema)
module.exports = Blog;
