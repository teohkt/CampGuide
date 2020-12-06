var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// Landing Page
router.get("/", function(req,res){
    res.render("pages/landing");
    // res.render('/index')
});

// Sign Up Route
router.get("/signup", (req,res)=>{
    res.render("pages/userInfo/signUp");
});

// Handling Sign up
router.post("/signup", (req,res)=>{
    User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
        if(err){
            req.flash("error", err.message);
            return res.redirect("/signUp");
        }
        passport.authenticate("local")(req, res, ()=> {
            req.flash("success", "Welcome to YelpCamp" + user.username);
            res.redirect("/index");
        });
    });
});

// Login Route
router.get("/login", (req,res)=>{
    res.render("pages/userInfo/login", {message: req.flash("error")});
});

router.post("/login", 
    passport.authenticate("local", {failureRedirect: "/login"}),
    function(req,res){
        req.flash("success", "Welcome Back " + req.body.username);
        res.redirect("/index");
    }
);

// Logout Route
router.get("/logout", (req,res)=>{
    req.logout();
    req.flash("success", "Successfully Logged Out");
    res.redirect("/");
});

module.exports = router;