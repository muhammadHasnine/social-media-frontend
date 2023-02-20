import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = ({isAuthenticated}) => {
  return (

      <div className="SideBarForPc" style={{display:!isAuthenticated && "none"}}>
        <div className="logo">
          <img
            src="https://fontmeme.com/permalink/221123/a8c02576afa770e7293fe4207490c566.png"
            alt="ajtimae"
          />
        </div>
        <div className="navigateLinks">
          <ul>
            <li>
              <Link to="/">
                <img className="imge" src="/hut.png" alt="Home" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/search">
                <img className="imge" src="/search.png" alt="search" />
                <span>Search</span>
              </Link>
            </li>
            <li>
              <Link to="/newpost">
                <img className="imge" src="/tab.png" alt="create" />
                <span>Create</span>
              </Link>
            </li>
            <li>
              <Link to="/account">
                <img className="imge" src="/user.png" alt="account" />
                <span>Account</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    
  );
};

export default Navbar;
