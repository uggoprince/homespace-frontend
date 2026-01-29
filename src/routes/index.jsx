import React from 'react';
import { connect } from 'react-redux';
import {
  Route, Routes, Navigate, useLocation,
} from 'react-router-dom';
import Home from '../pages/home';
import Signup from '../pages/signup';
import Login from '../pages/login';
import Page404 from '../pages/404-page';
import Signin from '../auth/signin';
import Agencies from '../pages/agency/agencies';
import Dashboard from '../pages/dashboard';
import MyAgencies from '../pages/dashboard/agencies';
import MyAgency from '../pages/agency/MyAgencyBody';
import Agency from '../pages/agency/agency';
import Property from '../pages/property';
import Profile from '../pages/profile/index';
import { DashboardTabs } from '../pages/dashboard/DashboardTabs';
import { useAuth } from '../auth/AuthProvider';

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { token, user } = useAuth();
  if (!token && !user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

const Router = (props) => {
  const { q, redirect } = props;
  const qEmpty = q === '' || q === undefined;
  return (
    <Routes>
      <Route exact path="/" element={<Home qEmpty={qEmpty} q={q} />} />
      <Route exact path="/signup" element={<Signin><Signup /></Signin>} />
      <Route exact path="/login" element={<Signin><Login /></Signin>} />
      <Route exact path="/agencies" element={<Agencies />} />
      <Route exact path="/agencies/:username" element={<Agency />} />
      <Route exact path="/properties/:propertyId" element={<Property />} />
      <Route exact path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}>
        <Route index element={<DashboardTabs />} />
        {/* <Route path="agencies" element={<MyAgencies />} /> */}
        <Route path="agency" element={<MyAgency />} />
        <Route path="properties" element={<div>Properties</div>} />
      </Route>
      <Route exact path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

const mapStateToProps = (state) => ({
  redirect: state.redirect,
  q: state.q,
  token: state.token,
});

export default connect(mapStateToProps)(Router);
