import React from 'react'
import {applyCustomAmpersands} from 'react-custom-ampersand'
import {brandColor} from '../../utils/colors.js'
import styles from './style.module.scss'


export default ({ children }) => {

  return (
    <div className={styles.headingwrap}>
      <h1 style={{margin: 0}}>
        { applyCustomAmpersands(children, {
          color: brandColor
        }) }
      </h1>
    </div>
  )
}
