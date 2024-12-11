//Format detail pages to show information of relevant property
document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search)
    const propertyId = params.get("id") //Id is string
    if (propertyId == "null") {
        error('Error getting property id')
    }

    const fetchOverviewDetails = (propertyId = '') => {
        fetch(`/propertydetail_overview?id=${propertyId}`)
            .then(response => response.json())
            .then(properties => {


                if (properties.success === false) {
                    console.error('Error fetching details:', error);
                } else {


                    //Get detail from single record
                    properties.forEach(property => {

                        if (propertyId == property.property_id) {

                            const pageTitle = document.getElementById('detail-title');
                            pageTitle.innerHTML = '';
                            pageTitle.innerHTML += property.location;

                            const propertyLocation = document.getElementById('loc');
                            propertyLocation.innerHTML = '';
                            propertyLocation.innerHTML += property.location;

                            const propertyPricing = document.getElementById('price');
                            propertyPricing.innerHTML = '$';
                            propertyPricing.innerHTML += property.price;

                            const propertyRoomAvailability = document.getElementById('avail');
                            propertyRoomAvailability.innerHTML = '';
                            if (parseInt(property.available) > 0) {
                                propertyRoomAvailability.innerHTML += "Available";
                            }
                            else {
                                propertyRoomAvailability.innerHTML += "Not Available";

                            }
                        }

                    });
                }


            })
            .catch(error => console.error('Error fetching details:', error));
    };

    const fetchDeviceDetails = (propertyId = '') => {
        fetch(`/propertydetail_device?id=${propertyId}`)
            .then(response => response.json())
            .then(properties => {


                if (properties.length === 0) {
                    //Uhh
                } else {
                    const deviceDetailBox = document.getElementById('device-container');
                    deviceDetailBox.innerHTML = '';

                    properties.forEach(property => {

                        if (property.property_id == propertyId) {

                            const deviceInfo = document.createElement('div');
                            deviceInfo.className = 'grid-item';
                            deviceInfo.innerHTML = `
                            <h3>${property.description}</h3>
                            <p>${property.benefits}</p>
                        `;
                            deviceDetailBox.appendChild(deviceInfo);
                        };

                    });
                }


            })
            .catch(error => console.error('Error fetching details:', error));
    };


    const fetchRoomDetails = (propertyId = '') => {
        fetch(`/propertydetail_room?id=${propertyId}`)
            .then(response => response.json())
            .then(properties => {
                if (properties.length === 0) {
                    //Uhh
                } else {
                    const roomBox = document.getElementById('room-container');
                    roomBox.innerHTML = '';

                    properties.forEach(property => {

                        if (property.property_id == propertyId) {

                            const roomInfo = document.createElement('div');
                            roomInfo.className = 'grid-item';
                            roomInfo.innerHTML = `
                            <h3>Room ${property.room_id}</h3>
                        `;
                            if (property.status == "available") {
                                roomInfo.innerHTML +=
                                    `
                                    <h2>AVAILABLE</h2>
                                    <button onclick="pushRequest(${property.property_id})">Apply</button>
                                    `
                            } else {
                                roomInfo.innerHTML += `<h2>UNAVAILABLE</h2>`
                            };
                        
                            roomBox.appendChild(roomInfo);
                        };

                    });
                }

            })
            .catch(error => console.error('Error fetching details:', error));
    };

});

function pushRequest(roomId = '') {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get("user")
    const propertyId = params.get("id")

    if (userId == null || userId == "null") {
        alert("Please login to apply for a room")
        window.location.href = `/login.html`;
    }
    else {
        const proceed = confirm(`Are you sure you want to apply for room ${roomId}?`)
        if (proceed) {

            fetch(`/add_application?userId=${userId}&roomId=${roomId}&propertyId=${propertyId}`)
                .then(response => response.json())
                .then(properties => {
                    if (properties.success == false) {
                        alert("Application failed.");
                    } else {
                        alert("Application success.");
                    }
                })
                .catch(error => console.error('Error fetching details:', error));

            //window.location.href = `/home.html?user=${userId}`;
        }
    }
};
