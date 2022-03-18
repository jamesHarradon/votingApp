import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'user/loginUser', async (body, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
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
                const errorMsg = await response.json()
                throw new Error(errorMsg);
            }       
        } catch (err) {
            console.log(err);
        } 
    }
)

export const logoutUser= createAsyncThunk(
    'user/logoutUser', async () => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                mode: 'cors'
            });
            if (response.ok) {
                return null
            } else {
                const errorMsg = await response.json()
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
            const response = await fetch(`http://localhost:4000/api/user/${data.id}/${data.role}`, {
                method: 'POST',
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
                const errorMsg = await response.json()
                throw new Error(errorMsg);
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
        logout: state => {}
    },
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
        }
    }
})

export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectHasFailed = (state) => state.user.hasFailed;

export default userSlice.reducer;