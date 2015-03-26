var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

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

var postEventSchema = {
	broadcast_id: Number,
	message: String,
	created_by: String,
	pid: Number,
	post_ids:[String],
	posts: Array,
	resource_name: String,
	stream_name: String,
	state: String,
  count: Number,
  event_time: String,
  exact_start: String,
  start: String,
  title: String,
  type: String,
  className: [String]
}

var StateCount = mongoose.model('state_count', stateCountSchema, 'state_counts');
var PostEvent = mongoose.model('post_event', postEventSchema, 'post_events');



/* App */
var app = express();
var urlEncodedParser = bodyParser.urlencoded({extended: false}); // for query strings
var jsonParser = bodyParser.json(); //for application/json

app.use(cors());
// app.use(jsonParser) // lets do this per route instead



/* Routing */
app.get('/state_counts', function (req, res) {
  console.log("~~State Counts Request~~")
  StateCount.find(function (err, docs) {
	  res.send(docs);
	  console.log("STATE_COUNT", !!docs)
  });
});

//multiple callbacks just pipe the stream result
app.post('/state_counts', jsonParser, function (req, res) {
  console.log("~~State Counts Post~~", req.body);
  var sc = StateCount.findOne({"_id" :req.body._id} , function (err, doc) {
  	if (err) {
      console.log("<<< %s", err.toString());
      res.sendStatus(500);
      return;
    }
    console.log("CallBack DOC", doc);
	  res.sendStatus(200)
  });
});



app.get('/post_events', function (req, res) {
  console.log("~~Post Events Request~~")
  PostEvent.find(function (err, docs) {
	  res.send(docs);
	  console.log("POST_EVENT", !!docs)
  });
});


/* Server */
var server = app.listen(5000, function () {
  console.log('connected to Poser port:5000')
});
