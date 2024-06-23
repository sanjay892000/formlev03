import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormValidation from './FormValidation';
import Modal from './Modal';
import '../styles/survey.css';

const initialState = {
  fullName: '',
  email: '',
  surveyTopic: '',
  favoriteProgrammingLanguage: '',
  yearsOfExperience: '',
  exerciseFrequency: '',
  dietPreference: '',
  highestQualification: '',
  fieldOfStudy: '',
  feedback: '',
};

const validate = (values) => {
  let errors = {};

  if (!values.fullName) errors.fullName = "Full Name is required";
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }
  if (!values.surveyTopic) errors.surveyTopic = "Survey Topic is required";

  if (values.surveyTopic === 'Technology') {
    if (!values.favoriteProgrammingLanguage) errors.favoriteProgrammingLanguage = "Favorite Programming Language is required";
    if (!values.yearsOfExperience || values.yearsOfExperience <= 0) errors.yearsOfExperience = "Years of Experience must be greater than 0";
  }

  if (values.surveyTopic === 'Health') {
    if (!values.exerciseFrequency) errors.exerciseFrequency = "Exercise Frequency is required";
    if (!values.dietPreference) errors.dietPreference = "Diet Preference is required";
  }

  if (values.surveyTopic === 'Education') {
    if (!values.highestQualification) errors.highestQualification = "Highest Qualification is required";
    if (!values.fieldOfStudy) errors.fieldOfStudy = "Field of Study is required";
  }

  if (!values.feedback || values.feedback.length < 50) {
    errors.feedback = "Feedback must be at least 50 characters";
  }

  return errors;
};

const Surveyform = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = FormValidation(initialState, validate);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  console.log(submitted)
  useEffect(() => {
    if (values.surveyTopic) {
      // Fetch additional questions based on the selected survey topic
      axios.get(`https://api.example.com/survey/${values.surveyTopic}`)
        .then(response => {
          setAdditionalQuestions(response.data.questions);
        })
        .catch(error => {
          console.error("Error fetching additional questions", error);
        });
    }
  }, [values.surveyTopic]);

  const handleFormSubmit = (event) => {
    const isValid = handleSubmit(event);
    if (isValid) {
      setSubmitted(true);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1>Survey Form</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Survey Topic:</label>
          <select name="surveyTopic" value={values.surveyTopic} onChange={handleChange}>
            <option style={{color:"black"}} value="">Select a topic</option>
            <option style={{color:"black"}} value="Technology">Technology</option>
            <option style={{color:"black"}} value="Health">Health</option>
            <option style={{color:"black"}} value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p className="error">{errors.surveyTopic}</p>}
        </div>

        {values.surveyTopic === 'Technology' && (
          <div>
            <div>
              <label>Favorite Programming Language:</label>
              <select name="favoriteProgrammingLanguage" value={values.favoriteProgrammingLanguage} onChange={handleChange}>
                <option style={{color:"black"}} value="">Select a language</option>
                <option style={{color:"black"}} value="JavaScript">JavaScript</option>
                <option style={{color:"black"}} value="Python">Python</option>
                <option style={{color:"black"}} value="Java">Java</option>
                <option style={{color:"black"}} value="C#">C#</option>
              </select>
              {errors.favoriteProgrammingLanguage && <p className="error">{errors.favoriteProgrammingLanguage}</p>}
            </div>

            <div>
              <label>Years of Experience:</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={values.yearsOfExperience}
                onChange={handleChange}
              />
              {errors.yearsOfExperience && <p className="error">{errors.yearsOfExperience}</p>}
            </div>
          </div>
        )}

        {values.surveyTopic === 'Health' && (
          <div>
            <div>
              <label>Exercise Frequency:</label>
              <select name="exerciseFrequency" value={values.exerciseFrequency} onChange={handleChange}>
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && <p className="error">{errors.exerciseFrequency}</p>}
            </div>

            <div>
              <label>Diet Preference:</label>
              <select name="dietPreference" value={values.dietPreference} onChange={handleChange}>
                <option value="">Select diet preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && <p className="error">{errors.dietPreference}</p>}
            </div>
          </div>
        )}

        {values.surveyTopic === 'Education' && (
          <div>
            <div>
              <label>Highest Qualification:</label>
              <select name="highestQualification" value={values.highestQualification} onChange={handleChange}>
                <option value="">Select qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && <p className="error">{errors.highestQualification}</p>}
            </div>

            <div>
              <label>Field of Study:</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={values.fieldOfStudy}
                onChange={handleChange}
              />
              {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy}</p>}
            </div>
          </div>
        )}

        <div>
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={values.feedback}
            onChange={handleChange}
          ></textarea>
          {errors.feedback && <p className="error">{errors.feedback}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      <Modal show={showModal} handleClose={handleCloseModal}>
        <h2>Form Summary</h2>
        <p>Full Name: {values.fullName}</p>
        <p>Email: {values.email}</p>
        <p>Survey Topic: {values.surveyTopic}</p>
        {values.surveyTopic === 'Technology' && (
          <>
            <p>Favorite Programming Language: {values.favoriteProgrammingLanguage}</p>
            <p>Years of Experience: {values.yearsOfExperience}</p>
          </>
        )}
        {values.surveyTopic === 'Health' && (
          <>
            <p>Exercise Frequency: {values.exerciseFrequency}</p>
            <p>Diet Preference: {values.dietPreference}</p>
          </>
        )}
        {values.surveyTopic === 'Education' && (
          <>
            <p>Highest Qualification: {values.highestQualification}</p>
            <p>Field of Study: {values.fieldOfStudy}</p>
          </>
        )}
        <p>Feedback: {values.feedback}</p>
        {additionalQuestions.length > 0 && (
          <div>
            <h3>Additional Questions:</h3>
            {additionalQuestions.map((question, index) => (
              <p key={index}>{question}</p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Surveyform;
