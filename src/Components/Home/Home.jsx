import React, { useState } from 'react'
import './home.css'

import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom'

const Home = () => {
    const [menu,setMenu] = useState(false)
  return (
    <div className="mobile">
        {menu?
        <div className="main-menu">
            <div className="close">
                <IoClose className='menu-close-icon' onClick={()=>setMenu(false)}/>
            </div>
            <div className="options">
                <Link className='menu-link' to="/">Inicio</Link>
                <Link className='menu-link' to="/">Autenticación</Link>
                <Link className='menu-link' to="/">Registrarme</Link>
            </div>
        </div>
        :null}
        <div className="header">
            <button className='menu-btn' onClick={()=>setMenu(true)}>
                <IoMenu className='menu-icon' />
            </button>
        </div>
        <div className="main">
            <h1>
                Entra, reserva y birrea
            </h1>
        </div>
        <div className="footer">
            <button className='btn'>
                Reservar
            </button>
        </div>
    </div>
  )
}

export default Home