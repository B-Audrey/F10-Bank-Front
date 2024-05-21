import './login.scss';
import { useState } from 'react';
import useLogin from '../../custom-hooks/useLogin.tsx';
import { User } from '../../interfaces/user.ts';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const userToLogin = { email: username, password } as User;
    login(userToLogin, rememberMe).then(isLogged => {
      if (isLogged) {
        navigate('/profile');
      } else {
        console.error('user cannot be logged in');
        alert('connection impossible');
      }
    });
  };

  return (
    <main className="main bg-dark login">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input required={true} type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input required={true} type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
