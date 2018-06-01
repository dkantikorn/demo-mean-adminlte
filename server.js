var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const app = express();

/**
 * 
 * Enable listen cross site domain
 */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.static(path.join(__dirname, './dist/demomean')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./server/api'));

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});



const server = app.listen(9000, function () {
    //const port = server.address().port;
    //const address = server.address().address;

    //console.log("server address : %s is running on port : %s", address, port);

    var host = server.address().address;
    var port = server.address().port;
    console.log("Listen at http://%s:%s", host, port);
});