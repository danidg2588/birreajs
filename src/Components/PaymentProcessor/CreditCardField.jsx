import React from 'react'
import { BsCreditCardFill } from "react-icons/bs";

export const CreditCardField = ({creditCard, setCreditCard}) => {
  return (
    <div className="input-wrapper">
        <BsCreditCardFill/>
        <input
          type="text"
          className='searching-text text-center'
          placeholder="1111222233334444"
          value={creditCard.number}
          onChange={(e) => setCreditCard({number:e.target.value})}
        />
    </div>
  )
}
