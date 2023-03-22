
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
function RideList() {
  let Navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [requestedRides, setRequestedRides] = useState([]);
  const location = useLocation();

  const id = location.state.id;
console.log(id)
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get('http://localhost:3000/ridesList');
        
        setRides(response.data);
      
      } catch (error) {
        console.error(error);
      }
    };

    fetchRides();
  }, []);
  const handleJoinRequest = async (rideId) => {
    try {
        console.log("rideId",rideId)
      await axios.put('http://localhost:3000/requestToJoin/'+ rideId);
      setRequestedRides([...requestedRides, rideId]);
      
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout=()=>{
    Navigate('/')
  }
  // const handleRide=()=>{
  //   Navigate('/rides')
  // }

  const isRideRequested = (rideId) => {
    return requestedRides.includes(rideId);
  };
  return (
    
    <div style={{padding:"50px 100px"}}>
      <h2 style={{
        textAlign:'center',
      }}>List of Rides</h2>
        <table class="table table-hover table-dark">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Ride Id</th>
            
            <th scope="col">Vehicle Type</th>
            
            <th scope="col">Home Location</th>
            <th scope="col">Destination</th>
            <th scope="col">Route</th>
            
            <th scope="col">Seats Available</th>
            <th scope="col">Timings</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rides.filter((ride)=>ride.seats_available!=0).map((filteredRide) => (
            <tr scope="row" key={filteredRide.id}>
              <td>{filteredRide.ride_id}</td>
              <td>{filteredRide.vehicle_type}</td>
              <td>{filteredRide.home_location}</td>
              <td>{filteredRide.destination}</td>
              <td>{filteredRide.route}</td>
             
              
              <td>{filteredRide.seats_available}</td>
              <td>{filteredRide.timings}</td>
              <td>{filteredRide.status}</td>
              <td>
                {isRideRequested(filteredRide.ride_id) ? (
                  <span>Requested</span>
                ) : (
                  <button onClick={() => handleJoinRequest(filteredRide.ride_id)} className="btn btn-primary">Request to Join</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button className="btn btn-primary" onClick={() => handleRide()}>Create a ride</button> */}
<div style={{padding:"10px 610px"}}>
      <button className="btn btn-primary" onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
}

export default RideList;