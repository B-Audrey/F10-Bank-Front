import { NavLink } from 'react-router-dom';
import './header.scss';
import { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import useLogin from '../../custom-hooks/useLogin.tsx';
import { UserModel } from '../../../app/store/user.model.ts';
import { getFirstName } from '../../../app/store/user-selectors.ts';

export default function Header() {
  const [user, setUser] = useState({} as UserModel);
  const [token, setToken] = useState<string | null>(window.localStorage.getItem('token') || null);
  const store = useStore();
  const firstName = useSelector(getFirstName);
  const { getUser } = useLogin();

  // dispatch logout action, remove values from localstorage and from local state
  const logOut = () => {
    store.dispatch({ type: 'LOGOUT' });
    const items = ['email', 'token', 'firstName', 'lastName', 'id'];
    items.forEach(item => {
      window.localStorage.removeItem(item);
    });
    setUser({} as UserModel);
  };

  // subscribe to token from store, if token is present, get the user and set it in the local state
  // if no token, subscribe to the store to get the user when it arrives
  useEffect(() => {
    store.subscribe(() => setToken(store.getState()['token']));
    if (token) {
      getUser(token, false)
        .then(isUserConnected => {
          if (isUserConnected) {
            setUser(store.getState());
          }
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
          <span className={'header-text'}>&nbsp;Sign In</span>
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
          <span className={'header-text'}>&nbsp;{firstName}&nbsp;</span>
        </NavLink>
        <NavLink onClick={logOut} className="main-nav-item" to="/">
          <i className="fa fa-sign-out"></i>
          <span className={"header-text"}>Sign Out</span>
        </NavLink>
      </div>
    </nav>
  );
}
