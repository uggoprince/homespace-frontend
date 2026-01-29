import React, { useRef } from 'react';
import { connect } from 'react-redux';
import {
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import {
  destroyLocalStorage, getLocalStorage, getUserFromLocalStorage, setLocalStorage,
} from '../Utils/LocalStorage';
import { computeSearchPath, itsThisPath } from '../Utils/Urls';

const AuthContext = React.createContext(null);

const AuthProvider = (props) => {
  const { children, q, propsSearchOffset } = props;
  const start = propsSearchOffset;
  const navigate = useNavigate();
  const token = useRef(getLocalStorage('token'));
  const user = useRef(getUserFromLocalStorage('user'));
  const updateUser = () => {
    user.current = getUserFromLocalStorage('user');
  };
  const isAuthenticated = useRef(token.current !== null && token.current !== undefined);
  const updateIsAuth = (value) => {
    isAuthenticated.current = value;
  };
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const str = path === '/' ? 'home' : path.replace('/', '');
  const isActive = useRef(str);
  isActive.current = str;
  const isActiveMenuItem = useRef('');
  const client = useApolloClient();

  const setIsActive = (p) => {
    isActive.current = p;
  };

  const setIsActiveMenuItem = (p) => {
    isActiveMenuItem.current = p;
  };

  const handleLogin = (tokenStr, userObj) => {
    setLocalStorage('user', JSON.stringify(userObj));
    setLocalStorage('token', tokenStr);
    token.current = tokenStr;
    user.current = userObj;
    isActive.current = 'home';
    updateIsAuth(true);
    let url = '/';
    if (q && !start) url += computeSearchPath(q, start);
    else if (!q && start) url += computeSearchPath(q, start);
    else if (q && start) url += computeSearchPath(q, start);
    navigate(url, { replace: true });
  };

  const clearStorage = () => {
    destroyLocalStorage('token');
    destroyLocalStorage('user');
    token.current = null;
    user.current = null;
    updateIsAuth(false);
  };

  const handleLogout = () => {
    clearStorage();
    client.clearStore();
    if (!itsThisPath('/')) navigate('/login', { replace: true });
    else navigate('/');
  };

  const value = React.useMemo(() => ({
    token: token.current,
    user: user.current,
    updateUser,
    isAuthenticated: isAuthenticated.current,
    updateIsAuth,
    loginUser: handleLogin,
    logout: handleLogout,
    clearStorage,
    isActive,
    setIsActive,
    isActiveMenuItem,
    setIsActiveMenuItem,
  }), [
    token.current,
    user.current,
    isAuthenticated.current,
    updateUser,
    updateIsAuth,
    handleLogin,
    handleLogout,
    clearStorage,
    isActive,
    setIsActive,
    isActiveMenuItem,
    setIsActiveMenuItem,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(AuthProvider);

export const useAuth = () => React.useContext(AuthContext);
