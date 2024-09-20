/*Данный слайс используется целиком и полностью для обработки получения ингридиентов*/

import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/burger-api';
import { RootState } from 'src/services/store';

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  ingredientsLoadingError: string | undefined;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  ingredientsLoadingError: undefined
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredientsLoadingError = action.error.message;
      });
  }
});

/*Исправил все экспорты, исправил rootReducer, ибо не до конца разобрался как протестировать
инициацию rootReducer с combineSlices */

export const ingredientsSelector = (state: RootState) =>
  state.ingredients.ingredients;
export const isIngredientsLoadingSelector = (state: RootState) =>
  state.ingredients.isIngredientsLoading;

export default ingredientsSlice.reducer;
