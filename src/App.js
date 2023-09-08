import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Ahome from "./Admin/Ahome";
import Ehome from "./Evaluator/Ehome";
import Shome from "./Student/Shome";


function App() {

  return (
    <div className="App">
<Router>
        <Routes>

          <Route path='/Admin' element={<Ahome />} />
          <Route path='/Student' element={<Shome />} />
          <Route path='/Evaluator' element={<Ehome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
