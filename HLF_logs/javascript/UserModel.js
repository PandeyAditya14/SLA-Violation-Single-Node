const Bcrypt = require('bcrypt');
const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
    username: String,
    password: String,
    email: String,
    type: Number,
})

UserSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});
UserSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};

module.exports = Mongoose.model('UserModel' , UserSchema);