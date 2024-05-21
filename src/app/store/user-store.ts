import { configureStore } from '@reduxjs/toolkit';


const userState: {email?:string, token?:string} = {
  email: undefined,
  token: undefined
}

const reducer = (currentState, action: {type:string, payload:any} ) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...currentState, token: action.payload.token, email: action.payload.email}
    case 'LOGOUT':
      return { ...currentState, token: undefined, email: undefined}
    default:
      return currentState
  }
}

export const userStore = configureStore(
  {
    preloadedState: userState,
    reducer
  }
)
