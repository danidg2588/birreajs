import React, { useEffect, useState } from 'react'
import { FaFootballBall, FaSearch } from "react-icons/fa";
import './consultar.css'

import axios from 'axios';


const Consultar = () => {

  const [isLoading,setIsLoading] = useState(false)
  const [background,setBackground] = useState(null)
  const [booking,setBooking] = useState(null)
  const [confirmation, setConfirmation] = useState()

  async function search() {
    setIsLoading(true)
    try
    {
    axios.get("https://danilo2588.pythonanywhere.com/confirmation", {
        params:{
            'booking':booking,
            }
        })
        .then(function (response) {
          console.log(response.data)
          setConfirmation(response.data)
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
                // headers: {"Authorization":"5a77174f81f459f4978816fece4ee724f2afb9f3"},
                Timeout:3500,
              })
              .then(function (response) {
                  console.log(response.data)
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
  
  return (
    <main>
      {isLoading ?
        <div className="loading">
          <FaFootballBall className="loading-icon" />
        </div>
      :
      <div className='wizard'>
        <div style={{backgroundImage:`url("${background}")`}} className="wizard-card"></div>
        <div className="wizard-wrapper">
          {confirmation ?
          <div className="confirmation-wrapper">
            <div className="title">
              {confirmation}
            </div>
          </div>
          :
          <div className="container-wrapper">
            <div className="title-wrapper">
              <span>Ingrese su código:</span>
            </div>
            <input 
              type="text"
              value={booking}
              placeholder='XXXXXX-01'
              className="consulta"
              maxLength={9} 
              onChange={(value)=>setBooking(value.target.value)}
            />
            <button 
              onClick={search}
            className="check">
              <FaSearch />
            </button>
          </div>
          }
        </div>
      </div>
      }
    </main>
  )
}

export default Consultar