import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './';

function Register() {
  let Navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/register', { username, password, role })
      .then((response) => {
        if (response.status === 200) {
          Navigate("/login");

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
      <Navbar />
      <div style={{ backgroundColor: 'lightcyan' }}>
        <div className="d-flex justify-content-center my-3">
          <div className="col-md-6">
            <h2>Register</h2>
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
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role:</label>
                <input
                  type="text"
                  id="role"
                  className="form-control"
                  placeholder='Eg: admin or user '
                  value={role}
                  onChange={handleRoleChange}
                  required
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;