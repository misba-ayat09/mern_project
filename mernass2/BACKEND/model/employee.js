const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empSchema = new Schema({
    fullname: {type: String, required: true, min:[3]},
    email: {type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    position: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    dateOfJoining: {type: Date, required: true},
    salary: {type: Number, required: true}
})
module.exports = mongoose.model('Employee', empSchema);