/* express */
const express = require('express');
const app = express();

/* body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const port = process.env.PORT || 5000;
const http = require('http').Server(app);
const io = require('socket.io')(http);

// io.on('connection', (socket) => {
//     console.log('user connected' + socket.id);

//     socket.on("login", data => {
//         console.log(data);
//         socket.emit('login', data);
//     });
// });

let user = [ {email: "low10@purdue.edu", email: "0000"} ];
let joblist = [];

app.get('/', (req, res) => {
    res.status(200).send({message: "Working"});
})

app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // let info = {email: email, password: password};

    // res.send(info);

    console.log("in");
    
    let validUser = user.filter((email, password) => {
        user.email === email;
        user.password === password;
    });

    if (validUser.length === 0) {
        res.status(404).send({message: "User not found."});
    } else {
        let token = "";

        for(let i = 0; i < 4; i++) {
            token += Math.random().toString(36).substring(2, 7) + "";
        }
        res.setHeader('Set-Authorization', token);
        res.ok().send({message: "Logged in!"});
    }
});

app.post('/signup', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let tel = req.body.tel;
    let bio = req.body.bio;

    let newUser = {
        id: user.length,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        tel: tel,
        bio: bio
    };
    user.push(newUser);
    res.send(user);
});

app.post('/new-job', (req, res) => {
    if (!req.headers.authorization && req.headers.authorization === "null") {
        res.status(401).send({message: "Unauthorized!"});
    } else {
        let title = req.body.title;
        let desc = req.body.description;
        let location = req.body.location;
        let time = req.body.time;
        let email = req.body.email;
        let tel = req.body.tel;
        
        let newJob = {
            id: items.length,
            title: title,
            description: desc,
            location: location,
            time: time,
            email: email,
            tel: tel
        };
        joblist.push(newJob);
        res.send(joblist);
    }

    app.get('/search', (req, res) => {
        let title = req.query.title;

        let job = joblist.filter(title => {

        })
    });
});

// app.get('/', (req, res) => {
//     res.send('Chat Server is running on port 3000')
// });

// io.on('connection', (socket) => {
//     console.log('user connected')
    
//     socket.on('join', function(userNickname) {
//             console.log(userNickname +" : has joined the chat "  );
    
//             socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
//         });
    
//     socket.on('messagedetection', (senderNickname,messageContent) => {
           
//            //log the message in console 
    
//            console.log(senderNickname+" :" +messageContent)
//             //create a message object 
//            let  message = {"message":messageContent, "senderNickname":senderNickname}
//               // send the message to the client side  
//            io.emit('message', message );
//           });

//     socket.on('disconnect', function() {
//         console.log( ' user has left ')
//         socket.broadcast.emit("userdisconnect"," user has left ") 
//     });    
// });

app.listen(port, () => {
    console.log("Server is running.");
})