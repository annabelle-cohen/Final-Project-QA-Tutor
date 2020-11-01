import React from 'react'
import { Link } from 'react-router-dom'
import SignInLinks from './signedInLink'
import SignOutLinks from './signedOutLink'

const Navbar = () => {
    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to= '/' className="brand-logo">QA-Tutor</Link>
                <SignInLinks/>
                <SignOutLinks/>
            </div>
        </nav>
    )
}

export default Navbar;