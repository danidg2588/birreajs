import React, { useState } from 'react'
import './home.css'

import { IoMenu, IoClose, IoArrowBack, IoPersonCircleOutline } from "react-icons/io5";
import { GiSoccerBall, GiTennisRacket, GiVolleyballBall } from "react-icons/gi";
import { Link } from 'react-router-dom'

const Home = () => {
    const [menu,setMenu] = useState(false)
    const [wizard,setWizard] = useState(0)
  return (
    <>
    {wizard===0?
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
                    <Link className='menu-link' to="/">FAQs</Link>
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
                <button onClick={()=>setWizard(1)} className='btn'>
                    Reservar
                </button>
            </div>
        </div>
    :
        <div className="wizard">
            <div className="wheader">
                <IoArrowBack className='wheader-icons' onClick={() => setWizard(0)} />
                <span className="step">
                    Reserva tu cancha
                </span>
                <IoPersonCircleOutline className='wheader-icons' />
                <div style={{"--progress":"30%"}} className="stepper-progress"></div>
            </div>
            <div className="wmain">
                <div className="stepper">
                    Paso 1
                </div>
                <h1 className='title'>
                    Selecciona un deporte
                </h1>
                <span className="subtitle">
                    Qué deseas jugar hoy?
                </span>
                <div className="options">
                    <button className="option">
                        <GiSoccerBall className='option-icon' />
                    </button>
                    <button className="option">
                        <GiTennisRacket className='option-icon' />
                    </button>
                    <button className="option">
                        <GiVolleyballBall className='option-icon' />
                    </button>
                </div>
            </div>
            <div className="wfooter">
                <button style={{opacity:0}} onClick={()=>setWizard(2)} className='btn'>
                    Siguiente
                </button>
            </div>
        </div>
    }
    </>
  )
}

export default Home