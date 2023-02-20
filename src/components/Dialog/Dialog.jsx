import React from 'react'
import './Dialog.css'
const Dialog = ({children,open,onClose}) => {
  // className={`dialogContainer ${open && 'open'}`} onClick={()=>onClose(false)}
  return (
    <div className={`dialogContainer ${open && 'open'}`} >
        <div className="dialogBackground" onClick={()=>onClose(false)}>
        </div>
        <div className="dialogmainBox">
      
        {children}
       
        </div>
    </div>
  )
}

export default Dialog