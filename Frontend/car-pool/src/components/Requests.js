import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Requests() {
  let Navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/requestsList');
        setRequests(response.data);
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, []);
  const handleStatusApprove = async (ride_id, e) => {
    e.preventDefault();


    try {
      await axios.put('http://localhost:3000/requestStatusApprove/' + ride_id);

    } catch (error) {
      console.error(error);
    }

  }
  const handleStatusReject = async (ride_id, e) => {
    e.preventDefault();

    try {
      await axios.put('http://localhost:3000/requestStatusReject/' + ride_id);

    } catch (error) {
      console.error(error);
    }

  }
  const handleLogout = () => {
    Navigate('/')
  }

  return (
    <div style={{ padding: "50px 100px" }}>
      <h2 style={{
        textAlign: 'center'

      }}
      >List of Requests</h2>
      <table class="table table-hover table-dark">
        <thead class="thead-dark">
          <tr>

            <th scope="col">Ride Id</th>
            <th scope="col">Vehicle Type</th>

            <th scope="col">Home Location</th>
            <th scope="col">Destination</th>
            <th scope="col">Route</th>
            <th scope="col">Seats Requested</th>
            <th scope="col">Timings</th>
            <th scope="col">Status</th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr scope="row" key={request.ride_id}>

              <td>{request.ride_id}</td>
              <td>{request.vehicle_type}</td>

              <td>{request.home_location}</td>
              <td>{request.destination}</td>
              <td>{request.route}</td>
              <td>1</td>
              <td>{request.timings}</td>
              <td>{request.status}</td>
              <td><button onClick={(e) => handleStatusApprove(request.ride_id, e)} className="btn btn-success">Approve</button></td>
              <td><button onClick={(e) => handleStatusReject(request.ride_id, e)} className="btn btn-danger">Reject</button></td>

            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ padding: "10px 630px" }}>
        <button style={{ alignItems: "center" }} className="btn btn-primary" onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
}

export default Requests;
