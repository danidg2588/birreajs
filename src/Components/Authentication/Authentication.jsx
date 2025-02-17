import React, { useState, useEffect } from 'react';
import "./authentication.css"

import axios from 'axios';

import { GiSoccerBall } from "react-icons/gi";
import { FaLock, FaLockOpen, FaChevronLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const Authentication = ({login, setLogin, handleSubmitEvent}) => {

    const [userInfo,setUserInfo] = useState({
        email:"",
        phone:"",
        confirmation:null,
        password1:null,
        password2:null,
    })

    const [pageStep,setPageStep] = useState(0)
    const [visiblePwd,setVisiblePwd] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [background,setBackground] = useState(null)

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
    

    const handleUsername = (val) => {
        if ((String(val).includes('@')) & (String(val).includes('.')) ) {
            setLogin({
                ...login,
                email: val,
            })
        }
    }

    const handlePassword = (val) => {
        setLogin({
            ...login,
            password:val,
        });
    }

    const handlePhoneNumber = (text) => {
        let cellphone

        if (String(text).length === 1){
            setUserInfo({
                ...userInfo,
                phone:6,
            })
        }
        else if (String(text).length === 8 && Number(text)) {
            cellphone = text.replace("-",'')
            setUserInfo({
                ...userInfo,
                phone:String(text).slice(0,4)+"-"+String(text).slice(4,10)
            })
        } 
        else {
            cellphone = text.replace(/[^0-9]/g,'')
            setUserInfo({
                ...userInfo,
                phone:cellphone,
            })
        }
    }

    const handleCode = (number, identifier) => {
        let digits = document.querySelectorAll(".confirmation-code")
        
        if (digits[0].value && digits[1].value && digits[2].value && digits[3].value){
            // send api confirmation
            setUserInfo({
                ...userInfo,
                confirmation: digits[0].value + digits[1].value + digits[2].value + digits[3].value,
            })
        } else {
            digits[identifier].value = number.replace(/[^0-9]/g,'')
            if (Number(number) & identifier < 3){
                    digits[identifier + 1].focus()
            }
        }
      }

  return (

    <>
        <div className="desktop">
            <h2>Entra, reserva y birrea.</h2>
            <p>Próximamente...</p>
        </div>
        <div className='authentication' style={{backgroundImage:`url("${background}")`}}>
            {isLoading ?
                <div className="loading">
                    <GiSoccerBall className="loading-icon" />
                </div>
            : null}
            <div className="screener">
                <h1 className='welcome-app-name'>Birrea App</h1>
            </div>
            <div className={pageStep === 0? "main-container home-container":"main-container credentials-container"}>
                {pageStep > 0?
                <FaChevronLeft className='return-icon' onClick={()=>setPageStep(pageStep-1)}/>
                :null}
                <div className="container">
                    {pageStep===0?
                    <div className="buttons">
                        <button onClick={()=>setPageStep(2)}>
                            Registrarme
                        </button>
                        <button onClick={()=>setPageStep(1)}>
                            Iniciar Sesión
                        </button>
                    </div>
                    : pageStep === 1?
                    <>
                        <div className="form-control">
                            <label htmlFor="">Celular</label>
                            <input type="text" inputMode='numeric' defaultValue={userInfo.phone} value={userInfo.phone} onChange={(val) => handlePhoneNumber(val.target.value)} className='control-input text-center' placeholder='6000-1234' maxLength={9}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="">Contraseña</label>
                            <div className='relative'>
                                {visiblePwd?
                                <FaLockOpen className='pswd-icon' onClick={()=>setVisiblePwd(!visiblePwd)} />
                                :
                                <FaLock className='pswd-icon' onClick={()=>setVisiblePwd(!visiblePwd)} />
                                }

                                <input type={visiblePwd?"text":"password"} className='control-input' placeholder='Contraseña' />
                            </div>
                        </div>
                        <div className="main-options">
                            <span className='main-option-buttton' onClick={() => setPageStep(2)}>Restablecer contraseña</span>
                        </div>
                        <div className="form-control">
                            <button>Entrar</button>
                        </div>
                    </>
                    : pageStep === 2?
                    <>
                        <div className="form-control">
                            <label htmlFor="">Celular</label>
                            <input type="text" inputMode='numeric' defaultValue={userInfo.phone} value={userInfo.phone} onChange={(val) => handlePhoneNumber(val.target.value)} className='control-input text-center' placeholder='6000-1234' maxLength={9}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="">Ingresa el código enviado a tu correo</label>
                            <div className="flex">
                                <input type="text" maxLength={1} onChange={(e) => handleCode(e.target.value,0)} className='control-input confirmation-code' />
                                <input type="text" maxLength={1} onChange={(e) => handleCode(e.target.value,1)} className='control-input confirmation-code' />
                                <input type="text" maxLength={1} onChange={(e) => handleCode(e.target.value,2)} className='control-input confirmation-code' />
                                <input type="text" maxLength={1} onChange={(e) => handleCode(e.target.value,3)} className='control-input confirmation-code' />
                            </div>
                        </div>
                        <div className="form-control">
                            <button>Enviar código</button>
                        </div>
                    </>
                    : pageStep === 3?
                    <>
                        <div className="form-control">
                            <label htmlFor="">Celular</label>
                            <input type="text" inputMode='numeric' defaultValue={userInfo.phone} value={userInfo.phone} onChange={(val) => handlePhoneNumber(val.target.value)} className='control-input text-center' placeholder='6000-1234' maxLength={9}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="">Contraseña</label>
                            <div className='relative'>
                                {visiblePwd?
                                <FaLockOpen className='pswd-icon' onClick={()=>setVisiblePwd(!visiblePwd)} />
                                :
                                <FaLock className='pswd-icon' onClick={()=>setVisiblePwd(!visiblePwd)} />
                                }

                                <input type={visiblePwd?"text":"password"} className='control-input' placeholder='Contraseña' />
                            </div>
                        </div>
                        <div className="main-options">
                            <Link className='main-option-buttton'>Restablecer contraseña</Link>
                        </div>
                        <div className="form-control">
                            <button>Entrar</button>
                        </div>
                    </>
                    :null
                    }
                </div>
            </div>
        </div>
    </>

)
  
}
