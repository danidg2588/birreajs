import React, { useState } from 'react'
import './faqs.scss'

import { IoChevronBack, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Link } from 'react-router-dom'


const Faqs = () => {

  const [faqs,setFaqs] = useState({
    answer1: false,
    answer2: false,
    answer3: false,
    answer4: false,
    answer5: false,
    answer6: false,
  })
  
  function Collapse(id){
    setFaqs({
      ...faqs,
      ['answer'+id] : !faqs['answer'+id]
    })
  }

  return (
    <div className="faqs">
        <div className="header">
          <Link className='icon-container' to='/'>
            <IoChevronBack className='icon' />
          </Link>
          <h1>
              FAQ's
          </h1>
        </div>
        <div className="content">
          <div className="container" onClick={() => Collapse(1)}>
            <div className="question">
              <span className="title">
                ¿Qué es Birrea App?
              </span>
              {faqs.answer1?
              <IoChevronUp className='chevron-icon' />
              :
              <IoChevronDown className='chevron-icon' />
              }
            </div>
            <p className={faqs.answer1?"answer extended":"answer collapsed"}>
              Somos un aplicación para gestionar las reservas de canchas deportivas en Panamá.
            </p>
          </div>

          <div className="container" onClick={() => Collapse(2)}>
            <div className="question">
              <span className="title">
                ¿Quién puede hacer reservas?
              </span>
              {faqs.answer2?
              <IoChevronUp className='chevron-icon' />
              :
              <IoChevronDown className='chevron-icon' />
              }
            </div>
            <p className={faqs.answer2?"answer extended":"answer collapsed"}>
              Somos un aplicación para gestionar las reservas de canchas deportivas en Panamá.
            </p>
          </div>

          <div className="container" onClick={() => Collapse(3)}>
            <div className="question">
              <span className="title">
                ¿Porqué debería registrarme?
              </span>
              {faqs.answer3?
              <IoChevronUp className='chevron-icon' />
              :
              <IoChevronDown className='chevron-icon' />
              }
            </div>
            <p className={faqs.answer3?"answer extended":"answer collapsed"}>
              Para llevar un control de tus reservas, recibir promociones y otros beneficios.
            </p>
          </div>

          <div className="container" onClick={() => Collapse(4)}>
            <div className="question">
              <span className="title">
                ¿Cuando puedo hacer resservas?
              </span>
              {faqs.answer4?
              <IoChevronUp className='chevron-icon' />
              :
              <IoChevronDown className='chevron-icon' />
              }
            </div>
            <p className={faqs.answer4?"answer extended":"answer collapsed"}>
              Puedes hacer reservas 24/7 desde cualquier parte del mundo desde tu celular.
            </p>
          </div>

        </div>
    </div>
  )
}

export default Faqs