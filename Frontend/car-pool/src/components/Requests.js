import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Requests() {
  const [requests, setRequests] = useState([]);
const [statusApprove,setStatusApprove]=useState('');

const [statusReject,setStatusReject]=useState('');
useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/requestsList');
        setRequests(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequests();
  }, []);
  const handleStatusApprove=async(request_id,ride_id,e)=>{
    e.preventDefault();

    setStatusApprove("Approved");
    
    try {
          console.log("requestId",request_id)
          await axios.put('http://localhost:3000/requestStatus/'+request_id,ride_id);
          
        } catch (error) {
          console.error(error);
        }
      
  }
  const handleStatusReject=async(request_id,e)=>{
    e.preventDefault();
    setStatusReject("Rejected");
    
    try {
          console.log("requestId",request_id)
          await axios.put('http://localhost:3000/requestStatusReject/'+request_id);
          
        } catch (error) {
          console.error(error);
        }
      
  }

  return (
    <div>
      <h2>List of Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request Id</th>
            <th>Ride Id</th>
            <th>Username</th>
            <th>Vehicle Type</th>
            <th>Route</th>
            <th>Home Location</th>
            <th>Destination</th>
            <th>Seats Requested</th>
            <th>Timings</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.request_id}>
              <td>{request.request_id}</td>
              <td>{request.ride_id}</td>
              <td>{request.username}</td>
              <td>{request.Vehicle_Type}</td>
              <td>{request.Route}</td>
              <td>{request.Home_Location}</td>
              <td>{request.Destination}</td>
              <td>{request.seats_Available}</td>
              <td>{request.Timings}</td>
              <td>{request.Status}</td>
              <td><button onClick={(e)=>handleStatusApprove(request.request_id,request.ride_id,e)}>Approve</button></td>
              <td><button onClick={(e)=>handleStatusReject(request.request_id,e)}>Reject</button></td>

            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default Requests;
