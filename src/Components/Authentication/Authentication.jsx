import React, { useEffect, useState } from 'react';
import "./authentication.css"

import DatePicker from 'react-datepicker'

  export const Authentication = () => {
    
    const [login, setLogin] = useState({
      email: "",
      password: "",
  });

  const [registerStep,setRegisterStep] = useState(0)

  const handleSubmitEvent = (e) => {
      e.preventDefault();
      // alert(login.username)
      if (login.username !== "" && login.password !== "") {
          alert("working ok")
      } else {
          alert("please provide a valid input");
      }
  };

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

  const handlePaymentProcess = (e) => {
      e.preventDefault()
      if (registerStep === 0){
          setRegisterStep(registerStep+1)
      } else if (registerStep === 1){
          setRegisterStep(registerStep-1)
      }
  }



  const [isActive,setIsActive] = useState(false)

  function Switch4User() {
      setIsActive(!isActive)
  }

  return (
  <div className='authentication'>
      <div className='auth-container'>
          <div className={isActive?"form-container sign-up active":"form-container sign-up"}>
              <form id='create-account-form'>
                  <h1>REGISTRARME</h1>
                  {registerStep === 0 ?
                  <>
                      <input type="text" className='control-input cc-number' placeholder='Email' id='cc-number'/>
                      <input type="password" className='control-input cc-expires' placeholder='Enter a password' id='cc-expires'/>
                      <input type="password" className='control-input' placeholder='Repeat your password'/>
                  </>
                  :
                  <>
                      <input type="text" className='control-input' placeholder='Credit Card Number' />
                      <input type="number" className='control-input' placeholder='XXX Number' defaultValue="000" min={100} max={999} />
                      <DatePicker 
                        value={new Date()}
                        openToDate={new Date()}
                        minDate={new Date()}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        placeholderText='Expiration date'
                        className='control-input'
                      />
                  </>
                  }
                      <div style={{display:"flex"}}>
                      {registerStep===0?
                          <button id='register' onClick={handlePaymentProcess}>
                              Siguiente
                          </button>
                      :
                      <>
                      <button onClick={handlePaymentProcess}>
                        Atrás
                      </button>
                      <button>
                        Registrar
                      </button>
                      </>
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
                      onChange={(val) => handleUsername(val)}
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
                      onChange={(val)=> handlePassword(val)}
                      className='control-input'
                  />
                  <a>Recuperar contraseña</a>
                  <button >Entrar</button>
              </form>
          </div>
          <div className={isActive?"active toggle-container":"toggle-container"}>
              <div className={isActive?"active toggle":"toggle"}>
                  <div className={isActive?"active toggle-panel toggle-left":"toggle-panel toggle-left"}>
                      <h2>BIENVENIDO!</h2>
                      <p>
                          Utiilzar tu email y contraseña para acceder a la plataforma y gestionar tus reservas.
                      </p>
                      <button onClick={Switch4User}>
                          Entrar
                      </button>
                  </div>
                  <div className={isActive?"active toggle-panel toggle-right":"toggle-panel toggle-right"}>
                      <h2>REGISTRARME</h2>
                      <p>
                          Registrar mi negocio para usar las funciones de la plataforma.
                      </p>
                      <button onClick={Switch4User} id="login">
                          REGISTRARME
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </div>
)
  
}