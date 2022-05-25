import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './navbarElements';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: localStorage.getItem('REACT_TOKEN_AUTH')!=null};
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;
        let loginLogoutButton
        if (!isLoggedIn) {
            loginLogoutButton = <a href="https://octanklmsuserportal.auth.us-east-1.amazoncognito.com/login?client_id=5nnbtiev29t8h3cujhssiflctv&response_type=code&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=https://main.d2p5zbpxldnu9d.amplifyapp.com/welcome/">Sign In</a>
        }
        else {
            loginLogoutButton = <a href="https://octanklmsuserportal.auth.us-east-1.amazoncognito.com/logout?client_id=5nnbtiev29t8h3cujhssiflctv&response_type=code&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=https://main.d2p5zbpxldnu9d.amplifyapp.com/">Sign Out</a>
        }
        return (
            <>
                <Nav>
                    <NavLink to='/'>
                        <h2>Ocktank LMS</h2>
                    </NavLink>
                    <Bars/>
                    <NavMenu>
                        <NavLink to='/about'>
                            Student Module
                        </NavLink>
                        <NavLink to='/services'>
                            Teachers Module
                        </NavLink>
                    </NavMenu>
                    <NavBtn>
                            {loginLogoutButton}
                    </NavBtn>
                </Nav>
            </>
          )
    }
  
}

export default NavBar