var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err || !foundCampground) {
                req.flash("error", "Campground Not Found");
                res.redirect("back");
            } else {
                 //Does the user own the campground
                 if(foundCampground.author.id.equals(req.user._id)){
                     next();
                 } else {
                     console.log("You do not have permission to do that");
                     req.flash("error", "You Do Not Own Campground");
                     res.redirect("back");
                 };
            };
        });    
    } else {
        console.log("not logged in");
        req.flash("error", "Please Login First");
        res.redirect("back");
    };
};

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err || !foundComment) {
                console.log("cannot find comment");
                req.flash("error", "Comment Not Found");
                res.redirect("back");
            } else {
                 //Does the user own the campground
                 if(foundComment.author.id.equals(req.user._id)){
                     next();
                 } else {
                     console.log("you do not own the comment");
                     req.flash("error", "You Do Not Own Comment");
                     res.redirect("back");
                 };
            };
        });    
    } else {
        console.log("not logged in");
        req.flash("error", "Please Login");
        res.redirect("back");
    };
};


module.exports = middlewareObj;