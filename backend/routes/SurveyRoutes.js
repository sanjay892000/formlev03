const express = require('express');
const router = express.Router();
const SurveySchema = require('../schema/surveySchema');

// import the express validator to enter the valid value by the user
const { validationResult } = require('express-validator');

//Router 1: Add survey using: POST
router.post('/submit', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { FullName, email, surveyTopic, favoriteProgrammingLanguage, yearsOfExperience, exerciseFrequency, dietPreference, highestQualification, fieldOfStudy, feedback } = req.body;
        const survey = new SurveySchema({
            FullName, email, surveyTopic, favoriteProgrammingLanguage, yearsOfExperience, exerciseFrequency, dietPreference, highestQualification, fieldOfStudy, feedback
        });
        const surveyUser = await survey.save();
        res.json(surveyUser);
    } catch (error) {
      console.log(error)
    }
})

//Router 2: Get all survey using: GET
router.get('/getform', async (req, res) => {
    try {
        const survey = await SurveySchema.find({ });
        res.json(survey);
    } catch (error) {
        console.log(error.massage);
        return res.status(400).send("there are server error")
    }

})
module.exports = router;