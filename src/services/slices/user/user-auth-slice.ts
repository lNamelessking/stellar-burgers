/*Данный слайс используется для логина, логаута, контроля процесса аутентификации,
регистрации, изменения данных пользователя.*/

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '@api';

type TUserState = {
  user: TUser | null;
  isAuthLoading: boolean;
  isAuthChecked: boolean;
  authError: string | undefined;
};

const initialState: TUserState = {
  user: null,
  isAuthLoading: false,
  isAuthChecked: false,
  authError: undefined
};

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => await loginUserApi(data)
);

export const updateUser = createAsyncThunk(
  'user/refreshUser',
  async (data: TRegisterData) => await updateUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () =>
  logoutApi()
);

export const userAuthSlice = createSlice({
  name: 'userAuthSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthChecked = true;
        state.authError = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthLoading = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.error.message;
      });
  },
  selectors: {
    userSelector: (state: TUserState) => state.user,
    isUserAuthChecked: (state: TUserState) => state.isAuthChecked
  }
});

export const userSelector = userAuthSlice.selectors.userSelector;
export const isUserAuthCheckedSelector =
  userAuthSlice.selectors.isUserAuthChecked;
