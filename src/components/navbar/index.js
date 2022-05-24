import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './navbarElements';

const NavBar = () => {
  return (
    <>
        <Nav>
            <NavLink to='/'>
                <h2>Ocktank LMS</h2>
            </NavLink>
            <Bars/>
            <NavMenu>
                <NavLink to='/about' activeStyle>
                    Student Module
                </NavLink>
                <NavLink to='/services' activeStyle>
                    Teachers Module
                </NavLink>
            </NavMenu>
            <NavBtn>
                    <a href="https://octanklmsuserportal.auth.us-east-1.amazoncognito.com/login?client_id=3sa67oa6g55de1ma4m85hm6d02&response_type=code&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=https://main.d2p5zbpxldnu9d.amplifyapp.com/">Sign In</a>
            </NavBtn>
        </Nav>
    </>
  )
}

export default NavBar