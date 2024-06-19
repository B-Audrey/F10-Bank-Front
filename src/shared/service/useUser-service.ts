import { User } from '../interfaces/user.ts';
import axios from 'axios';

export default function useUserService() {
  const url = 'http://localhost:3001/api/v1/user';

  const postLogInService = async (userToLogIn: User): Promise<string> => {
      const response = await axios.post(`${url}/login`, userToLogIn);
      return response.data.body.token;
  };

  const getMeService = async (token: string) => {
      const response = await axios.post(`${url}/profile`, {}, {
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      return response.data.body;
  }

  const putUserService = async (token:string, user: Partial<User>) => {
      const response = await axios.put(`${url}/profile`, user, {
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      return response.data.body;
  };


  return { postLogInService, getMeService, putUserService };
}
