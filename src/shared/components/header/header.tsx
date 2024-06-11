import { NavLink } from 'react-router-dom';
import './header.scss';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import useLogin from '../../custom-hooks/useLogin.tsx';
import { UserModel } from '../../../app/store/user.model.ts';

export default function Header() {
  const [user, setUser] = useState({} as UserModel);
  const [token, setToken] = useState<string | null>(window.localStorage.getItem('token') || null);

  const logOut = () => {
    store.dispatch({ type: 'LOGOUT' });
    const items = ['email', 'token', 'firstName', 'lastName', 'id'];
    items.forEach(item => {
      window.localStorage.removeItem(item);
    });
  };

  const { getUser } = useLogin();

  const store = useStore();

  useEffect(() => {
    store.subscribe(() => setToken(store.getState()['token']));
    if (token) {
      getUser(token, false).then(isUserConnected => {
        if (isUserConnected) setUser(store.getState());
      });
    } else {
      store.subscribe(() => setUser(store.getState()));
    }
  }, [store, token]);

  return !user.id ? (
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
          &nbsp;{user.firstName}&nbsp;
        </NavLink>
        <NavLink onClick={logOut} className="main-nav-item" to="/">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </NavLink>
      </div>
    </nav>
  );
}
