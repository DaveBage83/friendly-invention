//load everything we need
var LocalStrategy = require('passport-local').Strategy;

// load user model
var User = require('./models/user');

// expose this function to our app with module.exports
module.exports = function(passport) {
// passport session setup for persistent logins

// used to serialize user for the session
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// used to deserialize user
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// LOCAL SIGNUP STRATEGY

passport.use('local-signup', new LocalStrategy){
	usernameField 	:'username', 
	passwordField 	: 'password',
	passReqToCallback: true 
},
function(req, username, password, done) {
// asynchronous
// user.findOne won't work unless data is sent back
	process.nextTick(function() {
		// find user whose username is same as on form
		// check to see if the user trying to log in already exists
	User.findOne({ 'local.username' : username }, function(err, user){
		// if errors return the error
	if(err)
		return done(err);
	// check to see if there's a user with that username already
	if (user) {
		return done(null, false, req.flash('signupMessage', 'That username is already in use'))
	} else {
		// if there is no user with the email
		// create new user
		var newUser		= User();

		// set user's ocal credentials
		newUser.local.username = username;
		newUser.local.password = newUser.generateHash(password);

		// save user
		newUser.save(function(err) {
			if(err)
				throw err;
			return done(null, newUser);
		});
	}
	});		
	});
};
};