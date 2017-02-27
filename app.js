var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var clients = 0;
var nsp = io.of('/my-namespace');

http.listen(3000, function(){
  console.log('listening on *:3000');
});

nsp.on('connection',function(socket){
	clients++;
	
	console.log('A user connected');
	
	//Send a message after a timeout of 4seconds
	// setTimeout(function(){
		// //socket.send('Sent a message 4 seconds after connection!');
		// socket.emit('testerEvent',{
			// description:'A custom event named testerEvent!'
		// });
	// }, 4000);
	
	
	
	//io.sockets.emit('broadcast',{description:clients+' clients connected!'});
	
	//socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
	
	socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
	
	socket.on('clientEvent',function(data){
		console.log(data);
	});
	
	
	socket.on('disconnect',function(){
		clients--;
		console.log('A user disconnected');
	});
});

