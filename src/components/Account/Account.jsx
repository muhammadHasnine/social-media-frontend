import React, { useEffect } from "react";
import "./Account.css";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "../Dialog/Dialog";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { deleteMyProfile, getMyPosts, loadUser, logoutUser } from "../../actions/User";
import PostCard from "../Posts/PostCard";
import User from "../User/User";
import {toast} from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
const Account = () => {
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { loading: userLoading, user } = useSelector((state) => state.user);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.likeComment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [settings, setSettings] = useState(false);
  const logoutHandler = async() =>{
    await dispatch(logoutUser())
    toast.success("Logged out")
  }
  const handleDeleteProfile = () =>{
     dispatch(deleteMyProfile())
    dispatch(logoutUser())

   
  }
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      toast.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, likeError, dispatch]);
  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="accountContainer">
      <div className="headerSection">
        <div className="accountImage">
          <img src={user.avatar.url} alt="User Photo" />
        </div>
        <div className="accountInfo">
          <div className="nameOptions">
            <p>{user.name}</p>
           <div>
           <Link to='/profile/edit'><button>Edit profile</button></Link>
            <img
              className={`${settings && "rotate"}`}
              src="/settings.png"
              alt="gear"
              onClick={() => setSettings(true)}
            />
           </div>
          </div>
          <div className="postFollow">
            <button
            >
              <span>{user.posts.length}</span> posts
            </button>
            <button
              onClick={() => setOpenFollowers(true)}
            >
              <span>{user.followers.length}</span> followers
            </button>
            <button
              onClick={() => setOpenFollowing(true)}
            >
              <span>{user.following.length}</span> following
            </button>
          </div>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="postSection">
        
        {posts && posts.length > 0 ? (
          posts.map((post) => (
          
             <PostCard
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
            />
         
          ))
        ) : (
          <p>You have not made any post</p>
        )}
      </div>
      <Dialog open={settings} onClose={setSettings}>
      <div className="settingDialogContainer">
      <Link className="changePassword" to='/profile/changePassword'><button >Change password</button></Link> 
      <button style={{color:"blueviolet"}} onClick={logoutHandler}>Log out</button>
      <button style={{color:"red"}} onClick={handleDeleteProfile}>Delete Profile</button>
      <button onClick={()=>setSettings(false)}>Cancel</button>
      </div>
      </Dialog>
     
      <Dialog open={openFollowers} onClose={setOpenFollowers}>
        <div className="followersDialogContainer">
          {
            user && user.followers.length > 0 ? user.followers.map(follower=>(
              <User 
        key={follower._id}
        userId={follower._id} 
        avater={follower?.avatar?.url} 
        name={follower.name}
        />
            )):<h3>You have no follower</h3>
          }
       
        </div>
      </Dialog>
      <Dialog open={openFollowing} onClose={setOpenFollowing}>
      <div className="followingDialogContainer">
          {
            user && user.following.length > 0 ? user.following.map(follow=>(
              <User 
        key={follow._id}
        userId={follow._id} 
        avater={follow?.avatar?.url} 
        name={follow.name}
        />
            )):<h3>You are not following anyone</h3>
          }
       
        </div>
      </Dialog>
    </div>
  );
};

export default Account;
