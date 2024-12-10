import React from 'react'
import './phoneinput.css'
import { FaMobileAlt } from "react-icons/fa";

function PhoneInput({cellphone, setCellphone}) {
  return (
    <div className="input-wrapper">
      <FaMobileAlt />
        <input 
          type="tel"
          maxLength={8}
          className='searching-text text-center' 
          placeholder="6000-1234"
          value={cellphone}
          onChange={(e)=>setCellphone(e.target.value)}
          />
    </div>
  )
}

export default PhoneInput