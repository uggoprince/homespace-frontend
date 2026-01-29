import { useMutation, useQuery, useLazyQuery } from '@apollo/client';

export const queryApi = (qString, payLoad, skip = false, options = {}) => useQuery(qString, {
  variables: payLoad, notifyOnNetworkStatusChange: true, skip, ...options,
});

export const mutateApi = (qString, ...rest) => useMutation(qString, { errorPolicy: 'all', ...rest });

export const queryApiLazy = (qString, payLoad) => useLazyQuery(qString, { variables: payLoad, notifyOnNetworkStatusChange: true });

export const fetchApi = (url) => fetch(url, { headers: { 'Access-Control-Allow-Origin': '*' } }).then(async (res) => {
  const response = await res.json();
  return response;
});
