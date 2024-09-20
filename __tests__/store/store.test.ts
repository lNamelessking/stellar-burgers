import { expect, test, describe } from '@jest/globals';

import { rootReducer } from '../../src/services/store';
import store from '../../src/services/store';

describe('Тест store', () => {
  test('Проверка правильной инициализации rootReducer', () => {
    const defaultState = store.getState();
    const expectedState = rootReducer(undefined, { type: 'INIT_ACTION' });
    expect(defaultState).toEqual(expectedState);
  });
});
