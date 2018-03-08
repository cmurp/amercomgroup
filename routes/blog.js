module.exports = function (req, res) {
    switch(req.params.post){
        case 'restaurants':
            res.render('markets/restaurants', { title: 'Restaurants' });
            break;
        default:
            response.render('/posts/post', { title: 'Posts' });
            break;
    }
};
