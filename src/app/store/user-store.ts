import { configureStore } from '@reduxjs/toolkit';


const state = {
  token:''
}

const reducer = (currentState, action: {type:string, payload:any} ) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...currentState, token: action.payload }
    default:
      return currentState

  }
}

export const userStore = configureStore(
  {
    preloadedState: state,
    reducer
  }
)
