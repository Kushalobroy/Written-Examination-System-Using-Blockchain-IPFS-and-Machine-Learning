
import React, { useState } from "react";
import Sidebar from "./sidebar"
function Asetting() {
    const[toggle, setToggle] = useState(true)
  const Toggle = () =>{
    setToggle(!toggle)
  }
  return (
    <div>
      <div className="container-fluid min-vh-100" style={{backgroundColor:'limegreen'}}>
      
      <div className="row">
          {toggle && <div className="col-4 col-md-2  bg-white vh-100 position-fixed">
          <Sidebar />
          </div>}
         {toggle && <div className="col-4 col-md-2"></div>}
          <div className="col">
            
            
          </div>
      </div>
    </div>   
    </div>
  )
}

export default Asetting
