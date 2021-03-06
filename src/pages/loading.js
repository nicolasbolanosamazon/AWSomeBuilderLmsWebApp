
import React, { useState, useEffect } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
import { Route, Navigate } from 'react-router';


const RedirectPage = ()=>{
    const location = useLocation();
    const accessToken = new URLSearchParams(location.hash).get('access_token');
    const idToken = new URLSearchParams(location.hash).get('#id_token');
    console.log('id token is:');
    console.log(idToken);
    console.log('access token is:');
    console.log(accessToken);
    localStorage.setItem('id_token',idToken);
    localStorage.setItem('access_token',accessToken);
    
    /*
    const authCode = new URLSearchParams(location.search).get('code');
    if(authCode){
      fetch('https://octanklmsuserportal.auth.us-east-1.amazoncognito.com/oauth2/token',{
            method: 'POST',
            body: qs.stringify({
                'grant_type': 'authorization_code',
                'client_id': '5nnbtiev29t8h3cujhssiflctv',
                'redirect_uri': 'https://main.d2p5zbpxldnu9d.amplifyapp.com/',
                'code': authCode
              }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res)=>{return res.json()}).then(data=>{
            console.log(data)
            console.log('access token is:');
            console.log(data.result['access_token']);
            console.log('id token is:');
            console.log(data.result['id_token']);
            console.log('Refresh token is:');
            console.log(data.result['refresh_token']);
            localStorage.setItem('id_token',data.result['id_token']);
            localStorage.setItem('access_token',data.result['access_token']);
            localStorage.setItem('refresh_token',data.result['refresh_token']);
            history.replace('/')
          });
    }
    */
    return(
            <Navigate to="/" />
        
    )
    
}

export default RedirectPage;