import React, {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import { FaClock } from "react-icons/fa";


export const TimePickerField = ({date, setDate, setStepper, setIsLoading}) => {

  const resetMinTime = (value) => {
    date.setHours(value);
    setDate(date)
    setStepper(3)
    // setIsLoading(true)
  }

  let today = new Date()
  let hours = document.getElementById("select-time-picker")?.querySelectorAll("option")

  useEffect(() => {
    let rightnow = new Date(new Date(new Date().setMinutes(0)).setHours(new Date().getHours()+2));
    if (today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()){
      
      for (let i = 0; i < hours?.length; i++) {
        if (rightnow.getHours() > hours[i].value)
        {
          if (hours[i].value != 0){
            hours[i].style.display = "none"
          }
        } else {
          hours[i].style.display = "block"
        }
        
        if (date.getHours() === hours[i].value)
        {
          hours[i].selected = true
        }
      }

    } else {
      for (let i = 0; i < hours?.length; i++) {
        hours[i].style.display = "block";

        if (date.getHours() === hours[i].value)
          {
            hours[i].selected = true
          }
      }
    }
  },[{},date]);

  return (
    <div className='input-wrapper'>
      <FaClock/>
      <select
      defaultValue={0}
        id='select-time-picker'
        className='select-date-picker searching-text text-center'
        onChange={(value)=>resetMinTime(value.target.value)}
      >
        <option value="0" disabled>Seleccione una hora</option>
        <option value="8">8:00 am</option>
        <option value="9">9:00 am</option>
        <option value="10">10:00 am</option>
        <option value="11">11:00 am</option>
        <option value="12">12:00 md</option>
        <option value="13">1:00 pm</option>
        <option value="14">2:00 pm</option>
        <option value="15">3:00 pm</option>
        <option value="16">4:00 pm</option>
        <option value="17">5:00 pm</option>
        <option value="18">6:00 pm</option>
        <option value="19">7:00 pm</option>
        <option value="20">8:00 pm</option>
        <option value="21">9:00 pm</option>
        <option value="22">10:00 pm</option>
        <option value="23">11:00 pm</option>

      </select>
      </div>
  )
}

