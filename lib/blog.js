var fs = require('fs');
module.exports = function (req, res) {
    switch(req.params.post){
        case 'main':
            res.render('posts/main', { title: 'Posts' });
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
                const testFolder = './public/posts';
                const fs = require('fs');
                fs.readdir(testFolder, (err, files) => {
                    res.render('posts/delete', { list: files, title: 'Delete a Post' });
                })
            }
            else{
                res.render('admin', { admin: false, title: 'ADMIN' });
            }
            break;
        default:
            var path = './public/posts/'+req.params.post+'.html';
            var editDate = '';
            fs.stat(path, function(err, stats){
                editDate = stats.mtime;
            });
           fs.readFile(path, 'utf8', function(err, contents) {
               console.log(contents);
               res.render('posts/outline', { title: req.params.post, content: contents, edited: editDate });
           });
            break;
    }
};
