import React, { useEffect, useState } from 'react'
import './datepicker.scss'

const DatePicker = ({wizard, setWizard}) => {
    const dates = []

    for (let i = 0; i < 25; i++) {
        let date1 = new Date(new Date(new Date(new Date(new Date().setMinutes((15 * Math.ceil(new Date().getMinutes() / 15) % 60))).setSeconds(0))).setHours(new Date(new Date(new Date().setMinutes((15 * Math.ceil(new Date().getMinutes() / 15) % 60))).setSeconds(0)).getHours() + 1));
        dates.push(date1);
        date1.setDate(new Date(date1).getDate() + i)      
    }
    
    function handleDate(item){
        console.log(item)


        setWizard({
            ...wizard,
            date:item,
            step:wizard.step + 1
        })
    }

  return (

    <div className="date-picker">
        {dates.map((item,id) => 
            <div className={(wizard.date.getMonth() + '-' + wizard.date.getDate() === item.getMonth() + '-' + item.getDate())?"active date-card":"date-card"} key={id} onClick={() => handleDate(item)}>
                <div className="month">
                    {item.getMonth() === 0?
                        'Enero'
                    :item.getMonth() === 1?
                        'Febrero'
                    :item.getMonth() === 2?
                        'Marzo'
                    :item.getMonth() === 3?
                        'Abril'
                    :item.getMonth() === 4?
                        'Mayo'
                    :item.getMonth() === 5?
                        'Junio'    
                    :item.getMonth() === 6?
                        'Julio'
                    :item.getMonth() === 6?
                        'Agosto'
                    :null}
                </div>
                <div className="date">
                    {item.getDate()}
                </div>
                <div className="weekday">
                    {item.getDay() === 0?
                        'Domingo'
                    :item.getDay() === 1?
                        'Lunes'
                    :item.getDay() === 2?
                        'Martes'
                    :item.getDay() === 3?
                        'Miércoles'
                    :item.getDay() === 4?
                        'Jueves'
                    :item.getDay() === 5?
                        'Viernes'    
                    :item.getDay() === 6?
                        'Sábado'   
                    :null}
                </div>
                
            </div>
        )}
    </div>
  )
}

export default DatePicker