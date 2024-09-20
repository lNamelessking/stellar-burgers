/*Данный слайс используется целиком и полностью для получения общей ленты заказов*/
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../../utils/burger-api';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

type TFeedState = {
  feedOrders: TOrder[];
  totalOrders: number;
  totalOrdersToday: number;
  isFeedLoading: boolean;
  feedLoadingError: string | undefined;
};

export const initialState: TFeedState = {
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
  }
});

/*Исправил все экспорты, исправил rootReducer, ибо не до конца разобрался как протестировать
инициацию rootReducer с combineSlices */

export const feedOrdersSelector = (state: RootState) => state.feed.feedOrders;
export const totalOrdersSelector = (state: RootState) => state.feed.totalOrders;
export const totalOrdersTodaySelector = (state: RootState) =>
  state.feed.totalOrdersToday;
export const isFeedLoadingSelector = (state: RootState) =>
  state.feed.isFeedLoading;

export default feedSlice.reducer;
