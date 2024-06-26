import './login.scss';
import { useEffect, useState } from 'react';
import useLogin from '../../../shared/custom-hooks/useLogin.tsx';
import { User } from '../../../shared/interfaces/user.ts';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../shared/components/loader/loader.tsx';
import { hasNoSpecialChars, hasNotOnlySpaces, isNotEmpty, isNotTooLong } from '../../../shared/utils/string-utils.ts';
import Toast from '../../../shared/components/toast/toast.tsx';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
      const validateString = (str: string) => {
        return (
          isNotTooLong(str, 20) &&
          isNotEmpty(str) &&
          hasNoSpecialChars(str) &&
          hasNotOnlySpaces(str)
        );
      };
      setIsSubmitDisabled((!validateString(username) || !isNotEmpty(password)));
    },
    [username, password]);



  // on submit, get the user and password and send it to the login function.
  // if the login is successful, navigate to the profile page.
  // else, alert the user that the connection is impossible.
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsError(false);
    if (!isNotTooLong(username, 20) || !isNotEmpty(username) || !hasNoSpecialChars(username) || !hasNotOnlySpaces(username)) {
      return;
    }
    if (!isNotTooLong(password, 20) || !isNotEmpty(password) || !hasNoSpecialChars(password) || !hasNotOnlySpaces(password)) {
      return;
    }
    const userToLogin = { email: username, password } as User;
    login(userToLogin, rememberMe)
      .then(isLogged => {
        if (isLogged) {
          navigate('/profile');
        } else {
          setIsError(true);
        }
      });
  };


  return (
    <main className="main bg-dark login">
      {isLoading ? <Loader /> : null}
      {isError ? <Toast message={'Connection impossible'} color={'rgba(186, 44, 27, 0.9)'} /> : null}
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input name={'username'} autoComplete={'true'} required={true} type="text" id="username" value={username}
                   onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input name={'password'} autoComplete={'true'} required={true} type="password" id="password"
                   value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
            <input name={'remember-me'} type="checkbox" id="remember-me" checked={rememberMe}
                   onChange={e => setRememberMe(e.target.checked)} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={isSubmitDisabled}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
