import { emptySplitApi } from "./emptySplitApi";

// get all results by admin id (results-candidates table)
// get all results by election id

const resultApiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Result']})

const resultApi = resultApiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getResultsByAdmin: build.query({
            query: (id) => `result/admin/${id}`,
            providesTags: ['Result']
        }),
        getResultsByElection: build.query({
            query: (id) => `result/election/${id}`,
            providesTags: ['Result']
        }),
        getVotedCandidateByVoter: build.query({
            query: (id) => `result/voter/${id}`,
            providesTags: ['Result']
        })
  }),
  overrideExisting: false,
})

export const { 
    useGetResultsByAdminQuery, 
    useGetResultsByElectionQuery, 
    useGetVotedCandidateByVoterQuery
} = resultApi