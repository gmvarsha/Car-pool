import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './';

function LoginForm() {
  let Navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/login', { username, password })
      .then((response) => {
        if (response.status === 200) {
          if (response.data[0].role === 'admin' || response.data[0].role === 'Admin') {
            Navigate("/requestsList");
          }
          else {
            Navigate("/rides", { state: response.data[0] });
            // Navigate("/ridesList", { state: response.data[0] });

          }
        }
        console.log(response);

      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorMessage(error.response.data);
      });
  };

  return (
    <div >
      <Navbar/>
   <div style={{backgroundColor:'lightcyan' }}>
    <div className="d-flex justify-content-center my-3">
      <div className="col-md-6">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
    </div>
    </div>
  );
}
export default LoginForm;


