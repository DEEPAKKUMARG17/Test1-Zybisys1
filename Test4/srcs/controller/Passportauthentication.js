
const MyUser=require('../models/Users');
const mongoose=require('mongoose');
const sessions=require('express-session');
const express=require('express');
const passport=require('passport');
const app = express();
app.use(sessions({
    secret:"this is very good",
    resave:true,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
mongoose.connect('mongodb://0.0.0.0:27017/company',{useNewUrlParser:true})

const db=mongoose.connection;
     db.on('open',()=>
     {
         console.log("dataentered")
   })
    
   passport.use(MyUser.createStrategy())
   passport.serializeUser(MyUser.serializeUser())
   passport.deserializeUser(MyUser.deserializeUser())

   exports.mainpage=(req, res)=>{
    if(req.isAuthenticated())
    {
        res.send('<a href="/logout">sucessfully logged in </a>');
    }
    else{
        res.render("userinput")
    }
   }
   exports.login=(req, res)=>{ //get route
    if(req.isAuthenticated())
    {
        res.send("<a href='/logout'>Logout</a>")
    }
    else{
        res.render("login2")
    }
   }

   exports.register=(req,res)=>{
    var email = req.body.username;
    var password = req.body.password;
    MyUser.register({username: email},password,function(err,user)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            passport.authenticate("local")(req, res, function()
            {
                res.send("sucessfully registered")
            })
        }
    })
   }
   exports.loggedin=()=>
   {
    passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/login"
       })
   }
   exports.logout=( req,res)=>
   {
    req.logout(req.user,err=>{
        if(err) throw err;
        res.redirect("/login")

    })
   }
