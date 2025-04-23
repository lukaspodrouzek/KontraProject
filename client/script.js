let cities = [];

async function getCities() {
    try {
        const response = await fetch('http://localhost:3000/cities');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        cities = await response.json();

        const cityCardsContainer = document.querySelector('.row');
        cityCardsContainer.innerHTML = '';

        cities.forEach(function(city) {
            const cityCardDiv = document.createElement('div');
            cityCardDiv.classList.add('col-md-4', 'mb-4', 'city-card');
            cityCardDiv.setAttribute('data-city', city.id);

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const imgElement = document.createElement('img');
            imgElement.classList.add('card-img-top');
            imgElement.setAttribute('src', "images/cities/new_york.jpg");
            imgElement.setAttribute('alt', `${city.name} Image`);

            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'text-center');
            cardTitle.textContent = city.name;

            cardBodyDiv.appendChild(cardTitle);
            cardDiv.appendChild(imgElement);
            cardDiv.appendChild(cardBodyDiv);
            cityCardDiv.appendChild(cardDiv);

            cityCardsContainer.appendChild(cityCardDiv);
        });

        attachCityCardClickListener(cities);

    } catch (error) {
        console.error('There was an error fetching the cities:', error);
    }
}

async function getLocationsForCity(cityId) {
    try {
        const response = await fetch(`http://localhost:3000/place/by-city/${cityId}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const locations = await response.json();
        return locations;
    } catch (error) {
        console.error('There was an error fetching the locations:', error);
        return [];
    }
}

function attachCityCardClickListener() {
    $(document).on('click', '.city-card', async function() {
        const cityId = $(this).data('city');
        const locationContainer = $("#locations-container");
        locationContainer.removeClass('d-none');

        const locations = await getLocationsForCity(cityId);

        if (locations.length > 0) {
            locationContainer.empty();

            const row = $('<div class="row"></div>');

            locations.forEach(function(location) {
                const locationCard = `
                    <div class="col-md-4 mt-2 mb-2 d-flex">
                        <div class="card h-100 location-card w-100 d-flex flex-column" data-location="${location.id}">
                            <img src="images/cities/new_york.jpg" class="card-img-top" alt="${location.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${location.name}</h5>
                                <p class="card-text">${location.tag}</p>
                                <div class="mt-auto">
                                    <p class="card-text"><small>Rating: ${location.starRating} ★</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                row.append(locationCard);
            });
            const locationCardAdd = `
                <div class="col-md-4 mt-2 mb-2 d-flex" onclick="addDefaultLocation(${cityId})">
                    <div class="card h-100 location-card w-100 d-flex flex-column text-center justify-content-center align-items-center" id="add-location-card" style="cursor: pointer; border: 2px dashed #ccc;">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center">
                            <div style="font-size: 3rem; color: #888;">＋</div>
                            <h5 class="card-title mt-2">Add New Location</h5>
                        </div>
                    </div>
                </div>
            `;
            row.append(locationCardAdd);

            locationContainer.append(row);
            locationContainer.show();
        } else {
            console.error(`No locations found for city: ${cityId}`);
        }
    });
}

