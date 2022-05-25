import './App.css';
import React from 'react';
import NavBar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import RedirectPage from './pages/loading';
function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/signIn' element={() => { 
            window.location.href = 'https://octanklmsuserportal.auth.us-east-1.amazoncognito.com/login?client_id=5nnbtiev29t8h3cujhssiflctv&response_type=token&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=https://main.d2p5zbpxldnu9d.amplifyapp.com/'; 
            return null;
          }}/>
          <Route path='/welcome/' element={<RedirectPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
