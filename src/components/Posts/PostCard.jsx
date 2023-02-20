import React, { useState } from "react";
import "./PostCard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, deletePost, likePost, updateCaption } from "../../actions/Post";
import { useEffect } from "react";
import { getMyPosts, getPostOfFollowing, getUserPosts, loadUser } from "../../actions/User";
import Dialog from "../Dialog/Dialog";
import User from "../User/User";
import CommentCard from "../Comment card/CommentCard";
const PostCard = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
  userProfile = false,
  userId
}) => {
  const [like, setLike] = useState(false);
  const [likeUsers, setLikeUsers] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [captionToggle, setCaptionToggle] = useState(false)
  const [captionValue, setCaptionValue] = useState(caption)

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLike = async () => {
    setLike(!like);
    await dispatch(likePost(postId));
    if (isAccount) {
      dispatch(getMyPosts())
    }if(userProfile){
      dispatch(getUserPosts(userId))
   }
     else {
      dispatch(getPostOfFollowing());
    }
  };
  const handleUpdateCaptionSubmit = (e) =>{
    e.preventDefault()
    dispatch(updateCaption(captionValue,postId))
    dispatch(getMyPosts())
  }
  const handleCommentSubmit =(e) => {
    e.preventDefault();
    dispatch(addCommentOnPost(postId, commentValue));
    if (isAccount) {
      dispatch(getMyPosts())
    }if(userProfile){
       dispatch(getUserPosts(userId))
    }
     else {
      dispatch(getPostOfFollowing());
    }
  };
  const handleDeletePost = async() =>{
    await dispatch(deletePost(postId))
    dispatch(getMyPosts())
    dispatch(loadUser())
  }
  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLike(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="postContainer">
      <div className="postHeader">
        <div>
          <img src={ownerImage} alt={`${ownerName} photo`} />
          <Link to={`/user/${ownerId}`}>{ownerName}</Link>
        </div>
        {isAccount ? (
          <button>
            <img src="/more.png" alt="more" onClick={()=>setCaptionToggle(true)}/>
          </button>
        ) : null}
      </div>
      <div className="postImage">
        <img src={postImage} alt="post image" />
      </div>
      <div className="postLike">
        {like ? (
          <img onClick={handleLike} src="/redHeart.png" alt="like" />
        ) : (
          <img onClick={handleLike} src="/heart.png" alt="Unlike" />
        )}

        <img
          src="/chat.png"
          alt="comment"
          onClick={() => setCommentToggle(true)}
        />
        {isDelete ? <img src="/trash.png" alt="delete" onClick={handleDeletePost} /> : null}
      </div>
      <div className="postCaption">
        <button
          disabled={likes.length === 0 ? true : false}
          onClick={() => setLikeUsers(true)}
        >
          {likes.length} likes
        </button>
        <p>
          <span>{ownerName}</span>
          {caption}
        </p>
      </div>
     
<Dialog open={captionToggle} onClose={setCaptionToggle}>
<div className="likeDialogBox">
<h1>Update Caption</h1>
<form className="postComment" onSubmit={handleUpdateCaptionSubmit}>
            <input
              type="text"
              placeholder="Caption here..."
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
            />
            <input type="submit" value="Update" />
          </form>
</div>
</Dialog>
      <Dialog open={likeUsers} onClose={setLikeUsers}>
        <div className="likeDialogBox">
          <h1>Liked by</h1>
          <div>
            {likes.map((like) => (
              <User
                key={like._id}
                userId={like._id}
                avater={like.avatar?.url}
                name={like.name}
              />
            ))}
          </div>
        </div>
      </Dialog>
      <Dialog open={commentToggle} onClose={setCommentToggle}>
        <div className="likeDialogBox">
          <h1>Comments</h1>
          <form className="postComment" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Comment here..."
              onChange={(e) => setCommentValue(e.target.value)}
            />
            <input type="submit" value="Post" />
          </form>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard
                key={comment?.user?._id}
                userId={comment?.user?._id}
                avatar={comment?.user?.avatar?.url}
                name={comment?.user?.name}
                comment={comment?.comment}
                commentId={comment?._id}
                postId={postId}
                isAccount={isAccount}
                userProfileId={userId}
                userProfile={userProfile}
              />
            ))
          ) : (
            <h5>No Comment yet</h5>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default PostCard;
