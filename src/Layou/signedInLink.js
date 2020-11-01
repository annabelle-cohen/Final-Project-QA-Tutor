import React from 'react'
import { NavLink } from 'react-router-dom'

const SignInLinks = () => {
    return(
     <ul className="right">
        <li><NavLink to='/'>Feedback</NavLink></li>
        <li><NavLink to='/'>Sign Out</NavLink></li>
     </ul>
    )
}

export default SignInLinks ;