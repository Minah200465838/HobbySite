const mongoose = require('mongoose');

//create schema for an hobby document
const hobbySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'name is required'
    },
    category: {
        type: String
        // required: 'Category is required'
    },
    review: {
        type: String,
        required: 'review is required'
    },
    recommandation: {
        type: String,
        required: 'recommandation is required'
    },
    referenceSite: {
        type: String
    },
    cost: {
        type: Number
    }
});

module.exports = mongoose.model('Hobby', hobbySchema);