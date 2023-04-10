import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithTokenCheck} from '../redux.util';
import {RegisterParams} from './Auth';

//Reminder for types
//<ResponseType, BodyType>

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithTokenCheck,
  endpoints: builder => ({
    register: builder.mutation<void, RegisterParams>({
      query: data => {
        return {
          url: '',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {useRegisterMutation} = authApi;
