import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

export const BizSelector = ({courtsList, setCancha, setCost, setStepper}) => {
    const handleSelectBiz = (value) => {
      console.log(value)
        setCancha(value)
        // setStepper(5)
    }
  return (
    <div className="input-wrapper">
      <FaLocationDot />
        <select 
            onChange={(value) => handleSelectBiz(value.target.value)}
            defaultValue={0}
            className='select-date-picker searching-text text-center'
            id='business-selector'
        >
            <option value="0" disabled>Selecciona tu cancha favorita</option>
            {
              courtsList.map((court) => <option key={court.id} value={court.id} onClick={setCost(court.cost)}>{court.name} ({court.address})</option>)
            }
        </select>
    </div>
  )
}
