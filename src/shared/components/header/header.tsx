import { NavLink } from 'react-router-dom';
import './header.scss';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';

export default function Header() {
  const [userName, setUserName] = useState('');

  const logOut = () => {
    store.dispatch({ type: 'LOGOUT' });
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('token');
  };

  useEffect(() => {
    const mail = window.localStorage.getItem('email');
    if (mail) {
      setUserName(mail);
    }
  }, []);

  const store = useStore();

  useEffect(() => {
    store.subscribe(() => {
      return setUserName(store.getState()['email']);
    });
    console.log(userName);
  }, [store]);

  return !userName ? (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src="/assets/img/argentBankLogo.png" alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <NavLink className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          &nbsp;Sign In
        </NavLink>
      </div>
    </nav>
  ) : (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src="/assets/img/argentBankLogo.png" alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <NavLink className="main-nav-item" to="./profile">
          <i className="fa fa-user-circle"></i>
          &nbsp;{userName.split('@')[0]}
        </NavLink>
        <NavLink onClick={logOut} className="main-nav-item" to="/">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </NavLink>
      </div>
    </nav>
  );
}
