let reviews = [];
let currentIndex = 0;

function initMap() {
    const map = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(map);

    const request = {
        placeId: 'YOUR_PLACE_ID', // Replace with your Google Place ID
        fields: ['reviews']
    };

    service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            reviews = place.reviews;
            displayReviews();
            setInterval(rotateReviews, 15000); // Rotate every 15 seconds
        }
    });
}

function displayReviews() {
    const container = document.getElementById('review-container');
    container.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const index = (currentIndex + i) % reviews.length;
        const review = reviews[index];
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <p>${review.text}</p>
            <p>Rating: ${review.rating}/5</p>
            <p>- ${review.author_name}</p>
        `;
        container.appendChild(reviewElement);
    }
}

function rotateReviews() {
    currentIndex = (currentIndex + 1) % reviews.length;
    displayReviews();
}

// Initialize the map when the script loads
google.maps.event.addDomListener(window, 'load', initMap);