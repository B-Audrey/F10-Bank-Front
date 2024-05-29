import useUserService from '../service/useUser-service.ts';
import { User } from '../interfaces/user.ts';
import { useStore } from 'react-redux';

export default function useLogin() {
  const store = useStore();

  const { postLogIn, getMe } = useUserService();

  const login = async (user: User, rememberMe: boolean) => {
    try {
      const tokenResponse = await postLogIn(user);
      if (!tokenResponse) return false;
      store.dispatch({ type: 'LOGIN', payload: { token: tokenResponse, email: user.email } });
      if (rememberMe) {
        window.localStorage.setItem('token', tokenResponse);
      }
      return tokenResponse;
    } catch (error) {
      return false;
    }
  };

  const getUser = async (token: string, rememberMe: boolean) => {
    try {
      const userResponse = await getMe(token);
      if (!userResponse) return false;
      store.dispatch({
        type: 'ME',
        payload: {
          firstName: userResponse.firstName,
          lastName: userResponse.lastName,
          id: userResponse.id,
          email: userResponse.email,
          token,
        },
      });
      if (rememberMe) {
        window.localStorage.setItem('firstName', userResponse.firstName);
        window.localStorage.setItem('lastName', userResponse.lastName);
        window.localStorage.setItem('id', userResponse.id);
        window.localStorage.setItem('email', userResponse.email);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return { login, getUser };
}
