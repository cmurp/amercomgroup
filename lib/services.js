module.exports = function (req, res) {
    switch(req.params.services){
        case 'american-communications':
            res.render('services/ac', { title: 'AmerCom' });
            break;
        case 'american-satellite-concepts':
            res.render('services/asc', { title: 'ASC' });
            break;
        case 'american-wireless-synergy':
            res.render('services/aws', { title: 'AWS' });
            break;
        default:
            res.render('services/services', { title: 'Services' });
            break;
    }
};
