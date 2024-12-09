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
            res.redirect('/login.html');
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
        res.redirect('/home.html');
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
    const { location } = req.query;

    let query = `
        select description, benefits from property
        LEFT JOIN property_ssh_device on property.property_id = property_ssh_device.property_id
        LEFT JOIN ssh_device on property_ssh_device.device_id = ssh_device.device_id
        WHERE property_id = ?
    `;

    const queryParams = [];
    queryParams.push(location);
    query += ' GROUP BY ssh_device.device_id';
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
    const { location } = req.query;

    let query = `select property.location,property.price,property.bedrooms,property.bathrooms,COUNT(status) as available from property
                    LEFT JOIN room on property.property_id = room.property_id
                    where (status = "available") and (property.property_id = ?)
    `;

    const queryParams = [];
    queryParams.push(location);

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching room availability:', err);
            return res.status(500).json({ success: false, message: 'Error fetching room availability' });
        }
        res.json(results); // Send filtered data as JSON
    });
});