async function attachCityCardClick(cityId){
    const locationContainer = $("#locations-container");
    locationContainer.removeClass('d-none');

    const locations = await getLocationsForCity(cityId);

    if (locations.length > 0) {
        locationContainer.empty();

        const row = $('<div class="row"></div>');

        locations.forEach(function(location) {
            const locationCard = `
                    <div class="col-md-4 mt-2 mb-2 d-flex">
                        <div class="card h-100 location-card w-100 d-flex flex-column" data-location="${location.id}">
                            <img src="images/cities/new_york.jpg" class="card-img-top" alt="${location.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${location.name}</h5>
                                <p class="card-text">${location.tag}</p>
                                <div class="mt-auto">
                                    <p class="card-text"><small>Rating: ${location.starRating} ★</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            row.append(locationCard);
        });
        const locationCardAdd = `
                <div class="col-md-4 mt-2 mb-2 d-flex" onclick="addDefaultLocation(${cityId})">
                    <div class="card h-100 location-card w-100 d-flex flex-column text-center justify-content-center align-items-center" id="add-location-card" style="cursor: pointer; border: 2px dashed #ccc;">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center">
                            <div style="font-size: 3rem; color: #888;">＋</div>
                            <h5 class="card-title mt-2">Add New Location</h5>
                        </div>
                    </div>
                </div>
            `;
        row.append(locationCardAdd);

        locationContainer.append(row);
        locationContainer.show();
    } else {
        console.error(`No locations found for city: ${cityId}`);
    }
}


$(document).on('click', '.location-card', async function() {
    const locationId = $(this).data('location');
    const locationDetailsContainer = $("#location-details");

    const location = await getLocationDetails(locationId);

    if (location) {
        locationDetailsContainer.html(`
            <div class="location-details p-3">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3 class="mb-0">
                        <span id="location-name-text">${location.name}</span>
                        <input type="text" id="location-name-input" class="form-control d-none" value="${location.name}">
                    </h3>
                    <div class="d-flex align-items-center gap-2" id="location-action-buttons">
                        <button class="btn btn-sm text-primary edit-location" data-id="${location.id}" title="Edit">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm text-danger delete-location" data-id="${location.id}" title="Delete">
                            <i class="bi bi-trash"></i>
                        </button>
                        <div class="rating d-flex align-items-center ps-2" data-current-rating="${location.starRating}">
                            ${[1, 2, 3, 4, 5].map(i => `
                                <i class="bi bi-star-fill star-icon ${i <= location.starRating ? 'text-warning' : ''}" 
                                   data-value="${i}" style="cursor: pointer;"></i>
                            `).join('')}
                        </div>
                    </div>
                </div>
        
                <img src="images/cities/new_york.jpg" alt="${location.name}" class="img-fluid rounded mb-3">
                <p>
                    <span id="location-desc-text">${location.description}</span>
                    <textarea id="location-desc-input" class="form-control d-none" rows="3">${location.description}</textarea>
                </p>
                
                <div class="d-none align-items-center gap-2" id="location-edit-buttons">
                    <button class="btn btn-sm btn-success save-location" data-id="${location.id}" title="Save">Save</button>
                    <button class="btn btn-sm btn-secondary cancel-location-edit" title="Cancel">Cancel</button>
                </div>
        
                <div class="comments-section">
                    <h4>Comments</h4>
                    <ul id="comments-list" class="list-unstyled">
                        ${location.comments.map(comment => `
                            <li class="comment-item mb-2 border-bottom pb-2">
                                <div class="d-flex justify-content-between">
                                    <strong>${comment.name}</strong>
                                    <div>
                                        <button class="btn btn-sm btn-link text-danger delete-comment" data-id="${comment.id}" title="Delete">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <p class="mb-1">${comment.description}</p>
                                <small class="text-muted">Posted on ${new Date(comment.createdAt).toLocaleString()}</small>
                            </li>
                        `).join('')}
                    </ul>
                    <form id="add-comment-form" class="mt-4">
                        <div class="mb-2">
                            <label for="comment-name" class="form-label">Your Name</label>
                            <input type="text" class="form-control" id="comment-name" required>
                        </div>
                        <div class="mb-2">
                            <label for="comment-text" class="form-label">Your Comment</label>
                            <textarea class="form-control" id="comment-text" rows="3" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-success">Submit Comment</button>
                    </form>
                </div>
            </div>
        `);
        addStarRatingListener();
        removeLocation();
        addComment();
        removeComment();
        updateLocation();

        $("#dark-background").show();
        $("#details-menu").show();

    } else {
        console.error('Location not found.');
    }
});

async function getLocationDetails(locationId) {
    try {
        const response = await fetch(`http://localhost:3000/place/${locationId}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const location = await response.json();
        return location;
    } catch (error) {
        console.error('There was an error fetching the location details:', error);
        return null;
    }
}

$("#dark-background").click(function() {
    $("#dark-background").hide();
    $("#details-menu").hide();
});

async function addDefaultLocation(cityId) {
    try {
        const defaultLocation = {
            name: 'New Location',
            imagePath: 'images/cities/new_york.jpg',
            description: 'This is a default description.',
            tag: 'New',
            starRating: 0,
            city: cityId
        };

        const response = await fetch('http://localhost:3000/cities/' + cityId +'/places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(defaultLocation)
        });

        if (!response.ok) {
            throw new Error('Failed to create new location');
        }

    } catch (error) {
        console.error('Error creating location:', error);
    }

    await attachCityCardClick(cityId)
}


function addStarRatingListener() {
    $(document).on('mouseenter', '.star-icon', function () {
        const val = parseInt($(this).data('value'));
        $(this).parent().children().each(function () {
            const starVal = parseInt($(this).data('value'));
            $(this).toggleClass('text-warning', starVal <= val);
        });
    });

    $(document).on('mouseleave', '.rating', function () {
        const currentRating = parseInt($(this).data('current-rating'));
        $(this).children().each(function () {
            const starVal = parseInt($(this).data('value'));
            $(this).toggleClass('text-warning', starVal <= currentRating);
        });
    });

    $(document).on('click', '.star-icon', function () {
        const rating = $(this).data('value');
        const container = $(this).parent();
        container.attr('data-current-rating', rating);
        container.children().each(function () {
            const starVal = $(this).data('value');
            $(this).toggleClass('text-warning', starVal <= rating);
        });

        const locationId = $(".edit-location").data("id");
        fetch(`http://localhost:3000/place/${locationId}/rating`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating: rating }),
        })
            .then(response => {
                if (!response.ok) throw new Error("Rating failed");
                return response.json();
            })
            .then(data => console.log("Rating submitted", data))
            .catch(error => console.error("Error submitting rating:", error));
    });

}


