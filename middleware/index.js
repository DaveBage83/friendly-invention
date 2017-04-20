var middlewareObj       =           {},
    Blog                =           require("../models/blog"),
    Comment             =           require("../models/comment");

// =================================================================
// MIDDLEWARE TO CHECK BLOG OWENERSHIP
// =================================================================

middlewareObj.checkBlogOwnership = function(req, res, next){
    // check if user logged in
    if(req.isAuthenticated()){
        // find specific blog
        Blog.findById(req.params.id, function(err, foundBlog){
        // if blog not found
            if(err){
                req.flash("error", "Blog does not exist");
                res.redirect("back");
        // if found, check if it belongs to current user
            } else {
                if(foundBlog.author.id.equals(req.user._id)){
        // if it does then proceed
                    next();
        // if not then throw error
                } else {
                    req.flash("error", "Sorry you are not authorised to edit this blog");
                    res.redirect("back");
                }   
            }
        });
        // if user not logged in then throw error
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/blogs");
    }
}


// =================================================================
// MIDDLEWARE TO CHECK IF USER IS LOGGED IN
// =================================================================

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please log in");
    res.redirect("/login");
}

// expose middlewareObj to app
module.exports = middlewareObj
