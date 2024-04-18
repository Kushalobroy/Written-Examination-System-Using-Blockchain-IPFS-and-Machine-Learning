import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Facerecognization from './components/Facerecognization';
import Ahome from "./components/Admin/Ahome";
import Ehome from "./components/Evaluator/Ehome";
import Shome from "./components//Student/Shome";
import Exam from "./components//Student/Exam";
import Home from "./Home";
import AEvaluator from "./components/Admin/AEvaluator"
import Astudent from './components/Admin/Astudent';
import Aexam from './components/Admin/Aexam';
import Aadd from './components/Admin/Aadd';
import AaddQuestions from './components/Admin/AaddQuestions';

import Eanswerbook from './components/Evaluator/Eanswerbook';
import Asetting from './components/Admin/Asetting';
import NotFound from './components/NotFound';
import PageLoader from './components/PageLoader';


// connect to the default API address http://localhost:5001

function App() {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  console.log(userData);
  // Check if user data exists and user role is admin
  const isAdmin = userData && userData.role === 'admin';
  const isEvaluator = userData && userData.role === 'evaluator';
  const isStudent = userData && userData.role === 'student';

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStartLoading = () => {
      setLoading(true);
    };

    const handleStopLoading = () => {
      setLoading(false);
    };

    const cleanup = () => {
      // Remove listeners when component unmounts
      window.removeEventListener('beforeunload', handleStartLoading);
      window.removeEventListener('load', handleStopLoading);
    };

    window.addEventListener('beforeunload', handleStartLoading);
    window.addEventListener('load', handleStopLoading);

    return cleanup;
  }, []);
  return (
    <div className="App">
      <Router>
      <PageLoader loading={loading} />

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Facerecognization' element={<Facerecognization/>}/>
          {/* Admin routes */}
          {isAdmin && <Route path='/Admin' element={<Ahome />} />}
          {isAdmin && <Route path='/AEvaluator' element={<AEvaluator/>} />}
          {isAdmin && <Route path='/Astudent' element={<Astudent/>}/>}
          {isAdmin && <Route path='/Aexam' element={<Aexam/>}/>}
          {isAdmin && <Route path='/Aadd' element={<Aadd/>}/>}
          {isAdmin && <Route path='/AaddQuestions' element={<AaddQuestions/>}/>}
          {isAdmin && <Route path='/Asetting' element={<Asetting/>}/>}
          
          {/* Student routes */}
          {isStudent && <Route path='/Student' element={<Shome />} />}
          {isStudent && <Route path='/Exam' element={<Exam />} />}
          
          {/* Evaluator routes */}
          {isEvaluator && <Route path='/Evaluator' element={<Ehome/>} />}
          {isEvaluator && <Route path='/Eanswerbook' element={<Eanswerbook/>}/>}
          
          {/* 404 Not Found route */}
          <Route path='/' element={<Home/>} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
