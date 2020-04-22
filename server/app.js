// imports the express module
const express = require('express');

// import the mongoDB modules
var mongoose = require("mongoose");
var mongodb = require("mongodb");

// defines the express app
const app = express();

// connect to MongoDB
mongoose.connect("mongodb://localhost:27017/covid");

// connect to Schema
var caseSchema = new mongoose.Schema({
    case_id : {type: String, required : true}
});
    
var Case = mongoose.model('cases', caseSchema, 'cases');
     
// defines the default route / to display Hello World!
app.get('/', (req, res) => res.send('Hello World!'));

// route that will return Hello World
app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// route that will return a document from mongoDB
app.get('/api/case/:id', (req, res) => {
    let case_id = req.params.id.toString();
    Case.findOne({case_id : case_id}, function (err, data) {
        if(err) return console.log(err);
        res.json(data);
    });
})

// set app to listen on port 3001
app.listen(3001);
