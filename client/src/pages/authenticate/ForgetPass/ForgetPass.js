import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import './ForgetPass.css'; // Import your custom CSS file for ForgetPass styling

const ForgetPass = () => {

  //creating a useState for email and button action
  const [email, setEmail] = useState(''); 
  const [button, setButton]= useState("Get Mail")

  //function to handle email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButton("Loading ...")
    try {
      const response = await fetch('http://localhost:5000/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data.message);
      setButton("Get Mail")
      toast.success(data.message); // Display success toast

    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Failed to send password reset email'); // Display error toast
      setButton("Get Mail")
    }
    setEmail('');
  };

  return (
    <div className="forget-pass-container">
      <h2>Forgot Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" size="sm">
          {button}
        </Button>
      </Form>
      <ToastContainer /> {/* Add ToastContainer component here */}
    </div>
  );
};

export default ForgetPass;
