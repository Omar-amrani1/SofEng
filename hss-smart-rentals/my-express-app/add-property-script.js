document.getElementById('add-property-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const location = document.getElementById('location').value;
    const price = document.getElementById('price').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;
    const sshFeaturesSelect = document.getElementById('ssh-features');
    const sshFeatures = Array.from(sshFeaturesSelect.selectedOptions).map(option => option.value);

    fetch('/add-property', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, price, bedrooms, bathrooms, sshFeatures }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Property added successfully!');
                window.location.href = '/owner-home.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});


