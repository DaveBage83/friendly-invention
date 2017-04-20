var express         =       require("express"),
    router          =       express.Router(),
    passport        =       require("passport"),
    User            =       require("../models/user"),
    middleware      =       require("../middleware"),
    moment          =       require('moment');

const nodemailer    =       require("nodemailer");

// main
router.get("/", function(req, res){
    res.render("landing");
})

// reg
router.get("/register", function(req, res){
    res.render("register");
});

// signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, image: req.body.image, email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
    if(err){
        res.redirect("/blogs");
        console.log(err);
    } 
    passport.authenticate("local")(req, res, function(){
        res.redirect("/blogs");
    });
});
});

// login form
router.get("/login", function(req, res){
    res.render("login");
});

// login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login",
}));

// logout logic
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You are now logged out");
    res.redirect("/blogs");
});

// logout logic
router.get("/logout-land", function(req, res){
    req.logout();
    res.redirect("/");
});

// update profile form
router.get("/profile", function(req, res){
    res.render("profile")
})

// report comment
router.get("/report", function(req,res){
    res.render("report-comment")
})

// update user profile
router.post("/:user_id/update-user", function(req, res){
    User.findByIdAndUpdate(req.params.user_id,{$set:req.body}, function(err, result){
        if(err){
            console.log(err);
        }
        console.log("RESULT: " + result);
        res.redirect('/blogs')
    });
})

module.exports = router;