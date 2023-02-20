import React from 'react';
import PostCard from '../Posts/PostCard';
import User from '../User/User';
import './Home.css';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react';
import { getPostOfFollowing } from '../../actions/User';
import {toast} from "react-toastify"
import Loader from '../Loader/Loader';

const Home = ({user}) => {
const dispatch = useDispatch()
const {loading,error,posts} = useSelector(state=>state.postOfFollowing)

const {error:likeCommentError,message} = useSelector(state=>state.likeComment)
 useEffect(() => {
   dispatch(getPostOfFollowing())  
 }, [dispatch])
 useEffect(()=>{
  if(error){
    toast.error(error)
    dispatch({
      type:"clearError"
    })
  }
  if(likeCommentError){
    toast.error(likeCommentError)
    dispatch({
      type:"clearError"
    })
  }
  if(message){
    toast.success(message)
    dispatch({
      type:"clearMessage"
    })
  }
},[error,message,likeCommentError,dispatch])
  return (
   loading ? <Loader/> : ( <div className='homeContainer'>
   <div className="homeLeft">
    {
      posts && posts.length > 0 ? posts.map((post)=>(
        <PostCard 
        key={post._id}
     postId={post._id} 
     caption={post.caption} 
     postImage={post.image.url} 
     likes = {post.likes}
     comments = {post.comments}
     ownerImage ={post.owner.avatar.url}
     ownerName={post.owner.name}
     ownerId={post.owner._id}
     
/>
      )) : <h1 style={{marginTop:"50vh"}}> No Post are Available</h1>
    }  
   </div>
   <div className="homeRight">
  <div className="myProfile">
     <img  src={user?.avatar?.url} alt="myProfile" />
     <Link  to={`/account`}>{user?.name}</Link>
  </div>
  <div className="usersProfiles">
    <p>Followers</p>
    {
      user && user.followers.length > 0 ? user.followers.slice(0,3).map((user)=>(
        <User 
        key={user._id}
        userId={user._id} 
        avater={user.avatar?.url} 
        name={user.name}
        />)) :
      <h2>No followers yet.</h2>
    }
    <Link className='accountLink' to='/account'>more</Link>
  </div>
  <div className="usersProfiles">
    <p>Following</p>
    {
      user && user.following.length > 0 ? user.following.slice(0,3).map((user)=>(
        <User 
        key={user._id}
        userId={user._id} 
        avater={user.avatar?.url} 
        name={user.name}
        />)) :
      <h2>No followers yet.</h2>
    }
     <Link className='accountLink'  to='/account'>more</Link>
  </div>
  <div className="footerContainer">
          <p>© 2022 Ajtimae from Fonoon</p>
        </div>
   </div>
 </div>)
  )
}

export default Home