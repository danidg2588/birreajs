import React, { useState } from 'react'
import { IoIosTime } from "react-icons/io";


export const ReserveHoursPicker = ({bookedHours,setBookedHours}) => {

  const handleReserveHoursPicker = (value) => {
    if (value > 4 || value <= 1) {
      setBookedHours(1)
    } else {
      setBookedHours(value)
    }
  }

  return (
    <div className='input-wrapper'>
        <IoIosTime id='search-icon' />
        <input 
            type="number"
            value={bookedHours}
            onChange={(e) => handleReserveHoursPicker(e.target.value)}
            min={1}
            max={4}
            className='searching-text text-center'
        />
    </div>
  )
}
