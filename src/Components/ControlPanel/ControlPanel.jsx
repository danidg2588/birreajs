import React, { useState } from 'react'
import './controlpanel.scss'

import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from 'react-router';
import Menu from './Menu';

const ControlPanel = () => {
  let navigate = useNavigate();

  const [modal, setModal] = useState(false)

  function handleLogOut(){
    localStorage.removeItem('birrea.app')
    navigate("/")
  }

  function handleSecondaryMenu(id){
    console.log(id)
  }

  return (
    <div className="control-panel">
      {modal?
        <div className="modal">
          <div className="container">
            <span className="title">
              ¿Está seguro que desea cambiar el estatus?
            </span>
            <div className="buttons">
              <button className='cancelar' onClick={() => setModal(false)}>Cancelar</button>
              <button className='proceder'>Proceder</button>
            </div>
          </div>
        </div>
      :null}
      <Menu handleLogOut={handleLogOut} />
      <div className="content">
        <div className="header">
          <div className="card-container">
            <div className="card">
              <span className="info">
                4
              </span>
              <span className="titulo">
                reservas
              </span>
            </div>

            <div className="card">
              <span className="info">5</span>
              <span className="titulo">
                Confirmadas
              </span>
            </div>

            <div className="card">
              <span className="info">${45*8}</span>
              <span className="titulo">
                Esta semana
              </span>
            </div>

          </div>
          <div className="filter-container">
            <input type="text" />
          </div>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Confirmación</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Reserva</th>
                <th>Horas</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" name="checkbox" id="" /></td>
                <td>#FAU7FDS9F</td>
                <td>6234-2342</td>
                <td>Abril 12, 2025</td>
                <td>19:00 - 21:00</td>
                <td>2 horas</td>
                <td className='status-wrapper'>
                  <span className="status pendiente" onClick={() => handleSecondaryMenu(1)}>
                    Pendiente
                    <FaChevronDown className='icon' />
                  </span>
                  <div className="status-menu">
                    <span onClick={() => setModal(true)}>
                      Pendiente
                    </span>
                    <span onClick={() => setModal(true)}>
                      Cancelado
                    </span>
                    <span onClick={() => setModal(true)}>
                      Confirmado
                    </span>
                  </div>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel