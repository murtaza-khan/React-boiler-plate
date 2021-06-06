import React from 'react';

const Header = function ({ setPage }) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <button onClick={() => setPage('login')}>Login</button>
          </li>
          <li>
            <button onClick={() => setPage('register')}>Register</button>
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default Header;