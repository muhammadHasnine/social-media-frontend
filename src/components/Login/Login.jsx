import React from "react";
import "./Login.css";
import {Link} from 'react-router-dom'
import { useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import {loginUser} from "../../actions/User";
import { useEffect } from "react";
import {toast} from 'react-toastify'
const Login = () => {
  const {error} = useSelector(state=>state.user)
  const {message} = useSelector(state=>state.likeComment)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }
  const handleLoginForm = (e) =>{
    e.preventDefault()
    dispatch(loginUser(formData.email,formData.password))
  }
  useEffect(()=>{
    if(error){
      toast.error(error)
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
  },[error,dispatch,message])
  return (
    <div className="LoginBox">
      <div className="mainContainer">
        <div className="LoginFormContainer">
          <img
            src="https://fontmeme.com/permalink/221123/a8c02576afa770e7293fe4207490c566.png"
            alt="calligraphy-fonts"
            border="0"
          />
         
          <form className="LoginForm" onSubmit={handleLoginForm}>
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <Link to="/password/forget">Forgot password?</Link>
            <input disabled={formData.email && formData.password ? false : true} style={{background:formData.email && formData.password ? "":"#89e6d0",border:"1px solid #89e6d0"}} type="submit" value="Log in" />
          </form>
        </div>
        <div className="dontHaveAccountContainer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
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
export default Login