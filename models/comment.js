var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    text: String,
    created: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        image: String
        }
    });

module.exports = mongoose.model("Comment", commentSchema);