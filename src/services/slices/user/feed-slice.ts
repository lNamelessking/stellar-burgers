/*Данный слайс используется целиком и полностью для получения общей ленты заказов*/
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

type TFeedState = {
  feedOrders: TOrder[];
  totalOrders: number;
  totalOrdersToday: number;
  isFeedLoading: boolean;
  feedLoadingError: string | undefined;
};

const initialState: TFeedState = {
  feedOrders: [],
  totalOrders: 0,
  totalOrdersToday: 0,
  isFeedLoading: false,
  feedLoadingError: undefined
};

export const getFeed = createAsyncThunk(
  'feed/getFeed',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isFeedLoading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isFeedLoading = false;
        state.feedOrders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.totalOrdersToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isFeedLoading = false;
        state.feedLoadingError =
          action.error.message || 'Неопознанная ошибка в feedLoadingError';
      });
  },
  selectors: {
    feedOrdersSelector: (state: TFeedState) => state.feedOrders,
    totalOrdersSelector: (state: TFeedState) => state.totalOrders,
    totalOrdersTodaySelector: (state: TFeedState) => state.totalOrdersToday,
    isFeedLoadingSelector: (state: TFeedState) => state.isFeedLoading
  }
});

export const feedOrdersSelector = feedSlice.selectors.feedOrdersSelector;
export const totalOrdersSelector = feedSlice.selectors.totalOrdersSelector;
export const totalOrdersTodaySelector =
  feedSlice.selectors.totalOrdersTodaySelector;
export const isFeedLoadingSelector = feedSlice.selectors.isFeedLoadingSelector;
