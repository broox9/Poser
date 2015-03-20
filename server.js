var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors')

/* = DB Connect */
mongoose.connect('mongodb://localhost/calendar');

/* = Mongoose Data Models */
var stateCountSchema = {
  count: Number,
  event_time: String,
  exact_start: String,
  start: String,
  title: String,
  type: String,
  className: [String]
};

var StateCount = mongoose.model('state_count', stateCountSchema, 'state_counts');

/* App */
var app = express();
app.use(cors());


/* Routing */
app.get('/state_counts', function (req, res) {
  StateCount.find(function (err, docs) {
    res.send(docs)
  })
  
})


/* Server */
var server = app.listen(5000, function () {
  console.log('connected to Poser', arguments)
});
