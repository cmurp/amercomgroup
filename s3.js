var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

// set up handlebars view engine
var handlebars = require('express-handlebars')
 .create({ defaultLayout:'main' }); // this layout will be used unless another is specified
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public')); // sets the static middleware

/* first arg is path, function runs when matched, request and response objects are passed to functions */
app.use('/', require('./routes/index.js'));

// 500 error handler (middleware)
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.status(500);
 res.render('500');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
 res.status(404);
 res.render('404');
});

app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});
