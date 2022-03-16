import { emptySplitApi } from "./emptySplitApi";

//get elections admin
// get elections by election id 
// add a election
// amend a election
//delete a election 

const electionApiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Election']})

const electionApi = electionApiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getElections: build.query({
            query: (id) => `election/admin/${id}`,
            providesTags: ['Election']
        }),
        getElection: build.query({
            query: (id) => `election/election/${id}`,
            providesTags: ['Election']
        }),
        addElection: build.mutation({
            query(body) {
                return {
                    url: 'election/add',
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },
            invalidatesTags: ['Election']
        }),
        amendElection: build.mutation({
            query(data) {
                const { id, body } = data;
                return {
                    url: `election/amend/${id}`,
                    method: 'PUT',
                    mode: 'cors',
                    credentials: 'include',
                    body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },
            invalidatesTags: ['Election']
        }),
        deleteElection: build.mutation({
            query(id) {
                return {
                    url: `election/delete/${id}`,
                    method: 'DELETE',
                    mode: 'cors',
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Election']
        }),
        getElectionResults: build.query({
            query: (id) => `election/results/${id}`,
            providesTags: ['Result']
        })
  }),
  overrideExisting: false,
})

export const { 
    useGetElectionsQuery, 
    useGetElectionQuery, 
    useAddElectionMutation, 
    useAmendElectionMutation, 
    useDeleteElectionMutation, 
    useGetElectionResultsQuery 
} = electionApi