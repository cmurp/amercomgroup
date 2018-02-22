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

router.get('/services', (request, response) => {
    response.render('services', { title: 'Services' });
});
router.get('/services/:service', require('./services.js'));

router.get('/markets', (request, response) => {
    response.render('markets', { title: 'Markets' });
});
router.get('/markets/:market', require('./markets.js'));

router.get('/products', (request, response) => {
    response.render('products', { title: 'Products' });
});
router.get('/products/:product', require('./products.js'));

module.exports = router;
