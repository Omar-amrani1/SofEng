//Format detail pages to show information of relevant property
document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search)
    const propertyId = params.get("id") //Id is string
    if (propertyId == "null") {
        error('Error getting property id')
    }

    const fetchDetails = (propertyId = '') => {
        fetch(`/propertydetail_room?id=${propertyId}`)
            .then(response => response.json())
            .then(properties => {


                if (properties.length === 0) {
                    //Uhh
                } else {


                    //Get detail from single record
                    properties.forEach(property => {

                        if (propertyId == property.property_id) {

                            const propertyLocation = document.getElementById('loc');
                            propertyLocation.innerHTML = 'Location:';
                            propertyLocation.innerHTML += property.location;

                            const propertyPricing = document.getElementById('price');
                            propertyPricing.innerHTML = 'Pricing:';
                            propertyPricing.innerHTML += property.price;

                            const propertyBedrooms = document.getElementById('beds');
                            propertyBedrooms.innerHTML = 'Bedrooms:';
                            propertyBedrooms.innerHTML += property.bedrooms;

                            const propertyBathrooms = document.getElementById('baths');
                            propertyBathrooms.innerHTML = 'Bathrooms:';
                            propertyBathrooms.innerHTML += property.bathrooms;

                            const propertyRoomAvailability = document.getElementById('avail');
                            propertyRoomAvailability.innerHTML = 'Room availability: ';
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

    fetchDetails(propertyId);

});