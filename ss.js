var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
// var socket = require('socket.io-client')('http://localhost');
var fs = require('fs');

// var x = require('video.js');
// var y = require('recordrtc');
// var z = require('videojs.record');



// <script src="video.min.js"></script>
// <script src="RecordRTC.js"></script>
// <script src="videojs.record.js"></script>

app.listen(8080);
// app.listen(8888, );


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

io.sockets.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  socket.on('message', function (data) {
    console.log(data);

    // method to be executed;
    socket.emit('message', {
      message: data,
      test: 'heart rate: ' + Math.floor(((Math.random() * 40) + 60)) + ' bpm'
    });
    // we tell the client to execute 'message'
    // socket.emit('message', {
    //   message: data,
    //   test: 'heart rate: ' + Math.floor(((Math.random() * 40) + 60)) + ' bpm'
    // });
  });
});
