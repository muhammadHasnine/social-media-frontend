import React, { useState } from "react";
import "./EditProfile.css";
import {useDispatch,useSelector} from "react-redux";
import { loadUser, updateProfile } from "../../actions/User";
import { useEffect } from "react";
import {toast} from 'react-toastify';
import Loader from "../Loader/Loader";
const EditProfile = () => {
  const dispatch = useDispatch()
  const {loading,error,user} = useSelector(state=>state.user)
  const {loading:updateLoading,error:updateError,message} = useSelector(state=>state.likeComment)
  const [formData, setFormData] = useState({
    name:user.name,
    email:user.email,
    avatar:"",
    avatarPreview:user.avatar.url
  })
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleImageChange = (e) =>{
    const file = e.target.files[0]
    const Reader = new FileReader()
    Reader.readAsDataURL(file)
    Reader.onload = ()=>{
      if(Reader.readyState === 2 ){
        setFormData({
          ...formData,
          avatarPreview:Reader.result,
          avatar:Reader.result
        })
      }
    }
  }
  const handleUpdateForm = async(e) =>{
    e.preventDefault()
    await dispatch(updateProfile(formData.name,formData.email,formData.avatar))
    dispatch(loadUser())
  }
  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({
        type:"clearErrors"
      })
    }
    if(updateError){
      toast.error(updateError)
      dispatch({
        type:"clearErrors"
      })
    }
    if(message){
      toast.success(message)
      dispatch({
        type:"clearMessage"
      })
    }

  },[error,message,updateError,dispatch])
  return (
    loading ? <Loader/> :(<div className="editProfileBox">
    <div className="editProfileMainContainer">
      <div className="editProfileFormContainer">
        <p>Update your profile</p>
        <img src={formData.avatarPreview} alt="avatar" />
        <form className="editProfileForm" onSubmit={handleUpdateForm}>
          <input type="text"  placeholder="Full Name" value={formData.name} name="name" onChange={handleChange}/>
          <input type="email"  placeholder="Email" value={formData.email} name="email" onChange={handleChange} />
          <input type="file"  accept='image/*' onChange={handleImageChange}/>
          <input disabled={updateLoading} style={{background:formData.name && formData.email ? "":"#89e6d0",border:"1px solid #89e6d0"}} type="submit" value="Update" />
        </form>
      </div>
    </div>
  </div>)
  );
};



export default EditProfile