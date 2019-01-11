var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {};

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//io : 전역. 외부에서 들어오는 것 전체적인 총괄
// socket : 각각 개인. 현재 연결된 사람들.
//on: receive
// emit : send

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on("USERMSG", (data)=>{
        console.log(data);
       // io.emit("SERVERMSG",data)
        users['Harry'].emit("SERVERMSG",data)
    })

    socket.on("SETNICKNAME",(nickname)=>{
        users[nickname] =  socket;

        console.log(users)
    })
});



http.listen(8080, function(){ //포트번호
    console.log('listening on *:3000');
});