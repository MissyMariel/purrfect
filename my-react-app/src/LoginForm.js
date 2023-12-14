// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';



const LoginForm = () => {
 const navigate = useNavigate();
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");

 const handleSubmit = (e) => {
  e.preventDefault();
  const hardcodedUsername = 'user';
  const hardcodedPassword = 'password';

  if (username === hardcodedUsername && password === hardcodedPassword) {
    navigate("/todo");
  } else {
    alert('Invalid username or password. Please try again.');
  }
 };

 return (
  <div className="login-wrapper">
    <h1>Please Log In</h1>
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
 );
};

export default LoginForm;
