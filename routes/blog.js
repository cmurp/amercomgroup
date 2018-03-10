var fs = require('fs');
module.exports = function (req, res) {
    switch(req.params.post){
        case 'main':
            res.render('posts/main', { title: 'Restaurants' });
            break;
        default:
           fs.readFile('./public/posts/'+req.params.post+'.html', 'utf8', function(err, contents) {
               console.log(contents);
               res.render('posts/outline', { title: req.params.post, content: contents });
           });
            break;
    }
};
