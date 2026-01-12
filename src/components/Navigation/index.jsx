/* eslint-disable no-console */
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { activePaths } from '../../Utils/paths';
import { setNewState } from '../../Utils/Store';
import './style.css';

const {
  home, agencies, dashboard, login, signup, profilePath, logoutPath,
} = activePaths;

const HSLink = (props) => {
  const {
    path, text, setActive, activeText, isAuth,
  } = props;
  const { isActive, setIsActive } = setActive;
  return (
    <li className="flex flex-grow">
      <NavLink
        to={path}
        onClick={() => {
          if (path === '/' && isAuth === true) {
            setNewState({ type: 'SEARCH_PROPERTIES', q: '', start: 0 });
          }
          setIsActive(activeText);
        }}
        className={() => `nav-link 
          ${(isActive?.current.startsWith(activeText) ? 'bg-indigo-600 text-white' : 'text-primary dark:text-slate-50')}`}
      >
        {text}
      </NavLink>
    </li>
  );
};

const HSButton = (props) => {
  const {
    handler, text,
  } = props;
  return (
    <button
      type="button"
      onClick={handler}
      className="nav-button"
    >
      {text}
    </button>
  );
};

const NavBlock = ({ children }) => (
  <nav className="flex">
    <ul
      className="hidden
      absolute
      border-primary
      top-12
      right-1
      border-2 rounded
      bg-white
      dark:bg-slate-950
      md:visible
      md:bg-transparent
      md:right-0
      md:top-0
      md:w-auto
      md:flex
      md:relative
      md:border-solid
      md:border-0
      md:border-transparent"
      id="navMenu"
    >
      {children}
    </ul>
    <div className="py-2" id="navMenuButton">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
        className="md:hidden cursor-pointer block dark:fill-white"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    </div>
  </nav>
);

const HomeNavigation = (props) => {
  const { logout, user } = props;
  const { isActive, setIsActive, isAuthenticated: auth } = useAuth();
  // const { profile } = user;
  const logUserOut = (e) => {
    e.preventDefault();
    setIsActive(logoutPath);
    logout();
  };
  return (
    <NavBlock>
      <HSLink path="/" text="Home" isAuth={auth} setActive={{ isActive, setIsActive }} activeText={home} />
      <HSLink path="/agencies" text="Agencies" setActive={{ isActive, setIsActive }} activeText={agencies} />
      {
        user
        && user?.profile
        && user?.profile?.hasAgency === true
        && <HSLink path="/dashboard" text="Dashboard" setActive={{ isActive, setIsActive }} activeText={dashboard} />
      }
      {user && <HSLink path="/profile" text="Profile" setActive={{ isActive, setIsActive }} activeText={profilePath} />}
      {!user && <HSLink path="/login" text="Log In" setActive={{ isActive, setIsActive }} activeText={login} />}
      {!user && <HSLink path="/signup" text="Sign Up" setActive={{ isActive, setIsActive }} activeText={signup} />}
      {user && <HSButton text="Logout" handler={logUserOut} />}
    </NavBlock>
  );
};

const LandingNavigation = ({ setActive }) => {
  const { isActive, setIsActive } = useAuth();
  return (
    <NavBlock>
      <HSLink path="/agencies" text="Agencies" setActive={{ isActive, setIsActive }} activeText={agencies} />
      <HSLink path="/login" text="Log In" setActive={{ isActive, setIsActive }} activeText={login} />
      <HSLink path="/signup" text="Sign Up" setActive={{ isActive, setIsActive }} activeText={signup} />
    </NavBlock>
  );
};

const SignupNavigation = ({ setActive }) => {
  const { isActive, setIsActive, isAuthenticated: auth } = useAuth();
  return (
    <NavBlock>
      <HSLink path="/" text="Home" isAuth={auth} setActive={{ isActive, setIsActive }} activeText={home} />
      <HSLink path="/agencies" text="Agencies" setActive={{ isActive, setIsActive }} activeText={agencies} />
      <HSLink path="/login" text="Log In" setActive={{ isActive, setIsActive }} activeText={login} />
    </NavBlock>
  );
};

const LoginNavigation = ({ setActive }) => {
  const { isActive, setIsActive, isAuthenticated: auth } = useAuth();
  return (
    <NavBlock>
      <HSLink path="/" text="Home" isAuth={auth} setActive={{ isActive, setIsActive }} activeText={home} />
      <HSLink path="/agencies" text="Agencies" setActive={{ isActive, setIsActive }} activeText={agencies} />
      <HSLink path="/signup" text="Sign Up" setActive={{ isActive, setIsActive }} activeText={signup} />
    </NavBlock>
  );
};

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const { token, logout, user } = useAuth();
  if (token) return <HomeNavigation user={user} logout={logout} />;
  return <LandingNavigation />;
};

export default Navigation;
