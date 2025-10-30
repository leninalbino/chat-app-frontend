import React, { useState } from 'react';
import { login } from '../services/api';

const Login = ({ onLoginSuccess }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      setError(null);
      login(usernameInput)
        .then(onLoginSuccess)
        .catch(err => {
          setError(err.message);
          console.error("Login failed:", err);
        });
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-10 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center">Join Chat</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label visually-hidden">Username</label>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
