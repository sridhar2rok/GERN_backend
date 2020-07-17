const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    Tree_name: String,
    data_element: String,
    Description: String,
    format: String,
    length: String,
    example: String,
    authorId: String
});

module.exports = mongoose.model('Spec', bookSchema);
