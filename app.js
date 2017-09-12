const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Database operations
mongoose.connect('mongodb://app:app@ds133044.mlab.com:33044/todo-app');

const database = mongoose.connection;

database.once('open',()=>console.log(`Connected to database`));

const todoSchema = mongoose.Schema({
    task: String
});

const todo = mongoose.model('todo', todoSchema);

const urlEncoded = bodyParser.urlencoded({extended: false});

app.use(express.static('.'));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
});

app.post('/submit',urlEncoded,(req,res)=>{
    const data = todo(req.body).save((err)=>{
        if(err) throw err;
        console.log(`Added new task: ${req.body.task}`);
    });
    console.log(req.body);
    res.redirect('/');
});

app.get('/api',(req,res)=>{
    todo.find({},(err, data)=>{
        const apiData = data.map(data=>{
            return {'task':data.task};
        });
        res.json(apiData);
    });
});
app.listen(3000);

console.log(`App is now listening on port 3000`);
