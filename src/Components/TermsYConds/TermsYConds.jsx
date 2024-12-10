import React, { useState } from 'react'
import { FaVolleyballBall } from "react-icons/fa";
import './terms.css'

export const TermsYConds = () => {
  const [isLoading,setIsLoading] = useState(false)
  const [background, setBackground] = useState(null)

  return (
    <main>
      {isLoading ?
        <div className="loading">
          <FaVolleyballBall className="loading-icon" />
        </div>
      :
      <div className='wizard'>
        <div style={{backgroundImage:`url("${background}")`}} className="wizard-card"></div>
        <div className="wizard-wrapper">
          <div className="terms-and-conditions">

            <h1 className='uppercase'>Términos y Condiciones</h1>

            <div className="paragraph">
              <h3 className='uppercase'>
                1. Uso de datos
              </h3>
              <p>
                No usamos tus datos más que los que ingresas para realizar la reserva de tu cancha.
              </p>
              <p>
              Tu número de teléfono será solamente almacenado para comprobar que ya lo haz autenticado anteriomente en tus reservas, no te enviaremos ningún tipo de mensajes y puedes solicitar que tus datos sean borrados enviando un correo a reservas@birrea.com.
              </p>
            </div>

            <div className="paragraph">
              <h3 className='uppercase'>
                2. Generales
              </h3>
              <p>
                Mmmm.... en verdad esta aplicación es bien sencilla, esperamos que disfrutes con tus amigos tu birrea.
              </p>
            </div>
          </div>
        </div>
      </div>
      }
    </main>
  )
}
