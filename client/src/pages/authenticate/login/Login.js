import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";
import loginImage from "../login/login.jpg";
import ReCAPTCHA from "react-google-recaptcha" 

//ReCaptcha Site Key : 6LfU_NYpAAAAAHDzo7UWmJQ3YktbEX6SLRgEenzh

const Login = () => {
  const navigate = useNavigate();

  //creating a useState for login form with Objects
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // creating usestate for setting a RECAPTCHA
  const [captchaValue, setcaptchaValue]= useState(null)

  //function for handling the submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log(result);
      console.log('Form submitted:', formData);
      
      if (response.ok) {

        // Login successful, navigate to dashboard
        navigate("/dashboard");
      } else {

        // Login failed, stay on the login page
        toast.error ("Login failed. Please check your credentials.");
        setFormData({
          //setting the form values to null after Submitting the form
          email: '',
          password: ''
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  

  return (
    <div className="signup-container">
      <div className="main-box">
        <div className="left-panel">
          <h1>Welcome Back</h1>
          <img src={loginImage} alt="Login" className="login-image" />
        </div>
        <div className="right-panel">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <br />
            <div style={{ display: 'inline-block', marginLeft: '-10px' }}>
            <ReCAPTCHA
            sitekey='6LfU_NYpAAAAAHDzo7UWmJQ3YktbEX6SLRgEenzh'
            onChange={val => setcaptchaValue(val)}
            style={{ transform: 'scale(0.8)' }} 
            />
            </div>
            <Button disabled={!captchaValue}variant="dark" type="submit" className="btn btn-dark btn-sm">
              Login
            </Button>
          </Form>
          <div className="signup-link ">
            <Link to="/forgetpass" className='btn '>Forget Password</Link>
          </div>
          <div className="signup-link">
            New to our Site? <Link to="/register" >Sign Up Here</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
