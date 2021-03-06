import { emptySplitApi } from "./emptySplitApi";

//get voters admin
// get voters by election id 
// add a voter
// amend a voter
// place a vote
//delete a voter 

const voterApiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Voter', 'Election', 'Result']})

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
            invalidatesTags: ['Voter', 'Election']
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
            invalidatesTags: ['Voter', 'Election']
        }),
        deleteVoter: build.mutation({
            query(data) {
                return {
                    url: `voter/delete/${data.voterId}/${data.electionId}`,
                    method: 'DELETE',
                    mode: 'cors',
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Voter', 'Election']
        }),
        placeVote: build.mutation({
            query(data) {
                const { voterId, candidateId } = data;
                return {
                    url: `voter/vote/${voterId}/${candidateId}`,
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include'
                }
            },
            invalidatesTags: ['Voter', 'Result']
        }),
        getHasVoted: build.query({
            query: (data) => `voter/has_voted/${data.voterId}/${data.electionId}`,
            providesTags: ['Voter']
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
    usePlaceVoteMutation,
    useGetHasVotedQuery
} = voterApi