const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id: this._id, name: this.name }, 'PrivateKey');
    return token
}
const User = mongoose.model('User', userSchema);
module.exports = User;