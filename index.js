const express= require("express");
const app=express();
const User = require('./models/index.js');

const bodyp = require('body-parser');
app.use(bodyp.urlencoded({extended:true}));
app.use(bodyp.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/crud");
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Connection Successful.!");
})

app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('insert')
})

app.post('/insert',(req,res)=>{

    
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    user.save(()=>{
        res.send("<h1>Data Send..</h1>")
    })
})

app.get('/show',(req,res)=>{
    User.find({},(err,result)=>{
        res.render('show',{users:result})
    })
    
})

app.get('/delete/:id',async(req,res)=>{
   await User.findByIdAndDelete(req.params.id)
   res.redirect('/show')
})

app.get('/edit/:id',(req,res)=>{
    User.findById(req.params.id,(err,result)=>{
        res.render('edit',{users:result})
    })
})

app.post('/update/:id',async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/show');
})

app.listen(4000,()=>{
    console.log("Welcome");
})  