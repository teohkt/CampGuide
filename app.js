var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    User            =require("./models/user"),
    expressSanitizer = require("express-sanitizer"),
    flash   = require("connect-flash"),
    methodOverride = require("method-override")

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

// Fix depreciationWarnings and connect to MongoDB Atlas
mongoose.connect("mongodb+srv://KelvinTeoh:Superk1992!@cluster0.1he7w.azure.mongodb.net/yelp_camp?retryWrites=true&w=majority",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    }
);

// const url = process.env.DATABASEURL || "mongodb://localhost/yelpTest"
// mongoose.connect(url, 
//     {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//     }
// );

// Seeding Database
// seedDB();

//Allow for the adding of ejs to file suffix
app.set("view engine", "ejs");

//Makes the json layout easier to read
app.use(bodyParser.urlencoded({extended: true}));

//Custom CSS sheet
app.use(express.static(__dirname + "/public"));

//Allows for delete and put methods
app.use(methodOverride("_method"));

//For the use of temporary flash messages
app.use(flash());

// Token for decryption
app.use(require("express-session")({
    secret: "The secred token for entry",
    resave: false,
    saveUninitialized: false
}));

// Setting up passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/index", campgroundRoutes);
app.use("/index/:id/comments", commentRoutes);

// var campgrounds = [
//     {name:"Salmon Creek", image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80"},
//     {name:"Granite Hills", image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=949&q=80"},
//     {name:"Whirlpool Saga", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
//     {name:"Timber Timber", image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
//     {name:"Further Hut", image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
//     {name:"Rolling Tree", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}
// ];


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`YelpCamp connected on port ${ PORT }`);
});