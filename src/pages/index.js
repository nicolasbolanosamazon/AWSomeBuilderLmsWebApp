import React from 'react';

const Home = () => {
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
      <h1>Welcome to Octank's LMS</h1>
    </div>
  );
};

export default Home;