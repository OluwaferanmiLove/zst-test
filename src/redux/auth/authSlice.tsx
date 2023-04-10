import {createSlice} from '@reduxjs/toolkit';
// import {User} from '../../types';
import {revertAll} from '../sharedAction';

interface initialStateType {
  isUserOnboarded: boolean;
  isAuthenticated: boolean;
  token?: string;
}

const initialState: initialStateType = {
  isUserOnboarded: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => builder.addCase(revertAll, () => initialState),
  reducers: {
    userOnboarded: (state, action) => {
      state.isUserOnboarded = action.payload;
    },

    userAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {userOnboarded, userAuthenticated, setToken} = authSlice.actions;

export default authSlice.reducer;
