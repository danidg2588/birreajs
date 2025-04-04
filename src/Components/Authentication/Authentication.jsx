import React, { useState } from 'react'
import './authentication.scss'

import { IoArrowBack } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Link } from 'react-router-dom'


const Authentication = ({login, isLoading, setLogin, handleSubmitEvent}) => {

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
                <input 
                    type="email"
                    id="email"
                    placeholder='usuario@email.com'
                    aria-describedby="user-email"
                    aria-invalid="false"
                    onChange={(val) => handleUsername(val.target.value)}
                    autoCapitalize='none'
                    autoFocus={true}
                    className='control-input'
                />
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder='contraseña'
                    aria-describedby="user-password"
                    aria-invalid="false"
                    onChange={(val)=> handlePassword(val.target.value)}
                    className='control-input'
                />
            </div>
            <div className="options">
                <button>Restaurar contraseña</button>
                <button>Registrarme</button>
            </div>
        </div>
        <div className="auth-footer">
            <button onClick={(e)=>handleSubmitEvent(e)}>
                {isLoading?
                <div className="loading">
                    <AiOutlineLoading3Quarters className="loading-icon"  />
                </div>
                :
                'Entrar'
                }
            </button>
        </div>
    </div>
  )
}

export default Authentication