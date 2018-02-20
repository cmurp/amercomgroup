// routes/users/index.js
var router = require('express').Router();

router.get('/', (request, response) => {
    response.render('home', { title: 'American Communications of the Triad' });
});

router.get('/about-us', (request, response) => {
    response.render('about', { title: 'About Us - AmerCom of the Triad' });
});

router.get('/contact-us', (request, response) => {
    response.render('contact', { title: 'Contact Us - AmerCom of the Triad' });
});

router.get('/promotions', (request, response) => {
    response.render('promotions', { title: 'Promotions - AmerCom of the Triad' });
});

router.get('/get-a-quote', (request, response) => {
    response.render('quote', { title: 'Get a Quote - AmerCom of the Triad' });
});

router.get('/markets/:market', require('./markets.js'));
router.post('services/:service', require('./services.js'));
router.post('/products/:product', require('./products.js'));

module.exports = router;
