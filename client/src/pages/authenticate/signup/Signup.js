import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Srcimage from '../signup/sign-up.png';
import './signup.css'; 

const Signup = () => {

  //creating a use state for signup form with Objects
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    buttonText: 'Sign Up'
  });

  //creating a use states for password strength 
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showStrength, setShowStrength] = useState(false);

  //function for onchange in password field
  const handlePasswordChange = async (event) => {
    const { value } = event.target;

    // Check password strength
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/   ;
    if (value === '') {
      setShowStrength(false);
    } else {
      setShowStrength(true);
      if (passwordRegex.test(value)) {
        setPasswordStrength('strong');
      } else if (value.length >= 6) {
        setPasswordStrength('medium');
      } else {
        setPasswordStrength('weak');
      }
    }

    setFormData({
      ...formData,
      password: value
    });
  };

  
  //function to  handle submit after clicking the submit function
  const handleSubmit = async (event) => {
    event.preventDefault();    
    setFormData({ ...formData, buttonText: 'Signing Up...' });
    try {
      const response = await fetch('http://localhost:5000/user/register' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });


      const result = await response.json();
      if(result.error === "true"){
        toast.error("Email is already in the Database")
      }

      console.log(result);
      console.log('Form submitted:', formData);
      
      setFormData({ ...formData, buttonText: 'Sign Up' });
      toast.success(result.message);
    } catch (error) {
      console.error(error.message);
      setFormData({ ...formData, buttonText: 'Sign Up' });
    } finally {
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        buttonText: 'Sign Up'
      });
      setShowStrength(false);
    }
  };

  return (
    <div>
      <ToastContainer /> 
      <div className="signup-container">
        <div className="main-box">
          <div className="left-panel">
            <h1>Sign Up</h1>
            <img src={Srcimage} alt="Signup" className="signup-image" />
          </div>
          <div className="right-panel">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicFirstName">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })} 
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicPhone">
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter Your Mobile Number"
                  value={formData.phone}
                  onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  required
                />
                <br />
                {showStrength && ( 
                  // Only show password strength when typing and not empty
                  <div className={`password-strength ${passwordStrength}`}>
                     {passwordStrength.toUpperCase()}
                  </div>
                )}
              </Form.Group>
              <br />
              <Button variant="dark" type="submit" className="btn btn-dark btn-sm" disabled={passwordStrength !== 'strong'}>
                {formData.buttonText}
              </Button>
            </Form>
            <div className="signup-link">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
