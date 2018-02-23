module.exports = function (req, res) {
    switch(req.params.services){
        case 'american_communications':
            res.render('services/ac', { title: 'American Communications' });
            break;
        case 'american_satellite_concepts':
            res.render('services/asc', { title: 'American Satellite Concepts' });
            break;
        case 'american_wireless_synergy':
            res.render('services/aws', { title: 'American Wireless Synergy' });
            break;
        default:
            res.render('services/services', { title: 'Services' });
            break;
    }
};
