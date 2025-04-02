import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import { FaCalendar } from "react-icons/fa";
import "./datepickerinput.scss"
import "./timepicker.css"

export const DatePickerInput = ({date, setDate, setStepper}) => {

  let today = new Date()

  const handleSetDate = (value) => {
    let rightnow = new Date(new Date(new Date().setMinutes(0)).setHours(new Date().getHours()+2));
    
    if (rightnow.getDate() === value.getDate() && rightnow.getMonth() === value.getMonth() && rightnow.getFullYear() === value.getFullYear())
      {
        setDate(rightnow)
      } else {
        setDate(value)
      }
      setStepper(2)

  }

  return (
    <div className='input-wrapper'>
      <FaCalendar />
      <DatePicker
        placeholderText='Seleccione una fecha y hora'
        withPortal
        // showTimeInput
        selected={date}
        onChange={(value) => {handleSetDate(value)}}
        openToDate={date}
        minDate={new Date()}
        maxDate={today.setDate(today.getDate() + 60)}
        className='date-picker searching-text text-center'
      />
    </div>
  )
}
