const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({  //'new mongoose.Schema' likho ya 'new Schema' likho
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    surveyTopic: {
        type: String,
        required: true,
        enum: ['Technology', 'Health', 'Education']
    },
    favoriteProgrammingLanguage: {
        type: String,
        enum: ['JavaScript', 'Python', 'Java', 'C#'],
        default: ''
    },
    yearsOfExperience: {
        type: Number,
        min: 0,
        default: null
    },
    exerciseFrequency: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Rarely'],
        default: ''
    },
    dietPreference: {
        type: String,
        enum: ['Vegetarian', 'Vegan', 'Non-Vegetarian'],
        default: ''
    },
    highestQualification: {
        type: String,
        enum: ['High School', "Bachelor's", "Master's", 'PhD'],
        default: ''
    },
    fieldOfStudy: {
        type: String,
        trim: true,
        default: ''
    },
    feedback: {
        type: String,
        required: true,
        minlength: 50
    }
}, { timestamps: true },

    {
        versionKey: false
    });

module.exports = mongoose.model("survey", SurveySchema);