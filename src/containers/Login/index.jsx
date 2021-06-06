import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL, LOCALSTORAGE } from '../../shared/constants';

export default function () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    /**
     * const email = e.target.email.value;
     * const password = e.target.password.value;
     */
    const { email: { value: email }, password: { value: password } } = e.target;
    axios.post(`${API_BASE_URL}auth/login`, { email, password })
      .then(res => {
        const { data: { data: { token } } } = res;
        setError('');
        console.log(res);
        localStorage.setItem(LOCALSTORAGE.TOKEN, token);
      })
      .catch(err => {
        const { response: { data: { message } } } = err;
        setError(message);
      }).finally(() => setLoading(false));
  }
  return (
    <>
      <div align="center">
        <form onSubmit={onSubmit}>
          <h1>Login Page</h1>
          <input type="email" name="email" placeholder="Enter email" required />
          <br /><br />
          <input type="password" name="password" placeholder="Enter password" required />
          <br /><br />
          <button>Login</button>
          {loading && <div>Loading ...</div>}
          {error && <div color="red">{error}</div>}
        </form>
      </div>
    </>
  )
}