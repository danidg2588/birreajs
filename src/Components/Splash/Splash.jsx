import React, { useState } from 'react'
import './splash.css'
import { Link } from 'react-router-dom'

const Splash = () => {

    const [fadeOut, setFadeOut] = useState(false)
  return (
    <div className={fadeOut?"splash fade-out":"splash"}>
        <div className="splash-header">
            <img src="https://i.pinimg.com/originals/5b/e2/a4/5be2a4d983540f3545452b6aacf0fdf4.gif" alt="" />
        </div>
        <div className="container">
            <div className="splash-body">
                <h2>¡Entra, reserva y birrea!</h2>
            </div>
            <div className="splash-footer">
                <div className="button-home-decoration"></div>
                <button to="/app" onClick={()=>setFadeOut(!fadeOut)} className='splash-home-button'>
                    Entrar
                </button>
            </div>
        </div>
    </div>
  )
}

export default Splash