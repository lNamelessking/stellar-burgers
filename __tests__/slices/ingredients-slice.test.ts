import { describe, expect, test } from '@jest/globals';
import reducer from '../../src/services/slices/burger/ingredients-slice';
import { ingredientsFetchedMockData } from '../../src/utils/mock-data'
import { getIngredients, initialState } from '../../src/services/slices/burger/ingredients-slice';

//Тест получения ингредиентов
describe('Тест слайса inngredientsSlice', () => {
  describe('Тест асинхронной функции getIngredients', () => {

    const error = new Error('Failed to fetch ingredients')
    const pendingAction = getIngredients.pending('pending');
    const fulfilledAction = getIngredients.fulfilled(ingredientsFetchedMockData, 'fullfiled');
    const rejectedAction = getIngredients.rejected(error, 'rejected');

    test('Тест фунции getIngredients в состоянии pending', () => {
      const stateWhilePending = reducer(initialState, pendingAction);
      expect(stateWhilePending.isIngredientsLoading).toBeTruthy();
      expect(stateWhilePending.ingredientsLoadingError).toBeUndefined();
    })

    test('Тест фунции getIngredients в состоянии fulfilled', () => {
      const stateAfterFulfilled = reducer(initialState, fulfilledAction);
      expect(stateAfterFulfilled.ingredients).toEqual(ingredientsFetchedMockData);
      expect(stateAfterFulfilled.isIngredientsLoading).toBeFalsy();
      expect(stateAfterFulfilled.ingredientsLoadingError).toBeUndefined();
    })

    test('Тест фунции getIngredients в состоянии rejected', () => {
      const stateAfterRejected = reducer(initialState, rejectedAction);
      expect(stateAfterRejected.ingredientsLoadingError).toEqual('Failed to fetch ingredients');
      expect(stateAfterRejected.isIngredientsLoading).toBeFalsy();
    })
  })
})