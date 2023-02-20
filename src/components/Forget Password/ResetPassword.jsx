import React from "react";
import "./ForgetPassword.css";
import { Link , useParams} from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify';
import { useEffect } from "react";
import { resetPassword } from "../../actions/User";
const ResetPassword = () => {
  const dispatch = useDispatch()
  const {token} = useParams()
  const {loading,error,message} = useSelector(state=>state.likeComment)
  const [password, setPassword] = useState("");
  const handleResetForm = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token,password))
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
          <img src="/padlock.png" alt="reset-icon" />
          <h1>Reset Password</h1>

    {
      message ? <h1>{message}</h1>:<>      <p>
        Please choose your new password.
      </p>
      <form className="forgetPasswordForm" onSubmit={handleResetForm}>
        <input
          type="password"
          required
          placeholder="Enter your new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          disabled={loading}
          style={{
            background: !loading ? "" : "#89e6d0",
            border: "1px solid #89e6d0",
          }}
          type="submit"
          value="Reset Password"
        />
      </form>
      <div className="or">
        <hr />
        <p>OR</p>
      </div>
      <p className="newAccount">
        <Link to="/password/forget">Request Another Token!</Link>
      </p>
      </>
    }
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

export default ResetPassword