/*Данный слайс используется целиком и полностью для обработки получения ингридиентов*/

import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  ingredientsLoadingError: string | undefined;
};

const initialState: TIngredientsState = {
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
  },
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    isIngredientsLoadingSelector: (state) => state.isIngredientsLoading
  }
});

export const ingredientsSelector =
  ingredientsSlice.selectors.ingredientsSelector;
export const isIngredientsLoadingSelector =
  ingredientsSlice.selectors.isIngredientsLoadingSelector;
