/*Данный слайс отвечает за отправку заказа, получение заказов самого пользователя, создаём
Thunk's, обрабатываем их через builder, единственный экшен который у нас здесь будет это очистка
заказа когда мы закроем модалку готового заказа*/

import { TOrder } from '@utils-types';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/services/store';

type TUserOrdersState = {
  someOrder: TOrder | null;
  userOrder: TOrder | null;
  userOrders: TOrder[];
  isOrderLoading: boolean;
  orderLoadingError: string | undefined;
};

export const initialState: TUserOrdersState = {
  someOrder: null,
  userOrder: null,
  userOrders: [],
  isOrderLoading: false,
  orderLoadingError: undefined
};

export const placeBurgerOrder = createAsyncThunk(
  'order/placeOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getUserOrders = createAsyncThunk(
  'order/getUserOrders',
  async () => await getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (data: number) => await getOrderByNumberApi(data)
);

export const userOrdersSlice = createSlice({
  name: 'userOrdersSlice',
  initialState,
  reducers: {
    clearUserOrder: (state: TUserOrdersState) => {
      state.userOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeBurgerOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(placeBurgerOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.userOrder = action.payload.order;
      })
      .addCase(placeBurgerOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.orderLoadingError = action.error.message;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.orderLoadingError = action.error.message;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.someOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.orderLoadingError = action.error.message;
      });
  }
});

/*Исправил все экспорты, исправил rootReducer, ибо не до конца разобрался как протестировать
инициацию rootReducer с combineSlices */

export const userOrderSelector = (state: RootState) =>
  state.userOrders.userOrder;
export const userOrdersSelector = (state: RootState) =>
  state.userOrders.userOrders;
export const someOrderSelector = (state: RootState) =>
  state.userOrders.someOrder;
export const isOrderLoadingSelector = (state: RootState) =>
  state.userOrders.isOrderLoading;

export const userOrderActions = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
