import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Ahome from "./Admin/Ahome";
import Ehome from "./Evaluator/Ehome";
import Shome from "./Student/Shome";
import Exam from "./Student/Exam";
import Home from "./Home";
import AEvaluator from "../src/Admin/AEvaluator"
import Astudent from './Admin/Astudent';
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Admin' element={<Ahome />} />
          <Route path='/AEvaluator' element={<AEvaluator/>} />
          <Route path='/Astudent' element={<Astudent/>}/>

          <Route path='/Student' element={<Shome />} />
          <Route path='/Exam' element={<Exam />} />
          
          <Route path='/Evaluator' element={<Ehome/>} />
          
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
