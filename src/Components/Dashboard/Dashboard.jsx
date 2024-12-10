import React, { useEffect, useState } from 'react'
import { BsSearch, BsGraphUpArrow, BsBarChart, BsFillCalendarPlusFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoIosTennisball } from "react-icons/io";
import { FaCalendar, FaMoneyBillWaveAlt, FaArrowAltCircleDown, FaBookmark, FaSave } from "react-icons/fa";
import DatePicker from 'react-datepicker'
import ReactApexCharts from 'react-apexcharts'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import './dashboard.css'

export const Dashboard = () => {
    const token = localStorage.getItem("birrea.app")
    let today = new Date()

    const [isLoading, setIsLoading] = useState(true)
    const [date1, setDate1] = useState(new Date())
    const [date2, setDate2] = useState(new Date())
    const [search,setSearch] = useState({
        text:"",
        date1: today,
        date2: today,
    })

    const [booking, setBooking] = useState({
        date: new Date,
        time:null,
        hours:1,
        email:null,
    })

    const [bookingsList, setBookingsList] = useState([])

    const [showGraph, setShowGraph] = useState(false)

    const [graph,setGraph] = useState({
        options:{
            colors:["#01565B","#5ABA8A"],
            chart:{
                id:'basic-bar',
                toolbar:{
                    show:true,
                },
            },

            xaxis:{
                categories: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
            }
        },

        series:[
            {
                name:"Updates",
                data: [25, 33, 13, 89, 34, 20, 30]
            },
            {
                name:"New tasks",
                data: [70, 47, 72, 45, 12, 59, 38]
            },
        ]
    })

    useEffect(() => {
        axios.get('https://danilo2588.pythonanywhere.com/authentication', {
            Timeout:3500,
            headers: {"Authorization": token},
        })
        .then(function (response) {
            // console.log(response.data.bookings)
            setBookingsList(response.data.bookings)
        })
        .catch(function (error){
        console.log(error)
        })
        .finally(function(){
            setIsLoading(false)
        })

        },[])


    const updateStatus = (id) => {
        setIsLoading(true)
        
        let status = document.getElementById("booking-status-"+id);
        let status1

        if (status.getAttribute("data-status") == "pendiente")
            {
                status.classList.remove("pendiente")
                status.innerHTML = "confirmado"
                status.classList.add("confirmado")
                status.setAttribute("data-status","confirmado")
                status1 = "confirmado"
            } else if (status.getAttribute("data-status") == "confirmado")
            {
                status.classList.remove("confirmado")
                status.innerHTML = "cancelado"
                status.classList.add("cancelado")
                status.setAttribute("data-status","cancelado")
                status1 = "cancelado"

            } else if (status.getAttribute("data-status") == "cancelado")
            {
                status.classList.remove("cancelado")
                status.innerHTML = "pendiente"
                status.classList.add("pendiente")
                status.setAttribute("data-status","pendiente")
                status1 = "pendiente"

            }

        axios.post("https://danilo2588.pythonanywhere.com/status",
            {
                'booking':id,
                'status':status1,
            },
            {
                headers:{
                    "Authorization": token
                }
            }
        )
        .then( function(response){
            if (response.status == 200 && response.data){
                alert(response.data)
            }
            
        })
        .catch(function (error){
            console.log(error)
        })
        .finally(function(){
            setIsLoading(false)
        })

        setIsLoading(false)
      }


  return (
    <div className="dashboard">
        {isLoading ?
        <div className="loading">
            <IoIosTennisball className="loading-icon" />
        </div>
        :
        null
        } 
        <div className="top-bar">
            <div className="search">
                <input type="text" value={search.text} onChange={(val) => setSearch({text:val})} className='input-control' placeholder='Search...'/>
                <div className='search-date-range'>
                    <DatePicker
                        placeholderText='Seleccione una fecha'
                        withPortal
                        selected={date1}
                        onChange={(value) => {setDate1(value)}}
                        openToDate={date1}
                        minDate={today.setDate(today.getDate() - 60)}
                        maxDate={today}
                        className='input-control range-date-picker'
                    />
                    <DatePicker
                        placeholderText='Seleccione una fecha'
                        withPortal
                        // showTimeInput
                        selected={date2}
                        onChange={(value) => {setDate2(value)}}
                        openToDate={date2}
                        minDate={today.setDate(today.getDate() - 60)}
                        maxDate={today}
                        className='input-control range-date-picker'
                    />
                    <button className='search-button px-1'>
                        <BsSearch className='icon' />
                    </button>
                </div>
            </div>
            <div className="options">
                <button className="interface-button" onClick={() => setShowGraph(!showGraph)}>
                    <BsBarChart className='icon' />
                </button>
                <button className='interface-button'>
                    <BsFillCalendarPlusFill className='icon' onClick={()=>{setShowGraph(false)}} />
                </button>
            </div>
            <div className="user">
                <img className='avatar' src="https://i1.rgstatic.net/ii/profile.image/1024190459179008-1621197442085_Q128/Danilo-De-Gracia.jpg" alt="" />
            </div>
        </div>

        <div className="card-boxes">

            <div className="card">
                <div>
                    <div className="numbers">$504</div>
                    <div className="card-name">
                        Ganancias de esta semana
                    </div>
                </div>
                <div className="icon-box">
                    <FaCalendar />
                </div>
            </div>

            <div className="card">
                <div>
                    <div className="numbers">$434</div>
                    <div className="card-name">
                        Reservas de esta semana
                    </div>
                </div>
                <div className="icon-box">
                    <FaMoneyBillWaveAlt />
                </div>
            </div>

            <div className="card">
                <div>
                    <div className="numbers">$742</div>
                    <div className="card-name">
                        Reservas siguiente semana
                    </div>
                </div>
                <div className="icon-box">
                    <FaArrowAltCircleDown />
                </div>
            </div>
            
            <div className="card">
                <div>
                    <div className="numbers">$825</div>
                    <div className="card-name">
                        Proyección de ganancias
                    </div>
                </div>
                <div className="icon-box">
                    <FaBookmark />
                </div>
            </div>
        
        </div>

        <div className="business">

        {showGraph == 1 ?
            <div id='stats' className="stats">
                <div className="card-header">
                    <h2>Estadísticas</h2>
                </div>

                <div className="graphics">
                    <ReactApexCharts 
                        options={graph.options}
                        series={graph.series}
                        type="area"
                        width="500"
                        className="chart"
                    />
                </div>
            </div>
            : showGraph == 2 ?
            <div className="contact-form">
                <div className="contact-form-header">
                    <h2>Nueva Reserva</h2>
                </div>
                <div className="contact-form-body">
                    <div className="contact-form-row">
                        <div className="contact-form-group">
                            <label htmlFor="">Fecha</label>
                            <DatePicker
                                // withPortal
                                selected={booking.date}
                                onChange={(value) => {setBooking({date:value})}}
                                openToDate={booking.date}
                                className='form-control date-picker'
                            />
                        </div>
                        <div className="contact-form-group">
                            <label htmlFor="">Hora</label>
                            <select className='form-control'>
                                <option disabled>Seleccione un horario</option>
                                <option value={7}>7:00 AM</option>
                                <option value={8}>8:00 AM</option>
                                <option value={9}>9:00 AM</option>
                                <option value={10}>10:00 AM</option>
                                <option value={11}>11:00 AM</option>
                                <option value={12}>12:00 PM</option>
                                <option value={13}> 1:00 PM</option>
                                <option value={14}> 2:00 PM</option>
                                <option value={15}> 3:00 PM</option>
                                <option value={16}> 4:00 PM</option>
                                <option value={17}> 5:00 PM</option>
                                <option value={18}> 6:00 PM</option>
                                <option value={19}> 7:00 PM</option>
                                <option value={20}> 8:00 PM</option>
                                <option value={21}> 9:00 PM</option>
                                <option value={22}>10:00 PM</option>
                                <option value={23}>11:00 PM</option>
                            </select>
                        </div>
                    </div>
                    <div className="contact-form-row">
                        <div className="contact-form-group">
                            <label htmlFor="">Tiempo</label>
                            <input value={booking.hours} type="number" min={1} max={8} className="form-control" placeholder='2'/>
                        </div>
                        <div className="contact-form-group">
                            <label htmlFor="">Correo</label>
                            <input type="email" className="form-control" placeholder='usuario@email.com'/>
                        </div>
                    </div>
                    <div className="contact-form-row">
                    
                        <div className="buttons">
                            <button className="contact-form-button" onClick={()=>{setShowGraph(true)}}>
                                Cancelar
                            </button>
                            <button className="contact-form-button">
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            : null
            }

            <div className="recent-orders">
                <div className="card-header">
                    <h2>Listado de Reservas</h2>
                    <FaSave className='icon' />
                </div>
                <table className='booking-table'>
                    <thead>
                        <tr className='uppercase'>
                            <th></th>
                            <th className='text-start'>
                                Orden
                            </th>
                            <th>
                                Contacto
                            </th>
                            <th>
                                Cancha
                            </th>
                            <th>
                                Fecha
                            </th>
                            <th>
                                Horario
                            </th>
                            <th>
                                Valor
                            </th>
                            <th className='text-end'>
                                <span className="w-100px">
                                    Status
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    bookingsList.map((item) => 
                        <tr key={item.id}>
                            <td></td>
                            <td>{item.confirmation}</td>
                            <td>{item.phone}</td>
                            <td>{item.field}</td>
                            <td>{item.start.split('T')[0]}</td>
                            <td>
                                {item.start.split('T')[1].slice(0,5)} - {item.end.split('T')[1].slice(0,5)}
                            </td>
                            <td>${Number(item.cost).toFixed(2)}</td>
                            <td id={"booking-status-"+item.id} data-status={item.status} className={item.status} onClick={() => updateStatus(item.id)}>{item.status}</td>
                        </tr>)
                    }
                        
                    </tbody>
                </table>
                <div className="pagination">
                    <button className='page'><IoIosArrowBack className='icon' /></button>
                    <button className='page'>1</button>
                    <button className='page'><IoIosArrowForward className='icon' /></button>
                </div>
            </div>

        </div>
    </div>
  )
}
