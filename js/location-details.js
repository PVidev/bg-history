// Функция за извличане на параметрите от URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        name: params.get('name')
    };
}

// Функция за зареждане на информацията за мястото
async function loadLocationDetails() {
    const params = getUrlParams();
    const location = historicalPlaces.find(p => p.id === parseInt(params.id) || p.name === params.name);
    
    if (!location) {
        document.getElementById('location-title').textContent = 'Мястото не е намерено';
        return;
    }

    // Заглавие
    document.getElementById('location-title').textContent = location.name;
    document.title = `${location.name} - Българска история`;

    // Период
    document.getElementById('period-badge').textContent = getPeriodName(location.period);

    // Описание
    document.getElementById('location-description').textContent = location.description;

    // Снимки
    const imagesContainer = document.getElementById('location-images');
    if (location.images && location.images.length > 0) {
        imagesContainer.innerHTML = location.images.map(img => `
            <img src="images/${img}" alt="${location.name}" class="location-image">
        `).join('');
    }

    // Събития
    const timelineContainer = document.getElementById('events-timeline');
    if (location.events && location.events.length > 0) {
        timelineContainer.innerHTML = location.events.map(event => {
            if (typeof event === 'string') {
                return `<div class="event-item"><p>${event}</p></div>`;
            } else {
                return `
                    <div class="event-item">
                        <span class="event-date">${event.date}</span>
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-description">${event.description}</p>
                    </div>
                `;
            }
        }).join('');
    }

    // Карта (само ако Leaflet е достъпен)
    if (typeof L !== 'undefined') {
        const map = L.map('location-map').setView(location.coordinates, 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        L.marker(location.coordinates).addTo(map)
            .bindPopup(location.name)
            .openPopup();
    }
}

// Функция за име на периода
function getPeriodName(period) {
    const names = {
        "ancient": "Античност",
        "first-empire": "Първа българска държава",
        "second-empire": "Втора българска държава",
        "ottoman": "Османско владичество",
        "modern": "Модерна епоха"
    };
    return names[period] || "Неизвестен период";
}

document.addEventListener('DOMContentLoaded', () => {
    const locationId = new URLSearchParams(window.location.search).get('id');
    if (!locationId) {
        showError();
        return;
    }

    const locationName = document.querySelector('.location-name');
    const locationPeriod = document.querySelector('.location-period');
    const locationDescription = document.querySelector('.location-description');
    const eventsContainer = document.querySelector('.events-container');
    const imageGrid = document.querySelector('.image-grid');
    const modal = document.querySelector('.modal');
    const modalImg = modal.querySelector('img');
    const closeModal = modal.querySelector('.close-modal');

    // Зареждане на данните за локацията
    fetch(`data/locations/${locationId}.json`)
        .then(response => {
            if (!response.ok) throw new Error('Грешка при зареждане');
            return response.json();
        })
        .then(data => {
            locationName.textContent = data.name;
            locationPeriod.textContent = data.period;
            locationDescription.textContent = data.description;

            // Зареждане на събитията
            if (data.events && data.events.length > 0) {
                data.events.forEach(event => {
                    const eventCard = document.createElement('div');
                    eventCard.className = 'event-card';
                    eventCard.innerHTML = `
                        <h3>${event.title}</h3>
                        <p>${event.description}</p>
                    `;
                    eventsContainer.appendChild(eventCard);
                });
            } else {
                eventsContainer.innerHTML = '<p>Няма налични събития за тази локация.</p>';
            }

            // Зареждане на снимките
            if (data.images && data.images.length > 0) {
                data.images.forEach(image => {
                    const imageContainer = document.createElement('div');
                    imageContainer.className = 'image-container';
                    imageContainer.innerHTML = `
                        <img src="${image.url}" alt="${image.caption}">
                        <div class="image-caption">${image.caption}</div>
                    `;
                    imageContainer.addEventListener('click', () => openModal(image.url, image.caption));
                    imageGrid.appendChild(imageContainer);
                });
            } else {
                imageGrid.innerHTML = '<p>Няма налични снимки за тази локация.</p>';
            }
        })
        .catch(error => {
            console.error('Грешка:', error);
            showError();
        });

    // Функции за модалния прозорец
    function openModal(src, alt) {
        modalImg.src = src;
        modalImg.alt = alt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModalHandler() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', closeModalHandler);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalHandler();
    });

    // Затваряне с клавиш Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalHandler();
        }
    });

    function showError() {
        document.querySelector('.error-message').style.display = 'block';
        document.querySelector('.location-header').style.display = 'none';
        document.querySelector('.location-description').style.display = 'none';
        document.querySelector('.events-section').style.display = 'none';
        document.querySelector('.gallery-section').style.display = 'none';
    }
});

module.exports = {
    getUrlParams,
    loadLocationDetails
}; 