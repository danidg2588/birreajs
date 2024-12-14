import React, { useEffect, useState } from 'react'
import { BsSearch, BsGraphUpArrow, BsBarChart, BsFillCalendarPlusFill } from "react-icons/bs";
import { IoLogoWhatsapp, IoIosTennisball, IoMdLogOut, IoMdSettings } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";
import { FaCalendar, FaMoneyBillWaveAlt, FaArrowAltCircleDown, FaBookmark } from "react-icons/fa";
import DatePicker from 'react-datepicker'
import ReactApexCharts from 'react-apexcharts'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom'


import './dashboard.css'

export const Dashboard = () => {
    
    const navigate = useNavigate();
    const token = localStorage.getItem("birrea.app")
    let today = new Date()

    const [isLoading, setIsLoading] = useState(false)
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

    const [bookingsList, setBookingsList] = useState(null)
    const [timer,setTimer] = useState(0)
    const [showOption, setShowOption] = useState(0)

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

    const loadBookings = () => {
        setIsLoading(true)
        setTimer(0)
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
            setTimer(0)
        })

        setIsLoading(false)
    }

    useEffect(() => {
        loadBookings()
        },[])

    useEffect(() => {
        setTimeout(() => {
            setTimer(timer + 1)
        },1000);

        if (timer === 300)
        {
            loadBookings()
        }
    },[timer])


    const handleOptions = (opt) => {
        setIsLoading(true)
        setShowOption(opt)
        if (opt === 0){
            console.log("option to show: 0")
        } else if (opt === 1) {
            console.log("option to show: 1")
        } else if (opt === 2) {
            console.log("option to show: 2")
        }
        setIsLoading(false)
        setTimer(0)
    }

    const logOut = () => {
        setIsLoading(true)
        localStorage.clear("birrea.app")
        setIsLoading(false)
        navigate("/")
    }

    const updateStatus = (id) => {
        setIsLoading(true)
        setTimer(0)
        let status = document.getElementById("booking-status-"+id);
        let status1

        if (status.getAttribute("data-status") == "pendiente")
            {
                status.querySelector('span').classList.remove("pendiente")
                status.querySelector('span').innerHTML = "confirmado"
                status.querySelector('span').classList.add("confirmado")
                status.setAttribute("data-status","confirmado")
                status1 = "confirmado"
            } else if (status.getAttribute("data-status") == "confirmado")
            {
                status.querySelector('span').classList.remove("confirmado")
                status.querySelector('span').innerHTML = "cancelado"
                status.querySelector('span').classList.add("cancelado")
                status.setAttribute("data-status","cancelado")
                status1 = "cancelado"

            } else if (status.getAttribute("data-status") == "cancelado")
            {
                status.querySelector('span').classList.remove("cancelado")
                status.querySelector('span').innerHTML = "restringido"
                status.querySelector('span').classList.add("restringido")
                status.setAttribute("data-status","restringido")
                status1 = "restringido"
            } else if (status.getAttribute("data-status") == "restringido")
            {
                status.querySelector('span').classList.remove("restringido")
                status.querySelector('span').innerHTML = "pendiente"
                status.querySelector('span').classList.add("pendiente")
                status.setAttribute("data-status","pendiente")
                status1 = "pendiente"
            } else {
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
                <button className={showOption === 0 ? "disabled" : "interface-button"} onClick={showOption === 0 ? null : ()=>{handleOptions(0)}}>
                    <FaCalendar className='icon' />
                </button>

                <button className={showOption === 1 ? "disabled" : "interface-button"} onClick={showOption === 1 ? null : ()=>{handleOptions(1)}}>
                    <BsFillCalendarPlusFill className='icon'/>
                </button>

                <button className={showOption === 2 ? "disabled" : "interface-button"} onClick={showOption === 2 ? null : ()=>{handleOptions(2)}}>
                    <BsBarChart className='icon' />
                </button>

                <button className={showOption === 3 ? "disabled" : "interface-button"} onClick={showOption === 3 ? null : ()=>{handleOptions(3)}}>
                    <IoMdSettings className='icon' />
                </button>

                <button className="interface-button">
                    <IoMdLogOut className='icon' onClick={() => {logOut()}} />
                </button>
            </div>
            {/* <div className="user">
                <img className='avatar' src="https://i1.rgstatic.net/ii/profile.image/1024190459179008-1621197442085_Q128/Danilo-De-Gracia.jpg" alt="" />
            </div> */}
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

        {showOption === 0 ?
            <div className="recent-orders">
                <div className="card-header">
                    <h2>Listado de Reservas</h2>
                    <LuRefreshCw className='icon' onClick={loadBookings}/>
                </div>
                <table className='booking-table'>
                    {
                        bookingsList ?
                        <>
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
                            <td className='text-start'>{item.confirmation}</td>
                            <td>
                            <Link
                                to={"https://wa.me/"+ String(item.cellphone).replace("-","")+"?text=Hola!%20Te%20escribo%20con%20referencia%20a%20tu%20reserva%20"+item.confirmation}
                                target="_blank"
                                className='whatsapp'
                            >
                                <IoLogoWhatsapp className='icon' />
                                {item.cellphone}
                            </Link>
                            </td>
                            <td>{item.field}</td>
                            <td>{item.start.split('T')[0]}</td>
                            <td>
                                {item.start.split('T')[1].slice(0,5)} - {item.end.split('T')[1].slice(0,5)}
                            </td>
                            <td>${Number(item.cost).toFixed(2)}</td>
                            <td id={"booking-status-"+item.id} data-status={item.status} className='text-end' onClick={() => updateStatus(item.id)}>
                                <span className={item.status}>
                                    {item.status}
                                </span> 
                            </td>
                        </tr>)
                    }   
                    </tbody>
                        </>
                        :
                        <tbody>
                            <tr>
                                <td></td>
                                <td className='w-100 text-weight-400'>No hay reservas para mostrar.</td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
        : showOption === 2 ?
        <>
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
        </>
        : showOption === 1 ?
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
                            <input value={booking.hours} type="number" min={1} max={8} defaultValue={1} className="form-control" placeholder='2'/>
                        </div>
                        <div className="contact-form-group">
                            <label htmlFor="">Correo</label>
                            <input type="email" className="form-control" placeholder='usuario@email.com'/>
                        </div>
                    </div>
                    <div className="contact-form-row">
                    
                        <div className="buttons">
                            <button className="contact-form-button" onClick={()=>{setShowOption(true)}}>
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

        </div>
    </div>
  )
}
