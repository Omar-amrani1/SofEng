const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'my-express-app')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'omaromarAa1',
    database: 'hss_smart_rentals',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Registration route
app.post('/register', (req, res) => {
    const { name, contactInfo, email, password } = req.body;

    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error checking email' });
        }
        if (results.length > 0) {
            return res.status(400).json({ success: false, message: 'Email already used' });
        }

        const query = 'INSERT INTO user (name, contact_info, email, account_password) VALUES (?, ?, ?, ?)';
        db.query(query, [name, contactInfo, email, password], (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error registering user' });
            }
            res.redirect(`/home.html`);
        });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM user WHERE email = ? AND account_password = ?', [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error logging in' });
        }
        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        res.redirect(`/home.html?user=${results[0].user_id}`);
    });
});

// Fetch properties
app.get('/properties', (req, res) => {
    const { location, price } = req.query;

    let query = `
        SELECT property.property_id, property.location, property.price, COUNT(room.room_id) AS availableRooms
        FROM property
        LEFT JOIN room ON property.property_id = room.property_id
        WHERE room.status = 'available'
    `;

    const queryParams = [];

    if (location) {
        query += ' AND property.location = ?';
        queryParams.push(location);
    }

    if (price) {
        const [minPrice, maxPrice] = price.split('-');
        query += ' AND property.price BETWEEN ? AND ?';
        queryParams.push(minPrice, maxPrice);
    }

    query += ' GROUP BY property.property_id, property.location, property.price';

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching properties:', err);
            return res.status(500).json({ success: false, message: 'Error fetching properties' });
        }
        res.json(results); // Send filtered data as JSON
    });
});



// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



// Fetch property device details
app.get('/propertydetail_device', (req, res) => {
    const { id } = req.query;

    let query = `
        SELECT property.property_id, description, benefits
        FROM property
        LEFT JOIN property_ssh_device on property.property_id = property_ssh_device.property_id
        LEFT JOIN ssh_device on property_ssh_device.device_id = ssh_device.device_id
        WHERE property.property_id = ?
    `;

    const queryParams = [];
    queryParams.push(id);
    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching device details:', err);
            return res.status(500).json({ success: false, message: 'Error fetching device details' });
        }
        res.json(results); // Send filtered data as JSON
    });
});

// Fetch property room details (specifically the number of available rooms)
app.get('/propertydetail_room', (req, res) => {
    const { id } = req.query;

    let query = `SELECT property.property_id,room_id,status FROM property
                LEFT JOIN room ON property.property_id = room.property_id
                WHERE property.property_id = ?
    `;

    const queryParams = [];
    queryParams.push(id);

    console.log(query)
    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching room availability:', err);
            return res.status(500).json({ success: false, message: 'Error fetching room availability' });
        }
        console.log(results)
        res.json(results); // Send filtered data as JSON
    });
});

// Fetch general property details
app.get('/propertydetail_overview', (req, res) => {
    const { id } = req.query;

    let query = `SELECT property.property_id,property.location,property.price,property.bedrooms,property.bathrooms,COUNT(status) AS available FROM property
                 LEFT JOIN room ON property.property_id = room.property_id
                 WHERE (status = "available") AND (property.property_id = ?)
                 GROUP BY property.property_id
    `;

    const queryParams = [];
    queryParams.push(id);

    console.log(query)
    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching room availability:', err);
            return res.status(500).json({ success: false, message: 'Error fetching room availability' });
        }
        console.log(results)
        res.json(results); // Send filtered data as JSON
    });
});

// Push room application request 
app.get('/add_application', (req, res) => {
    const { userId, roomId, propertyId } = req.query;

    let query1 = `INSERT INTO room_application (room_id,property_id,user_id)
                  VALUES (?,?,?);
    `;

    let query2 = `UPDATE room SET status = "not available" 
                  WHERE (room_id = ?) AND (property_id = ?);
    `;

    const queryParams1 = [];
    queryParams1.push(roomId);
    queryParams1.push(propertyId);
    queryParams1.push(userId);

    const queryParams2 = [];
    queryParams2.push(roomId);
    queryParams2.push(propertyId);

    let results1 = null;
    let results2 = null;

    db.query(query1, queryParams1, (err, results) => {
        if (err) {
            console.error('Error adding user application:', err);
            return res.status(500).json({ success: false, message: 'Error adding user application' });
        }
        console.log(results)
        results1 = results;
    });

    db.query(query2, queryParams2, (err, results) => {
        if (err) {
            console.error('Error adding user application:', err);
            return res.status(500).json({ success: false, message: 'Error adding user application' });
        }
        console.log(results)
        results2 = results;
    });

    combinedResults = [results1, results2]
    res.json(combinedResults);

});

// Fetch properties owned by a landlord
app.get('/owner-properties', (req, res) => {
    const { user_id } = req.query;

    const query = `
        SELECT p.property_id, p.location, 
        (SELECT COUNT(*) FROM availability WHERE property_id = p.property_id AND status = 'available') AS availableRooms
        FROM property p
        WHERE p.owner = ?
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching properties for landlord:', err);
            return res.status(500).json({ success: false, message: 'Error fetching properties' });
        }
        res.json(results);
    });
});



// Add new property
app.post('/add-property', (req, res) => {
    const { location, price, bedrooms, bathrooms, sshFeatures } = req.body;
    const ownerId = req.session.user.user_id;

    if (!ownerId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const propertyQuery = `
        INSERT INTO property (location, price, bedrooms, bathrooms, owner, ssh_features)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(propertyQuery, [location, price, bedrooms, bathrooms, ownerId, sshFeatures.join(', ')], (err, result) => {
        if (err) {
            console.error('Error inserting property:', err);
            return res.status(500).json({ success: false, message: 'Error inserting property' });
        }

        const propertyId = result.insertId;

        // Insert SSH features into the property_ssh_device table
        const sshFeatureQueries = sshFeatures.map(feature => {
            const deviceId = feature === 'SSH Hub' ? 1 : feature === 'SSH Camera' ? 2 : 3;
            return new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO property_ssh_device (property_id, device_id) VALUES (?, ?)',
                    [propertyId, deviceId],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
        });

        // Generate rooms and update availability table
        const roomQueries = [];
        for (let i = 1; i <= bedrooms; i++) {
            roomQueries.push(
                new Promise((resolve, reject) => {
                    db.query(
                        'INSERT INTO room (room_id, property_id, status) VALUES (?, ?, ?)',
                        [i, propertyId, 'available'],
                        (err) => {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                })
            );
            roomQueries.push(
                new Promise((resolve, reject) => {
                    db.query(
                        'INSERT INTO availability (room_id, property_id, status) VALUES (?, ?, ?)',
                        [i, propertyId, 'available'],
                        (err) => {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                })
            );
        }

        Promise.all([...sshFeatureQueries, ...roomQueries])
            .then(() => res.json({ success: true }))
            .catch(err => {
                console.error('Error updating related tables:', err);
                res.status(500).json({ success: false, message: 'Error updating related tables' });
            });
    });
});





// Get logged-in user ID
app.get('/get-user-id', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ user_id: req.session.user.user_id });
    } else {
        res.status(401).json({ message: 'Not logged in' });
    }
});
