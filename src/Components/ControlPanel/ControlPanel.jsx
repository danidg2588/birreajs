import React, { useEffect, useState } from 'react'
import './controlpanel.scss'

import { PiSoccerBallFill } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from 'react-router';
import Menu from './Menu';

import axios from 'axios';
import { Link } from 'react-router-dom'


const ControlPanel = ({isLoading, setIsLoading}) => {
  let navigate = useNavigate();

  const [modal, setModal] = useState(false)
  const [bookings,setBookings] = useState(null)
  const [booking,setBooking] = useState({
    pk:null,
    status:null,
  })
  const [filter,setFilter] = useState({
    date1:new Date(new Date().setDate(new Date().getDate() + 6)),
    date2:new Date(),
    text:'',
    refresh:null,
  })

  useEffect(() => {
    let token = localStorage.getItem('birrea.app')
    axios.get('https://danilo2588.pythonanywhere.com/negocios', {
      Timeout:3500,
      headers: {
        "Content-Type": "application/json",
        'Authorization':token,
      },
      // params:{
      //     'checkcourts':true,
      //     }
    })
    .then(function (response) {
      if (response.status === 200)
      {
        setBookings(response.data)
      }
    })
    .catch(function (error){
        console.log(error)
    })
    .finally(function(){
        setIsLoading(false)
    })
  },[filter.refresh])




  function updateReseva(){
    setIsLoading(true)

    axios.post("https://danilo2588.pythonanywhere.com/booking", {
      'update':booking.pk,
      'status':booking.status,
  })
  .then( function(response){
    if (response.status === 200)
    {
      alert(response.data)
    }
  })
  .catch(function (error){
    console.log(error)
  })
  .finally(function(){
    setIsLoading(false)
    setFilter({
      ...filter,
      refresh:new Date()
    })
  })
  .then( function(response){
      setModal(false)
      if (response.status === 200)
      {
        alert(response.data)
      }
  })
  .catch(function (error){
      console.log(error)
  })
  .finally(function(){
      setIsLoading(false)
      setModal(false)
  })
  }

  function handleLogOut(){
    localStorage.removeItem('birrea.app')
    navigate("/")
  }

  function handleStatusMenu(id){
    let menu
    menu = document.getElementById('status-menu-'+id)
    if (menu.style.display == 'flex')
    {
      menu.style.display = 'none'
    } else {
      menu.style.display = 'flex'
    }
  }

  function handleModal(estatus,id){

    setModal(!modal)

    setBooking({
      ...booking,
      pk:id,
      status:estatus,
    })
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
              <button className='proceder' onClick={()=>updateReseva()}>
                {isLoading?
                  <PiSoccerBallFill className="loading-icon" />
                :'Proceder'}
              </button>
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
            <input type="date"  />
            <input type="date" placeholder='search' />value={filter.date1.getFullYear()+'-'+filter.date1.getMonth()<10?'0'+filter.date1.getMonth():filter.date1.getMonth()+'-'+filter.date1.getDate()} placeholder='search'
            <input type="text" placeholder='search' />
            <input type="submit" />
          </div>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Confirmación</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Reserva</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {bookings?
              bookings.map((booking) => 
              <tr key={booking.id}>
                <td>{booking.confirmation}</td>
                <td>
                  <Link to={'https:wa.me/'+'507'+booking.cellphone.replace('-','')} target='__blank'>
                    {booking.cellphone}
                  </Link>
                </td>
                <td>
                  {new Date(Date.parse(booking.start)).getDate()+'-'+
                  (new Date(Date.parse(booking.start)).getMonth()===0?
                    'Ene'
                  :new Date(Date.parse(booking.start)).getMonth()===1?
                    'Feb'
                  :new Date(Date.parse(booking.start)).getMonth()===2?
                    'Mar'
                  :new Date(Date.parse(booking.start)).getMonth()===3?
                    'Abr'
                  :new Date(Date.parse(booking.start)).getMonth()===3?
                    'May'
                  :new Date(Date.parse(booking.start)).getMonth()===1?
                    'Jun'
                  :new Date(Date.parse(booking.start)).getMonth()===2?
                    'Jul'
                  :new Date(Date.parse(booking.start)).getMonth()===3?
                    'Ago'
                  :new Date(Date.parse(booking.start)).getMonth()===3?
                    'Sep'
                  :new Date(Date.parse(booking.start)).getMonth()===2?
                    'Oct'
                  :new Date(Date.parse(booking.start)).getMonth()===3?
                    'Nov'
                  :new Date(Date.parse(booking.start)).getMonth()===3?
                    'Dic'                   
                  :null)
                  +'-'+new Date(Date.parse(booking.start)).getFullYear()}
                </td>
                <td>
                  {new Date(Date.parse(booking.start)).getHours()+':'+(new Date(Date.parse(booking.start)).getMinutes()<10?'0'+new Date(Date.parse(booking.start)).getMinutes():new Date(Date.parse(booking.start)).getMinutes())
                  + ' - ' +
                  (new Date(Date.parse(booking.end)).getHours()<10?'0'+new Date(Date.parse(booking.end)).getHours():new Date(Date.parse(booking.end)).getHours())+':'+(new Date(Date.parse(booking.end)).getMinutes()<10?'0'+new Date(Date.parse(booking.end)).getMinutes():new Date(Date.parse(booking.end)).getMinutes())
                  }
                </td>
                <td className='status-wrapper'>
                  <span className={booking.status + ' status'} onClick={() => handleStatusMenu(booking.id)}>
                    {booking.status}
                    <FaChevronDown className='icon' />
                  </span>
                  <div className="status-menu" id={'status-menu-'+booking.id}>

                    {booking.status !== 'pendiente'?
                    <span onClick={() => handleModal('pendiente',booking.id)}>
                      Pendiente
                    </span>
                    :null}

                    {booking.status !== 'cancelado'?
                    <span onClick={() => handleModal('cancelado',booking.id)}>
                      Cancelado
                    </span>
                    :null}

                    {booking.status !== 'confirmado'?
                    <span onClick={() => handleModal('confirmado',booking.id)}>
                      Confirmado
                    </span>
                    :null}
                      
                  </div>
                </td>
              </tr>
              )
              :null
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel