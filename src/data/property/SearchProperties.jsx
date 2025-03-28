/* eslint-disable no-console */
import { connect } from 'react-redux';
import HomePropertyAdapter from './HomePropertyAdapter';
import { queryApi } from '../../Utils/Api';
import './style.css';

const SearchProperties = (props) => {
  const {
    qString, q, offset, limit, searchType,
  } = props;
  const { loading, error, data } = queryApi(qString, { search: q, offset, limit });

  if (loading) return 'Loading...';
  if (error) {
    return `Error! ${error.message}`;
  }
  return (
    <div className="searchProperties">
      {data && data?.getProperties && (
      <HomePropertyAdapter
        number={searchType}
        loading={loading}
        data={data?.getProperties}
        offset={offset}
      />
      )}
    </div>
  );
};

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(SearchProperties);
