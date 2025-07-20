import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import SignIn from './SignIn';
import styles from '../style/signinUp.module.css'

export default function welcome() {
  return (
    <>
    <div className={styles.homebody}>
        <h4 className={styles.homeh4}>Welcome to Sales Market</h4>
        <NavLink className={styles.homebutton} to={'/sign_in'}>Sign In</NavLink>
        <br />
        <NavLink className={styles.homebutton}  to={'/sign_up'}>Sign Up</NavLink>
    </div>
        
        

    </>
  )
}
