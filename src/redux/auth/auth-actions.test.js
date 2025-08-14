import { configureStore as configureMockStore } from 'redux-mock-store';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { thunk } from 'redux-thunk';
import { login, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../auth-actions.js';

globalThis.fetch = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login thunk', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('dispatches LOGIN_SUCCESS on success', async () => {
    const mockUser = { id: 1, username: 'admin' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, user: mockUser }),
    });

    const store = mockStore({});
    await store.dispatch(login({ username: 'admin', password: '1234' }));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: LOGIN_REQUEST });
    expect(actions[1]).toEqual({
      type: LOGIN_SUCCESS,
      payload: { user: mockUser },
    });
  });

  it('dispatches LOGIN_FAILURE on failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Invalid credentials' }),
    });

    const store = mockStore({});
    try {
      await store.dispatch(login({ username: 'wrong', password: 'wrongpass' }));
    } catch (error) {
      expect(error.message).toBe('Invalid credentials');
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: LOGIN_REQUEST });
      expect(actions[1]).toEqual({
        type: LOGIN_FAILURE,
        payload: { error: 'Invalid credentials' },
      });
    }
  });
});
