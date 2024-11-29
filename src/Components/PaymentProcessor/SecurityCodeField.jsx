import React from 'react'

export const SecurityCodeField = ({creditCard, setCreditCard}) => {
  
  const SecurityCodeField = (value) => {
    setCreditCard({
      ...creditCard,
      security:value
    })
  }
  
  return (
      <input 
        type="text"
        maxLength={3}
        placeholder='123'
        className='searching-text text-center w-50'
        onChange={(e) => SecurityCodeField(e.target.value)}
      />
  )
}
