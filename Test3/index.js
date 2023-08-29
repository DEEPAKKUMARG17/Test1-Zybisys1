const express=require('express');
const app = express();
const fs=require('fs');
const events = require('events');
const cookieParser = require('cookie-parser');
const errorhandler = require('./errorhandler');
const MongoClient=require('mongodb').MongoClient;
const url="mongodb://0.0.0.0:27017/company";
const ObjectId=require('mongodb').ObjectId;
const client=new MongoClient(url);

app.use(cookieParser());

//Q.4 user defined events to write in a file
/* 4. Create a user defined event in node which when fired should write some content to a file. */
app.get('/', (req, res) => {
  
 const eventEmitter=new events.EventEmitter()
eventEmitter.on("fire",(a)=>
{
    fs.writeFile('data.txt',"yelow rules war",(err,res)=>
    {
       if(err)
       {
        console.log(err)
       }
       else
       {
        console.log("written")
       }
    })
      
})
eventEmitter.emit("fire")
res.end("done")
})



let user={
    name: 'deepak',
    age:80
}
let user1={
    name: 'deepakkumar',
    age:800
}
//Q.1 to count user apperance on web page
/* 1.Create an express app in node which should count the number of times a user visits a web page
 and display it to the user.*/
let count=0;
app.get('/cookie',(req,res)=>
{


    res.cookie("count",++count) 
  
        res.send("count"+" "+ req.cookies.count);
    
})

//Q.2 wheather user present in page or not
/* 2.Create a route in express which should have a middleware to authenticate a user by checking whether 
a cookie exists for that particular user or not. If the cookie does not exists then use error handler 
middleware to throw error message.*/
let userd={
    name: 'deepakkumar',
    age:800
}
app.get('/setuser',(req,res)=>
{
res.cookie("userval",userd);
res.send("updated")
});
const authentication=(req,res,next)=>
{
    var username
    try{
        username=req.cookies.userval.name
        if(username)
        {
         res.send("valid user")
        }
    }catch(e){
        next(username);
    }

}

//app.use(errorhandler)
app.get("/users",authentication,(req,res)=>
{
   res.send("user is not present")
})

//Q.5 to get from db and show in ejs file
/* 5.Create a route in express which should accept an object id from the url and if that object id exists in the database 
then fetch the document of that particular object id and pass it on to the ejs template engine to view the data */
app.set('view engine', 'ejs');
app.set('views', __dirname );
app.get('/fetch/:id',(req,res)=>{
    let id=req.params.id;
    var shower;
    client.connect(url).then(()=>
{
    console.log("Connected");
    const DB=client.db("company");
    const adder=DB.collection("workers");
     const obj_id=new  ObjectId(id);
    
    adder.find({_id:obj_id}).toArray().then((pot)=>
    {
        console.log(pot)
        res.render('showdata',{pot:pot})  
    })
    

   
})

})
// Q.3 to read an html file and display in the page
/* 3.Using the ‘fs’ module in nodejs, read an html file and display its content on the web page */
app.get("/demo", (req, res) => {

        fs.readFile('demo.html', (err, response) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(response.toString());
            }
        })
    
    })
app.listen(8000,(req,res)=>{
    console.log("donners")
})