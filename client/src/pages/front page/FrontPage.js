

import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './FrontPage.css'; // Import your custom CSS file

const FrontPage = () => {
  return (
    <div className="frontpage-container">
      <div className="content">
        <h1>Empower Your Workforce with Seamless HR Solutions</h1>
        <h2>Welcome to our HRMS!</h2>
        <Link to="/login"> 
          <Button variant="dark">Explore</Button>
        </Link>
      </div>
    </div>
  );
};

export default FrontPage;
