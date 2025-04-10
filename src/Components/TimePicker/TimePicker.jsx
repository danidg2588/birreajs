import React from 'react'
import './timepicker.scss'

import { FaMinus, FaPlus } from "react-icons/fa6";


const TimePicker = ({decreaseValue, increaseValue, timeSelector, setTimeSelector, wizard, setWizard}) => {
  return (
    <div className="picker-container">
        <div className="picker-control">
            <button className="picker minus" onClick={()=>decreaseValue()}>
                <FaMinus className='icon-picker' />
            </button>
            <button onClick={() => setTimeSelector(!timeSelector)} className="selection">
                <span className={timeSelector?"active":""}>
                    {wizard.date.getHours()}
                </span>
                :
                <span className={!timeSelector?"active":""}>
                    {wizard.date.getMinutes() < 10 ? '0' + wizard.date.getMinutes() : wizard.date.getMinutes()}
                </span>
            </button>
            <button className="picker plus" onClick={()=>increaseValue()}>
                <FaPlus className='icon-picker' />
            </button>
        </div>
    </div>
  )
}

export default TimePicker