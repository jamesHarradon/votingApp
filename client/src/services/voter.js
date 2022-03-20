import { emptySplitApi } from "./emptySplitApi";

//get voters admin
// get voters by election id 
// add a voter
// amend a voter
// place a vote
//delete a voter 

const voterApiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Voter']})

const voterApi = voterApiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getVoters: build.query({
            query: (id) => `voter/admin/${id}`,
            providesTags: ['Voter']
        }),
        getVotersByElection: build.query({
            query: (id) => `voter/election/${id}`,
            providesTags: ['Voter']
        }),
        addVoter: build.mutation({
            query(body) {
                return {
                    url: 'voter/add',
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },
            invalidatesTags: ['Voter']
        }),
        amendVoter: build.mutation({
            query(data) {
                const { id, body } = data;
                return {
                    url: `voter/amend/${id}`,
                    method: 'PUT',
                    mode: 'cors',
                    credentials: 'include',
                    body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },
            invalidatesTags: ['Voter']
        }),
        deleteVoter: build.mutation({
            query(id) {
                return {
                    url: `voter/delete/${id}`,
                    method: 'DELETE',
                    mode: 'cors',
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Voter']
        }),
        placeVote: build.mutation({
            query(data) {
                const { voterId, electionId } = data;
                return {
                    url: `voter/vote/${voterId}/${electionId}`,
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include'
                }
            },
            invalidatesTags: ['Voter', 'Result', 'User']
        })
  }),
  overrideExisting: false,
})

export const { 
    useGetVotersQuery, 
    useGetVotersByElectionQuery, 
    useAddVoterMutation, 
    useAmendVoterMutation, 
    useDeleteVoterMutation, 
    usePlaceVoteMutation 
} = voterApi