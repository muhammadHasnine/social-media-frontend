import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signin from "./components/Signin/Signin";
import NotFound from "./components/NotFond/NotFond";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import ForgetPassword from "./components/Forget Password/ForgetPassword";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/User";
import { useEffect } from "react";
import Account from "./components/Account/Account";
import NewPost from "./components/New Post/NewPost";
import EditProfile from "./components/Account/EditProfile";
import ChangePassword from "./components/Account/ChangePassword";
import ResetPassword from "./components/Forget Password/ResetPassword";
import UserProfile from "./components/Account/UserProfile";
import Search from "./components/Search/Search";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(isAuthenticated)
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <div
        className={`app ${!isAuthenticated && "sm-h"}`}
        style={{ gridTemplateColumns: !isAuthenticated && "1fr" }}
      >
        <Navbar isAuthenticated={isAuthenticated} />
        <div className={`navigationRoutes ${!isAuthenticated && "sm-h"}`}>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home user={user} /> : <Login />}
            />
            <Route 
            path="/account" 
            element={isAuthenticated ? <Account /> : <Login />}/>
            <Route 
            path="/newpost" 
            element={isAuthenticated ? <NewPost /> : <Login />}/>
            <Route 
            path="/login" 
            element={!isAuthenticated && <Login />}/>
            <Route
              path="/signup"
              element={isAuthenticated ? <Account/> : <Signin />}
            />
            <Route
              path="/profile/edit"
              element={isAuthenticated ? <EditProfile/> : <Login />}
            />
            <Route
              path="/profile/changePassword"
              element={isAuthenticated ? <ChangePassword/> : <Login />}
            />
            <Route
              path="/"
              element={isAuthenticated ? <EditProfile/> : <Login />}
            />
            <Route path="/password/forget" element={isAuthenticated ?<ChangePassword/>:<ForgetPassword />} />
            <Route path="/user/:id" element={isAuthenticated ?<UserProfile/>:<Login />} />
            <Route path="/password/reset/:token" element={isAuthenticated ?<ChangePassword/>:<ResetPassword />} />
            <Route path="/search" element={isAuthenticated ? <Search/> :<Login/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      
    </Router>
  );
}

export default App;
