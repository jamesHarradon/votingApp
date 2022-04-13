import { emptySplitApi } from "./emptySplitApi";

// register admin role

const adminApiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['Admin']})

const adminApi = adminApiWithTag.injectEndpoints({
    endpoints: (build) => ({
        registerAdmin: build.mutation({
            query(body) {
                return {
                    url: 'admin/register',
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },
            invalidatesTags: ['Admin']
        }),
  }),
  overrideExisting: false,
})

export const { 
    useRegisterAdminMutation
} = adminApi