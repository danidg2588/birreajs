import React from 'react'
import './accountSection.css'
import { BiSolidChevronRight } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

export const AccountSection = () => {
  return (
    <div className='account'>
      <div className="foreground"></div>
      <div className="icons flex">
        <BiSolidChevronRight className='icon' />
        <BsThreeDots className='icon' />
      </div>
      <div className="account-details">
        Hello
      </div>
    </div>
  )
}
