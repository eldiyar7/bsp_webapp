var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('apartments', require(__dirname + '/data/apartments.json'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/scripts', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/scripts', express.static(__dirname + '/node_modules/parsleyjs/dist'));

app.get('/', function (req, res, next)  {
    res.render('home',
        {
            siteTitle: 'Blue Slate Properties',
            pageTitle: 'Home',
            pageId: 'home',
            apartments: req.app.get("apartments")
        }
    )
});

app.use('/apartments', require(__dirname + '/routes/apartmentsRouter'));
app.use('/contacts', require(__dirname + '/routes/contactsRouter'));
app.use('/application', require(__dirname + '/routes/applicationRouter'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
