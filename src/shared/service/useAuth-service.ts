import { User } from '../interfaces/user.ts';
import axios from 'axios';

export default function useAuthService() {
  const url = 'http://localhost:3001/api/v1/user/login';

  const postLogIn = async (userToLogIn: User) => {
    try {
      const response = await axios.post(url, userToLogIn);
      if (!response.data.body.token) return null;
      return response.data.body.token;
    } catch (error) {
      return console.error('Error:', error);
    }
  };


  return { postLogIn };
}
