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
} from '../../../utils/burger-api';
import { RootState } from 'src/services/store';

type TUserState = {
  user: TUser | null;
  isAuthLoading: boolean;
  isAuthChecked: boolean;
  authError: string | undefined;
};

export const initialState: TUserState = {
  user: null,
  isAuthLoading: false,
  isAuthChecked: false,
  authError: undefined
};

export const getUser = createAsyncThunk('user/getUser', async () => {
  const fetchedUser = await getUserApi();
  return fetchedUser.user;
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const fetchedData = await registerUserApi(data);
    setCookie('accessToken', fetchedData.accessToken);
    localStorage.setItem('refreshToken', fetchedData.refreshToken);
    return fetchedData.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const fetchedData = await loginUserApi(data);
    setCookie('accessToken', fetchedData.accessToken);
    localStorage.setItem('refreshToken', fetchedData.refreshToken);
    return fetchedData.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/refreshUser',
  async (data: TRegisterData) => {
    const fetchedData = await updateUserApi(data);
    return fetchedData.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
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
        state.user = action.payload;
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
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthLoading = false;
        state.user = action.payload;
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
        state.user = action.payload;
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
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.error.message;
      });
  }
});

/*Исправил все экспорты, исправил rootReducer, ибо не до конца разобрался как протестировать
инициацию rootReducer с combineSlices */

export const userSelector = (state: RootState) => state.userAuth.user;
export const isUserAuthCheckedSelector = (state: RootState) =>
  state.userAuth.isAuthChecked;

export default userAuthSlice.reducer;
