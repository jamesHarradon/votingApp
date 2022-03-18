import { emptySplitApi } from "./emptySplitApi";

// get all manifestos by election id
//get manifesto by candidate id
// add a manifesto
// amend a manifesto
//delete a manifesto 

const manifestoApiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Manifesto']})

const manifestoApi = manifestoApiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getAllManifestosByElection: build.query({
            query: (id) => `manifesto/all/${id}`,
            providesTags: ['Manifesto']
        }),
        getManifestoByCandidate: build.query({
            query: (id) => `manifesto/${id}`,
            providesTags: ['Manifesto']
        }),
        addManifesto: build.mutation({
            query(body) {
                return {
                    url: 'manifesto/add',
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },
            invalidatesTags: ['Manifesto']
        }),
        amendManifesto: build.mutation({
            query(data) {
                const { id, body } = data;
                return {
                    url: `manifesto/amend/${id}`,
                    method: 'PUT',
                    mode: 'cors',
                    credentials: 'include',
                    body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },
            invalidatesTags: ['Manifesto']
        }),
        deleteManifesto: build.mutation({
            query(id) {
                return {
                    url: `manifesto/delete/${id}`,
                    method: 'DELETE',
                    mode: 'cors',
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Manifesto']
        }),
  }),
  overrideExisting: false,
})

export const { 
    useGetAllManifestosByElectionQuery, 
    useGetManifestoByCandidateQuery,
    useAddManifestoMutation, 
    useAmendManifestoMutation, 
    useDeleteManifestoMutation, 
} = manifestoApi