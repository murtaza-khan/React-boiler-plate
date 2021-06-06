import React, { useState } from 'react';
import Header from '../Header';
import Register from '../../containers/Register';
import Login from '../../containers/Login';

function App() {
  const [page, setPage] = useState('login');


  return (
    <>
      <Header setPage={setPage} />
      { page === 'login' && <Login />}
      { page === 'register' && <Register />}
    </>
  );
}

export default App;
