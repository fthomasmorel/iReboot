var io = require('socket.io')();
var sys = require('sys')
var exec = require('child_process').exec;
var Rpio = require('./gpio.js');
var rpio = new Rpio();

io.on('connection', function(socket){
  console.log("Connected");
  socket.on('motors', function(json) {
      rpio.setMotors(json.left,json.right,json.speed,json.direction)
  })
  socket.on('video', function(state) {
	if(state == "on"){
		console.log("recording");
		function puts(error, stdout, stderr) {  }
		exec("raspivid -o /home/pi/myvid.h264 -vf -t 1000000 &", puts);
	}else{
		console.log("stop recording");
		function puts(error, stdout, stderr) { }
		exec("pkill raspivid", puts);
		exec("rm -rf /home/pi/myvideo.mp4", puts);
		exec("rm -rf /var/www/myvideo.mp4", puts);
		exec("MP4Box -add /home/pi/myvid.h264 /var/www/myvideo.mp4", puts);
//		exec("rm -rf /home/pi/myvid.h264", puts);
	}
  })
  socket.on('shutdown', function(foo) {
 	function puts(error, stdout, stderr){}
	socket.emit("shutdown","stopped");
	exec("sudo halt", puts);
  })
});

io.listen(8080);
