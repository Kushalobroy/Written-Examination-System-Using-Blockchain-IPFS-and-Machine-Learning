// SubjectiveForm.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { Form} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubjectiveForm = ({examId}) => {
  const [questions, setQuestions] = useState([]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = (event) => {
    event.preventDefault();
    setQuestions([...questions, '']);
  };
  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  

    try {
      const response = await fetch('http://localhost:5000/api/admin/addQuestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          examId,
          questions
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          toast.success('Questions saved successfully!');

        } else {
          toast.error(`Failed to save questions: ${responseData.error}`);
        }
      } else {
        toast.error(`Failed to save questions: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error saving questions:', error);
      toast.error('Failed to save questions. Please try again.');
    }

  };

  return (
    <div>

      <Form onSubmit={handleSubmit}>
      <div className='container-fluid'>
      {questions.map((question, index) => (
        <div key={index}>
         
          <div class="row g-3 align-items-center mb-2">
            <div class="col-auto">
                <label for="inputPassword6" class="col-form-label fw-bold">Question {index + 1}:</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" value={question}
                        onChange={(event) => handleQuestionChange(index, event)} />
            </div>
            <div className='col-auto'>
                <button
                  type='button'
                  className='btn btn-outline-danger'
                  onClick={() => handleDeleteQuestion(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
        </div>
      ))}
      </div>
     <div className='btn-group'>
     <button onClick={handleAddQuestion} className='btn btn-warning btn-sm me-lg-3 me-md-3'><FontAwesomeIcon icon={faPlus} />  Add Question</button>
      <button type='submit' className='btn btn-primary btn-sm'>
        Save
      </button>
     </div>
      
      </Form>
    </div>
  );
};

export default SubjectiveForm;
