var express         =       require("express"),
    router          =       express.Router({mergeParams: true}),
    Blog            =       require("../models/blog"),
    Comment         =       require("../models/comment"),
    middleware      =       require("../middleware"),
    moment          =       require('moment');

router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup blog using id
    Blog.findById(req.params.id, function(err, blog){
        if(err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.image = req.user.image;
                    comment.save();
                    // connect new comment to campground
                    blog.comments.push(comment);
                    blog.save();
                    var commentCreated = moment(comment.created).fromNow();
                    if(req.xhr){
                        res.json({comment: comment, commentCreated: commentCreated, blog: blog});
                    } else {
                    //     // redirect to campground show page
                        req.flash("success", "Successfully added comment");
                        res.redirect("/blogs/" + blog._id);
                    }
                }
            });
        }
    });
});

// comment update route
router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, {new: true}, function(err, updatedComment){
        if(err) {
            res.redirect("back");
        } else {
            if(req.xhr);
                res.json(updatedComment);
            // } else {
            // res.redirect("/blogs/" + req.params.id);
            // }
        }
    })
})

// comments destroy route
router.delete("/:comment_id", function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
        if(err) {
            res.redirect("back");
        } else {
            res.json(comment);
        }
    })
})

module.exports = router;