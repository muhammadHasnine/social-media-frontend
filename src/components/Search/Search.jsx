import React from "react";
import "./Search.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import User from '../User/User';
import { getAllUsers } from "../../actions/User";
const Search = () => {
  const {error,users} = useSelector(state=>state.allUsers)
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  
  const handlePasswordChangeForm = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(search))
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type:"clearErrors"
      })
    }
   
  }, [error,dispatch]);
  return (
    <div className="SearchUserBox">
      <div className="SearchUserMainContainer">
        <div className="SearchUserFormContainer">
         
          <form style={{position:"relative"}} className="SearchUserForm" onSubmit={handlePasswordChangeForm}>
           
            <input
              type="search"
              placeholder="Search"
              name="newPassword"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <input style={{position:"absolute",padding:"7px",right: 0}} type="submit" value={"Search"} />
          </form>
          <div className="SearchUserList">
            {
                users && users.map(user=>(
                    <User 
                    key={user._id}
                    userId={user._id} 
                    avater={user.avatar?.url} 
                    name={user.name}
                    />
                ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};




export default Search