import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
// import {apiBaseUrl} from 'src/env';
import {RootState} from './store';
// import * as RootNavigation from '@navigation/RootNavigation';

const baseQuery = fetchBaseQuery({
  baseUrl: 'apiBaseUrl',
  prepareHeaders: async (headers, {getState}) => {
    const token = (getState() as RootState)?.auth?.token;

    // If we have a token set in state, pass it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithTokenCheck: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log(result?.error?.status);

  // if (
  //   result?.error &&
  //   result?.error?.status !== 401 &&
  //   result?.error?.status !== 422
  // ) {
  //   console.log(result?.error, result?.error);
  // }

  if (result?.error && result?.error?.status === 401) {
    // console.log('error 401');
    // store.dispatch(setSessionExpired(true));
    // RootNavigation.navigate('LogOut', {tokenExpired: true});
  }
  return result;
};
