import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signin.css";
import {useDispatch,useSelector} from "react-redux";
import {signupUser} from "../../actions/User";
const Signin = () => {
  const dispatch = useDispatch()
  const {loading,error} = useSelector(state=>state.user)
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    avatar:"/user.png"
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
          avatar:Reader.result
        })
      }
    }
  }
  const handleSignupForm = (e) =>{
    e.preventDefault()
    console.log({formData})
    dispatch(signupUser(formData.name,formData.email,formData.password,formData.avatar))
  }
  return (
    <div className="SigninBox">
      <div className="mainContainer">
        <div className="SignupFormContainer">
          <img
            src="https://fontmeme.com/permalink/221123/a8c02576afa770e7293fe4207490c566.png"
            alt="calligraphy-fonts"
            border="0"
          />
          <p>Sign up to see photos and videos from your friends.</p>
          <img src={formData.avatar} alt="avatar" />
          <form className="signupForm" onSubmit={handleSignupForm}>
            <input type="text" required placeholder="Full Name" name="name" onChange={handleChange}/>
            <input type="email" required placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" required placeholder="Password" name="password" onChange={handleChange}/>
            <input type="file" required accept='image/*' onChange={handleImageChange}/>
            <p>By signing up, you agree to our <a href="#">Terms</a> , <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a> .</p>
            <input disabled={loading} style={{background:formData.name && formData.email && formData.password ? "":"#89e6d0",border:"1px solid #89e6d0"}} type="submit" value="Sign up" />
          </form>
        </div>
        <div className="haveAccountContainer">
          <p>Have an account? <Link to="/">Log in</Link></p>
        </div>
        <div className="appContainer">
          <p>Get the app</p>
          <div>
            <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="playicon" />
            <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="appicon" />
          </div>
        </div>
        <div className="footerContainer">
          <p>© 2022 Ajtimae from Fonoon</p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
