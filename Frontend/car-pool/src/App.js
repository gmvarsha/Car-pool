import logo from './logo.svg';
import './App.css';
import RideForm from './components/RideForm';
import RideList from './components/RideList';
import LoginForm from './components/LoginForm';
import { useState } from 'react';
import Requests from './components/Requests';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
function App() {
  return (
    
      <Router>
        <Routes>
          <Route  exact path="/" element={<LoginForm/>}/>
          <Route element={<RideForm/>} path='/rides'/>

          <Route element={<Requests/>} exact path='/requestsList'/>
          <Route element={<RideList/>} path='/ridesList'/>
        </Routes>
      </Router>

  );
}

export default App;
