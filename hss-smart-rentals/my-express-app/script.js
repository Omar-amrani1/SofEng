// Handle registration form submission
console.log('script.js loaded');

document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, contactInfo, email, password, role }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Registration successful!');
                window.location.href = '/login.html';
            } else {
                alert(data.message);
            }
        })
        .catch((error) => console.error('Error:', error));
});

// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Login successful!');
                window.location.href = data.redirectUrl; // Redirect based on role
            } else {
                alert('Invalid email or password');
            }
        })
        .catch((error) => console.error('Error:', error));
});

// Fetch properties from the server and display them
document.addEventListener('DOMContentLoaded', () => {
    const fetchProperties = (filters = {}) => {
        const query = new URLSearchParams(filters).toString();
        fetch(`/properties?${query}`)
            .then((response) => response.json())
            .then((properties) => {
                const propertyContainer = document.getElementById('properties-container');
                propertyContainer.innerHTML = ''; // Clear existing content

                if (properties.length === 0) {
                    propertyContainer.innerHTML = '<p>No properties match your filters.</p>';
                } else {
                    properties.forEach((property) => {
                        const propertyCard = document.createElement('div');
                        propertyCard.className = 'property-card';
                        propertyCard.innerHTML = `
                            <h3>${property.location}</h3>
                            <p>Available Rooms: ${property.availableRooms}</p>
                            <p>Price: $${property.price}</p>
                            <button onclick="viewDetails(${property.property_id})">View Details</button>
                        `;
                        propertyContainer.appendChild(propertyCard);
                    });
                }
            })
            .catch((error) => console.error('Error fetching properties:', error));
    };

    // Initial fetch without filters
    fetchProperties();

    // Apply filters when the button is clicked
    document.getElementById('apply-filters')?.addEventListener('click', () => {
        const location = document.getElementById('filter-location').value;
        const priceRange = document.getElementById('filter-price').value;

        const filters = {};
        if (location) filters.location = location;
        if (priceRange) filters.price = priceRange;

        fetchProperties(filters);
    });
});

// Placeholder for viewing property details
function viewDetails(propertyId) {
    window.location.href = `/property-details.html?id=${propertyId}`;
}

