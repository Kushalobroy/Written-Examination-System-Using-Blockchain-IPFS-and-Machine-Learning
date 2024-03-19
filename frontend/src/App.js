import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Facerecognization from './components/Facerecognization';
import Ahome from "./Admin/Ahome";
import Ehome from "./Evaluator/Ehome";
import Shome from "./Student/Shome";
import Exam from "./Student/Exam";
import Home from "./Home";
import AEvaluator from "../src/Admin/AEvaluator"
import Astudent from './Admin/Astudent';
import Aexam from './Admin/Aexam';
import Aadd from './Admin/Aadd';
import AaddQuestions from './Admin/AaddQuestions';

import Eanswerbook from './Evaluator/Eanswerbook';


// connect to the default API address http://localhost:5001

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Facerecognization' element={<Facerecognization/>}/>
          
          <Route path='/Admin' element={<Ahome />} />
          <Route path='/AEvaluator' element={<AEvaluator/>} />
          <Route path='/Astudent' element={<Astudent/>}/>
          <Route path='/Aexam' element={<Aexam/>}/>
          <Route path='/Aadd' element={<Aadd/>}/>
          <Route path='/AaddQuestions' element={<AaddQuestions/>}/>
          
          <Route path='/Student' element={<Shome />} />
          <Route path='/Exam' element={<Exam />} />
          
          <Route path='/Evaluator' element={<Ehome/>} />
          <Route path='/Eanswerbook' element={<Eanswerbook/>}/>
          
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
