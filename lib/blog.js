const fs = require('fs');
const db = require('./mongo.js');
module.exports = function (req, res) {
    switch(req.params.post){
        case 'main':
            var Blog = require('../models/Blog.js');
            // count for navigating every 10 blog posts, 0 aka first 10 if none given
            if(req.query.count == null) req.query.count = 0;
            Blog.find({}).sort({date: 'desc'}).exec(function(err, posts) {
                var lowerBound = req.query.count*10;        // iterate 10 posts at a time
                var upperBound = lowerBound+10;             // only return 10 posts max
                var total = posts.length;                   // used to check if next button needs to appear
                posts = posts.slice(lowerBound,upperBound);
                if (!err){
                    // nextval = iterates multiple of 10; next = if check if there are more posts; prevval = get last multiple of 10; prev = check if this is the first page
                    res.render('posts/main', { list: posts, title: 'Posts', nextval: req.query.count+1, next: posts.length == 10, prevval: req.query.count-1, prev: req.query.count-1 > -1 });
                } else {throw err;}
            });
            break;
        case 'post':
            if(req.session.user == true){
                const testFolder = './public/images';
                const fs = require('fs');
                fs.readdir(testFolder, (err, files) => {
                    res.render('posts/post', { list: files, title: 'Post' });
                })
            }
            else{
                res.render('admin', { admin: false, title: 'ADMIN' });
            }
            break;
        case 'delete':
            if(req.session.user == true){
                var Blog = require('../models/Blog.js');
                Blog.find({}, function(err, posts) {
                    if (!err){
                        res.render('posts/delete', { list: posts, title: 'Delete a Post' });
                    } else {throw err;}
                });
            }
            else{
                res.render('admin', { admin: false, title: 'ADMIN' });
            }
            break;
        default:
           var Blog = require('../models/Blog.js');
           Blog.findOne({title: req.params.post},function(err, obj){
                if (obj == null){
                    res.status(404);
                    res.render('404');
                }
                else{
                    res.render('posts/outline', { title: req.params.post, thumbnail: obj.thumbnail, content: obj.post, edited: obj.date });
                }
       	    });
            break;
    }
};
