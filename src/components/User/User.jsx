import React from 'react';
import {Link} from 'react-router-dom';
import './User.css'
const User = ({userId,name,avater}) => {
  return (
    <div className='userContainer' >
        <img src={avater} alt={`${name} photo`} />
        <Link to={`/user/${userId}`}>{name}</Link>
    </div>
  )
}

export default User