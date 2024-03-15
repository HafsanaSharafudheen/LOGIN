import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    isAdmin:false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAdmin(state, action) {
            state.isAdmin = action.payload;
          },
         
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        }
    }
});

export const {setIsAdmin, signInStart, signInSuccess, signInFailure, logout } = userSlice.actions;
export default userSlice.reducer;
