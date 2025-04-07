import React, { useState } from 'react'
import './home.scss'

import { IoMenu, IoClose, IoArrowBack, IoPersonCircleOutline } from "react-icons/io5";
import { GiSoccerBall, GiTennisRacket, GiVolleyballBall } from "react-icons/gi";

import { FaMinus, FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const Home = ({isLoading, setIsLoading}) => {
    const [menu,setMenu] = useState(false)

    const [timeSelector,setTimeSelector] = useState(true)
    const [wizard,setWizard] = useState({
        step:0,
        sport:null,
        date:new Date(new Date().setMinutes(0)),
        time:1,
        phone:null,
        court:null,
        confirmation:null,
    })

    function decreaseValue(){
        let prev = new Date(wizard.date)
        if (wizard.step === 2)
        {
            setWizard({
                ...wizard,
                date:new Date(prev.setMonth(prev.getMonth() - 1))
            })
        } else if (wizard.step === 3)
        {
            setWizard({
                ...wizard,
                date:new Date(prev.setDate(prev.getDate() - 1))
            })
        } else if (wizard.step === 4)
        {
            setWizard({
                ...wizard,
                date:new Date(prev.setFullYear(prev.getFullYear() - 1))
            })
        } else if (wizard.step === 5)
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
        } else if (wizard.step === 6)
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

    function increaseValue(){
        let next = new Date(wizard.date)
        if (wizard.step === 2)
        {
            setWizard({
                ...wizard,
                date:new Date(next.setMonth(next.getMonth() + 1))
            })
        } else if (wizard.step === 3)
        {
            setWizard({
                ...wizard,
                date:new Date(next.setDate(next.getDate() + 1))
            })
        } else if (wizard.step === 4)
        {
            setWizard({
                ...wizard,
                date:new Date(next.setFullYear(next.getFullYear() + 1))
            })
        } else if (wizard.step === 5)
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
        } else if (wizard.step === 6)
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

    function handleCourt(id){
        setWizard({
            ...wizard,
            court:id,
            step: wizard.step + 1
        })
    }

    function submitBookingRequest(){
        alert('submitting booking request')
        setWizard({
            ...wizard,
                step: wizard.step + 1,
                confirmation:'F7ADSF8A'
            }
        )
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
                        <Link className='menu-link' to="/board" >Iniciar Sesión</Link>
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
                        Reserva tu cancha {wizard.step}
                    </span>
                    <Link className='link' to='/board'>
                        <IoPersonCircleOutline className='wheader-icons' />
                    </Link>
                    <div style={{"--progress":wizard.step / 9 * 100 + '%'}} className="stepper-progress"></div>
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
                            onClick={() => setWizard({...wizard,step:2,sport:'futbol',})}
                            className="option">
                                <GiSoccerBall className='option-icon' />
                            </button>
                            <button 
                            onClick={() => setWizard({...wizard,step:2,sport:'tenis',})}
                            className="option">
                                <GiTennisRacket className='option-icon' />
                            </button>
                            <button 
                            onClick={() => setWizard({...wizard,step:2,sport:'voleibol',})}
                            className="option">
                                <GiVolleyballBall className='option-icon' />
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
                            <div className="subtitle">
                                mes
                            </div>
                        </div>
                        <div className="picker-container">
                            <div className="picker-control">
                                <button className="picker minus" onClick={()=>decreaseValue()}>
                                    <FaMinus className='icon-picker'  />
                                </button>
                                <button className="selection">
                                    {wizard.date.getMonth() === 0?
                                    'Ene'
                                    :wizard.date.getMonth() === 1?
                                    'Feb'
                                    :wizard.date.getMonth() === 2?
                                    'Mar'
                                    :wizard.date.getMonth() === 3?
                                    'Abr'
                                    :wizard.date.getMonth() === 4?
                                    'May'
                                    :wizard.date.getMonth() === 5?
                                    'Jun'
                                    :wizard.date.getMonth() === 6?
                                    'Jul'
                                    :wizard.date.getMonth() === 7?
                                    'Ago'
                                    :wizard.date.getMonth() === 8?
                                    'Sep'
                                    :wizard.date.getMonth() === 9?
                                    'Oct'
                                    :wizard.date.getMonth() === 19?
                                    'Nov'
                                    :wizard.date.getMonth() === 11?
                                    'Dic'                                                                                                                                                                                                                                                                                                                                
                                    :null}
                                </button>
                                <button className="picker plus" onClick={()=>increaseValue()}>
                                    <FaPlus className='icon-picker'  />
                                </button>
                            </div>
                        </div>
                    </div>
                    :wizard.step === 3?
                    <div className="wizard-step">
                        <div className="heading-text">
                            <div className="stepper">
                                Paso 3
                            </div>
                            <h1 className='title'>
                                Seleccione una fecha
                            </h1>
                            <div className="subtitle">
                                día
                            </div>
                        </div>
                        <div className="picker-container">
                            <div className="picker-control">
                                <button className="picker minus" onClick={()=>decreaseValue()}>
                                    <FaMinus className='icon-picker'  />
                                </button>
                                <button className="selection">
                                    {wizard.date.getDate()}
                                </button>
                                <button className="picker plus" onClick={()=>increaseValue()}>
                                    <FaPlus className='icon-picker' />
                                </button>
                            </div>
                        </div>
                    </div>
                    :wizard.step === 4?
                    <div className="wizard-step">
                        <div className="heading-text">
                            <div className="stepper">
                                Paso 4
                            </div>
                            <h1 className='title'>
                                Seleccione una fecha
                            </h1>
                            <div className="subtitle">
                                año
                            </div>
                        </div>
                        <div className="picker-container">
                            <div className="picker-control">
                                <button className="picker minus" onClick={()=>decreaseValue()} >
                                    <FaMinus className='icon-picker' />
                                </button>
                                <button className="selection">
                                    {wizard.date.getFullYear()}
                                </button>
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
                                Selecciona una hora
                            </h1>
                            <div className="subtitle">
                                {timeSelector?
                                "hora"
                                :
                                "minutos"
                                }
                            </div>
                        </div>
                        <div className="picker-container">
                            <div className="picker-control">
                                <button className="picker minus" onClick={()=>decreaseValue()}>
                                    <FaMinus className='icon-picker' />
                                </button>
                                <button onClick={() => setTimeSelector(!timeSelector)} className="selection">
                                    <span className={timeSelector?"active":""}>
                                        {wizard.date.getHours()}
                                    </span>
                                    :
                                    <span className={!timeSelector?"active":""}>
                                        {wizard.date.getMinutes() < 10 ? '0' + wizard.date.getMinutes() : wizard.date.getMinutes()}
                                    </span>
                                </button>
                                <button className="picker plus" onClick={()=>increaseValue()}>
                                    <FaPlus className='icon-picker' />
                                </button>
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
                                ¿Seleccione cuántas horas?
                            </h1>
                            <div className="subtitle">
                                Tiempo de alquiler
                            </div>
                        </div>
                        <div className="picker-container">
                            <div className="picker-control">
                                <button className="picker minus" onClick={()=>decreaseValue()}>
                                    <FaMinus className='icon-picker' />
                                </button>
                                <button className="selection">
                                    {wizard.time}
                                </button>
                                <button className="picker plus" onClick={()=>increaseValue()}>
                                    <FaPlus className='icon-picker' />
                                </button>
                            </div>
                        </div>
                    </div>
                    :wizard.step === 7?
                    <div className="wizard-step">
                        <div className="heading-text">
                            <div className="stepper">
                                Paso 7
                            </div>
                            <h1 className='title'>
                                Selecciona una cancha
                            </h1>
                            <div className="subtitle">
                                donde?
                            </div>
                        </div>
                        <div className="court-container">
                            <div className="grid-court">
                                
                                <button className="grid-card" onClick={() => handleCourt(0)}>
                                    <div className="name">
                                        Cancha Sintética 1000
                                    </div>
                                    <div className="location">
                                        San Francisco
                                    </div>
                                </button>
                                
                                <button className="grid-card">
                                    <div className="name">
                                        Cancha Sintética 2000
                                    </div>
                                    <div className="location">
                                        San Francisco
                                    </div>
                                </button>
    
                                <button className="grid-card">
                                    <div className="name">
                                        Cancha Sintética 3000
                                    </div>
                                    <div className="location">
                                        San Francisco
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    :wizard.step === 8?
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
                                        Deporte:
                                    </span>
                                    <span className="review-data">
                                        {wizard.sport}
                                    </span>
                                </div>
                                <div className='data-container'>
                                    <span className="review-title">
                                        Cancha:
                                    </span>
                                    <span className="review-data">
                                        Cancha de futbol 2000
                                    </span>
                                </div>
                                <div className='data-container'>
                                    <span className="review-title">
                                        Horario:
                                    </span>
                                    <span className="review-data">
                                        18:30 - 20:30 
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    :wizard.step === 9?
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
                    <button onClick={()=>setWizard({...wizard,step:wizard.step+1})} className='btn'>
                        siguiente
                    </button>
                </div>
                :wizard.step === 9?
                <div className="footer">
                    <button onClick={()=>setWizard({step:0,date:new Date(new Date().setMinutes(0)),})} className='btn'>
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