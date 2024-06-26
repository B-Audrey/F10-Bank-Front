import useUserService from '../service/useUser-service.ts';
import { User } from '../interfaces/user.ts';
import { useStore } from 'react-redux';
import { useState } from 'react';

export default function useLogin() {
  const store = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const { postLogInService, getMeService } = useUserService();

  // login function, takes a user and a boolean to know if we must keep token in local storage
  // post token to auth the user
  // if we get token in response, dispatch login action and keep token in the store
  // if remember me is true, store the token in the local storage
  // else, we return false to the component
  const login = async (user: User, rememberMe: boolean) => {
    setIsLoading(true);
    try {
      const tokenResponse = await postLogInService(user);
      if (!tokenResponse) return false;
      store.dispatch({ type: 'LOGIN', payload: { token: tokenResponse, email: user.email } });
      if (rememberMe) {
        window.localStorage.setItem('token', tokenResponse);
      }
      setIsLoading(false);
      return tokenResponse;
    } catch (error) {
      setIsLoading(false)
      return false;
    }
  };

  // get user function, to dispatch the user in the store
  const getUser = async (token: string, rememberMe: boolean) => {
    setIsLoading(true);
    try {
      const userResponse = await getMeService(token);
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
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false)
      return false;
    }
  };

  return { login, getUser, isLoading };
}
