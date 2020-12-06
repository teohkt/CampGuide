var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var comments = require("../models/comment");
var middleware = require("../middleware");


// Create New Comment
router.get("/new", middleware.isLoggedIn, (req,res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        } else {
            res.render("pages/comments/new", {campground: campground});
        };
    });
});

// Post new Comment
router.post("/", middleware.isLoggedIn, (req, res) => {
    //lookup campground using ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            // Create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    res.redirect("back")
                } else {
                    // Connect comment to campground
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;

                    comment.save();
                    campground.comments.push(comment);
                    campground.save();

                    res.redirect("/index/" + campground._id);
                };
            });
        };
    });
});


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req,res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        } else {
            res.render("pages/comments/edit", {campground_id: req.params.id, comment: foundComment});
        };
    });    
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id/", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.newComment, (err, foundComment)=> {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/" + req.params.id);
        };
    });
});

// DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res)=> {
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/" + req.params.id);
        }
    });
});

module.exports = router;



