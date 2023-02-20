import {configureStore} from '@reduxjs/toolkit';
import {allUsersReducer, postOfFollowingReducer, UserProfileReducer, userReducer} from './reducers/User';
import {likeCommentReducer, myPostReducer, userPostsReducer} from './reducers/Post'
const store = configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducer,
        allUsers:allUsersReducer,
        likeComment:likeCommentReducer,
        myPosts:myPostReducer,
        userProfile:UserProfileReducer,
        userPosts:userPostsReducer
    }
})
export default store;