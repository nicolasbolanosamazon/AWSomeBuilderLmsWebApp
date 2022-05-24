import './App.css';
import React from 'react';
import NavBar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/signIn' element={() => { 
            window.location.href = 'https://octanklmsuserportal.auth.us-east-1.amazoncognito.com/login?client_id=3sa67oa6g55de1ma4m85hm6d02&response_type=code&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=https://main.d2p5zbpxldnu9d.amplifyapp.com/'; 
            return null;
          }}/>
      </Routes>
    </Router>
  );
}

export default App;
