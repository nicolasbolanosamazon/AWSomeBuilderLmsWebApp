
import React from "react";
import { useLocation,useNavigate  } from "react-router-dom";

var qs = require('qs');

const RedirectPage = ()=>{
    const location = useLocation();
    const history = useNavigate();
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
    return(
        <div>
            <h3>
                Loading ....
            </h3>
        </div>
    )
}

export default RedirectPage;