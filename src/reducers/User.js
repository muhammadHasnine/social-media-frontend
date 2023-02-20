import {createReducer} from '@reduxjs/toolkit';
const initalState = {};
export const userReducer = createReducer(initalState,{
    LogingRequest : (state)=>{
        state.loading = true;
    },
    LogingSuccess : (state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LogingFailure : (state,action)=>{
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false;
    },
    SignupRequest : (state)=>{
        state.loading = true;
    },
    SignupSuccess : (state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    SignupFailure : (state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    LoadUserRequest : (state)=>{
        state.loading = true;
    },
    LoadUserSuccess : (state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoadUserFailure : (state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    logoutUserRequest : (state)=>{
        state.loading = true;
    },
    logoutUserSuccess : (state)=>{
        state.loading = false;
        state.user = null
        state.isAuthenticated = false;
    },
    logoutUserFailure : (state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },
    clearErrors:(state)=>{
        state.error =  null
    }
})
export const postOfFollowingReducer = createReducer(initalState,{
    postOfFollowingRequest:(state)=>{
        state.loading = true;
    },
    postOfFollowingSuccess:(state,action)=>{
        state.loading = false;
        state.posts = action.payload;
    },
    postOfFollowingFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors:(state)=>{
        state.error =  null
    }
})
export const allUsersReducer = createReducer(initalState,{
    allUsersRequest:(state)=>{
        state.loading = true;
    },
    allUsersSuccess:(state,action)=>{
        state.loading = false;
        state.users = action.payload;
    },
    allUsersFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors:(state)=>{
        state.error =  null
    }
})
export const UserProfileReducer = createReducer(initalState,{
    userProfileRequest:(state)=>{
        state.loading = true;
    },
    userProfileSuccess:(state,action)=>{
        state.loading = false;
        state.user = action.payload;
    },
    userProfileFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors:(state)=>{
        state.error =  null
    }
})
