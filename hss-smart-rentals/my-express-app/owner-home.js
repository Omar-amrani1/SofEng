document.addEventListener('DOMContentLoaded', () => {
    // Fetch properties for the logged-in landlord
    fetch('/get-user-id')
        .then(response => response.json())
        .then(data => {
            const userId = data.user_id;

            // Fetch properties owned by the landlord
            fetch(`/owner-properties?user_id=${userId}`)
                .then(response => response.json())
                .then(properties => {
                    const container = document.getElementById('owner-properties-container');
                    container.innerHTML = ''; // Clear existing content

                    if (properties.length === 0) {
                        container.innerHTML = '<p>No properties found.</p>';
                    } else {
                        properties.forEach(property => {
                            const card = document.createElement('div');
                            card.className = 'property-card';
                            card.innerHTML = `
                                <h3>${property.location}</h3>
                                <p>Available Rooms: ${property.availableRooms}</p>
                            `;
                            container.appendChild(card);
                        });
                    }
                })
                .catch(error => console.error('Error fetching properties:', error));
        })
        .catch(error => console.error('Error fetching user ID:', error));

    // Handle "Add New Property" button click
    const addPropertyButton = document.getElementById('add-property-button');
    addPropertyButton.addEventListener('click', () => {
        window.location.href = '/add-property.html'; // Redirect to Add Property page
    });
});

