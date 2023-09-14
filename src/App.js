import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Ahome from "./Admin/Ahome";
import Ehome from "./Evaluator/Ehome";
import Shome from "./Student/Shome";
import Home from "./Home";
import AEvaluator from "../src/Admin/AEvaluator"
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Admin' element={<Ahome />} />
          <Route path='/Student' element={<Shome />} />
          <Route path='/Evaluator' element={<Ehome/>} />
          <Route path='/AEvaluator' element={<AEvaluator/>} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
