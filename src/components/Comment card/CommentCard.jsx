import React from "react";
import "./CommentCard.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../actions/Post";
import { getMyPosts, getPostOfFollowing, getUserPosts } from "../../actions/User";
const CommentCard = ({ userId, avatar, name, comment, commentId, postId ,isAccount,userProfile=false,userProfileId}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deleteCommentHandler = async() =>{
   await dispatch(deleteComment(postId,commentId))
   if (isAccount) {
    dispatch(getMyPosts())
  }if(userProfile){
    dispatch(getUserPosts(userProfileId))
 }
   else {
    dispatch(getPostOfFollowing());
  }
  }
  return (
    <div className="commentCard">
      <div>
        <div>
          <img src={avatar} alt={name} />
          <Link to={`/user/${userId}`}>{name}</Link>
        </div>
        {
          isAccount ? <img src="/trash.png" alt="delete" onClick={deleteCommentHandler}/> : userId === user._id ? <img src="/trash.png" alt="delete" onClick={deleteCommentHandler}/>:null
        }
      </div>
      <p>{comment}</p>
    </div>
  );
};

export default CommentCard;
