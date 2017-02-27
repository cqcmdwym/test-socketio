var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var roomno=1;

http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection',function(socket){
	
	
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
	
	// socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
	
	// socket.on('clientEvent',function(data){
		// console.log(data);
	// });
	
	if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1){
		roomno++;
	}
	socket.join('room-'+roomno);
	
	io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
	
	socket.on('disconnect',function(){
		
		console.log('A user disconnected');
	});
});

