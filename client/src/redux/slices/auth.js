import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.auth = action.payload;
    },
    logout(state) {
      state.auth = {};
      localStorage.removeItem("userInfo");
      localStorage.removeItem('changePass')
      // remomve all local storage
      localStorage.clear();
      deleteAllCookies()
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;


function deleteAllCookies() {
  const cookies = getCookies();
  for (const cookie of cookies) {
    document.cookie = `${cookie.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  }
}

function getCookies() {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  return cookies.map((cookie) => {
    const [name, value] = cookie.split('=');
    return { name: name.trim(), value: value };
  });
}

