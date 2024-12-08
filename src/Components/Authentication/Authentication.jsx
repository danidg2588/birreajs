import React, { useState } from 'react';
import "./authentication.css"
import { CiBasketball } from "react-icons/ci";

  export const Authentication = ({login, isLoading, setLogin, handleSubmitEvent}) => {

    const [resetLogin,setResetLogin] = useState({
        email:null,
        confirmation:null,
        password1:null,
        password2:null,
    })

    const [registerStep,setRegisterStep] = useState(0)

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

    const handleBack = (e) => {
        e.preventDefault()
        setRegisterStep(registerStep-1)
    }

    const handleResetPassword = (e) => {
        e.preventDefault()

        if (resetLogin.email && registerStep == 0)
        {
            setRegisterStep(registerStep+1)
        } else {
            alert("asfsf")
        }
    }



    const [isActive,setIsActive] = useState(false)

    function Switch4User() {
        setIsActive(!isActive)
    }

  return (
  <div className='authentication'>
        {isLoading ?
            <div className="loading">
                <CiBasketball className="loading-icon" />
            </div>
        : null
        }
        <div className='auth-container'>
            <div className={isActive?"form-container sign-up active":"form-container sign-up"}>
                <form id='create-account-form'>
                    <h1>RESTABLECER</h1>
                    {registerStep === 0 ?
                    <>
                        <label htmlFor="">Ingresa tu correo</label>
                        <input type="text" onChange={(val) => setResetLogin({email:val.target.value})} className='control-input cc-number' placeholder='Email' id='cc-number'/>
                    </>
                    : registerStep === 1 ?
                    <>
                        <label htmlFor="">Ingresa el código enviado a tu correo</label>
                        <input type="text" className='control-input' placeholder='Código' />
                    </>
                    :
                    <>
                        <input type="password" className='control-input' placeholder='Nueva contraseña' />
                        <input type="password" className='control-input' placeholder='Repetir nueva contraseña' />
                    </>
                    }
                        <div style={{display:"flex"}}>
                        {registerStep === 0?
                        <>
                            <button onClick={handleResetPassword}>
                                Siguiente
                            </button>
                        </>
                        : registerStep < 2 ?
                        <>
                            <button onClick={handleBack}>
                                Atrás
                            </button>
                            <button onClick={handleResetPassword}>
                                Siguiente
                            </button>
                        </>
                        :
                        <button onClick={handleResetPassword}>
                            Actualizar
                        </button>
                        }
                        </div>
                </form>
            </div>
            <div className={isActive?"active form-container sign-in":"form-container sign-in"}>
                <form name='sign-in-form' onSubmit={handleSubmitEvent} autoComplete="off">
                    <h2>INICIAR SESIÓN</h2>
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
                    <button >Entrar</button>
                </form>
            </div>
            <div className={isActive?"active toggle-container":"toggle-container"}>
                <div className={isActive?"active toggle":"toggle"}>
                    <div className={isActive?"active toggle-panel toggle-left":"toggle-panel toggle-left"}>
                        <h2>BIENVENIDO!</h2>
                        <p>
                            Si ya estás registrado puedes utiilzar tu email y contraseña para acceder a la plataforma de gestión de reservas.
                        </p>
                        <button onClick={Switch4User}>
                            Ir
                        </button>
                    </div>
                    <div className={isActive?"active toggle-panel toggle-right":"toggle-panel toggle-right"}>
                        <h2 className='uppercase'>Restablecer</h2>
                        <p>
                            Restablecer mi contraseña para acceder al tablero de información de negocios.
                        </p>
                        <button onClick={Switch4User} id="login" className='upppercase'>
                            Restablecer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
  
}
