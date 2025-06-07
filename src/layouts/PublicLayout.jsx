import React from 'react'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
      <div>PublicLayout
          
          <Outlet/>
    </div>
  )
}

export default PublicLayout