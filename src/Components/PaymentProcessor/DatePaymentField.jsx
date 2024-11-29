import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { FaCalendar } from "react-icons/fa";

export const DatePaymentField = ({creditCard,setCreditCard}) => {

  const handleDatePaymentField = (value) => {
    setCreditCard({
      ...creditCard,
      date:value
    })

    console.log([creditCard],"Hellooo down there")
  }


  return (
    <DatePicker
      selected={creditCard.date}
      value={creditCard.date}
      onChange={(value) => handleDatePaymentField(value)}
      openToDate={new Date()}
      minDate={new Date()}
      className='searching-text date-picker text-center w-50'
      dateFormat="MM/yyyy"
      showMonthYearPicker
    />
  )
}
