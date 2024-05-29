import { useStore } from 'react-redux';
import { User } from '../interfaces/user.ts';
import useUserService from '../service/useUser-service.ts';

export function useUpdate() {
  const store = useStore();
  const { putUser } = useUserService();

  const updateUser = async (token: string, user: Partial<User>) => {
    try {
      console.log(token);
      const updatedUserResponse = await putUser(token, user);
      store.dispatch({ type: 'UPDATE', payload: { firstName: updatedUserResponse.firstName, lastName: updatedUserResponse.lastName } });
    } catch (error) {
      return error;
    }
  };

  return { updateUser };
}
