import { emptySplitApi } from "./emptySplitApi";

//login user

const userApiWithTag = emptySplitApi.enhanceEndpoints({addTagTypes: ['User']})

const userApi = userApiWithTag.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation({
            query(body) {
                return {
                    url: 'auth/login',
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },
        }),
        logoutUser: build.mutation({
            query() {
                return {
                    url: 'auth/logout',
                    method: 'POST',
                    mode: 'cors'
                }
            }
        })  
  }),
  overrideExisting: false,
})

export const { useLoginUserMutation, useLogoutUserMutation } = userApi