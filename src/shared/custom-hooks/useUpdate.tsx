import { useStore } from 'react-redux';
import { User } from '../interfaces/user.ts';
import useUserService from '../service/useUser-service.ts';
import { useState } from 'react';

export function useUpdate() {
  const store = useStore();
  const { putUser } = useUserService();
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = async (token: string, user: Partial<User>) => {
    setIsLoading(true);
    try {
      const updatedUserResponse = await putUser(token, user);
      store.dispatch({
        type: 'UPDATE',
        payload: { firstName: updatedUserResponse.firstName, lastName: updatedUserResponse.lastName },
      });
      setIsLoading(false);
    } catch (error) {
      return error;
    }
  };

  return { updateUser, isLoading };
}
