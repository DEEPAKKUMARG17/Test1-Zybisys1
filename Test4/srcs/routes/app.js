
const passport = require("passport");
const passportauthentication=require("../controller/Passportauthentication");
const express = require("express");
const router=express.Router();
 router.get('/',passportauthentication.mainpage)
router.post('/register',passportauthentication.register);
router.get('/login',passportauthentication.login);
router.post("/login",passportauthentication.loggedin)
router.get("/logout",passportauthentication.logout);

module.exports=router;