import { emptySplitApi } from "./emptySplitApi";

//get elections admin
// get elections by election id 
// add a election
// amend a election
//delete a election 

const electionApiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Election']})

const electionApi = electionApiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getAllElections: build.query({
            query: (data) => `election/all/${data.id}/${data.role}`,
            providesTags: ['Election']         
        }),
        getElection: build.query({
            query: (id) => `election/${id}`,
            providesTags: ['Election']         
        }),
        getElectionVotes: build.query({
            query: (id) => `election/votes/${id}`,
            providesTags: ['Election']
        }),
        addElection: build.mutation({
            query(data) {
                return {
                    url: `election/add/${data.id}`,
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: data.body,
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
        })
  }),
  overrideExisting: false,
})

export const { 
    useGetAllElectionsQuery, 
    useGetElectionQuery,
    useGetElectionVotesQuery,
    useAddElectionMutation, 
    useAmendElectionMutation, 
    useDeleteElectionMutation, 
} = electionApi