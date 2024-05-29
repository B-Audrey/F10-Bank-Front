import { User } from '../interfaces/user.ts';
import axios from 'axios';

export default function useUserService() {
  const url = 'http://localhost:3001/api/v1/user';

  const postLogIn = async (userToLogIn: User) => {
    try {
      const response = await axios.post(`${url}/login`, userToLogIn);
      if (!response.data.body.token) return null;
      return response.data.body.token;
    } catch (error) {
      return console.error('Error:', error);
    }
  };

  const getMe = async (token: string) => {
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

  const putUser = async (token:string, user: Partial<User>) => {
    console.log('je rentre dans le user service');
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


  return { postLogIn, getMe, putUser };
}
