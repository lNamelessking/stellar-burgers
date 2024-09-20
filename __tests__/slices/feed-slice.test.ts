import { describe, expect, test } from '@jest/globals';
import  reducer, {initialState, getFeed}  from '../../src/services/slices/user/feed-slice'
import {feedMockData} from '../../src/utils/mock-data'

//Тест получения ленты заказов
describe('Тест слайса feedSlice', () => {
  describe('Тест асинхронной функции getFeed', () => {
    const error = new Error('Failed to fetch feed')
    const pendingAction = getFeed.pending('pending');
    const fulfilledAction = getFeed.fulfilled(feedMockData, 'fullfiled');
    const rejectedAction = getFeed.rejected(error, 'rejected');

    test('Тест фунции getFeed в состоянии pending', () => {
      const stateWhilePending = reducer(initialState, pendingAction);
      expect(stateWhilePending.isFeedLoading).toBeTruthy();
      expect(stateWhilePending.feedLoadingError).toBeUndefined();
    })
    test('Тест фунции getFeed в состоянии fulfilled', () => {
      const stateAfterFulfilled = reducer(initialState, fulfilledAction);
      expect(stateAfterFulfilled.isFeedLoading).toBeFalsy();
      expect(stateAfterFulfilled.feedLoadingError).toBeUndefined();
      expect(stateAfterFulfilled.feedOrders).toEqual(feedMockData.orders);
      expect(stateAfterFulfilled.totalOrders).toEqual(feedMockData.total);
      expect(stateAfterFulfilled.totalOrdersToday).toEqual(feedMockData.totalToday);
    })
    test('Тест фунции getFeed в состоянии rejected', () => {})
      const stateAfterRejected = reducer(initialState, rejectedAction);
      expect(stateAfterRejected.isFeedLoading).toBeFalsy();
      expect(stateAfterRejected.feedLoadingError).toEqual('Failed to fetch feed');
  })
})
