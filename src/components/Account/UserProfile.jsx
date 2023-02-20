import React, { useEffect } from "react";
import "./Account.css";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "../Dialog/Dialog";
import { useState } from "react";
import Loader from "../Loader/Loader";
import {  followAndUnfollowUser, getMyPosts, getUserPosts, getUserProfile, loadUser} from "../../actions/User";
import PostCard from "../Posts/PostCard";
import User from "../User/User";
import {toast} from "react-toastify"
import { Link, useNavigate, useParams } from "react-router-dom";
const UserProfile = () => {
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const { loading: userProfileLoading, user, error:userProfileError } = useSelector((state) => state.userProfile);
  const { loading: userLoading, user:me } = useSelector((state) => state.user);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.likeComment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams()
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [following, setFollowing] = useState(false);
  console.log(following)

 const followHandler = async () =>{
    setFollowing(!following)
   await dispatch(followAndUnfollowUser(user._id))
   dispatch(getUserProfile(id))
 }
  useEffect(() => {
    dispatch(getUserPosts(id));
    dispatch(getUserProfile(id))
  }, [dispatch,id]);
  useEffect(()=>{
    if(me._id === id){
      navigate('/account')
  }
    if(user){
      user.followers.forEach(item=>{
        if(item._id === me._id){
          setFollowing(true)
        }
        else{
          setFollowing(false)
        }
      })
    }
  },[me._id,navigate,id,user])
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (followError) {
      toast.error(followError);
      dispatch({ type: "clearErrors" });
    }
    if (userProfileError) {
      toast.error(userProfileError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, followError, dispatch,userProfileError]);
  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="accountContainer">
    {
      user &&   <div className="headerSection">
      <div className="accountImage">
        <img src={user.avatar.url} alt="User Photo" />
      </div>
      <div className="accountInfo">
        <div className="nameOptions">
          <p>{user.name}</p>
         <div>
         <button className="following" style={{background:following && "#ff00002e",color:following ? "red" :"#1098f3"}} onClick={followHandler}>{following ? "Unfollow" : "Follow"}</button>
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
    }
    
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
              userId={id}
              userProfile={true}
            />
         
          ))
        ) : (
          <p>You have not made any post</p>
        )}
      </div>
     
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
            )):<h3>Omuk have no follower</h3>
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
            )):<h3>User not following anyone</h3>
          }
       
        </div>
      </Dialog>
    </div>
  );
};


export default UserProfile