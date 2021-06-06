import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../shared/constants';

export default function () {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const {
      name: { value: name },
      email: { value: email },
      password: { value: password },
      confirmPassword: { value: confirmPassword } } = e.target;

    if (password !== confirmPassword) {
      return setErrors({ confirmPassword: 'Passwords donot match' });
    }
    axios.post(`${API_BASE_URL}auth/register`, { name, email, password, confirmPassword })
      .then(res => {
        const { data } = res;
        const { statusCode, message } = data || {};
        if (statusCode === 200) {
          setSuccess(message);
        }
      }).catch(res => {
        const { response: { data: { message } } } = res;
        setErrors({ email: message });
      }).finally(() => setLoading(false));
    return setErrors({});
  }

  return (
    <>
      <div align="center">
        <form name="registerForm" onSubmit={onFormSubmit}>
          <h1>Register Page</h1>
          <input type="text" name="name" placeholder="Enter name" required />
          <br /><br />
          <input type="email" name="email" placeholder="Enter email" required />
          <br /><font color="red">{errors['email']}</font>
          <br />
          <input type="password" name="password" placeholder="Enter password" required />
          <br /><br />
          <input type="password" name="confirmPassword" placeholder="Confirm password" required />
          <br /><font color="red">{errors['confirmPassword']}</font>
          <br />
          <button>Register</button>
          {loading && <div>Loading...</div>}
          {success && <div>{success}</div>}
        </form>
      </div>
    </>
  )
}