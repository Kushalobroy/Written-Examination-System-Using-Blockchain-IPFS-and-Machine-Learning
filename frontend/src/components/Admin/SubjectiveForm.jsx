// SubjectiveForm.js

import React, { useState } from 'react';

const SubjectiveForm = () => {
  const [questions, setQuestions] = useState([]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  return (
    <div>
      <div className='container-fluid'>
      {questions.map((question, index) => (
        <div key={index}>
         
          <div class="row g-3 align-items-center mb-2">
            <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">Question {index + 1}:</label>
            </div>
            <div class="col-auto">
                <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" value={question}
                        onChange={(event) => handleQuestionChange(index, event)} />
            </div>
            </div>
        </div>
      ))}
      </div>
     
      <button onClick={handleAddQuestion} className='btn btn-warning'>Add Question</button>
    </div>
  );
};

export default SubjectiveForm;
