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
        timelineContainer.innerHTML = location.events.map(event => `
            <div class="event-item">
                <div class="event-date">${event.date}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
            </div>
        `).join('');
    }

    // Исторически личности
    const figuresContainer = document.getElementById('historical-figures');
    if (location.historicalFigures && location.historicalFigures.length > 0) {
        figuresContainer.innerHTML = location.historicalFigures.map(figure => `
            <div class="figure-card">
                <img src="images/figures/${figure.image}" alt="${figure.name}" class="figure-image">
                <h3>${figure.name}</h3>
                <p>${figure.role}</p>
                <p class="figure-description">${figure.description}</p>
            </div>
        `).join('');
    }

    // Външни връзки
    const linksContainer = document.getElementById('external-links');
    if (location.externalLinks && location.externalLinks.length > 0) {
        linksContainer.innerHTML = location.externalLinks.map(link => `
            <a href="${link.url}" class="link-item" target="_blank">
                <i class="fas fa-external-link-alt"></i>
                <span>${link.title}</span>
            </a>
        `).join('');
    }

    // Карта
    const map = L.map('location-map').setView(location.coordinates, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker(location.coordinates).addTo(map)
        .bindPopup(location.name)
        .openPopup();
}

// Зареждане на информацията при отваряне на страницата
document.addEventListener('DOMContentLoaded', loadLocationDetails); 