const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

// user model
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
    // password schema ,mongoose khud se bana deta hai
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
