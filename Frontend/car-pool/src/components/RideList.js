
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RideList() {
  const [rides, setRides] = useState([]);
  const [requestedRides, setRequestedRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get('http://localhost:3000/ridesList');
        
        setRides(response.data);
        console.log(rides)
      } catch (error) {
        console.error(error);
      }
    };

    fetchRides();
  }, []);
  const handleJoinRequest = async (rideId,userId,seats_Available,Timings) => {
    try {
        console.log("rideId",rideId)
      await axios.put('http://localhost:3000/requestToJoin/'+ rideId,{userId,seats_Available,Timings});
    //   await axios.post('http://localhost:3000/postRequest/'+rideId);
      setRequestedRides([...requestedRides, rideId]);
      
    } catch (error) {
      console.error(error);
    }
  };

  const isRideRequested = (rideId) => {
    return requestedRides.includes(rideId);
  };
  return (
    <div>
      <h2>List of Rides</h2>
      <table>
        <thead>
          <tr>
            <th>Ride Id</th>
            <th>Vehicle Type</th>
            <th>Route</th>
            <th>Home Location</th>
            <th>Destination</th>
            <th>User Id</th>
            <th>Seats Available</th>
            <th>Timings</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <tr key={ride.id}>
              <td>{ride.ride_id}</td>
              <td>{ride.Vehicle_Type}</td>
              <td>{ride.Route}</td>
              <td>{ride.Home_Location}</td>
              <td>{ride.Destination}</td>
              <td>{ride.User_Id}</td>
              <td>{ride.seats_Available}</td>
              <td>{ride.Timings}</td>
              <td>
                {isRideRequested(ride.ride_id) ? (
                  <span>Requested</span>
                ) : (
                  <button onClick={() => handleJoinRequest(ride.ride_id,ride.User_Id,ride.seats_Available,ride.Timings)}>Request to Join</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default RideList;