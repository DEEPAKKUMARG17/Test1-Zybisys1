const add = require("./Operation");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());



// Answer 1
app.post("/", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var count = 0, count1 = 0;
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) {
        count = 1;
    }else {
        count = 0;
    }

    var passw = /^[A-Za-z0-9]+$/;
    if (password !== "" && password.match(passw) &&(password.length>4)) {
        count1 = 1;
    }else {
        count1 = 0
    }
    if ((count1 == 1) && (count == 1)) {
        res.send("success")
    }
    else {
        res.send("failure")
    }

})

// Answer 2
app.get("/:name", (req, res) => {
    var name = req.params.name;
    res.send(name.toUpperCase());
})

// answer 3
app.get("/", (req, res) => {
    let a = add.a(1, 2);
    let b = add.Division(6, 3)
    let c = add.Product(2, 3)
    let d = add.Subtraction(6, 3)
    res.send("addition: " + a + "substraction: " + b + "multiplication: " + c + "division: " + d);
})

app.listen(8000, (req, res, next) => {
    console.log('listening on');
})



//db.Listing.find({property_type:"House"}).limit(2)
<<<<<<< HEAD

// db.Listing.find({price:{$gt:500}},{"listing_url":1,"name":1,"host.host_name":1,"host.host_location":1,"reviews.reviewer_name":1,price:1}).limit(2)

=======
//db.Listing.find({price:{$gt:500}},{"listing_url":1,"name":1,"host.host_name":1,"host.host_location":1,"reviews.reviewer_name":1,price:1}).limit(2)

>>>>>>> f450bec8fda95610a3b8604d6005bc8634ac9d8c
//db.Listing.find({price:{$gt:600,$lt:900}}).limit(2)

//db.Listing.find({$and:[{"address.country":"Brazil"},{"review_scores.review_scores_rating":{$gt:9}}]}).limit(2)
