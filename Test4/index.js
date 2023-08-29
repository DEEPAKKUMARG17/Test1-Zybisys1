const express = require('express');
const app = express();
const sessions=require('express-session');
// const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const multer=require('multer');
const path=require('path');
const mongoose=require('mongoose');
//  const MongoClient=require('mongodb').MongoClient;
  const url="mongodb://0.0.0.0:27017/company";
// const client=new MongoClient(url);


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const multerStorage=multer.diskStorage({
    destination: (req,file,cb)=>
    {
    
        if(path.extname(file.originalname)==='.png')
        {
        
        cb(null,"images")
        }
        else if((path.extname(file.originalname)==='.jpg')||((path.extname(file.originalname)==='.jpeg')))
        {
            cb(null,"images")
        }
        
        else{
            cb(new Error("error format is wrong"),false)
        }
    },
    filename: (req,file,cb)=>
    {
        cb(null,file.originalname)
    }
});
app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname+'srcs',"views"));
 app.set('views', path.join(__dirname+'/src/public',"views"));
// app.get('/data',(req,res)=>{
//     res.render('show')
// })
// client.connect(url).then(()=>
// {
//     console.log("Connected");

// })
// const DB=client.db("company");
// const adder=DB.collection("crud");
const upload=multer({storage:multerStorage});
app.post('/upload',upload.single("myfile"),(req,res)=>{
    res.send("file upload")
});

   
mongoose.connect('mongodb://0.0.0.0:27017/company',{useNewUrlParser:true})
const db = mongoose.connection;

const UserSchema=new mongoose.Schema({
    
    image:{
        type:String
    }
})
const MyUser=mongoose.model('myfileupload',UserSchema)
const multerStorages=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname+'/src/public','files'))
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})


const uploads=multer({storage:multerStorages});

app.post('/uploader', uploads.array('myfile'),(req,res)=>{

    console.log(req.file)
    MyUser.create({image:req.file})
    MyUser.find({}).then((user)=>{
        res.send("file uploaded")
    })
})
    app.listen(8000,()=>
    {
        console.log("app is running")
        
    })
    const UserSchemas=new mongoose.Schema({
      username:String,
      password:String
       
    })
    const BusSchemas=new mongoose.Schema({
        Buses:String,
        price:Number
         
      })
      const BusBook=new mongoose.Schema({
        Busesname:String,
        customer:String
         
      })
const BusBooked=mongoose.model('busebook',BusBook);  
const BusBooking=mongoose.model('buse',BusSchemas);  
app.get('/bus',(req, res)=>{
    let bus=[{Buses:"policeclony",price:1290},{Buses:"oft",price:1290},{Buses:"matur",price:1290}]
    BusBooking.create(bus).then(()=>
    {
        console.log("created bus")
    })
    BusBooking.find({}).then((data)=>
    {
        res.render('buses',{data:data})
    })
   
})
const BusUser=mongoose.model('bususer',UserSchemas);
    
const bcrypt = require('bcrypt');
const routes=require('./srcs/routes/app');
const { findById } = require('./srcs/models/Users');

  app.get('/data',(req,res)=>{
    res.render('registeration')
  })
  app.post('/registeration',async(req,res)=>{
 const salt= await bcrypt.genSalt();
   const password= await bcrypt.hash(req.body.password,salt);
   console.log(req.body.username,password)
//    BusUser.create({username:req.body.username,password:password})
   
   BusUser.create({username:req.body.username,password:password}) 
   res.render('login',{user:req.body.username})

  })
  app.post('/booking',(req,res)=>{
    var busname=req.body.user;
    var  num=req.body.bus
    BusUser.find({username:busname}).then((data)=>
    {
         if(data.length)
         {
            BusBooking.findById(num).then((rep)=>
            {
                BusBooked.create({Busname:data[0].username,customer:rep[0].Buses}).then(()=>
                {
                    console.log("over")
                })
            })
         }
    })

  })
  app.post('/login',async(req,res)=>{
    let username=req.body.username
    let password=req.body.password;
    let o_user=req.body.user;
    BusUser.find({username}).then((data)=>
    {
         if(data.length)
         { 
            console.log(data[0])
            if(bcrypt.compare(password,data[0].password))

            {
                BusBooking.find({}).then((data)=>
                {
                    res.render('buses',{data:data,user:o_user})
                })
               }
            else{
                res.send("invalid user")
            }
        }
    })
  })
    app.use("/",routes)

// app.post("/upload",uploads.single("myfile"),(req,res)=>{
//     adder.insertOne({name:req.file})
//     console.log(req.file)
//     res.send("file uploaded")
// })
