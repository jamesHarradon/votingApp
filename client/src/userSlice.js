import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// response.text() can be used to return text if data in response is not json

export const loginUser = createAsyncThunk(
    'user/loginUser', async (body, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            if (response.ok) {
                const user = await response.json();
                return user;
            } else {
                rejectWithValue(null);
                const errorMsg = await response.text()
                throw new Error(errorMsg);
            }       
        } catch (err) {
            alert(err);
        } 
    }
)

export const logoutUser= createAsyncThunk(
    'user/logoutUser', async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                mode: 'cors'
            });
            if (response.ok) {
                return null
            } else {
                const errorMsg = await response.text()
                throw new Error(errorMsg);
            }
        } catch (err) {
            console.log(err);
        } 
    }
)

export const amendUser = createAsyncThunk(
    'user/amendUser', async (data) => {
        try {
            const response = await fetch(`/api/user/amend/${data.id}/${data.role}`, {
                method: 'PUT',
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(data.body),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            if (response.ok) {
                const user = await response.json();
                return user;
            } else {
                const errorMsg = await response.text()
                throw new Error(errorMsg);
            }       
        } catch (err) {
            console.log(err);
        } 
    }
)

//adds/removes election ids in cookie so admin is authorised to see newly created ones
export const amendElectionIdsAdmin = createAsyncThunk(
    'user/amendElectionIdsAdmin', async (data) => {
        try {
            const response = await fetch(`/api/auth/edit-cookie/${data.action}/${data.election_id}`, {
                method: 'PUT',
                credentials: 'include',
                mode: 'cors',
            });
            if (response.ok) {
                const user = await response.json();
                return user;
            } else {
                const errorMsg = await response.text()
                throw new Error(errorMsg);
            }       
        } catch (err) {
            console.log(err);
        } 
    }
)

export const getUserById = createAsyncThunk(
    'user/getUserById', async (data) => {
        try {
            const response = await fetch(`/api/user/${data.id}/${data.role}`, {
                method: 'GET',
                credentials: 'include',
                mode: 'cors',
            });
            if (response.ok) {
                const user = await response.json();
                return user;
            } else {
                const errorMsg = await response.text()
                throw new Error(errorMsg);
            }       
        } catch (err) {
            console.log(err);
        } 
    }
)

export const changePassword = createAsyncThunk(
    'user/changePassword', async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/user/amend/password/${data.id}/${data.role}`, {
                method: 'PUT',
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(data.body),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            if (response.ok) {
                return true;
            } else {
                return rejectWithValue(null);
                // const errorMsg = await response.text()
                // throw new Error(errorMsg);
            }       
        } catch (err) {
            console.log(err);
        } 
    }
)



const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        hasFailed: false,
        user: null
    },
    reducers: {
        // see store for logout action
        logout: state => {},
        
    },
    //need to find out better way to arrange extraReducers
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [loginUser.rejected]: (state) => {
            state.isLoading = false;
            state.hasFailed = true;
        },
        [logoutUser.pending]: (state) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [logoutUser.rejected]: (state) => {
            state.isLoading = false;
            state.hasFailed = true;
        },
        [amendUser.pending]: (state) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [amendUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [amendUser.rejected]: (state) => {
            state.isLoading = false;
            state.hasFailed = true;
        },
        [amendElectionIdsAdmin.pending]: (state) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [amendElectionIdsAdmin.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [amendElectionIdsAdmin.rejected]: (state) => {
            state.isLoading = false;
            state.hasFailed = true;
        },
        [getUserById.pending]: (state) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getUserById.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getUserById.rejected]: (state) => {
            state.isLoading = false;
            state.hasFailed = true;
        },
        [changePassword.pending]: (state) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        //does not alter state so have removed state.user - not sure if this is correct way
        [changePassword.fulfilled]: (state) => {
            state.isLoading = false;
            state.hasFailed = false;
        },
        [changePassword.rejected]: (state) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectHasFailed = (state) => state.user.hasFailed;

export default userSlice.reducer;