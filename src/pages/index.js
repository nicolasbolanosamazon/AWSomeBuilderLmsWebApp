import React, { useState } from 'react';

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const Home = () => {

    let [logedIn, setIsLogedIn] = useState(localStorage.getItem('id_token') != null)

    let homeText = "Welcome to Octank's LMS"

    if(logedIn){
        let jwtDecoded = parseJwt(localStorage.getItem('id_token'))
        homeText = "Welcome back " + jwtDecoded['custom:full_name']
    }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        backgroundImage:`url(https://wallpapercave.com/wp/wp2036897.jpg)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: '#fff'
      }}
    >
      <h1>{homeText}</h1>
    </div>
  );
};

export default Home;