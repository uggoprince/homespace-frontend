import { connect } from 'react-redux';
import { NetworkStatus } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import AgencyAdapter from './AgencyAdapter';
import { queryApi } from '../../Utils/Api';
import ErrorHandler from '../errorHandler';

const Agencies = (props) => {
  const {
    w, agencySearchOffset, agencySearchLimit, query, queryName, mine, // setDoneRefetching, reFetchMyAgencies,
  } = props;
  const [agenciesData, setAgenciesData] = useState({});
  const { user } = useAuth();
  let payLoad = { offset: agencySearchOffset, limit: agencySearchLimit };
  if (w) {
    payLoad = {
      ...payLoad, name: w, address: w, about: w, country: w,
    };
  } else if (user) payLoad.country = user.country;
  const {
    loading, error, data, refetch, networkStatus,
  } = queryApi(query, payLoad, false);
  useEffect(() => {
    if (data) {
      setAgenciesData(data[queryName]);
    }
  }, [data]);

  return (
    <div className="w-full min-h-full mx-auto">
      {/* {loading && 'Loading...'} */}
      {!loading && error && <ErrorHandler onRetry={refetch} error={error} />}
      {(networkStatus === NetworkStatus.refetch) && 'Refetching!'}
      {!error && (
      <AgencyAdapter
        loading={loading}
        agenciesData={agenciesData}
        offset={agencySearchOffset}
        mine={mine}
      />
      )}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Agencies);
