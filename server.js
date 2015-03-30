var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var moment = require('moment');

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
	posts: [],
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
  });
});


//multiple callbacks just pipe the stream result
app.post('/state_counts', jsonParser, function (req, res) {
  var request = req.body;
  console.log("~~State Counts Post~~", request);

  StateCount.findOne({event_time: request.event_time, state: request.state }, function (err, doc) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    doc.start = doc.event_time = doc.exact_start = request.start;
    doc.save(function (err) {
      if (!err) {
        setTimeout(function () {res.status(200).json(doc); }, 3500)
        return;
      }
	  res.status(500).json(err)
    });
  });

});



app.get('/post_events', function (req, res) {
  console.log("~~Post Events Request~~");
  PostEvent.find(function (err, docs) {
	 res.send(docs);
  });
});


app.post('/post_events', jsonParser, function (req, res) {
  var request = req.body;
  console.log("~~Post Events Request~~");

  PostEvent.findOne({pid: request.pid}).exec(function (err, doc) {
    if (err) {
      console.log("<<< %s", err.toString());
      res.sendStatus(500);
      return;
    }

    doc.exact_start = doc.event_time = doc.start = request.start;
    doc.save(function (err) {
      if (err) {
        res.status(500).jsonp(err);
        return;
      }
      res.status(200).jsonp( doc ).end();
    });
  });
});



/* Server */
var server = app.listen(5000, function () {
  console.log('connected to Poser port:5000')
});
