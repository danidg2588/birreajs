import React from 'react'
import { MdEmail } from "react-icons/md";

export const EmailInput = ({emailAddress,setEmailAddress}) => {
  return (
    <div className="input-wrapper">
      <MdEmail />
        <input 
          type="email"
          className='searching-text text-center' 
          placeholder="usuario@email.com"
          value={emailAddress}
          onChange={(e)=>setEmailAddress(e.target.value)}
          />
    </div>
  )
}
