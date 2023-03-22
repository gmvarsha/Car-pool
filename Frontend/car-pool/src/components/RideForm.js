import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import  RideList  from './RideList'
function RideForm() {
    const location = useLocation();
    let navigate = useNavigate();
    const [vehicleType, setVehicleType] = useState('Car');
    const [route, setRoute] = useState('Velachery to Guindy');
    const [homeLocation, setHomeLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [seatsAvailable, setSeatsAvailable] = useState('');

    const [timings, setTimings] = useState('8.00 A.M');
    const [showRideList, setShowRideList] = useState(false);
    const id = location.state.id;
console.log(id);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const ride = {
            vehicleType,
            route,
            homeLocation,
            destination,
            seatsAvailable,
            timings

        };
        console.log(ride)
        try {
            const response = await axios.post('http://localhost:3000/rides', { ride, id });
            console.log(response.data);
            setShowRideList(true);
        } catch (error) {
            console.error(error);
        }
    };
    const handleRideListClick = () => {
        navigate('/ridesList',{state:id});
    };
    return (
        <div>
            {!showRideList ? (

<div style={{backgroundColor:'lightcyan',backgroundColor: "lightcyan",padding:"90px 100px"}}>
    <div className="d-flex justify-content-center my-3">
      <div className="col-md-6">
    
                <h2 style={{textAlign:'center'}}>Create a new Ride</h2>
                <form onSubmit={handleSubmit} 
                >
                    <div className="mb-3">
                    <label>
                        Vehicle Type:
                        <select className="form-select" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                            <option value="Car">Car</option>
                            <option value="Bike">Bike</option>
                        </select>
                    </label></div>
                    
                    <div className="mb-3">
                    <label>
                        Route:
                        <select className="form-select" value={route} onChange={(e) => setRoute(e.target.value)}>
                            <option value="Velachery to Guindy">Velachery to Guindy</option>
                            <option value="Adyar to T. Nagar">Adyar to T. Nagar</option>
                            <option value="Mylapore to Nungambakkam">Mylapore to Nungambakkam</option>
                        </select>
                    </label></div>
                    
                    <div className="mb-3">
                    <label>
                        Home Location:
                        <input
                        className="form-control"
                            type="text"
                            value={homeLocation}
                            onChange={(e) => setHomeLocation(e.target.value)}
                        />
                    </label>
                    </div>
                    
                    <div className="mb-3">
                    <label>
                        Destination:
                        <input
                        className="form-control"
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </label>
                    
                    </div>
                    <div className="mb-3">
                    <label>
                        Seats Available:
                        <input
                        className="form-control"
                            type="number"
                            value={seatsAvailable}
                            onChange={(e) => setSeatsAvailable(e.target.value)}
                        />
                    </label>
                    </div>
                    
                    <div className="mb-3">
                    <label>
                        Timings:
                        <select className="form-select" value={timings} onChange={(e) => setTimings(e.target.value)}>
                            <option value="8.00 A.M">8.00 A.M</option>
                            <option value="9.00 A.M">9.00 A.M</option>
                            <option value="10.00 A.M">10.00 A.M</option>
                        </select>
                    </label>
                    </div>
                    <div>
                    <button class="btn btn-primary" type="submit">Create Ride</button>
                    
                    <button class="btn btn-secondary"onClick={handleRideListClick}>RideList</button>
                    </div>
                    {/* <span style={{fontSize:"50px"}}>Click on the ride List</span> */}
                </form>
                </div>
                
               </div></div>
                ) : (
                <RideList />
            )}
            
        </div>
    );
}

export default RideForm;