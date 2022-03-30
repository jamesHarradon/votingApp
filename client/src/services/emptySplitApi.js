// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { REHYDRATE } from 'redux-persist'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/',
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include'
  }),
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === REHYDRATE) {
  //     return action.payload[reducerPath]
  //   }
  // },
  endpoints: () => ({}),
})