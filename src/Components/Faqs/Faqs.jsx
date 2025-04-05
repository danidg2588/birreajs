import React from 'react'
import './faqs.scss'

import { IoChevronBack, IoChevronDown } from "react-icons/io5";
import { Link } from 'react-router-dom'


const Faqs = () => {
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
          <div className="container">
            <div className="question">
              <span className="title">
                ¿Qué es Birrea App?
              </span>
              <IoChevronDown className='chevron-icon' />
            </div>
            <p className="answer">
              Somos un aplicación para gestionar las reservas de canchas deportivas en Panamá.
            </p>
          </div>

          <div className="container">
            <div className="question">
              <span className="title">
                ¿Quién puede hacer reservas?
              </span>
              <IoChevronDown className='chevron-icon' />
            </div>
          </div>

          <div className="container">
            <div className="question">
              <span className="title">
                ¿Qué deportes se pueden reservar?
              </span>
              <IoChevronDown className='chevron-icon' />
            </div>
          </div>

          <div className="container">
            <div className="question">
              <span className="title">
                ¿En que canchas puedo hacer reservas?
              </span>
              <IoChevronDown className='chevron-icon' />
            </div>
          </div>

          <div className="container">
            <div className="question">
              <span className="title">
                ¿En que canchas puedo hacer reservas?
              </span>
              <IoChevronDown className='chevron-icon' />
            </div>
          </div>

          <div className="container">
            <div className="question">
              <span className="title">
                ¿En que canchas puedo hacer reservas?
              </span>
              <IoChevronDown className='chevron-icon' />
            </div>
          </div>

          <div className="container">
            <div className="question">
              <span className="title">
                ¿En que canchas puedo hacer reservas?
              </span>
              <IoChevronDown className='chevron-icon' />
            </div>
          </div>

          <div className="container">
            <div className="question">
              <span className="title">
                ¿En que canchas puedo hacer reservas?
              </span>
              <IoChevronDown className='chevron-icon' />
            </div>
          </div>

        </div>
    </div>
  )
}

export default Faqs