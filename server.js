const express = require('express');
const app = express();
app.use(express.static(__dirname + "/public"));

app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

const server = app.listen(1337);
const io = require('socket.io')(server);
    

app.get('/',(requset,response)=>{
    response.render('index');
});

io.on('connection',(socket) => {
    io.emit('user_login',socket.id);
    socket.on('raise_hand',() => {
        io.emit('someone_raised_hand',socket.id);
    });
    var id = socket.id; //Saves the socket.id
    socket.on('disconnect',(socket) => {
        io.emit('user_left',id);
    });
});

