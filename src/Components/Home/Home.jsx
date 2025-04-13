import React, { useEffect, useState } from 'react'
import './home.scss'

import { IoMenu, IoClose, IoArrowBack, IoPersonCircleOutline } from "react-icons/io5";
import { GiSoccerBall, GiTennisRacket, GiTennisBall, GiVolleyballBall, GiAmericanFootballBall, GiBasketballBall, GiBaseballGlove } from "react-icons/gi";

import { FaMinus, FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import DatePicker from '../DatePicker/DatePicker';
import TimePicker from '../TimePicker/TimePicker';
import axios from 'axios';


const Home = ({isLoading, setIsLoading}) => {
    const [menu,setMenu] = useState(false)
    const [timeSelector,setTimeSelector] = useState(true)
    const [canchas,setCanchas] = useState()
    const [sports,setSports] = useState()

    const [wizard,setWizard] = useState({
        step:0,
        sport:null,
        date:new Date(new Date(new Date(new Date(new Date().setMinutes((15 * Math.ceil(new Date().getMinutes() / 15) % 60))).setSeconds(0))).setHours(new Date(new Date(new Date().setMinutes((15 * Math.ceil(new Date().getMinutes() / 15) % 60))).setSeconds(0)).getHours() + 1)),
        time:1,
        phone:'',
        cancha_id:null,
        cancha:null,
        cancha_location:null,
        confirmation:null,
    })

    useEffect(() => {
        axios.get('https://danilo2588.pythonanywhere.com/canchas', {
            Timeout:3500,
            params:{
                'checkcourts':true,
                }
        })
        .then(function (response) {

            setSports(response.data)
        })
        .catch(function (error){
            console.log(error)
        })
        .finally(function(){
            setIsLoading(false)
        })
    },[])

    function decreaseValue(){
        let prev = new Date(wizard.date)
        console.log(wizard.date === new Date(new Date(new Date().setMinutes((15 * Math.ceil(new Date().getMinutes() / 15) % 60))).setSeconds(0)))
        if (wizard.step === 3 && wizard.date > new Date(new Date(new Date(new Date(new Date().setMinutes((15 * Math.ceil(new Date().getMinutes() / 15) % 60))).setSeconds(0))).setHours(new Date(new Date(new Date().setMinutes((15 * Math.ceil(new Date().getMinutes() / 15) % 60))).setSeconds(0)).getHours() + 2)))
        {
            if (timeSelector)
            {
                setWizard({
                    ...wizard,
                    date:new Date(prev.setHours(prev.getHours() - 1))
                })
            } else {
                setWizard({
                    ...wizard,
                    date:new Date(prev.setMinutes(prev.getMinutes() - 15))
                })                
            }
        } else if (wizard.step === 4)
        {
            if (wizard.time > 1 && wizard.time <= 4)
            {
                setWizard({
                    ...wizard,
                    time:wizard.time - 1
                })
            }
        }
    }

    function handleWizard(){

        if (wizard.step === 4)
        {
            setIsLoading(true)

            axios.get('https://danilo2588.pythonanywhere.com/canchas', {
                Timeout:3500,
                params:{
                    'date':wizard.date,
                    'time':wizard.time,
                    'sport':wizard.sport,
                    }
            })
            .then(function (response) {
                if (response.data && response.status === 200)
                {
                    setCanchas(response.data)

                    setWizard({
                        ...wizard,
                        step:wizard.step + 1
                    })
                }
            })
            .catch(function (error){
                console.log(error)
            })
            .finally(function(){
                setIsLoading(false)
            })

        } else {
            if ((wizard.step === 2 && wizard.date) || (wizard.step === 3 && wizard.date) || (wizard.step === 5 && wizard.cancha_id) || (wizard.step === 6 && wizard.phone))
            {
                setWizard({
                    ...wizard,
                    step:wizard.step + 1
                })
            }
        }

    }

    function increaseValue(){
        let next = new Date(wizard.date)
        if (wizard.step === 3)
        {
            if (timeSelector)
            {
                setWizard({
                    ...wizard,
                    date:new Date(next.setHours(next.getHours() + 1))
                })
            } else {
                setWizard({
                    ...wizard,
                    date:new Date(next.setMinutes(next.getMinutes() + 15))
                })                
            }
        } else if (wizard.step === 4)
        {
            if (wizard.time >= 1 && wizard.time < 4)
            {
                setWizard({
                    ...wizard,
                    time:wizard.time + 1
                })
            }
        }
    }

    function handleCourt(id,name,location){
        setWizard({
            ...wizard,
            cancha_id:id,
            cancha:name,
            cancha_location:location,
            step: wizard.step + 1
        })
    }

    function handlePhoneNumber(text){
    
        if (String(text).length === 1){
          setWizard({
            ...wizard,
            phone:6
          })
        }
        else if (String(text).length === 8 && Number(text)) {
          let phone = text.replace("-",'')
          setWizard({
            ...wizard,
            phone:String(text).slice(0,4)+"-"+String(text).slice(4,10)
          })
        } 
        else {
          let phonenumber = text.replace(/[^0-9]/g,'')
          setWizard({
            ...wizard,
            phone:phonenumber
          })
        }
      }

    function submitBookingRequest(){
        setIsLoading(true)

        axios.post("https://danilo2588.pythonanywhere.com/booking", {
            'date':wizard.date,
            'time':wizard.time,
            'business':wizard.cancha_id,
            'phone':wizard.phone,

        })
        .then( function(response){
            if (response.data && response.status === 200)
            {
                setWizard({
                    ...wizard,
                    confirmation:response.data,
                    step:wizard.step + 1
                })
            }
        })
        .catch(function (error){
            console.log(error)
        })
        .finally(function(){
            setIsLoading(false)
        })

    }

    
  return (
    <>
        {wizard.step === 0?
            <div className="birrea">
                {menu?
                <div className="main-menu">
                    <div className="close">
                        <IoClose className='menu-close-icon' onClick={()=>setMenu(false)}/>
                    </div>
                    <div className="options">
                        <Link className='menu-link' to="/">Inicio</Link>
                        <Link className='menu-link' to="/board" >Canchas</Link>
                        <Link className='menu-link' to="/faqs">FAQ's</Link>
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
                    <button onClick={()=>setWizard({...wizard,step:1})} className='btn'>
                        Reservar
                    </button>
                </div>
            </div>
        :
            <div className="wizard">
                {isLoading?
                    <div className="loading">
                        <GiSoccerBall className='loading-icon' />
                    </div>
                :null}
                <div className="header">
                    <IoArrowBack className='wheader-icons' onClick={() => setWizard({...wizard, step:wizard.step - 1})} />
                    <span className="step-text">
                        Reserva tu cancha
                    </span>
                    <Link className='link' to='/board'>
                        <IoPersonCircleOutline className='wheader-icons' />
                    </Link>
                    <div style={{"--progress":wizard.step / 8 * 100 + '%'}} className="stepper-progress"></div>
                </div>
                <div className="main">
                    {wizard.step === 1?
                    <div className="wizard-step">
                        <div className="heading-text">
                            <div className="stepper">
                                Paso 1
                            </div>
                            <h1 className='title'>
                                Selecciona un deporte
                            </h1>
                        </div>
                        <div className="grid">
                            <button
                            onClick={sports.futbol?() => setWizard({...wizard,step:2,sport:'futbol'}):null}
                            className={sports.futbol?"option active":"option inactive"}>
                                <GiSoccerBall className='option-icon' />
                                <span>Futbol</span>
                            </button>

                            <button
                            onClick={sports.tenis?() => setWizard({...wizard,step:2,sport:'tenis'}):null}
                            className={sports.tenis?"option active":"option inactive"}>
                                <GiTennisBall className='option-icon' />
                                <span>Tenis</span>

                            </button>

                            <button
                            onClick={sports.volleyball?() => setWizard({...wizard,step:2,sport:'volleyball'}):null}
                            className={sports.volleyball?"option active":"option inactive"}>
                                <GiVolleyballBall className='option-icon' />
                                <span>Voleibol</span>
                            </button>

                            <button
                            onClick={sports.flag?() => setWizard({...wizard,step:2,sport:'flag'}):null}
                            className={sports.flag?"option active":"option inactive"}>
                                <GiAmericanFootballBall className='option-icon' />
                                <span>Flag</span>
                            </button>

                            <button
                            onClick={sports.flag?() => setWizard({...wizard,step:2,sport:'flag'}):null}
                            className={sports.flag?"option active":"option inactive"}>
                                <GiBaseballGlove className='option-icon' />
                                <span>Béisbol</span>
                            </button>

                            <button
                            onClick={sports.basketball?() => setWizard({...wizard,step:2,sport:'basketball'}):null}
                            className={sports.basketball?"option active":"option inactive"}>
                                <GiBasketballBall className='option-icon' />
                                <span>Baloncesto</span>
                            </button>
                        </div>
                    </div>
                    : wizard.step === 2?
                    <div className="wizard-step">
                        <div className="heading-text">
                            <div className="stepper">
                                Paso 2
                            </div>
                            <h1 className='title'>
                                Seleccione una fecha
                            </h1>
                        </div>
                        <div className="picker-container">
                            <DatePicker wizard={wizard} setWizard={setWizard} />    
                        </div>
                    </div>
                    :wizard.step === 3?
                    <div className="wizard-step">
                        <div className="heading-text">
                            <div className="stepper">
                                Paso 3
                            </div>
                            <h1 className='title'>
                                Selecciona una hora
                            </h1>
                        </div>
                        <TimePicker decreaseValue={decreaseValue} increaseValue={increaseValue} wizard={wizard} setWizard={setWizard} timeSelector={timeSelector} setTimeSelector={setTimeSelector} />
                    </div>
                    :wizard.step === 4?
                    <div className="wizard-step">
                        <div className="heading-text">
                            <div className="stepper">
                                Paso 4
                            </div>
                            <h1 className='title'>
                                ¿Seleccione cuántas horas?
                            </h1>
                        </div>
                        <div className="picker-container">
                            <div className="picker-control">
                                <button className="picker minus" onClick={()=>decreaseValue()}>
                                    <FaMinus className='icon-picker' />
                                </button>
                                <span className="selection">
                                    {wizard.time}
                                </span>
                                <button className="picker plus" onClick={()=>increaseValue()}>
                                    <FaPlus className='icon-picker' />
                                </button>
                            </div>
                        </div>
                    </div>
                    :wizard.step === 5?
                    <div className="wizard-step">
                        <div className="heading-text">
                            <div className="stepper">
                                Paso 5
                            </div>
                            <h1 className='title'>
                                Selecciona una cancha
                            </h1>
                        </div>
                        <div className="court-container">
                            <div className="grid-court">
                                
                                {canchas?
                                    canchas.map((cancha) => 

                                    <button key={cancha.id} className={wizard.cancha === cancha.id?"grid-card active":"grid-card"} onClick={() => handleCourt(cancha.id,cancha.name,cancha.address)}>
                                        <div className="name">
                                            {cancha.name}
                                        </div>
                                        <div className="cost">
                                            ${cancha.cost}/hora
                                        </div>
                                        <div className="location">
                                            {cancha.address}
                                        </div>
                                    </button>

                                )
                                :'No hay canchas disponibles.'}
                                
                            </div>
                        </div>
                    </div>
                    :wizard.step === 6?
                    <div className="wizard-step">
                        <div className="heading-text">
                            <div className="stepper">
                                Paso 6
                            </div>
                            <h1 className='title'>
                                Introduzca su celular
                            </h1>
                        </div>
                        <div className="picker-container">
                            <div className="picker-control">
                                <input type="tel" 
                                    autoFocus={true}
                                    className="selection phonenumber"
                                    onChange={(e) => handlePhoneNumber(e.target.value)}
                                    maxLength={9}
                                    placeholder="6000-1234"
                                    value={wizard.phone}
                                    inputMode='numeric'
                                    pattern="[0-9]*" 
                                />
                            </div>
                        </div>
                    </div>
                    :wizard.step === 7?
                    <div className="wizard-step">
                        <div className="review">
                            <div className="confirmation">
                                <button onClick={() => submitBookingRequest()}>
                                    Confirmar
                                </button>
                            </div>
                            <div className="container slide-up">
                                <div className='data-container'>
                                    <span className="review-title">
                                        Cancha:
                                    </span>
                                    <span className="court-name">
                                        {wizard.cancha}
                                    </span>
                                </div>
                                <div className='data-container'>
                                    <span className="review-title">
                                        Horario:
                                    </span>
                                    <span className="schedule">
                                        {wizard.date.getDay()===0?
                                            'Doming'
                                        :wizard.date.getDay()===1?
                                            'Lunes'
                                        :wizard.date.getDay()===2?
                                            'Martes'
                                        :wizard.date.getDay()===3?
                                            'Miércoles'
                                        :wizard.date.getDay()===4?
                                            'Jueves'
                                        :wizard.date.getDay()===5?
                                            'Viernes'
                                        :wizard.date.getDay()===6?
                                            'Sábado'
                                        :null                                                                                                                                                                                                                                                                  
                                        } {wizard.date.getDate()}, {wizard.date.getFullYear()}
                                        <p>
                                            {wizard.date.getHours()}:{wizard.date.getMinutes()<10?"0"+wizard.date.getMinutes():wizard.date.getMinutes()} - {wizard.date.getHours() + wizard.time}:{wizard.date.getMinutes()<10?"0"+wizard.date.getMinutes():wizard.date.getMinutes()}
                                        </p>
                                    </span>
                                </div>
                                <div className='data-container'>
                                    <span className="review-title">
                                        Dirección:
                                    </span>
                                    <span className="address">
                                        {wizard.cancha_location}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    :wizard.step === 8?
                    <div className="wizard-step">
                        <div className="confirmation-text">
                            Tu confirmarción:
                        </div>
                        <div className="confirmation">
                            {wizard.confirmation}
                        </div>
                    </div>
                    :null
                    }
                </div>
                
                {wizard.step >= 2 && wizard.step < 7?
                <div className="footer">
                    <button onClick={() => handleWizard()} className='btn'>
                        siguiente
                    </button>
                </div>
                :wizard.step === 8?
                <div className="footer">
                    <button onClick={()=>setWizard({step:0,time:1,date:new Date(new Date(new Date(new Date(new Date().setMinutes((15 * Math.ceil(new Date().getMinutes() / 15) % 60))).setSeconds(0))).setHours(new Date(new Date(new Date().setMinutes((15 * Math.ceil(new Date().getMinutes() / 15) % 60))).setSeconds(0)).getHours() + 1)),})} className='btn'>
                        Finalizar
                    </button>
                </div>
                :null}
            </div>
        }
    </>
  )
}

export default Home