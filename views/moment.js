var Blog 		= 	require("./models/blog"),
	mongoose 	= 	require("mongoose");

exports.index = function(req, res) {
    Blog.find().exec(function(err, blogs){
        if (err) throw err;
        // send moment to your ejs
        res.render('index', { moment: moment, blogs: blogs });
    });
}