// the app
var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true })); 

var exphbs = require('express-handlebars'); 
app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');


app.use(express.static('public'));  //serve static files

var schedule = [
    {flight: 1212, origin: "SDF 7:00am", destination: "MIA 9:50am"},
    {flight: 4505, origin: "SDF 7:20am", destination: "LAS 8:30am"},
    {flight: 2212, origin: "SDF 10:00am", destination: "MIA 12:50pm"},
    {flight: 5505, origin: "SDF 11:20am", destination: "LAS 12:30pm"}
    ];

    app.get('/flights', function(req, res) {
        res.render('flights', {page_title: 'flight details', flightlist: schedule});
    });

    app.get('/', function(req, res) {
        res.render('about', {page_title: 'welcome page'});
    });

    app.post('/handleform', function(req, res) {
        var reqBody = req.body;
        console.log(reqBody);
        var name = req.body.fullname;
        var flight = req.body.flight;
        var seating = req.body.seating;
        var method = req.body.meal;

        order_summary = {page_title: "summary", name: name, flight: flight, meal: method, class: seating}
        res.render('summary', order_summary);
    });


app.use(function (req, res) {
    res.status(404).send("Sorry, no such page!")
});



app.listen(3000, function ()  {
    console.log('app started on local host:3000, press ctrl-C to terminate.');
});