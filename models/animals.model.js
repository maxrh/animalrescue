const { Schema, model, SchemaTypes } = require('mongoose');

const AnimalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    colors: {
        type: Array,
        required: true
    },
    adopted: {
        type: Boolean,
        required: false
    }
});

module.exports = model('Animal', AnimalSchema);