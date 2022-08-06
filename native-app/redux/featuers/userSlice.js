import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const SingupAction = createAsyncThunk(
//     "api/signup",
//     async ({ email, password }) => {
//         Api.signup({ email, password });
//     }
// );

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        SingupAction : (state,action) => {
            state.user = action.payload
        },
        logoutAction: (state) => {
            state.user = null
        }
    },
    extraReducers: {
        // [SingupAction.pending]: (state) => {
        //     state.loading = true;
        // },
        // [SingupAction.fulfilled]: (state, action) => {
        //     (state.loading = false), (state.user = action.payload.data);
        // },
        // [SingupAction.rejected]: (state, action) => {
        //     (state.loading = false), (state.error = action.payload);
        // },
    },
});

export const {SingupAction,logoutAction} = userSlice.actions


export default userSlice.reducer;
