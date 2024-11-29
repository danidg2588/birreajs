import React, { useState } from 'react'
import ReactApexCharts from 'react-apexcharts'
import './customerSection.css'
import { BiCreditCard } from "react-icons/bi";

export const CustomerSection = () => {

  const [viewCard2, setViewCard2] = useState(false)

    const [graph,setGraph] = useState({
        options:{
            colors:["#01565B","#5ABA8A"],
            chart:{
                id:'basic-bar',
                toolbar:{
                    show:true,

                },
            },

            xaxis:{
                categories: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
            }
        },

        series:[
            {
                name:"Updates",
                data: [25, 33, 13, 89, 34, 20, 30]
            },
            {
                name:"New tasks",
                data: [70, 47, 72, 45, 12, 59, 38]
            },
        ]
    })

  return (
    <div className='customer-section'>

      <div className="graph">
        <span className="title">
          All activities (Graphical View)
        </span>
        <ReactApexCharts 
          options={graph.options}
          series={graph.series}
          type="area"
          width="500"
          className="chart"
        />
      </div>

    </div>
  )
}
