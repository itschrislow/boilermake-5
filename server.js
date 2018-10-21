/** express */
const express = require('express');
const app = express();

/** body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

/** port for heroku and localhost */
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb+srv://boilermake2018:boilermake2018@cluster0-xubmh.mongodb.net/test?retryWrites=true"
// const dbName = 'boilermake2018';

// MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
//     console.log("Connected to server.");
//     const db = client.db(dbName);
// });

/** user database */
let users = [
    {email: "user0", password: "pw0"},
    {email: "user1", password: "pw1"},
    {email: "user2", password: "pw2"},
    {email: "user3", password: "pw3"},
    {email: "user4", password: "pw4"}
];

/** joblist */
let joblist = [
    {title: "Plumber", description: "Fix leaks", details: "Weekdays 1-3pm", name: "John", contact: "8194557860"},
    {title: "Tutor", description: "Calculus", details: "Weekends 6-8pm", name: "Carol", contact: "john@purdue.edu"},
    {title: "Mechanic", description: "Fix basic household items", name: "Bob", details: "Flexible - Contact for time.", contact: "3901116589"},
    {title: "Babysitter", description: "Care for young children", name: "Sarah", details: "Weekends 9am - 3pm", contact: "7654330899"},
    {title: "Carpool", description: "To and fro Purdue and The Cottage", name: "Kristen", details: "Weekdays 9am, 3pm", contact: "sarah@purdue.edu"}
];
// remove when done
app.get('/', (req, res) => {
    res.status(200).send({message: "Working"});
});

app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let validUser = users.filter((user) => {
        return user.email === email && user.password === password;
    });

    if (validUser.length === 0) {
        res.status(404).send({message: "User not found."});
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
        bio: bio,
        rating: 0
    };
    users.push(newUser);
    res.send(users);
});

app.get('/joblist', (req, res) => {
    res.status(200).send(joblist);
});

app.post('/new-job', (req, res) => {
    if (!req.headers.authorization || req.headers.authorization === "null") {
        res.status(401).send({message: "Unauthorized."});
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
            name: name,
            contact: contact
        };
        joblist.push(newJob);
        res.status(200).send(joblist);
    }
});

app.get('/search', (req, res) => {
    if (!req.headers.authorization || req.headers.authorization == "null") {
        res.status(401).send({message: "Unauthorized."});
    } else {
        let title = req.query.title;

        let job = joblist.filter(jobs => {
            return jobs.title === title;
        });
        res.status(200).send(job);
    }
});

app.listen(port, () => {
    console.log("Server is running.");
})