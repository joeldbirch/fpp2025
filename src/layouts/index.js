import React from 'react'
import Banner from '../components/Banner/Banner.js'
import Menu from '../components/Menu/Menu.js'


export default ({children}) => (
  <div className="wrap">
    <Banner>
      <Menu/>
    </Banner>

    <div className="s-editable" style={{ margin: '0 auto', maxWidth: 650, padding: '0 1rem' }}>
      {children()}
    </div>
  </div>
)
