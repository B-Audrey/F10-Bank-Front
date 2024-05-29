export const getUser = (state) => {
  return {
    firstName: state.firstName, lastName: state.lastName, id: state.id, email: state.email,
  };

};

export const getToken = (state) => {
  return state.token;
};

