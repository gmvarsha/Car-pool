const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@123',
    database: 'car_pooling'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to database:', err);
    } else {
        console.log('Connected to database!');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.log('Error while fetching user:', err);
            res.status(500).send('Internal server error');
        } else if (results.length === 0) {
            console.log('User not found:', username);
            res.status(401).send('Invalid username or password');
        } else {
            const user = results[0];

            if (user.password !== password) {
                console.log('Incorrect password for user:', username);
                res.status(401).send('Invalid username or password');
            } else {
                console.log('User logged in:', username);
                res.status(200).send(results);
            }
        }
    });
});
app.post('/rides', (req, res) => {
    const { vehicleType,
        route,
        homeLocation,
        destination,
        seatsAvailable, timings } = req.body.ride;
    const id = req.body.id;

    console.log(id);
    db.query('insert into rides(Vehicle_Type, Route, Home_Location, Destination,User_Id,seats_Available,Timings) VALUES (?,?,?,?,?,?,?)', [vehicleType, route, homeLocation, destination, id, seatsAvailable, timings], (err, results) => {
        if (err) {
            console.log('Error while fetching user:', err);
            res.status(500).send('Internal server error');
        }
        else {
            res.send({ message: 'Ride Added.' })
        }

    });
});
app.get('/ridesList', (req, res) => {
    db.query('SELECT * FROM rides', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
});
app.put('/requestToJoin/:rideId', (req, res) => {
    const ride_id = req.params.rideId;
    const user_Id=req.body.userId;
    const seatsAvailable=req.body.seats_Available;
    const timings=req.body.Timings;
    console.log(user_Id,seatsAvailable,timings);
    db.query('UPDATE rides SET Status = ? WHERE ride_id = ?', ['Requested', ride_id], (err, results) => {
        if (err) {
            console.log('Error while updating ride status:', err);
            res.status(500).send('Internal server error');
        } else {
            console.log('Ride request added:', ride_id);
            db.query('insert into requests(ride_id,user_id,seats_requested,timings) values(?,?,?,?)',[ride_id,user_Id,seatsAvailable,timings],(err, results) =>{
                if (err) {
                    console.log('Error while inserting requests:', err);
                    res.status(500).send('Internal server error');
                }
                else{
                    res.status(200).send('Ride request inserted');

                }
            }
            )
        }
    });
});
app.put('/requestStatus/:request_id', (req, res) => {
    const request_id = req.params.request_id;
    const status = "Approved";
    const ride_id = req.body.ride_id;

    // console.log(ride_id)
    db.query('UPDATE requests SET status = ? WHERE request_id = ?', [status, request_id], (err, results) => {
        if (err) {
            console.log('Error while updating ride status:', err);
            res.status(500).send('Internal server error');
        } else {
            console.log('Ride request Approved:', request_id);
            db.query('Select seats_Available from rides where ride_id=?',ride_id, (err, results) => {
                if (err) {
                    console.log('Error fetching seats available:', err);
                    res.status(500).send('Internal server error');
                }
                else {
                    console.log("seats:",results.data)
                    const seats_Available = results.data - 1
                    db.query('update rides set seats_Available=? where ride_id=ride_id', [seats_Available], (err, results) => {
                        if (err) {
                            console.log('Error while updating ride status:', err);
                            res.status(500).send('Internal server error');
                        }
                        else {
                            res.status(200).send('Ride request approved');
                        }

                    })
                }
        })

        }
    });
});
app.put('/requestStatusReject/:request_id', (req, res) => {
    const request_id = req.params.request_id;
    const status = "Rejected";

    console.log(status)
    db.query('UPDATE requests SET status = ? WHERE id = ?', [status, request_id], (err, results) => {
        if (err) {
            console.log('Error while updating ride status:', err);
            res.status(500).send('Internal server error');
        } else {
            console.log('Ride request Approved:', request_id);
            res.status(200).send('Ride request approved');
        }
    });
});

app.get('/requestsList', (req, res) => {
    db.query(`select rides.ride_id,rides.Vehicle_Type,rides.Home_Location,rides.Route,rides.Destination,rides.Timings,rides.seats_Available,rides.Timings,requests.Status,requests.request_id from rides 
     join requests on rides.User_Id=requests.user_id where rides.Status="Requested"`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Server error');
        } else {
            console.log(results);
            res.json(results);
        }
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
