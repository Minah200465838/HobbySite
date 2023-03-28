const mongoose = require('mongoose');

// create schema for an category document
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Category is required',
        minlength : [1,'Name is empty'],
        maxlength : [50,'Name is too long']
    }
});

module.exports = mongoose.model('Category', categorySchema);