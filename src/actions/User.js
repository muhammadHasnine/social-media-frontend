import axios from "axios";
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LogingRequest",
    });
    const { data } = await axios.post(
      "https://mern-social-media-cm3p.vercel.app/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: "LogingSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LogingFailure",
      payload: error.response.data.message,
    });
  }
};
export const signupUser = (name, email, password,avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "SignupRequest",
    });
    const { data } = await axios.post(
      "https://mern-social-media-cm3p.vercel.app/api/v1/register",
      { name, email, password,avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: "SignupSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "SignupFailure",
      payload: error.response.data.message,
    });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get("https://mern-social-media-cm3p.vercel.app/api/v1/me", {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};
export const getPostOfFollowing = () => async (dispatch)=>{
    try {
        dispatch({type:"postOfFollowingRequest"})
        const {data} = await axios.get("https://mern-social-media-cm3p.vercel.app/api/v1/posts",{
          withCredentials: true,
        })
        dispatch({
            type:"postOfFollowingSuccess",
            payload:data.posts
        })
        
    } catch (error) {
        dispatch({
            type: "postOfFollowingFailure",
            payload: error.response.data.message,
          });
    }
}
export const getAllUsers = (name="") => async (dispatch)=>{
  try {
      dispatch({type:"allUsersRequest"})
      const {data} = await axios.get(`https://mern-social-media-cm3p.vercel.app/api/v1/users?name=${name}`,{
        withCredentials: true,
      })
      dispatch({
          type:"allUsersSuccess",
          payload:data.users
      })
      
  } catch (error) {
      dispatch({
          type: "allUsersFailure",
          payload: error.response.data.message,
        });
  }
}
export const getMyPosts = () => async (dispatch)=>{
  try {
      dispatch({type:"myPostsRequest"})
      const {data} = await axios.get("https://mern-social-media-cm3p.vercel.app/api/v1/my/posts",{
        withCredentials: true,
      })
      dispatch({
          type:"myPostsSuccess",
          payload:data.posts
      })
      
  } catch (error) {
      dispatch({
          type: "myPostsFailure",
          payload: error.response.data.message,
        });
  }
}
export const logoutUser = () => async (dispatch)=>{
  try {
      dispatch({type:"logoutUserRequest"})
      await axios.delete("https://mern-social-media-cm3p.vercel.app/api/v1/logout",{
        withCredentials: true,
      })
      dispatch({
          type:"logoutUserSuccess"
      })
      
  } catch (error) {
      dispatch({
          type: "logoutUserFailure",
          payload: error.response.data.message,
        });
  }
}
export const updateProfile = (name, email,avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });
    const { data } = await axios.put(
      "https://mern-social-media-cm3p.vercel.app/api/v1/update/profile",
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};
export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({
      type: "updatePasswordRequest",
    });
    const { data } = await axios.put(
      "https://mern-social-media-cm3p.vercel.app/api/v1/update/password",
      { oldPassword, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: "updatePasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updatePasswordFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });
    const { data } = await axios.delete(
      "https://mern-social-media-cm3p.vercel.app/api/v1/delete/me",
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgetPasswordRequest",
    });
    const { data } = await axios.post(
      "https://mern-social-media-cm3p.vercel.app/api/v1/forgot/password",{
        email
      },
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "forgetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};
export const resetPassword = (token,password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });
    const { data } = await axios.put(
      `https://mern-social-media-cm3p.vercel.app/api/v1/password/reset/${token}`,{
        password
      },
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};
export const getUserProfile = (id) => async (dispatch)=>{
  try {
      dispatch({type:"userProfileRequest"})
      const {data} = await axios.get(`https://mern-social-media-cm3p.vercel.app/api/v1/user/${id}`,{
        withCredentials: true,
      })
      dispatch({
          type:"userProfileSuccess",
          payload:data.user
      })
      
  } catch (error) {
      dispatch({
          type: "userProfileFailure",
          payload: error.response.data.message,
        });
  }
}
export const getUserPosts = (id) => async (dispatch)=>{
  try {
      dispatch({type:"userPostsRequest"})
      const {data} = await axios.get(`https://mern-social-media-cm3p.vercel.app/api/v1/user/posts/${id}`,{
        withCredentials: true,
      })
      dispatch({
          type:"userPostsSuccess",
          payload:data.posts
      })
      
  } catch (error) {
      dispatch({
          type: "userPostsFailure",
          payload: error.response.data.message,
        });
  }
}
export const followAndUnfollowUser = (id) => async (dispatch)=>{
  try {
      dispatch({type:"followUserRequest"})
      const {data} = await axios.get(`https://mern-social-media-cm3p.vercel.app/api/v1/follow/${id}`,{
        withCredentials: true,
      })
      dispatch({
          type:"followUserSuccess",
          payload:data.message
      })
      
  } catch (error) {
      dispatch({
          type: "followUserFailure",
          payload: error.response.data.message,
        });
  }
}