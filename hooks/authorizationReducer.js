// import { createSlice } from "@reduxjs/toolkit";

// export const authorizationSlice = createSlice({
// 	name: "authorization",
// 	initialState: {
// 		authorization: {},
// 	},
// 	reducers: {
// 		login: (state, action) => {
// 			state.authorization = action.payload;

// 		},
// 		logout: (state, action) => {
// 			state.authorization = {};
// 		},
// 	},
// });

// export const { login } = authorizationSlice.actions;
// export const { logout } = authorizationSlice.actions;

// export default authorizationSlice.reducer;

// features/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {}
  },
  reducers: {
    setuserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state, action) => {
		state.userInfo = {};
    },
  },
});

export const { setuserInfo, logout } = userSlice.actions;
export default userSlice.reducer;
