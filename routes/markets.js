module.exports = function (req, res) {
    switch(req.params.markets){
        case 'restaurants':
            res.render('markets/restaurants', { title: 'Restaurants' });
            break;
        case 'hotels':
            res.render('markets/hotels', { title: 'Hotels' });
            break;
        case 'gyms':
            res.render('markets/gyms', { title: 'Gyms' });
            break;
        case 'offices':
            res.render('markets/offices', { title: 'Offices' });
            break;
        case 'medical':
            res.render('markets/medical', { title: 'Medical' });
            break;
        case 'apartments':
            res.render('markets/apartments', { title: 'Apartments' });
            break;
        case 'salons':
            res.render('markets/salons', { title: 'Salons' });
            break;
        case 'mobile-home-communities':
            res.render('markets/mobile_homes', { title: 'Mobile Home Communities' });
            break;
        default:
            res.render('markets/markets', { title: 'Markets' });
            break;
    }
};
