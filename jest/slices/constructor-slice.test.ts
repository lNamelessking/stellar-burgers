import { describe, expect, test } from '@jest/globals';
import reducer, {
  burgerConstructorActions,
  initialState
} from '../../src/services/slices/burger/constructor-slice';
import {
  ingredientsToAddMockData,
  ingredientsToRemoveMockData
} from '../../src/utils/mock-data';

describe('Тест слайса burgerConstructorSlice', () => {

  //Тест очистки конструктора
  describe('Тест экшена clearIngrefients', () => {
    test('Тест очистки игнридиентов', () => {
      const clearIngrAction = burgerConstructorActions.clearIngridients();
      const toClearState = {
        bun: ingredientsToRemoveMockData[0],
        ingredients: [ingredientsToRemoveMockData[1]]
      };
      const afterClearState = reducer(toClearState, clearIngrAction)
      expect(afterClearState.bun).toBeNull
      expect(afterClearState.ingredients).toEqual([]);
    });
  });

  //Тест добавления булок / ингредиентов
  describe('Тест экшена addIngredientToBurger', () => {
    test('Тест добавления ингридиента', () => {
      const addIngrAction = burgerConstructorActions.addIngredientToBurger(
        ingredientsToAddMockData[1]
      );
      const afterIngrAddState = reducer(initialState, addIngrAction);
      expect(afterIngrAddState.ingredients).toHaveLength(1);
      expect(afterIngrAddState.ingredients[0]).toEqual(
        expect.objectContaining(ingredientsToAddMockData[1])
      );
    });
    test('Тест добавления булочки', () => {
      const addIngrAction = burgerConstructorActions.addIngredientToBurger(
        ingredientsToAddMockData[0]
      );
      const afterIngrAddState = reducer(initialState, addIngrAction);
      expect(afterIngrAddState.bun).toEqual(
        expect.objectContaining(ingredientsToAddMockData[0])
      );
    });
  });

  //Тест удаления ингредиента
  describe('Тест экшена removeIngredientFromBurger', () => {
    test('Тест удаления игредиента', () => {
      const beforeState = {
        bun: null,
        ingredients: ingredientsToRemoveMockData
      };
      const removeIngrAction =
        burgerConstructorActions.removeIngredientFromBurger(0);
      const afterDelIngrState = reducer(beforeState, removeIngrAction);
      expect(afterDelIngrState.ingredients).toHaveLength(1);
      expect(expect.objectContaining(afterDelIngrState.ingredients[0])).toEqual(
        expect.objectContaining(ingredientsToRemoveMockData[1])
      );
    });
  });

  //Тесты перемещения ингр
  describe('Тесты эшенов moveIngredientUp / moveIngredientDown', () => {
    const beforeState = {
      bun: null,
      ingredients: ingredientsToRemoveMockData
    };
    test('Тест moveIngredientUp', () => {
      const moveIngrUpAction = burgerConstructorActions.moveIngredientUp(1);
      const afterMoveUpState = reducer(beforeState, moveIngrUpAction);
      expect(afterMoveUpState.ingredients[0].id).toBe('2');
      expect(afterMoveUpState.ingredients[1].id).toBe('1');
    });
    test('Тест moveIngredientDown', () => {
      const moveIngrDownAction = burgerConstructorActions.moveIngredientDown(0);
      const afterMoveUpState = reducer(beforeState, moveIngrDownAction);
      expect(afterMoveUpState.ingredients[0].id).toBe('2');
      expect(afterMoveUpState.ingredients[1].id).toBe('1');
    });
  });
});
