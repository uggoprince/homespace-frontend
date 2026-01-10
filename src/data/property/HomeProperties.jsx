/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import HomePropertyAdapter from './HomePropertyAdapter';
import { useAuth } from '../../auth/AuthProvider';
import { queryApi } from '../../Utils/Api';
import './style.css';
// import { Loader } from '../../components/Loader';

const HomeProperties = (props) => {
  const {
    qString, offset, limit, searchType,
  } = props;
  const { user } = useAuth();
  const { country } = user;
  const { loading, error, data } = queryApi(qString, { search: country, offset, limit });
  const [properties, setProperties] = useState({});
  useEffect(() => {
    if (data) {
      setProperties(data?.getPropertiesStartWithCountry);
    }
  }, [data]);
  useEffect(() => {
    if (loading) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
  }, [loading]);
  if (error) {
    return `Error! ${error.message}`;
  }
  return (
    <div className="w-full min-h-full">
      <HomePropertyAdapter
        number={searchType}
        loading={loading}
        data={properties}
        offset={offset}
      />
    </div>
  );
};

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(HomeProperties);
