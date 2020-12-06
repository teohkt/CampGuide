var mongoose = require("mongoose"),
    Campground = require("./models/campground");
    Comment = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest", 
        price: "5.49",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        author: { id: "5f5a7a89d841cb508f020144", username: '1' },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    
    },
    {
        name: "Desert Mesa", 
        price: "5.49",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        author: { id: "5f5a7a89d841cb508f020144", username: '1' },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor",
        price: "5.49", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        author: { id: "5f5a7a89d841cb508f020144", username: '1' },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

// var dataComments = [
//     {
//         text: "Comment 1",
//         author: "Person 1"
//     },
//     {
//         text: "Comment 2",
//         author: "Person 2"
//     },
//     {
//         text: "Comment 3",
//         author: "Person 3"
//     }
// ];

function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Removed Data")

            //Add campgrounds
            
            data.forEach((seed) => {
                Campground.create(seed, (err,campground) => {
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Adding Campground: " + seed.name);

            //             Comment.create(
            //                 {
            //                     text: "Comment Body",
            //                     author: "Comment Author"
            //                 }, (err, comment) => {
            //                     if(err){
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("Created new comment");
            //                     }
            //                 });

                    };
                });
            });




        };
    });
};


// create comments

module.exports = seedDB;