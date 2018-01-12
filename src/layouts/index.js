import React from 'react'
import Wrap from '../components/Wrap/Wrap.js'
import Banner from '../components/Banner/Banner.js'
import Menu from '../components/Menu/Menu.js'
import Footer from '../components/Footer/Footer.js'

import '../sass/_generic.global.scss'


export default ({children}) => (
  <Wrap>
    <Banner>
      <Menu/>
    </Banner>

    <div className="s-editable" style={{ margin: '0 auto', maxWidth: 650, padding: '0 1rem' }}>
      {children()}
    </div>

    <Footer/>
  </Wrap>
)
