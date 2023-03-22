import logo from './logo.svg';
import RideForm from './components/RideForm';
import RideList from './components/RideList';
import LoginForm from './components/LoginForm';
import { useState } from 'react';

import Requests from './components/Requests';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
function App() {
  return (
    
      <Router>
        
        <Routes>
          <Route  exact path="/" element={<Home/>}/>
          <Route  exact path="/login" element={<LoginForm/>}/>
          <Route  exact path="/register" element={<Register/>}/>

          <Route element={<RideForm/>} exact path='/rides'/>
          <Route element={<Requests/>} exact path='/requestsList'/>
          <Route element={<RideList/>} path='/ridesList'/>
        </Routes>
      </Router>

  );
}

export default App;

