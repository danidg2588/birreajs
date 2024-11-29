import React from 'react'
import { FaBookmark } from "react-icons/fa6";

export const PaymentOption = ({payment, setPayment, setStepper}) => {
  const handleOption = (optionselected) =>{
    setPayment(optionselected)
    if (optionselected === "false"){
      setStepper(9)
    } else {
      setStepper(6)
    }
  }  
  return (
    <div className="input-wrapper">
      <FaBookmark />
      <select name="" id=""
        className='searching-text text-center'
        onChange={(e) => {handleOption(e.target.value)}}
      >
        <option value={true}>Sí, reservar pagar</option>
        <option value={false}>No, solo reservar</option>
      </select>
    </div>
  )
}