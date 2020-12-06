var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware = require("../middleware");
const { render } = require("ejs");

var expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//INDEX ROUTE - Show all campgrounds
router.get("/", function(req,res){
    // Get all campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("pages/campgrounds/index", {campgrounds: allCampgrounds});
        };
    });
});

//NEW Route - Show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("pages/campgrounds/new", {currentUser: req.user});
});

//CREATE ROUTE - Add new campgrounds to DB
router.post("/", middleware.isLoggedIn, function(req,res){
    var newCampground = req.body.newCampground;
    newCampground.author = {
        id: req.user._id,
        username: req.user.username
    };

// //Create entries in the DB
    Campground.create(req.body.newCampground, function(err){
        if(err){
                console.log(err);
        } else{
            //redirect back to campgrounds page
            res.redirect("/index");
        };
    });
});

//SHOW ROUTE - Expands more detail regarding the ID
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        // console.log(foundCampground)
        if (err || !foundCampground){
            req.flash("error", "Campground Not Found");
            return res.redirect("/index");
        }
        res.render("pages/campgrounds/show", {campground: foundCampground});
    });
});

// EDIT ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnership, (req,res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("pages/campgrounds/edit", {campground: foundCampground});
    });    
});

// UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req,res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.newCampground, (err, foundCampground)=> {
        res.redirect("/index/" + req.params.id);
    })
});

// DELETE ROUTE: Delete Campground AND associated comments
router.delete("/:id", middleware.checkCampgroundOwnership, (req,res)=>{
    Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved)=> {
        if(err){
            console.log(err);
        } else {
            Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect("/index");
            });
        };
    });
});

module.exports = router;