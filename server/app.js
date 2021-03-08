'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

const localDb = process.env.LOCAL_DB;
const atlasDb = process.env.ATLAS_DB;

const mongoose = require('mongoose');
const { reset } = require('nodemon');
const db = mongoose.connection;
mongoose.connect(atlasDb, { useNewUrlParser: true, useUnifiedTopology: true});

db.on('connected', function () {
    console.log('Mongoose default connection open');
});

// If the connection throws an error
db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todo: String,
    created: {
        type: Date,
        default: new Date()
    }
})

const Todo = mongoose.model('Todo', todoSchema);

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/addNewPost', (req, res) => {
    const newTodo = new Todo({
        todo: req.body.todo
    });

    newTodo.save().then(() => console.log('Successfully saved a new Post to MongoDB'))
    res.send('Received post')
})

app.get('/allTodos', (req, res) => {
    Todo.find({}, (err, posts) => {
        if (err) console.log(err)
        else res.json(posts)
    })
})

app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params;
    Todo.findByIdAndRemove(id, err =>{
        if(err) console.log(err);
        else res.redirect('/');
    })
})

app.listen(5001, () => {
    console.log('Listening on port', 5001)
})