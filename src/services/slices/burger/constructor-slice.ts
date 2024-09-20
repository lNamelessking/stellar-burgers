/*Данный слайс отвечает целиком за конструктор бургера, нет никаких thunk's,
асинхнронных запросов которые надо обработать. Есть только экшены: добавить ингридиент
(если тип ингр. булка, то добавим в булку, булок не может быть больше 2), удалить ингр. из бургера,
поменять ингр. местами, очистить бургер.*/

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { TConstructorIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

export type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientToBurger: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: Omit<TConstructorIngredient, 'id'>) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeIngredientFromBurger: (state, { payload }: PayloadAction<number>) => {
      state.ingredients.splice(payload, 1);
    },
    moveIngredientUp: (state, { payload }: PayloadAction<number>) => {
      if (payload > 0) {
        const tempIngredient = state.ingredients[payload];
        state.ingredients[payload] = state.ingredients[payload - 1];
        state.ingredients[payload - 1] = tempIngredient;
      }
    },
    moveIngredientDown: (state, { payload }: PayloadAction<number>) => {
      if (payload < state.ingredients.length - 1) {
        const tempIngredient = state.ingredients[payload];
        state.ingredients[payload] = state.ingredients[payload + 1];
        state.ingredients[payload + 1] = tempIngredient;
      }
    },
    clearIngridients: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    burgerBunSelector: (state: TBurgerConstructorState) => state.bun,
    burgerIngredientsSelector: (state: TBurgerConstructorState) =>
      state.ingredients
  }
});

/*Исправил все экспорты, исправил rootReducer, ибо не до конца разобрался как протестировать
инициацию rootReducer с combineSlices */

export const selectBurgerConstructorState = (state: RootState) =>
  state.burgerConstructor;
export const burgerBunSelector = (state: RootState) =>
  selectBurgerConstructorState(state).bun;
export const burgerIngredientsSelector = (state: RootState) =>
  selectBurgerConstructorState(state).ingredients;

export const burgerConstructorActions = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
