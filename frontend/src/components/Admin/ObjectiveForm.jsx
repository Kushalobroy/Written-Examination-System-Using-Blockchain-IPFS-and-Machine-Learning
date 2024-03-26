// ObjectiveForm.js

import React, { useState } from 'react';

const ObjectiveForm = () => {
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = parseInt(event.target.value);
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  return (
    <div>
   
      {questions.map((question, index) => (
        <div key={index} className='mb-2'>
            <div className='mb-2'>
                
                <input
              type="text"
              value={question.question}
              className='form-control'
              placeholder={`Question ${index + 1}`}
              onChange={(event) => handleQuestionChange(index, event)}
            />
            </div>
          
          <br />
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
                
             
               
                <input
                  type="text"
                  value={option}
                  className='form-control mb-1'
                  placeholder={`Option ${optionIndex + 1}`}
                  onChange={(event) => handleOptionChange(index, optionIndex, event)}
                />
            
            </div>
          ))}
          <label>
            Correct Answer:
            <select value={question.correctAnswer} onChange={(event) => handleCorrectAnswerChange(index, event)} className='form-select'>
              {question.options.map((option, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
      <button onClick={handleAddQuestion} className='btn btn-warning'>Add Question</button>
    </div>
  );
};

export default ObjectiveForm;
