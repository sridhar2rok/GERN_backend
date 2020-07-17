const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    machine: String,
    reporttype: String
});

module.exports = mongoose.model('Machine', authorSchema);
