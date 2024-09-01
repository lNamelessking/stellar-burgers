/*Данный слайс отвечает за отправку заказа, получение заказов самого пользователя, создаём
Thunk's, обрабатываем их через builder, единственный экшен который у нас здесь будет это очистка
заказа когда мы закроем модалку*/

import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TUserOrdersState = {
  someOrder: TOrder | null;
  userOrder: TOrder | null;
  userOrders: TOrder[];
  isOrderLoading: boolean;
  orderLoadingError: string | undefined;
};

const initialState: TUserOrdersState = {
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
        state.orderLoadingError =
          action.error.message || 'Неопознанная ошибка в placeBurgerOrder';
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
        state.orderLoadingError =
          action.error.message || 'Неопознанная ошибка в getUserOrders';
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
        state.orderLoadingError =
          action.error.message || 'Неопознанная ошибка в getOrderByNumber';
      });
  },
  selectors: {
    userOrderSelector: (state: TUserOrdersState) => state.userOrder,
    userOrdersSelector: (state: TUserOrdersState) => state.userOrders,
    someOrderSelector: (state: TUserOrdersState) => state.someOrder,
    isOrderLoadingSelector: (state: TUserOrdersState) => state.isOrderLoading
  }
});

export const userOrderSelector = userOrdersSlice.selectors.userOrderSelector;
export const userOrdersSelector = userOrdersSlice.selectors.userOrdersSelector;
export const someOrderSelector = userOrdersSlice.selectors.someOrderSelector;
export const isOrderLoadingSelector =
  userOrdersSlice.selectors.isOrderLoadingSelector;

export const userOrderActions = userOrdersSlice.actions;
