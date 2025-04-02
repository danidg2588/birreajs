import React, { useState } from 'react'
import './headerSection.scss'
import { BiSolidSearchAlt2 } from "react-icons/bi";


export const HeaderSection = () => {
  return (
    <div className="header flex">
      <div className="title-logo flex">
        <img className='logo' src="https://i.pinimg.com/736x/4f/ec/5d/4fec5df6f3e4668c547194aa12ed5daa.jpg" alt="" />
        <div className='text'>
          <span className="title">
            Your Business Name
          </span>
          <p>
            ¡Bienvenido a la hora de birrear!
          </p>
        </div>
      </div>
      <div className="search-bar flex">
        <BiSolidSearchAlt2 className='icon' />
        <input type="text" placeholder='Buscar...' />
      </div>
    </div>
  )
}

