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
let count=0;
app.get('/cookie',(req,res)=>
{


    res.cookie("count",++count) 
  
        res.send("count"+" "+ req.cookies.count);
    
})

//Q.2 wheather user present in page or not
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
        next();
    }

}

app.use(errorhandler)
app.get("/users",authentication,(req,res)=>
{
   res.send("user is not present")
})

//Q.5 to get from db and show in ejs file
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
        res.render('showdata',{pot:pot})  
    })
    

   
})

})
// Q.3 to read an html file and display in the page
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