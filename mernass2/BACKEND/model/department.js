const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptSchema = new Schema({
    name: {type: String, required: true, min:[3]}
})

module.exports = mongoose.model('Department', deptSchema);