/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import HomePropertyAdapter from './HomePropertyAdapter';
import { queryApi } from '../../Utils/Api';
import './style.css';

const SearchProperties = (props) => {
  const {
    qString, q, offset, limit, searchType,
  } = props;
  const { loading, error, data } = queryApi(qString, { search: q, offset, limit });
  const [properties, setProperties] = useState({});
  useEffect(() => {
    if (data) {
      setProperties(data?.getProperties);
    }
  }, [data]);
  useEffect(() => {
    if (loading) {
      window.scrollTo({
        top: 0,
        behavior: 'auto', // 'smooth', // or 'auto'
      });
    }
  }, [loading]);
  if (error) {
    return `Error! ${error.message}`;
  }
  return (
    <div className="searchProperties">
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

export default connect(mapStateToProps)(SearchProperties);
