import React, { useState } from 'react'
import './NewPost.css'
import {useSelector,useDispatch} from 'react-redux'
import { createNewPost } from '../../actions/Post'
import { useEffect } from 'react'
import {toast} from "react-toastify"
import Loader from '../Loader/Loader';
import { loadUser } from '../../actions/User'
const NewPost = () => {
  const {loading,error,message} = useSelector(state=>state.likeComment)
  const dispatch = useDispatch();
  const [image, setImage] = useState("")
  const [caption, setCaption] = useState("")
  const handleImageChange = (e) =>{
    const file = e.target.files[0]
    const Reader = new FileReader()
    Reader.readAsDataURL(file)
    Reader.onload = ()=>{
      if(Reader.readyState === 2){
        setImage(Reader.result)
      }
    }
  }
  const postSubmitHandler = async(e) =>{
    e.preventDefault()
    await dispatch(createNewPost(caption,image))
    dispatch(loadUser());
  }
  useEffect(()=>{
    if(error){
      toast.error(error)
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
  },[error,message,dispatch])
  return (
    <div className='newPostContainer'>
        <form className="newPostForm" onSubmit={postSubmitHandler}>
          <img src={`${image ? image : '/user.png'}`} alt="photo" />
          <input type="file" accept='image/*' onChange={handleImageChange}/>
          <input type="text" placeholder='Write caption' onChange={(e)=>setCaption(e.target.value)} />
          <input disabled={loading} style={{background:loading ? "#2cf6f961" :"#2cf6f9"}} type="submit" value="Create" />
        </form>
    </div>
  )
}

export default NewPost