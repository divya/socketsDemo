var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
// var socket = require('socket.io-client')('http://localhost');
var fs = require('fs');

// ME DESPERATELY TRYING TO LINK EXTERNAL JS FILES
// (NOTHING WORKS)
// var x = require('video.js');
// var y = require('recordrtc');
// var z = require('videojs.record');
// <script src="video.min.js"></script>
// <script src="RecordRTC.js"></script>
// <script src="videojs.record.js"></script>

app.listen(8080);

// I DONT KNOW WHAT THIS DOES PLEASE TELL ME
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

// RECEIVES AND SENDS DATA FROM AND TO CLIENT
io.sockets.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  socket.on('message', function (data) {
    console.log(data);

    // method to be executed;
    socket.emit('message', {
      message: data,
      test: 'heart rate: ' + Math.floor(((Math.random() * 40) + 60)) + ' bpm'
    });

  });
});
