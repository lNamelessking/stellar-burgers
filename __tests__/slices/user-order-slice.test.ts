import { describe, expect, test } from '@jest/globals';
import reducer, {
  getOrderByNumber,
  getUserOrders,
  placeBurgerOrder,
  initialState,
  userOrderActions
} from '../../src/services/slices/user/user-order-slice';
import { orderMockData, newOrderMockData } from '../../src/utils/mock-data';

describe('Тест слайса userOrdersSlice', () => {

  //Тест экшена очистки заказа
  describe('Тест экшенов userOrdersSlice', () => {
    test('Тест экшена clearUserOrder', () => {
      const stateWithOrder = {
        ...initialState
      };
      const clearAction = userOrderActions.clearUserOrder;
      const stateAfterClear = reducer(stateWithOrder, clearAction());
      expect(stateAfterClear.userOrder).toBeNull();
      expect(stateAfterClear.someOrder).toBeNull();
      expect(stateAfterClear.orderLoadingError).toBeUndefined();
      expect(stateAfterClear.isOrderLoading).toBeFalsy();
    });
  });

  //Тест получения заказа по его номеру
  describe('Тест асинхронной функции getOrderByNumber', () => {
    const error = new Error('Failed to get order by number');
    const pendingAction = getOrderByNumber.pending(
      'pending',
      orderMockData.orders[0].number
    );
    const fulfilledAction = getOrderByNumber.fulfilled(
      orderMockData,
      'fulfilled',
      orderMockData.orders[0].number
    );
    const rejectedAction = getOrderByNumber.rejected(
      error,
      'fulfilled',
      orderMockData.orders[0].number
    );
    test('Тест асинхронной функции getOrderByNunberв состоянии pending', () => {
      const stateWhilePending = reducer(initialState, pendingAction);
      expect(stateWhilePending.isOrderLoading).toBeTruthy();
      expect(stateWhilePending.orderLoadingError).toBeUndefined();
    });
    test('Тест асинхронной функции getOrderByNunber в состоянии fulfilled', () => {
      const stateAfterFulfilled = reducer(initialState, fulfilledAction);
      expect(stateAfterFulfilled.isOrderLoading).toBeFalsy();
      expect(stateAfterFulfilled.someOrder).toEqual(orderMockData.orders[0]);
      expect(stateAfterFulfilled.orderLoadingError).toBeUndefined();
    });
    test('Тест функции getOrderByNunber в состоянии rejected', () => {
      const stateAfterRejected = reducer(initialState, rejectedAction);
      expect(stateAfterRejected.isOrderLoading).toBeFalsy();
      expect(stateAfterRejected.orderLoadingError).toEqual(
        'Failed to get order by number'
      );
    });
  });

  //Тест получения заказов пользователя
  describe('Тест асинхронной функции getUserOrders', () => {
    const error = new Error('Failed to get user orders');
    const pendingAction = getUserOrders.pending('pending');
    const fulfilledAction = getUserOrders.fulfilled(
      orderMockData.orders,
      'fulfilled'
    );
    const rejectedAction = getUserOrders.rejected(error, 'fulfilled');

    test('Тест асинхронной функции getOrderByNunberв состоянии pending', () => {
      const stateWhilePending = reducer(initialState, pendingAction);
      expect(stateWhilePending.isOrderLoading).toBeTruthy();
      expect(stateWhilePending.orderLoadingError).toBeUndefined();
    });
    test('Тест асинхронной функции getOrderByNunber в состоянии fulfilled', () => {
      const stateAfterFulfilled = reducer(initialState, fulfilledAction);
      expect(stateAfterFulfilled.userOrders).toEqual(orderMockData.orders);
      expect(stateAfterFulfilled.orderLoadingError).toBeUndefined();
      expect(stateAfterFulfilled.isOrderLoading).toBeFalsy();
    });
    test('Тест функции getOrderByNunber в состоянии rejected', () => {
      const stateAfterRejected = reducer(initialState, rejectedAction);
      expect(stateAfterRejected.orderLoadingError).toEqual(
        'Failed to get user orders'
      );
      expect(stateAfterRejected.isOrderLoading).toBeFalsy();
    });
  });
  
  //Тест отправки заказа
  describe('Тест асинхронной функции placeBurgerOrder', () => {
    const error = new Error('Failed to post order');
    const pendingAction = placeBurgerOrder.pending(
      'pending',
      newOrderMockData.order.ingredients
    );
    const fulfilledAction = placeBurgerOrder.fulfilled(
      newOrderMockData,
      'fulfilled',
      newOrderMockData.order.ingredients
    );
    const rejectedAction = placeBurgerOrder.rejected(
      error,
      'rejected',
      newOrderMockData.order.ingredients
    );
    test('Тест функции placeBurgerOrder в состоянии pending', () => {
      const stateWhilePending = reducer(initialState, pendingAction);
      expect(stateWhilePending.isOrderLoading).toBeTruthy;
      expect(stateWhilePending.orderLoadingError).toBeUndefined;
    });
    test('Тест функции placeBurgerOrder в состоянии fulfilled', () => {
      const stateAfterFulfilled = reducer(initialState, fulfilledAction);
      expect(stateAfterFulfilled.userOrder).toEqual(newOrderMockData.order);
      expect(stateAfterFulfilled.isOrderLoading).toBeFalsy();
      expect(stateAfterFulfilled.orderLoadingError).toBeUndefined();
    });
    test('Тест функции placeBurgerOrder в состоянии rejected', () => {
      const stateAfterRejected = reducer(initialState, rejectedAction);
      expect(stateAfterRejected.isOrderLoading).toBeFalsy();
      expect(stateAfterRejected.orderLoadingError).toEqual(
        'Failed to post order'
      );
    });
  });
});
