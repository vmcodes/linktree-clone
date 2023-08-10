import { loginUser } from '../services';
import { Token } from '../types';

export const setItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const getItem = (key: string): string | null => {
  const token = localStorage.getItem(key);

  if (token) {
    return token;
  }

  return null;
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const getUser = (): boolean => {
  const token = getItem('x-social-blocks');

  if (token) {
    return true;
  }

  return false;
};

export const getToken = (): string | null => {
  const token = getItem('x-social-blocks');

  if (token) {
    return token;
  }

  return null;
};

export const login = async (
  dispatch: Function,
  address: string,
): Promise<void> => {
  try {
    await dispatch({ type: 'LOGIN_REQUEST', payload: { auth: false } });

    const user: Token = await loginUser(address);

    setItem('x-social-blocks', user.token);

    await dispatch({ type: 'LOGIN_SUCCESS', payload: { auth: true } });
  } catch (err) {
    await dispatch({
      type: 'LOGIN_FAILED',
      payload: { auth: false, error: err },
    });
  }
};

export const logout = async (dispatch: Function): Promise<void> => {
  localStorage.clear();
  await dispatch({ type: 'LOGOUT_REQUEST', payload: { auth: false } });
};
