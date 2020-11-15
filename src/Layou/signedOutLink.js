import React from 'react'
import { NavLink } from 'react-router-dom'

const SignOutLinks = () => {
    return(
     <ul className="right">
        <li><NavLink to='/signIn'>Login</NavLink></li>
        <li><NavLink to='/about'>About Us</NavLink></li>
     </ul>
    )
}

export default SignOutLinks;