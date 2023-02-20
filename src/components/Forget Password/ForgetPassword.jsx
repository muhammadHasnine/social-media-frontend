import React from "react";
import "./ForgetPassword.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify';
import { forgetPassword } from "../../actions/User";
import { useEffect } from "react";
const ForgetPassword = () => {
  const dispatch = useDispatch()
  const {loading,error,message} = useSelector(state=>state.likeComment)
  const [email, setEmail] = useState("");
  const handleForgetForm = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email))
  };
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
  },[error,message,dispatch])
  return (
    <div className="forgetPasswordBox">
      <div className="mainContainer">
        <div className="forgetPasswordFormContainer">
          <img src="/clock-padlock.png" alt="calligraphy-fonts" border="0" />
          <h1>Trouble logging in?</h1>

          <p>
            Enter your email and we'll send you a link to get back into your
            account.
          </p>
          <form className="forgetPasswordForm" onSubmit={handleForgetForm}>
            <input
              type="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              disabled={loading}
              style={{
                background: !loading ? "" : "#89e6d0",
                border: "1px solid #89e6d0",
              }}
              type="submit"
              value="Send"
            />
          </form>
          <div className="or">
            <hr />
            <p>OR</p>
          </div>
          <p className="newAccount">
            <Link to="/signup">Create new account</Link>
          </p>
          <div>
            <Link to="/">
              <p>Back to login</p>
            </Link>
          </div>
        </div>

        <div className="footerContainer">
          <p>© 2022 Ajtimae from Fonoon</p>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
