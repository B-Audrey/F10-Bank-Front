import { useState } from 'react';
import useAuthService from '../service/useAuth-service.ts';
import { User } from '../interfaces/user.ts';
import { useStore } from 'react-redux';

export default function useLogin() {
  const store = useStore();

  const { postLogIn } = useAuthService();

  const [token, setToken] = useState<string | null>(null);

  const login = async (user: User) => {
    try {
      const tokenResponse = await postLogIn(user);
      setToken(tokenResponse);
      store.dispatch({ type: 'LOGIN', payload: tokenResponse });
      return true;
    } catch (error) {
      return false;
    }
  };

  return { token, login };
}
