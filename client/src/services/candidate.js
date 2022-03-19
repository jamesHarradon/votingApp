import { emptySplitApi } from "./emptySplitApi";

//get candidates admin
// get candidates by election id 
// add a candidate
// amend a candidate
//delete a candidate 

const candidateApiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Candidate']})

const candidateApi = candidateApiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getCandidates: build.query({
            query: (id) => `candidate/admin/${id}`,
            providesTags: ['Candidate']
        }),
        getCandidatesByElection: build.query({
            query: (id) => `candidate/election/${id}`,
            providesTags: ['Candidate']
        }),
        getCandidateById: build.query({
            query: (data) => `candidate/${data.candidateId}/${data.electionId}`,
            providesTags: ['Candidate']
        }),
        addCandidate: build.mutation({
            query(body) {
                return {
                    url: 'candidate/add',
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },
            invalidatesTags: ['Candidate']
        }),
        amendCandidate: build.mutation({
            query(data) {
                const { id, body } = data;
                return {
                    url: `candidate/amend/${id}`,
                    method: 'PUT',
                    mode: 'cors',
                    credentials: 'include',
                    body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },
            invalidatesTags: ['Candidate']
        }),
        deleteCandidate: build.mutation({
            query(id) {
                return {
                    url: `candidate/delete/${id}`,
                    method: 'DELETE',
                    mode: 'cors',
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Candidate']
        })
  }),
  overrideExisting: false,
})

export const { 
    useGetCandidatesQuery, 
    useGetCandidatesByElectionQuery, 
    useGetCandidateByIdQuery,
    useAddCandidateMutation, 
    useAmendCandidateMutation, 
    useDeleteCandidateMutation 
} = candidateApi