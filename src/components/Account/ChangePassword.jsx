import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { updatePassword } from "../../actions/User";
const ChangePassword = () => {
  const { loading,error,message } = useSelector((state) => state.likeComment);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handlePasswordChangeForm = (e) => {
    e.preventDefault();
    dispatch(updatePassword(formData.oldPassword,formData.newPassword))
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
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
  }, [error,message,dispatch]);
  return (
    <div className="ChangePasswordBox">
      <div className="ChangePassworMainContainer">
        <div className="ChangePassworFormContainer">
          <p>
            "What is important is no longer either a signature or a number, but
            a code: the code is a password."
          </p>
          <form className="ChangePassworForm" onSubmit={handlePasswordChangeForm}>
            <input
              type="text"
              placeholder="Old Password"
              name="oldPassword"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="New Password"
              name="newPassword"
              onChange={handleChange}
            />
            <input
              disabled={
                formData.oldPassword && formData.newPassword ? false : true
              }
              style={{
                background:
                  formData.oldPassword && formData.newPassword ? "" : "#89e6d0",
                border: "1px solid #89e6d0",
              }}
              type="submit"
              value="Change Password"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
