import React from 'react';
import Navbar from './';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundImage: "url('https://thumbs.dreamstime.com/b/concept-carpooling-illustrated-pictures-background-159001149.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"

        }}
      >
      </div>
    </div>
  );
};

export default Home;

