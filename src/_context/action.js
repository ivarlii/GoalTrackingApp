// import axios from "axios";

export async function login(dispatch, loginParams) {
  // the below part where server side request happens but I generated dummy data for user
  // return axios.post('/api/login', {data: loginParams, headers: {'Content-Type': 'application/json'}});
  if (loginParams && loginParams.email && loginParams.password) {
    const currentUser = {
      user: {
        username: loginParams.email,
        password: loginParams.password,
        nickname: loginParams.nickname,
        phone: loginParams.phone,
        gender: loginParams.gender,
      },
    };
    dispatch({ type: "LOGIN_SUCCESS", payload: currentUser });
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    return currentUser;
  } else {
    dispatch({ type: "LOGIN_ERROR", payload: {} });
    return null;
  }
}

export async function register(dispatch, registerParams) {
  // the below part where server side request happens but I generated dummy data for user
  // return axios.post('/api/register', {data: registerParams, headers: {'Content-Type': 'application/json'}});

  if (registerParams && registerParams.email && registerParams.password) {
    const registeredUser = {
      user: {
        username: registerParams.email,
        password: registerParams.password,
      },
    };
    dispatch({ type: "REGISTER_SUCCESS", payload: registeredUser });
    return registeredUser;
  } else {
    dispatch({ type: "REGISTER_ERROR", payload: {} });
    return null;
  }
}

export async function updateUser(dispatch, params) {
  // the below part where server side request happens but I generated dummy data for user
  // return axios.post('/api/updateUser', {data: params, headers: {'Content-Type': 'application/json'}});

  if (params) {
    const user = {
      user: {
        username: params.email,
        password: params.password,
        nickname: params.nickname,
        phone: params.phone,
        gender: params.gender,
      },
    };
    dispatch({ type: "UPDATE_SUCCESS", payload: user });
    return user;
  } else {
    dispatch({ type: "UPDATE_ERROR", payload: {} });
    return null;
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
}
