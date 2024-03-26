import React from 'react';


const PageLoader = ({ loading }) => {
  return (
    loading && (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  );
};
  
  export default PageLoader;
  