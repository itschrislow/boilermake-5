/* express */
const express = require('express');
const app = express();

/* body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const port = process.env.PORT || 5000;

let users = [
    {email: "user0", password: "pw0"},
    {email: "user1", password: "pw1"}
];

let joblist = [
    {title: "Plumber", description: "Fix leaks", details: "Weekdays 1-3pm", contact: "1234567890"},
    {title: "Tutor", description: "Calculus", details: "Weekends 6-7pm", contact: "9876543210"},
];

app.get('/', (req, res) => {
    res.status(200).send({message: "Working"});
})

app.get('/login', (req, res) => {
    res.status(200).send({message: "Logged in!"});
});

app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let validUser = users.filter((user) => {
        return user.email === email && user.password === password;
    });

    if (validUser.length === 0) {
        return res.status(404).send({message: "User not found."});
    } else {
        let token = "";

        for(let i = 0; i < 4; i++) {
            token += Math.random().toString(36).substring(2, 7) + "";
        }
        res.setHeader('Set-Authorization', token);
        res.status(200).send({message: "Logged in!"});
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
    users.push(newUser);
    res.send(users);
});

app.get('/joblist', (req, res) => {
    res.status(200).send(joblist);
});

app.post('/new-job', (req, res) => {
    if (!req.headers.authorization || req.headers.authorization === "null") {
        res.status(401).send({message: "Unauthorized!"});
    } else {
        let title = req.body.title;
        let desc = req.body.description;
        let details = req.body.details;
        let contact = req.body.contact;
        
        let newJob = {
            id: items.length,
            title: title,
            description: desc,
            details: details,
            contact: contact
        };
        joblist.push(newJob);
        res.send(joblist);
    }
});

app.get('/search', (req, res) => {
    let title = req.query.title;

    let job = joblist.filter(jobs => {
        return jobs.title === title;
    });
    res.send(job);
});

app.listen(port, () => {
    console.log("Server is running.");
})