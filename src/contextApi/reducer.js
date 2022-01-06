export const initialState = {
  user: null,
  token: "",
  allUsers: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        user: action.user,
        token: action.token,
      };
    case "SET_ALL_USERS":
      return {
        allUsers: action.allUsers,
      };
    case "LOG_OUT":
      return {
        user: "",
        token: "",
      };
    default:
      return state;
  }
};

export default reducer;
