import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Spinner from 'react-bootstrap/Spinner';

const PageLoader = () => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 3000); // Simulate a 3-second loading time
      return () => clearTimeout(timer);
    }, []);
  
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
  
    return (
      <div className="page-loader">
        <Spinner color="#36D7B7" loading={loading} css={override} size={150} />
      </div>
    );
  };
  
  export default PageLoader;
  