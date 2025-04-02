import React, { useState } from 'react'
import "./statsSection.scss"


export const StatsSection = () => {


    return (
      <div className="main-cards flex">

        <div className="stats">
          <div className="stat">

            <div className="single-stat">
              <div className="stat-info flex">
                <span className="status">
                  Complete works
                </span>
                <div className="span percentage">75%</div>
              </div>
              <div className="line">
                <span className="range range1" style={{"--stat1":"75%"}}></span>
              </div>
            </div>

            <div className="single-stat">
              <div className="stat-info flex">
                <span className="status">
                  Porcentaje de uso de canchas
                </span>
                <div className="span percentage">95%</div>
              </div>
              <div className="line">
                <span className="range range2" style={{"--stat2":"95%"}}></span>
              </div>
            </div>

            <div className="single-stat">
              <div className="stat-info flex">
                <span className="status">
                  Porcentaje de uso de canchas
                </span>
                <div className="span percentage">84%</div>
              </div>
              <div className="line">
                <span className="range range3" style={{"--stat3":"84%"}}></span>
              </div>
            </div>


            <div className="single-stat">
              <div className="stat-info flex">
                <span className="status">
                  Porcentaje de uso de canchas
                </span>
                <div className="span percentage">84%</div>
              </div>
              <div className="line">
                <span className="range range3" style={{"--stat3":"84%"}}></span>
              </div>
            </div>

          </div>
        </div> 
  
        <div className="cards">
          <div className="card yellow-card flex">
            <div className="date">
              <span>Mon</span>
              <h3>18</h3>
            </div>
  
            <div className="percentage">
              <span className="text">Productive</span>
              <div className="flex">
                <span className="line"></span>
                <span className="pctg">86%</span>
              </div>
            </div>
  
            <div className="time">
              <span className="text">Productive Time</span>
              <h2>5h 12m</h2>
            </div>
  
            <div className="work-time">
              <span className="text">
                Time at work
              </span>
              <h2>5 h 45m</h2>
            </div>
          </div>
  
          <div className="card lightgreen-card flex">
            <div className="date">
              <span>Tue</span>
              <h3>19</h3>
            </div>
  
            <div className="percentage">
              <span className="text">Productive</span>
              <div className="flex">
                <span className="line"></span>
                <span className="pctg">84%</span>
              </div>
            </div>
  
            <div className="time">
              <span className="text">Productive Time</span>
              <h2>5h 12m</h2>
            </div>
  
            <div className="work-time">
              <span className="text">
                Time at work
              </span>
              <h2>5 h 45m</h2>
            </div>
          </div>
  
          <div className="card darkgreen-card flex">
            <div className="date">
              <span>Wed</span>
              <h3>20</h3>
            </div>
  
            <div className="percentage">
              <span className="text">Productive</span>
              <div className="flex">
                <span className="line"></span>
                <span className="pctg">91%</span>
              </div>
            </div>
  
            <div className="time">
              <span className="text">Productive Time</span>
              <h2>5h 12m</h2>
            </div>
  
            <div className="work-time">
              <span className="text">
                Time at work
              </span>
              <h2>5 h 45m</h2>
            </div>
          </div>
        </div>
        
      </div>
    )
  }