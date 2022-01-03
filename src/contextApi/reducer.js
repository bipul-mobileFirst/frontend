export const initialState = {
  user: null,
  token: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        user: action.user,
        token: action.token,
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
