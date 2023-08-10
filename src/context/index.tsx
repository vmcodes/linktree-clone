import { ReactNode, useContext, useReducer, createContext, FC } from 'react';
import { AuthState } from '../types';
import { authReducer, initialState } from './reducer';

const AuthContext = createContext(initialState);
// eslint-disable-next-line
const DispatchContext = createContext<any>(authReducer);

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);

  return context;
};

export const useDispatch = (): Function => {
  const context = useContext(DispatchContext);

  return context;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={user}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </AuthContext.Provider>
  );
};
