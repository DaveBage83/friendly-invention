var express         =       require("express"),
    router          =       express.Router(),
    passport        =       require("passport"),
    Blog            =       require("../models/blog"),
    middleware      =       require("../middleware"),
    moment          =       require("moment");
    

// Home route
router.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});    
    
    
// new blog form
router.get("/new", function(req, res){
    res.render("new");
});

// show route
router.get("/:id", function(req, res){
    // find blog
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            if(req.xhr){
                res.json(foundBlog);
            } else {
            res.render("show", {blog:foundBlog});
        }
    }
    });
});

// create route
router.post("/", function(req, res){
    // create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    req.body.blog.author = author;
    Blog.create(req.body.blog, function(err, newBlog){
        if(err) {
            res.render("new");
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});

// edit route
router.get("/:id/edit", middleware.checkBlogOwnership, function(req, res){
    // find blog
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// update route
router.put("/:id", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err) {
            res.redirect("/");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// delete route
router.delete("/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, req.body.blog, function(err, deleteBlog){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

module.exports = router;