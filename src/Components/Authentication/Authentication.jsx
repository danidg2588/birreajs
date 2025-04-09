import React, { useState } from 'react'
import './authentication.scss'

import { IoArrowBack } from "react-icons/io5";
import { AiOutlineLoading3Quarters, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { Link } from 'react-router-dom'


const Authentication = ({login, isLoading, setLogin, handleSubmitEvent}) => {

    const [isVisible, setIsVisible] = useState(false)

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

  return (
    <div className="authentication">
        <div className="auth-header">
            <div className="options">
                <Link to="/" className='link-icon'>
                    <IoArrowBack className='option-icon' />
                </Link>
            </div>
            <div className="text">
                <h1 className='slogan'>Entra, Reserva y Birrea</h1>
            </div>
        </div>
        <div className="auth-body">
            <div className="credentials">
                <div className="form-control">
                    <input 
                        type="email"
                        id="email"
                        placeholder='usuario@email.com'
                        onChange={(val) => handleUsername(val.target.value)}
                        autoCapitalize='none'
                        autoFocus={true}
                        autoComplete='off'
                        className='control-input'
                    />
                </div>
                <div className="form-control">
                    <input 
                        type={isVisible?"text":"password"}
                        id="password"
                        name="password"
                        placeholder='contraseña'
                        onChange={(val)=> handlePassword(val.target.value)}
                        className='control-input'
                    />
                    {isVisible?
                    <AiOutlineEye onClick={() => setIsVisible(!isVisible)} className='visible-password-icon' />
                    :
                    <AiOutlineEyeInvisible onClick={() => setIsVisible(!isVisible)} className='visible-password-icon' />
                    }
                </div>
            </div>
            <div className="options">
                <button>Restaurar contraseña</button>
                <button>Registrarme</button>
            </div>
        </div>
        <div className="auth-footer">
            <button onClick={(e)=>handleSubmitEvent(e)}>
                {isLoading?
                <AiOutlineLoading3Quarters className="loading-icon"  />
                :
                'Entrar'
                }
            </button>
        </div>
    </div>
  )
}

export default Authentication