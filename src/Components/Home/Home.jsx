import React from 'react'
import { Link } from 'react-router-dom'
import "./home.css"

import { useState, useEffect } from "react";
import { IoDocumentText, IoLogInSharp, IoCheckbox } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiSoccerBallFill } from "react-icons/pi";


import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResultsList } from "../SearchBar/SearchResultsList";


import { DatePickerInput } from "../DateTimeSelectors/DatePickerInput";
import { TimePickerField } from '../DateTimeSelectors/TimePickerField';
import { ReserveHoursPicker } from "../ReserveHoursPicker/ReserveHoursPicker";
// import { EmailInput } from "../EmailInput/EmailInput";
// import { PaymentOption } from "../PaymentProcessor/PaymentOption";
// import { CreditCardField } from "../PaymentProcessor/CreditCardField";
// import { SecurityCodeField } from "../PaymentProcessor/SecurityCodeField";
// import { DatePaymentField } from "../PaymentProcessor/DatePaymentField";
import { BizSelector } from '../BizSelector/BizSelector';

import axios from 'axios';
import PhoneInput from '../PhoneInput/PhoneInput';
import SportSelector from '../SportSelector/SportSelector';


export const Home = () => {
    const [background,setBackground] = useState(null)
    const [stepper,setStepper] = useState(0)
    const [cost,setCost] = useState(0);
    const [isLoading,setIsLoading] = useState(true)
  
    const [sport,setSport] = useState(null)
    const [cancha,setCancha] = useState(null)
    const [courtsList, setCourtsList] = useState([])
    const [date, setDate] = useState(new Date(new Date(new Date().setMinutes(0)).setHours(0)));
    const [bookedHours, setBookedHours] = useState(2)
    const [emailAddress,setEmailAddress] = useState("")
    const [cellphone, setCellphone] = useState(null)
    const [payment,setPayment] = useState(true)
    const [confirmation, setConfirmation] = useState(null)

    const [courts,setCourts] = useState(null)

    const [creditCard,setCreditCard] = useState({
        number:"",
        date: new Date(),
        security:"",
    })

    const [error,setError] = useState({
        error1: false,
        error2: false,
        error3: false,
        error4: false,
        error5: false,
        error6: false,
    })

    async function sendBookingRequest() {

        setIsLoading(true)

        axios.post("https://danilo2588.pythonanywhere.com/book", {
                'requested_date':date,
                'hours':bookedHours,
                'business':cancha,
                'phone':cellphone,
                'sport':sport,
        })
        .then( function(response){
            setConfirmation(response.data)
            setStepper(7)
        })
        .catch(function (error){
        console.log(error)
        })
        .finally(function(){
            setIsLoading(false)
        })
    }

    async function getCourts() {
        setIsLoading(true)
        try
        {
        axios.get("https://danilo2588.pythonanywhere.com/book", {
            params:{
                'requested_date':date,
                'hours':bookedHours,
                'sport':sport,
                }
            })
            .then(function (response) {
                setCourtsList(response.data)
                setStepper(4)
            })
        }
        catch(e)
        {
            console.log(e)
        }
        finally
        {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        async function loadBackground() {
            try
            {
                axios.get('https://danilo2588.pythonanywhere.com/background', {
                  Timeout:3500,
                })
                .then(function (response) {
                    setBackground(response.data)
                })
            }
            catch(e)
            {
              console.log(e)
            }
            finally
            {
              setIsLoading(false);
            }
        };
        loadBackground()
    },[]);
  
    const handleStepperBack = () => {
        if (stepper === 9){
            setStepper(5)
        } else if (stepper === 4) {
            document.getElementById('business-selector').selectedIndex = 0
            setCancha(null)
            setStepper(stepper - 1)
        } else if (stepper > 0 && stepper < 9) {
            setStepper(stepper - 1)
        }
      }

    const handleStepperForward = () => {
        if (stepper === 0){
            if (sport){
                setError({error0:false})
                setStepper(1)
            } else {
                setError({error0:true})
            }
        } else if (stepper === 1)
        {
            if (date){
                setStepper(2)
                setError({error1:false})
            } else {
                setError({error1:true})
            }
        } else if (stepper === 2){
            if (date.getHours() != 0)
            {
                setStepper(3)
                setError({error2:false})
            } else {
                setError({error2:true})
            }
        } else if (stepper === 3 && bookedHours > 0){
                getCourts({date, bookedHours})
        } else if (stepper === 4) {
            if (cancha){
                setError({error4:false})
                setStepper(5)
            } else {
                setError({error4:true})
            }
        } else if (stepper === 5){
            // if (emailAddress.length > 5 && emailAddress.includes("@") && emailAddress.includes(".")){
            if (cellphone && cellphone.length === 8 && cellphone >= 60000000 && cellphone <= 70000000){
                setError({error5:false})
                setStepper(6)
            } else {
                setError({error5:true})
            }
        } else if (stepper === 6){
            sendBookingRequest()
        }
    }


  return (
    <main>
        {isLoading ?
            <div className="loading">
                <PiSoccerBallFill className="loading-icon" />
            </div>
        :
        null
        }
        <div className='wizard'>
            <div style={{backgroundImage:`url("${background}")`}} className="wizard-card"></div>
            <div className='wizard-wrapper'>
                <div className={stepper === 10 ? "d-none" : "stepper"}>
                    <span
                    className={"step" + (stepper === 1 ? " active" : "")}>
                    1
                    </span>
                    <span
                    className={"step" + (stepper === 2 ? " active" : "")}>
                    2
                    </span>
                    <span
                    className={"step" + (stepper === 3 ? " active" : "")}>
                    3
                    </span>
                    <span
                    className={"step" + (stepper === 4 ? " active" : "")}>
                    4
                    </span>
                    <span
                    className={"step" + (stepper === 5 ? " active" : "")}>
                    5
                    </span>
                    <span
                    className={"step" + (stepper === 6 ? " active" : "")}>
                    6
                    </span>
                </div>

                <div className="wizard-container">

                    <div className={stepper === 0 ? "stage" : "d-none"}>
                        <span className="title">
                            ¿Deporte?
                        </span>
                        <div className="search-bar-container">
                            <SportSelector setSport={setSport} setStepper={setStepper} />
                        </div>
                        <span className={error.error0 ? "warning-text" : "d-none"}>
                            Seleccione un deporte.
                        </span>
                    </div>

                    <div className={stepper === 1 ? "stage" : "d-none"}>
                        <span className="title">
                            ¿Cuando?
                        </span>
                        <div className="search-bar-container">
                            <DatePickerInput date={date} setDate={setDate} setStepper={setStepper} />
                        </div>
                        <span className={error.error1 ? "warning-text" : "d-none"}>
                            Seleccione una fecha.
                        </span>
                    </div>

                    <div className={stepper === 2 ? "stage" : "d-none"}>
                        <span className="title">
                            ¿A qué hora?
                        </span>
                        <div className="search-bar-container">
                            <TimePickerField date={date} setDate={setDate} setStepper={setStepper} setIsLoading={setIsLoading} />
                        </div>
                        <span className={error.error2 ? "warning-text" : "d-none"}>
                            Seleccione una hora.
                        </span>
                    </div>

                    <div className={stepper === 3 ? "stage" : "d-none"}>
                        <span className="title">
                            ¿Cuantas horas?
                        </span>
                        <div className="search-bar-container">
                            <ReserveHoursPicker bookedHours={bookedHours} setBookedHours={setBookedHours} />
                        </div>
                        <span className={error.error3 ? "warning-text" : "d-none"}>
                            Ingrese las horas a alquilar.
                        </span>
                    </div>

                    <div className={stepper === 4 ? "stage" : "d-none"}>
                        <span className="title">
                            ¿Donde?
                        </span>
                        <div className="search-bar-container">
                            <BizSelector courtsList={courtsList} setCancha={setCancha} setStepper={setStepper} courts={courts} setCost={setCost} />
                        </div>
                        <span className={error.error4 ? "warning-text" : "d-none"}>
                            Seleccione un nombre de la lista.
                        </span>
                    </div>

                    <div className={stepper === 5 ? "stage" : "d-none"}>
                        <span className="title">
                            Tu celular:
                        </span>
                        <div className="search-bar-container">
                            <PhoneInput cellphone={cellphone} setCellphone={setCellphone} />
                        </div>
                        <span className={error.error5 ? "warning-text" : "d-none"}>
                            Introduzca un número válido sin guiones.
                        </span>
                    </div>

                    <div className={stepper >= 6 && stepper <= 9 ? "stage relative" : "d-none"}>
                        {stepper === 6 ?
                        <div className='confirmation-message'>
                            <br />
                            <span className="wrapper-subtitle">
                                Reservar por
                            </span>
                            <span className="title">
                            $<span className='dollars'>{(cost*bookedHours).toFixed(2)}</span>?
                            </span>
                            <span className="uppercase">
                                Pagas directo a la cancha.
                            </span>
                        </div>
                        :null
                        }
                    </div>

                    <div className={stepper === 7 ? "stage" : "d-none"}>
                    <p className="subtitle">
                        ¡Tu reserva ha sido procesada!
                    </p>
                    <span className="confirmation">
                        {confirmation}
                    </span>
                    </div>
                </div>

                <div className={stepper === 7 ? "d-none" : "button-wrapper"}>
                    {stepper === 0 ?
                    null
                    :
                    <button
                        className="home-btn"
                        onClick={handleStepperBack}
                    >
                        Atrás
                    </button>  
                    }
                    {stepper >= 0 && stepper < 6 ?

                    <button
                        className="home-btn"
                        onClick={handleStepperForward}
                    >
                        Siguiente
                    </button>
                    :
                    <button
                        className="home-btn"
                        onClick={handleStepperForward}
                    >
                        Sí, proceder
                    </button>
                    }
                </div>
            </div>
        </div>

        <footer>
            <Link
                className="home-link link"
                to="/terminos-y-condiciones"
                target="_blank"
            >
                <IoDocumentText className='icon' />
                <span>Condiciones</span>
            </Link>
            <Link
                className="home-link link"
                to={"/dashboard"}
                target="_blank"
            >
                <IoLogInSharp className='icon'/>
                <span>Empresas</span>
            </Link>
            <Link
                className="home-link link"
                to={"/consultar"}
                target="_blank"
            >
                <IoCheckbox className='icon'/>
                <span>Consultar</span>
            </Link>
        </footer>
    </main>
  )
}