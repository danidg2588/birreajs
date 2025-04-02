import React from 'react'
import { GiWhistle } from "react-icons/gi";
import './sportselector.scss'

function SportSelector({setSport, setStepper}) {

    const handleSport = (value) => {
          setSport(value)
          setStepper(1)
      }

  return (
    <div className="input-wrapper">
      <GiWhistle />
        <select 
            onChange={(value) => handleSport(value.target.value)}
            defaultValue={0}
            className='select-date-picker searching-text text-center'
        >
            <option value="0" disabled>Selecciona tu deporte favorito</option>
            <option value="futbol">Fútbol</option>
            <option value="padel">Padel</option>
            <option value="beisbol">Béisbol</option>
        </select>
    </div>
  )
}

export default SportSelector