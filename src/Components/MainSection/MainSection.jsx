import React from 'react'
import './main-section.scss'
import { CustomerSection } from './Components/CustomersSection/CustomerSection'
import { HeaderSection } from './Components/HeaderSection/HeaderSection'
import { StatsSection } from './Components/StatsSection/StatsSection'
import { AccountSection } from './Components/AccountSection/AccountSection'
import { BusinessSection } from './Components/BussinessSection/BusinessSection'

export const MainSection = () => {
  return (
  
      <div className="dashboard">
        <HeaderSection />
        <div className="main flex">
          <StatsSection />
          {/* <CustomerSection /> */}
          <BusinessSection />
          <AccountSection />
        </div>
      </div>
  )
}
