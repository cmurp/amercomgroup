// index.js
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const http = require('http')
const helmet = require('helmet')

//set env params
require('dotenv').config({path: './config/.env'})

// Express boilerplate
const app = express()
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}))

var session = require('express-session');
var FileStore = require('session-file-store')(session);
app.use(session({
  name: 'server-session-cookie-id',
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: true,
  resave: true
}));

app.use(helmet());

//FORM HANDLING CODE
app.use(require('body-parser')());
app.use(require('./lib/post.js'));

// DOMAIN CODE for handling uncaught exceptions
app.use(function(req, res, next){
    // create a domain for this request
    var domain = require('domain').create();
    // handle errors on this domain
    domain.on('error', function(err){
        console.error('DOMAIN ERROR CAUGHT\n', err.stack);
        try {
            // failsafe shutdown in 5 seconds
            setTimeout(function(){
                console.error('Failsafe shutdown.');
                process.exit(1);
            }, 5000);
            // disconnect from the cluster
            var worker = require('cluster').worker;
            if(worker) worker.disconnect();
            // stop taking new requests
            server.close();
            try {
                // attempt to use Express error route
                next(err);
            } catch(err){
                // if Express error route failed, try
                // plain Node response
                console.error('Express error mechanism failed.\n', err.stack);
                res.statusCode = 500;
                res.setHeader('content-type', 'text/plain');
                res.end('Server error.');
            }
        } catch(err){
            console.error('Unable to send 500 response.\n', err.stack);
        }
    });
    // add the request and response objects to the domain
    domain.add(req);
    domain.add(res);
    // execute the rest of the request chain in the domain
    domain.run(next);
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
// End Express boilerplatevar express = require('express');

/* first arg is path, function runs when matched, request and response objects are passed to functions */
app.use(require('./lib/index.js'));

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

function startServer() {
    http.createServer(app).listen(process.env.PORT, function(){
        console.log( 'Express started in ' + app.get('env') +
        ' mode on http://localhost:' + process.env.PORT +
        '; press Ctrl-C to terminate.' );
    });
}

if(require.main === module){
    // application run directly; start app server
    startServer();
} else {
    // application imported as a module via "require": export function
    // to create server
    module.exports = startServer;
}
