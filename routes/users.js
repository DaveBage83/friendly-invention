var express = require("express"),
	router = express.Router({mergeParams: true}),
	middleware = require("../middleware"),
	User = require("../models/user");

router.get("/edit-profile", function(req, res){
    res.render("./edit-profile");
});

module.exports = router;