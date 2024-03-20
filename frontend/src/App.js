import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


// connect to the default API address http://localhost:5001

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Facerecognization' element={<Facerecognization/>}/>
          {/* Admin routes */}
          <Route path='/Admin' element={<Ahome />} />
          <Route path='/AEvaluator' element={<AEvaluator/>} />
          <Route path='/Astudent' element={<Astudent/>}/>
          <Route path='/Aexam' element={<Aexam/>}/>
          <Route path='/Aadd' element={<Aadd/>}/>
          <Route path='/AaddQuestions' element={<AaddQuestions/>}/>
          {/* Student routes */}
          <Route path='/Student' element={<Shome />} />
          <Route path='/Exam' element={<Exam />} />
          {/* Evaluator routes */}
          <Route path='/Evaluator' element={<Ehome/>} />
          <Route path='/Eanswerbook' element={<Eanswerbook/>}/>
          
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
