const express = require('express');
const app =express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const exp = require('constants');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.render('index.ejs')
})
users ={}
let randomchat=0;

io.on('connection',(socket)=>{
    socket.on('connectToUser',(data)=>{
        console.log("event recieved");
        // socket
        socket.join(Math.min(data.user1,data.user2)+Math.max(data.user1,data.user2));
        
    })
    socket.on('sendmsg',(data)=>{
        console.log(data);
        socket.to('room'+randomchat).emit('recievemsg',data);
    })
    socket.on('joinrandomchat',()=>{
        
        socket.join('room'+randomchat);
        
    });
    socket.on('joingroup',(data)=>{
        socket.join(data);
        console.log(data);
    })
   socket.on("sendmsgingroup",(data)=>{
    console.log(data.groupname)
    socket.to(data.groupname).emit('recievemsg',data)
   });
   
   
   
})
app.post('/',(req,res)=>{
    users[req.body.useremail]= {}
    res.render('chat',{usermailid:req.body.useremail,username:req.body.username});
});

http.listen(3000,()=>{
    console.log("Listening on port 3000");
})