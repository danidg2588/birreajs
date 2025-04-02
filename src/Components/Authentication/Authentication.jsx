import React, { useState } from 'react';
import "./authentication.scss"
import { CiBasketball } from "react-icons/ci";

export const Authentication = ({login, isLoading, setLogin, handleSubmitEvent}) => {

    const [userInfo,setUserInfo] = useState({
        email:"",
        phone:"",
        confirmation:null,
        password1:null,
        password2:null,
    })

    const [stage, setStage] = useState(true)
    const [pageStep,setPageStep] = useState(0)
    const [isActive,setIsActive] = useState(false)

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
        if (stage) {
            if (pageStep === 1){
                Switch4User()
            } else {
                setPageStep(pageStep-1)
            }
        } else {
            setPageStep(pageStep-1)
        }
    }

    const handleSteps = (e) => {
        e.preventDefault()
        console.log(stage + " & " + pageStep)
        console.log(userInfo)
        if (pageStep === 0)
        {
            if (userInfo.phone.length === 9)
            {
                setPageStep(1)
            }
        } else if (pageStep === 1){
            if (userInfo.email && userInfo.email.includes("@") && userInfo.email.length > 8){
                setPageStep(pageStep + 1)
            }
        } else if (pageStep === 2){
            if (userInfo.confirmation)
            {
                // send api
                setPageStep(pageStep + 1)
            }
        } else if (pageStep === 2){
            if (userInfo.password1 === userInfo.password2)
            {
                // create user via api
            }
        }

    }

    function Switch4User() {
        setIsActive(!isActive)
    }

    function handleStage(new_stage) {
        setStage(new_stage)
        Switch4User()
        if (new_stage)
        {
            setPageStep(0)
        } else {
            setPageStep(1)
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
                    <h1>
                        {stage ?
                        "REGISTRARME"
                        :
                        "RESTABLECER"
                        }
                    </h1>
                    {pageStep === 0 ?
                    <>
                        <label htmlFor="">Ingrese su celular</label>
                        <input type="text"s defaultValue={userInfo.phone} value={userInfo.phone} onChange={(val) => handlePhoneNumber(val.target.value)} className='control-input text-center' placeholder='Celular' maxLength={9}/>
                    </>
                    : pageStep === 1 ?
                    <>
                        <label htmlFor="">Ingrese su correo</label>
                        <input type="text" defaultValue={userInfo.email} value={userInfo.email} onChange={(val) => setUserInfo({...userInfo,email:val.target.value})} className='control-input text-center'placeholder='Email' />
                    </>
                    : pageStep === 2 ?
                    <>
                        <label htmlFor="">Ingresa el código enviado a tu correo</label>
                        <div className="flex">
                            <input type="text" maxLength={1} onChange={(e) => handleCode(e.target.value,0)} className='control-input confirmation-code' />
                            <input type="text" maxLength={1} onChange={(e) => handleCode(e.target.value,1)} className='control-input confirmation-code' />
                            <input type="text" maxLength={1} onChange={(e) => handleCode(e.target.value,2)} className='control-input confirmation-code' />
                            <input type="text" maxLength={1} onChange={(e) => handleCode(e.target.value,3)} className='control-input confirmation-code' />
                        </div>
                    </>
                    : pageStep === 3 ?
                    <>
                        <input type="password" className='control-input' placeholder='Nueva contraseña' />
                        <input type="password" className='control-input' placeholder='Repetir nueva contraseña' />
                    </>
                    : pageStep === 4 ?
                    <h2>
                        Su contraseña ha sido actualizada.
                    </h2>
                    : null
                    }
                        <div style={{display:"flex"}}>
                        {pageStep === 0?
                        <>
                            <button onClick={handleSteps}>
                                Siguiente
                            </button>
                        </>
                        : pageStep < 2 ?
                        <>
                        {stage ?
                        <>
                            <button onClick={handleBack}>
                                Atrás
                            </button>                      
                            <button onClick={handleSteps}>
                                Siguiente
                            </button>
                        </>
                        :
                            <button onClick={handleSteps}>
                                Siguiente
                            </button>
                        }
                        </>
                        : pageStep === 2 ?
                            <>
                            {stage ?
                                <>
                                    <button onClick={handleBack}>
                                        Atrás
                                    </button>
                                    <button onClick={handleSteps}>
                                        Siguiente
                                    </button>
                                </>
                            : 
                            <>
                                {pageStep === 2 ?
                                <button onClick={handleSteps}>
                                    Siguiente
                                </button>                                
                                :
                                <button onClick={handleSteps}>
                                    Actualizar
                                </button>
                                }                            
                            </>
                            }
                            </>
                        : pageStep === 3 ?
                            <>
                            {stage ?
                            <button onClick={handleSteps}>
                                Registrarme
                            </button>
                            :
                            <button onClick={handleSteps}>
                                Recuperar
                            </button>
                            }
                            </>
                        : null
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
                    <div className='customer-links'>
                        <div className="link text-start" onClick={()=> handleStage(true)}>
                            Registrarme
                        </div>
                        <div className="link text-start" onClick={()=> handleStage(false)}>
                            Olvidé mi contraseña
                        </div>
                    </div>
                    <button >Entrar</button>
                </form>
            </div>

            <div className={isActive?"active toggle-container":"toggle-container"}>
                <div className={isActive?"active toggle":"toggle"}>
                    <div className={isActive?"active toggle-panel toggle-left":"toggle-panel toggle-left"}>
                        <h2>¡BIENVENIDO!</h2>
                        <p>
                            Si ya estás registrado puedes utiilzar tu email y contraseña para acceder a la plataforma de gestión de reservas.
                        </p>
                        <button onClick={Switch4User}>
                            Ir
                        </button>
                    </div>
                    <div className={isActive?"active toggle-panel toggle-right":"toggle-panel toggle-right"}></div>
                </div>
            </div>
        </div>
    </div>
)
  
}
