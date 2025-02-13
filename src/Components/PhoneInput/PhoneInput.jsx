import React from 'react'
import './phoneinput.css'
import { FaMobileAlt } from "react-icons/fa";

function PhoneInput({cellphone, setCellphone}) {

  const handlePhoneNumber = (text) => {
    let phone

    if (String(text).length === 1){
      setCellphone(6)
    }
    else if (String(text).length === 8 && Number(text)) {
      phone = text.replace("-",'')
      setCellphone(String(text).slice(0,4)+"-"+String(text).slice(4,10))
    } 
    else {
      phone = text.replace(/[^0-9]/g,'')
      setCellphone(phone)
    }
  }
  
  return (
    <div className="input-wrapper">
      <FaMobileAlt />
        <input 
          type="tel"
          maxLength={9}
          className='searching-text text-center' 
          placeholder="6000-1234"
          value={cellphone}
          onChange={(e) => handlePhoneNumber(e.target.value)}
          inputMode='numeric'
          pattern="[0-9]*"
          />
    </div>
  )
}

export default PhoneInput