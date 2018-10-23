/** express */
const express = require('express');
const app = express();

/** body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/** port for heroku and localhost */
const port = process.env.PORT || 5000;

/** user database */
let users = [
    {id: 0, name: "Ann", email: "user0", password: "pw0", tel: "111", rating: 5},
    {id: 1, name: "Bob", email: "user1", password: "pw1", tel: "222", rating: 4},
    {id: 2, name: "Cay", email: "user2", password: "pw2", tel: "333", rating: 3},
    {id: 3, name: "Dan", email: "user3", password: "pw3", tel: "444", rating: 2},
    {id: 4, name: "Ean", email: "user4", password: "pw4", tel: "555", rating: 1}
];

/** joblist */
let joblist = [
    {id: 0, title: "Plumber", description: "Fix leaks", details: "Weekdays 1-3pm", name: "John", contact: "8194557860"},
    {id: 1, title: "Tutor", description: "Calculus", details: "Weekends 6-8pm", name: "Carol", contact: "john@purdue.edu"},
    {id: 2, title: "Mechanic", description: "Fix basic household items", details: "Flexible - Contact for time.", name: "Bob", contact: "3901116589"},
    {id: 3, title: "Babysitter", description: "Care for young children", details: "Weekends 12am - 6pm", name: "Sarah", contact: "7654330899"},
    {id: 4, title: "Carpool", description: "To and fro Purdue and The Cottage", details: "Weekdays 9am - 3pm", name: "Kristen", contact: "sarah@purdue.edu"},
    {id: 5, title: "Barber", description: "Men's style", details: "Weekdays 1-3pm", name: "Jim", contact: "8194557860"},
    {id: 6, title: "Tutor", description: "English", details: "Monday 4-6pm", name: "Jane", contact: "7445681190"}
];

app.get('/users', (req, res) => {
    res.send(users);
});

/** GET: joblist */
app.get('/joblist', (req, res) => {
    res.status(200).send(joblist);
});

/** GET: search */
app.get('/search', (req, res) => {
    let title = req.query.title;

    let job = joblist.filter(jobs => {
        return jobs.title === title;
    });
    res.status(200).send(job);
});

/** POST: login */
app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let validUser = users.filter((user) => {
        return user.email === email && user.password === password;
    });

    if (validUser.length === 0) {
        res.status(404).send({message: "User not found."});
    } else {
        res.status(200).send(validUser);
    }
});

/** POST: signup */
app.post('/signup', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let tel = req.body.tel;

    let newUser = {
        id: users.length,
        name: name,
        email: email,
        password: password,
        tel: tel,
        rating: 0
    };
    users.push(newUser);
    res.send(users);
});

/** POST: new-job */
app.post('/new-job', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let details = req.body.details;
    let name = req.body.name;
    let contact = req.body.contact;

    let newJob = {
        id: joblist.length,
        title: title,
        description: description,
        details: details,
        name: name,
        contact: contact
    };
    joblist.push(newJob);
    res.status(200).send({message: "Job added!"});
});

app.listen(port, () => {
    console.log("Listening on port 5000.");
});