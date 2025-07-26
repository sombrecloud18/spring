import configureMockStore from 'redux-mock-store';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import thunk from 'redux-thunk';
import { loginUser, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './auth-actions.js';

globalThis.fetch = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loginUser thunk', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('dispatches LOGIN_SUCCESS on success', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Welcome!' }),
    });

    const store = mockStore({});
    await store.dispatch(loginUser('admin', '1234'));

    expect(store.getActions()).toEqual([{ type: LOGIN_REQUEST }, { type: LOGIN_SUCCESS }]);
  });

  it('dispatches LOGIN_FAILURE on failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Invalid credentials' }),
    });

    const store = mockStore({});
    store.dispatch(loginUser('wrong', 'wrongpass'));

    expect(store.getActions()).toEqual([
      { type: LOGIN_REQUEST },
      {
        type: LOGIN_FAILURE,
        payload: 'Invalid credentials',
      },
    ]);
  });
});
