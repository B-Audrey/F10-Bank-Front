import { configureStore } from '@reduxjs/toolkit';
import { UserModel } from './user.model.ts';


const userState: UserModel = {
  token: '',
  email: '',
  firstName: '',
  lastName: '',
  id: '',
};

const reducer = (currentState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('je suis dans l action login');
      console.log('action.payload', action.payload);
      return { ...currentState, token: action.payload.token, email: action.payload.email };
    case 'ME':
      return {
        ...currentState,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        id: action.payload.id,
        email: action.payload.email,
        token: action.payload.token,
      };
    case 'UPDATE':
      try {
        const userParams = { firstName: action.payload.firstName, lastName: action.payload.lastName };
        console.log('user in store', userParams);
      } catch (error) {
        console.error('error', error);
      }
      return {
        ...currentState,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
    case 'LOGOUT':
      return {
        token: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        id: undefined,
      };
    default:
      return currentState;
  }
};

export const userStore = configureStore(
  {
    preloadedState: userState,
    reducer,
  },
);
