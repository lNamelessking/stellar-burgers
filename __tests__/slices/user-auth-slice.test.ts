import { describe, expect, test } from '@jest/globals';
import {
  loginUserMockData,
  registerUserMockData,
  userMockData
} from '../../src/utils/mock-data';
import reducer, {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  getUser,
  initialState
} from '../../src/services/slices/user/user-auth-slice';

//Тест регистрации
describe('Тест слайса userAuthSlice', () => {
  describe('Тест асинхронной функции registerUser', () => {
    const error = new Error('Failed to register user');
    const pendingAction = registerUser.pending('pending', registerUserMockData);
    const fulfilledAction = registerUser.fulfilled(
      userMockData,
      'fullfiled',
      registerUserMockData
    );
    const rejectedAction = registerUser.rejected(
      error,
      'rejected',
      registerUserMockData
    );
    test('Тест фунции registerUser в состоянии pending', () => {
      const stateWhilePending = reducer(initialState, pendingAction);
      expect(stateWhilePending.isAuthChecked).toBeFalsy();
      expect(stateWhilePending.isAuthLoading).toBeTruthy();
      expect(stateWhilePending.authError).toBeUndefined();
    });
    test('Тест фунции registerUser в состоянии fulfilled', () => {
      const stateAfterFulfilled = reducer(initialState, fulfilledAction);
      expect(stateAfterFulfilled.isAuthChecked).toBeTruthy();
      expect(stateAfterFulfilled.isAuthLoading).toBeFalsy();
      expect(stateAfterFulfilled.authError).toBeUndefined();
      expect(stateAfterFulfilled.user).toEqual(userMockData);
    });
    test('Тест фунции registerUser в состоянии rejected', () => {
      const stateAfterRejected = reducer(initialState, rejectedAction);
      expect(stateAfterRejected.isAuthLoading).toBeFalsy();
      expect(stateAfterRejected.authError).toBe('Failed to register user');
    });
  });

  //Тест логина
  describe('Тест асинхронной функции loginUser', () => {
    const error = new Error('Failed to login user');
    const pendingAction = loginUser.pending('pending', loginUserMockData);
    const fulfilledAction = loginUser.fulfilled(
      userMockData,
      'fullfiled',
      loginUserMockData
    );
    const rejectedAction = loginUser.rejected(
      error,
      'rejected',
      loginUserMockData
    );
    test('Тест фунции loginUser в состоянии pending', () => {
      const stateWhilePending = reducer(initialState, pendingAction);
      expect(stateWhilePending.isAuthChecked).toBeFalsy();
      expect(stateWhilePending.isAuthLoading).toBeTruthy();
      expect(stateWhilePending.authError).toBeUndefined();
    });
    test('Тест фунции loginUser в состоянии fulfilled', () => {
      const stateAfterFulfilled = reducer(initialState, fulfilledAction);
      expect(stateAfterFulfilled.isAuthChecked).toBeTruthy();
      expect(stateAfterFulfilled.isAuthLoading).toBeFalsy();
      expect(stateAfterFulfilled.authError).toBeUndefined();
      expect(stateAfterFulfilled.user).toEqual(userMockData);
    });
    test('Тест фунции loginUser в состоянии rejected', () => {
      const stateAfterRejected = reducer(initialState, rejectedAction);
      expect(stateAfterRejected.authError).toEqual('Failed to login user');
      expect(stateAfterRejected.isAuthLoading).toBeFalsy();
    });
  });

  //Тест получения пользователя
  describe('Тест асинхронной функции getUser', () => {
    const error = new Error('Failed to get user');
    const pendingAction = getUser.pending('pending');
    const fulfilledAction = getUser.fulfilled(userMockData, 'fullfiled');
    const rejectedAction = getUser.rejected(error, 'rejected');
    test('Тест фунции getUser в состоянии pending', () => {
      const stateWhilePending = reducer(initialState, pendingAction);
      expect(stateWhilePending.isAuthLoading).toBeTruthy();
      expect(stateWhilePending.authError).toBeUndefined();
      expect(stateWhilePending.authError).toBeUndefined();
    });
    test('Тест фунции getUser в состоянии fulfilled', () => {
      const stateAfterFulfilled = reducer(initialState, fulfilledAction);
      expect(stateAfterFulfilled.isAuthChecked).toBeTruthy();
      expect(stateAfterFulfilled.isAuthLoading).toBeFalsy();
      expect(stateAfterFulfilled.authError).toBeUndefined();
      expect(stateAfterFulfilled.user).toEqual(userMockData);
    });
    test('Тест фунции getUser в состоянии rejected', () => {
      const stateAfterRejected = reducer(initialState, rejectedAction);
      expect(stateAfterRejected.authError).toEqual('Failed to get user');
      expect(stateAfterRejected.isAuthLoading).toBeFalsy();
    });
  });

  //Тест обновления данных пользователя
  describe('Тест асинхронной функции updateUser', () => {

    const error = new Error('Failed to update user info');
    const pendingAction = updateUser.pending('pending', registerUserMockData);
    const fulfilledAction = updateUser.fulfilled(userMockData, 'fullfiled', registerUserMockData);
    const rejectedAction = updateUser.rejected(error, 'rejected', registerUserMockData);

    test('Тест фунции updateUser в состоянии pending', () => {
      const stateWhilePending = reducer(initialState, pendingAction);
      expect(stateWhilePending.isAuthLoading).toBeTruthy();
      expect(stateWhilePending.authError).toBeUndefined();
    });

    test('Тест фунции updateUser в состоянии fulfilled', () => {
      const stateAfterFulfilled = reducer(initialState, fulfilledAction);
      expect(stateAfterFulfilled.isAuthLoading).toBeFalsy();
      expect(stateAfterFulfilled.authError).toBeUndefined();
      expect(stateAfterFulfilled.user).toEqual(userMockData);
    });

    test('Тест фунции updateUser в состоянии rejected', () => {
      const stateAfterRejected = reducer(initialState, rejectedAction);
      expect(stateAfterRejected.authError).toEqual('Failed to update user info');
      expect(stateAfterRejected.isAuthLoading).toBeFalsy();
    });
  });

  //Тест логаута
  describe('Тест асинхронной функции logoutUser', () => {
    const error = new Error('Failed to logout');
    const pendingAction = logoutUser.pending('pending');
    const fulfilledAction = logoutUser.fulfilled(undefined, 'fullfiled');
    const rejectedAction = logoutUser.rejected(error, 'rejected');

    test('Тест фунции logoutUser в состоянии pending', () => {
      const stateWhilePending = reducer(initialState, pendingAction);
      expect(stateWhilePending.isAuthLoading).toBeTruthy();
      expect(stateWhilePending.authError).toBeUndefined();
    });

    test('Тест фунции logoutUser в состоянии fulfilled', () => {
      const stateAfterFulfilled = reducer(initialState, fulfilledAction);
      expect(stateAfterFulfilled.user).toBeNull();
      expect(stateAfterFulfilled.isAuthLoading).toBeFalsy();
      expect(stateAfterFulfilled.authError).toBeUndefined();
    });

    test('Тест фунции logoutUser в состоянии rejected', () => {
      const stateAfterRejected = reducer(initialState, rejectedAction);
      expect(stateAfterRejected.authError).toEqual('Failed to logout');
      expect(stateAfterRejected.isAuthLoading).toBeFalsy;
    });
  });
});
