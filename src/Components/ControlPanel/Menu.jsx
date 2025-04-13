import React, { useState } from 'react'
import './menu.scss'

import { FaPersonHiking, FaCreditCard, FaAngleLeft, FaAngleRight, FaHouse, FaCirclePlus, FaUser, FaLocationDot } from "react-icons/fa6";
import { IoMenu, IoClose, IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

const Menu = ({page, setPage}) => {
  let navigate = useNavigate();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)
  const [mobile,setMobile] = useState(false)

  function handleLogout(){
    localStorage.removeItem('birrea.app')
    navigate("/")
  }

  return (
    <>
      <div className={isMenuExpanded? "side-bar-container expanded":"side-bar-container"}>
        <div className="nav-upper">
          <div className="nav-heading">
            <Link to="/" className="nav-brand logo-brand">
              <div className="logo">B</div>
            </Link>
            <button 
            onClick={() => setIsMenuExpanded(!isMenuExpanded)}
            className='arrow-icon'>
              {isMenuExpanded?
              <FaAngleRight className='menu-icon' />
              :
              <FaAngleLeft className='menu-icon' />
              }
            </button>
          </div>
        </div>
        <div className="nav-menu" style={isMenuExpanded?{width:"150px"}:null}>
          <div className={page==='home'?"menu-item active":"menu-item"} onClick={() => setPage('home')}>
              <FaHouse className='nav-menu-icon'/>
              {isMenuExpanded?
                <span>Home</span>
              :null}
            </div>

            <div className={page==='payments'?"menu-item active":"menu-item"} onClick={() => setPage('payments')}>
              <FaCreditCard className='nav-menu-icon'/>
              {isMenuExpanded?
              <span>Payments</span>
              :null}
            </div>

            <div className={page==='new'?"menu-item active":"menu-item"} onClick={() => setPage('new')}>
              <FaCirclePlus className='nav-menu-icon'/>
              {isMenuExpanded?
              <span>Add</span>
              :null}
            </div>

            <div className={page==='profile'?"menu-item active":"menu-item"} onClick={() => setPage('profile')}>
              <FaUser className='nav-menu-icon'/>
              {isMenuExpanded?
              <span>Profile</span>
              :null}
            </div>
        </div>
        <div className="nav-bottom">
          <div className="menu-item flex-start" onClick={()=>handleLogout()}>
            <IoLogOut className='nav-menu-icon'/>
            {isMenuExpanded?
            <span>Log out</span>
            :null}
          </div>
        </div>
      </div>
      <div className="mobile">
          <Link to="/" className="brand logo-brand">
              E
          </Link>
        <IoMenu onClick={() => setMobile(true)} className='menu-icon' />
      </div>
      {mobile?
      <div className="mobile-menu">
        <IoClose onClick={() => setMobile(false)} className='mobile-close-icon' />
        <div className="nav-menu">
            <div className="menu-item">
              <FaHouse className='nav-menu-icon'/>
              <span>Home</span>
            </div>
            <div className="menu-item">
              <FaCreditCard className='nav-menu-icon'/>
              <span>Payments</span>
            </div>
            <div className="menu-item">
              <FaUser className='nav-menu-icon'/>
              <span>Profile</span>
            </div>
            <span className="menu-item" onClick={() => handleLogout()}>
              <FaLocationDot className='nav-menu-icon'/>
              <span>Cerrar sesión</span>
            </span>
          </div>
      </div>
      :null}
    </>
  )
}

export default Menu