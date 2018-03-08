// routes/users/index.js
var router = require('express').Router();

router.get('/', (request, response) => {
    response.render('home', { title: 'Welcome' });
});

router.get('/about-us', (request, response) => {
    response.render('about', { title: 'About Us' });
});

router.get('/contact-us', (request, response) => {
    response.render('contact', { title: 'Contact Us' });
});

router.get('/promotions', (request, response) => {
    response.render('promotions', { title: 'Promotions' });
});

router.get('/get-a-quote', (request, response) => {
    response.render('quote', { title: 'Get a Quote' });
});

router.get('/markets', (request, response) => {
    response.render('markets/markets', { title: 'Markets' });
});
router.get('/markets/:markets', require('./markets.js'));

router.get('/services', (request, response) => {
    response.render('services/services', { title: 'Services' });
});
router.get('/services/:services', require('./services.js'));

router.get('/admin', (request, response) => {
    response.render('admin', { title: 'ADMIN' });
});
router.get('/post', (request, response) => {
    if(request.session.user == true){
        response.render('post', { title: 'Post' });
    }
    else{
        response.render('admin', { title: 'ADMIN' });
    }
});
router.get('/posts', (request, response) => {
    response.render('/posts/post', { title: 'Posts' });
});
router.get('/posts/:post', require('./blog.js'));

module.exports = router;
