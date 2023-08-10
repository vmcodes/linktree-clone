import { AuthState } from '../types';
import { getToken } from './actions';

export const initialState: AuthState = {
  error: '',
  auth: getToken() ? true : false,
};

export const authReducer = (
  payload: AuthState,
  action: { type: string },
): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...payload,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...payload,
      };

    case 'LOGIN_FAILED':
      return {
        ...payload,
      };

    case 'LOGOUT_REQUEST':
      return {
        ...payload,
      };

    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
};
