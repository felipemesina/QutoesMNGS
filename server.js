var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

mongoose.connect('mongodb://localhost/quotesdojo');

var QuoteSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 2},
  quote: {type: String, required: true, minlength: 2}
});

var Quote = mongoose.model('quotes', QuoteSchema);


app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/quotes', function (req, res) {
  Quote.find({}, function (err, quotes) {
    if (err){
      console.log(err);
    }
    res.render('quotes', { quotes: quotes });
  })
});

app.post('/quotes', function(req, res) {
  Quote.create(req.body, function(err) {
    if (err) { console.log(err); }
    res.redirect('/quotes');
  });
});



app.listen(8000, function() {
  console.log("listneing on 8000");
})
