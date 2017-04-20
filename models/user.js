// load everything we need

var mongoose 				=			require('mongoose'),
	bcrypt					=			require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

	local 			: {
		username	: String, 
    	password	: String,
    	image		: String,
    	email		: String
	},

	facebook		: {
		id			: String,
		token		: String,
		email		: String,
		name		: String
	},

	twitter			: {
		id			: String,
		token		: String,
		displayName	: String,
		username	: String
	},

	google			: {
		id			: String,
		token		: String,
		email		: String,
		name 		: String
	}
});
   
// methods
// generating hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

// create user model and expose to app
module.exports = mongoose.model('User', userSchema);