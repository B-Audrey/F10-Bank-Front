import { User } from '../interfaces/user.ts';
import axios from 'axios';

export default function useUserService() {
  const url = 'http://localhost:3001/api/v1/user';

  const postLogInService = async (userToLogIn: User) => {
    try {
      const response = await axios.post(`${url}/login`, userToLogIn);
      if (!response.data.body.token) return null;
      return response.data.body.token;
    } catch (error) {
      return console.error('Error:', error);
    }
  };

  const getMeService = async (token: string) => {
    try {
      const response = await axios.post(`${url}/profile`, {}, {
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      return response.data.body;
    } catch (error) {
      return console.error('Error:', error);
    }
  }

  const putUserService = async (token:string, user: Partial<User>) => {
    try {
      const response = await axios.put(`${url}/profile`, user, {
        headers: {
          Authorization: `Bearer${token}`,
        },

      });
      return response.data.body;
    } catch (error) {
      return console.error('Error:', error);
    }
  };


  return { postLogInService, getMeService, putUserService };
}
