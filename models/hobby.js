const mongoose = require('mongoose');

//create schema for an hobby document
const hobbySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Hobby name is required'
    },
    review: {
        type: String,
        required: 'Review is required'
    },
    recommandation: {
        type: String,
        required: 'Recommandation staus is required'
    },
    referenceSite: {
        type: String
    },
    cost: {
        type: Number
    }
});

module.exports = mongoose.model('Hobby', hobbySchema);