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
    database: 'vehicle_pooling'
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

    db.query('SELECT * FROM user WHERE username = ? and password=?', [username, password], (err, results) => {
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
    db.query('insert into rides(user_id,vehicle_type, home_location, Destination,Route,seats_available,timings) VALUES (?,?,?,?,?,?,?)', [id, vehicleType, homeLocation, destination, route, seatsAvailable, timings], (err, results) => {
        if (err) {
            console.log('Error while fetching user:', err);
            res.status(500).send('Internal server error');
        }
        else {
            res.send({ message: 'Ride Added.' })
        }

    });
});
app.post('/register', (req, res) => {
    const { username, password, role } = req.body;

    db.query('insert into user(username,password,role) VALUES (?,?,?)', [username, password, role], (err, results) => {
        if (err) {
            console.log('Error while registering:', err);
            res.status(500).send('Internal server error');
        }
        else {
            res.send({ message: 'Registered successfully' })
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

    db.query('UPDATE rides SET Status = ? WHERE ride_id = ?', ['Requested', ride_id], (err, results) => {
        if (err) {
            console.log('Error while updating ride status:', err);
            res.status(500).send('Internal server error');
        } else {
            console.log('Ride request updated:', ride_id);

            res.status(200).send('Ride request updated');
        }
    });
});
app.put('/requestStatusApprove/:ride_id', (req, res) => {
    const ride_id = req.params.ride_id;
    const status = "Approved";
    db.query('UPDATE rides SET status = ? WHERE ride_id = ?', [status, ride_id], (err, results) => {
        if (err) {
            console.log('Error while updating ride status:', err);
            res.status(500).send('Internal server error1');
        } else {
            console.log('Ride request Approved:', ride_id);
            db.query('Select seats_available from rides where ride_id=?', ride_id, (err, results) => {
                if (err) {
                    console.log('Error fetching seats available:', err);
                    res.status(500).send('Internal server error2');
                }
                else {
                    console.log("seats:", results[0].seats_available)

                    const seats_Available = results[0].seats_available - 1
                    console.log(seats_Available)
                    db.query('update rides set seats_available=? where ride_id=?', [seats_Available, ride_id], (err, results) => {
                        if (err) {
                            console.log('Error while updating ride status:', err);
                            res.status(500).send('Internal server erro3');
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
app.put('/requestStatusReject/:ride_id', (req, res) => {
    const ride_id = req.params.ride_id;
    const status = "Rejected";
    db.query('UPDATE rides SET status = ? WHERE ride_id = ?', [status, ride_id], (err, results) => {
        if (err) {
            console.log('Error while updating ride status:', err);
            res.status(500).send('Internal server error1');
        } else {
            console.log('Ride request Rejected:', ride_id);

            res.status(200).send('Ride request rejected');

        }


    });
});

app.get('/requestsList', (req, res) => {
    db.query(`select * from rides 
      where status="Requested"`, (error, results) => {
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
