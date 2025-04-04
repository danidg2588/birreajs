import React from 'react'
import './controlpanel.scss'

import { GiSoccerBall } from "react-icons/gi";
import { FaUser, FaBookmark, FaVolleyballBall, FaBell } from "react-icons/fa";

const ControlPanel = () => {
  return (
    <div className="control-panel">
      <div className="header">
          <div className="user">
            <img src="https://i1.rgstatic.net/ii/profile.image/1024190459179008-1621197442085_Q512/Danilo-De-Gracia.jpg" alt="" />
            <h2>Hola Danilo!</h2>
          </div>
          <div className="notifications">
            <FaBell className='notification-icon' />
          </div>
      </div>
      <div className="content">
        <div className="small-grid">
          <span>Próximas reservas:</span>
        </div>
        <div className="grid-container">
          <div className="card">
            <h4 className='month'>Reservas:</h4>
            <h1 className='date'>1</h1>            
          </div>
          <div className="card">
            <h4 className='month'>Marzo</h4>
            <h1 className='date'>25</h1>
          </div>
        </div>
        <div className="big-grid">
          <h1>Reserva tu favorito!</h1>
          <button>Reservar</button>
        </div>
      </div>
      <div className="mobile-menu">
        <button>
          <FaBookmark className='mobile-menu-icon' />
        </button>
        <button>
          <FaVolleyballBall className='mobile-menu-icon' />
        </button>
        <button>
          <FaUser className='mobile-menu-icon' />
        </button>
      </div>
    </div>
  )
}

export default ControlPanel