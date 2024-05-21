import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';

import '../Reset Pass/reset.css';

const Reset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showStrength, setShowStrength] = useState(false); // State to control showing password strength
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('both passwords should be same');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/reset-password', {
        resetpass: token,
        newPassword: newPassword,
      });
      console.log(response.data); // Handle response from server
      toast.success("Password Changed Successfully");
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('Error resetting password');
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setShowStrength(true); // Show password strength only when typing
    // Evaluate password strength here
    const strength = evaluatePasswordStrength(password);
    setPasswordStrength(strength);
  };

  const evaluatePasswordStrength = (password) => {
    // Evaluate password strength logic here
    if (password.length < 8) {
      return 'weak';
    } else if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)) {
      return 'strong';
    } else {
      return 'medium';
    }
  };

  return (
    <div className="reset-container">
      <ToastContainer />  
      <h1>Reset Password</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
          {showStrength && newPassword !== '' && ( // Show password strength only when typing and not empty
            <div className={`password-strength ${passwordStrength}`}>
              {passwordStrength.toUpperCase()}
            </div>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Reset;
