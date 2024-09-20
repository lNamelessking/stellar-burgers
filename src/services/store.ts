import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userAuthSlice } from './slices/user/user-auth-slice';
import { ingredientsSlice } from './slices/burger/ingredients-slice';
import { feedSlice } from './slices/user/feed-slice';
import { burgerConstructorSlice } from './slices/burger/constructor-slice';
import { userOrdersSlice } from './slices/user/user-order-slice';

export const rootReducer = combineReducers({
  userAuth: userAuthSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  feed: feedSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  userOrders: userOrdersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
