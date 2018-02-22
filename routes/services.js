module.exports = function (req, res) {
    console.log("TEST");
    res.render('services/' + req.params.service);
};