function removeLocation(){
    $(document).on('click', '.delete-location', function () {
        const locationId = parseInt($(this).data('id'));
        fetch(`http://localhost:3000/place/${locationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    })
}


function addComment() {
    document.addEventListener('submit', function (e) {
        if (e.target && e.target.id === 'add-comment-form') {
            e.preventDefault();

            const name = document.getElementById('comment-name').value.trim();
            const text = document.getElementById('comment-text').value.trim();
            const locationId = document.querySelector('.edit-location')?.dataset?.id;

            if (!name || !text || !locationId) return;

            fetch('http://localhost:3000/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    description: text,
                    locationId: parseInt(locationId)
                })
            })
            .catch(error => console.error("Comment submission error:", error));
        }
    });
}

function removeComment() {
    $(document).on('click', '.delete-comment', function () {
        const commentId = parseInt($(this).data('id'));

        fetch(`http://localhost:3000/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .catch(error => console.error("Comment submission error:", error));
    })
}

function updateLocation() {
    document.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-location');
        const saveBtn = e.target.closest('.save-location');
        const cancelBtn = e.target.closest('.cancel-location-edit');

        if (editBtn) {
            document.getElementById('location-name-text').classList.add('d-none');
            document.getElementById('location-name-input').classList.remove('d-none');
            document.getElementById('location-desc-text').classList.add('d-none');
            document.getElementById('location-desc-input').classList.remove('d-none');

            document.getElementById('location-action-buttons').classList.add('d-none');
            document.getElementById('location-edit-buttons').classList.remove('d-none');
        }

        if (cancelBtn) {
            document.getElementById('location-name-text').classList.remove('d-none');
            document.getElementById('location-name-input').classList.add('d-none');
            document.getElementById('location-desc-text').classList.remove('d-none');
            document.getElementById('location-desc-input').classList.add('d-none');

            document.getElementById('location-edit-buttons').classList.add('d-none');
            document.getElementById('location-action-buttons').classList.remove('d-none');
        }

        if (saveBtn) {
            const locationId = saveBtn.dataset.id;
            const newName = document.getElementById('location-name-input').value.trim();
            const newDesc = document.getElementById('location-desc-input').value.trim();

            fetch(`http://localhost:3000/place/${locationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newName, description: newDesc })
            })
                .then(res => {
                    if (!res.ok) throw new Error('Failed to update location');
                    return res.json();
                })
                .then(data => {
                    document.getElementById('location-name-text').textContent = newName;
                    document.getElementById('location-desc-text').textContent = newDesc;

                    document.getElementById('location-name-text').classList.remove('d-none');
                    document.getElementById('location-name-input').classList.add('d-none');
                    document.getElementById('location-desc-text').classList.remove('d-none');
                    document.getElementById('location-desc-input').classList.add('d-none');

                    document.getElementById('location-edit-buttons').classList.add('d-none');
                    document.getElementById('location-action-buttons').classList.remove('d-none');
                })
                .catch(err => {
                    console.error("Update failed", err);
                    alert("Something went wrong. Try again.");
                });
        }
    });
}

getCities();