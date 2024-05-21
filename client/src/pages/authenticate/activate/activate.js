import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import axios for making HTTP requests
import "../login/login.css";

const ActivateAccount = () => {
  const [loading, setLoading] = useState(false);
  // Get the token from the URL params
  const { token } = useParams(); 

  // Function to handle account activation
  const handleActivation = async () => {
    setLoading(true); 
    try {
      // Send a POST request to the server to activate the account
      const response = await axios.post('http://localhost:5000/activate/Activate-account', { token });
      // If activation is successful, show success message
      toast.success(response.data.message);
    } catch (error) {
      // If there's an error, show error message
      toast.error(error.response.data.error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="signup-container">
      <div className="main-box">
        <div className="left-panel">
          <h1>Activate Your Account</h1>
        </div>
        <div className="right-panel">
        <p>Click the button below to verify and activate your account.</p>
          <Button variant="dark" onClick={handleActivation} disabled={loading}>
            {loading ? "Activating..." : "Activate Account"}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ActivateAccount;