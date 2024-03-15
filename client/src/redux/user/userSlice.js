import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    isAdmin: false 
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
            state.isAdmin = action.payload.isAdmin || false; 
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
            state.isAdmin = false; 
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload; 
        }
    }
});

export const { signInStart, signInSuccess, signInFailure, logout, setIsAdmin } = userSlice.actions;
export default userSlice.reducer;
