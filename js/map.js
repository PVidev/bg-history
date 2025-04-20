// Данни за локациите
const locations = {
    "pliska": {
        name: "Плиска",
        period: "681-893",
        description: "Първата столица на Първата българска държава. Тук е създадена славянската писменост и е положено началото на българската култура.",
        events: [
            {
                date: "681",
                description: "Хан Аспарух основава Първата българска държава"
            },
            {
                date: "864",
                description: "Княз Борис I покръства българите"
            }
        ],
        images: [
            {
                src: "images/pliska/basilica.jpg",
                alt: "Голямата базилика в Плиска"
            },
            {
                src: "images/pliska/palace.jpg",
                alt: "Дворецът в Плиска"
            }
        ]
    },
    "preslav": {
        name: "Велики Преслав",
        period: "893-971",
        description: "Втората столица на Първото българско царство, център на Златния век на българската култура.",
        events: [
            {
                date: "893",
                description: "Симеон I премества столицата от Плиска в Преслав"
            },
            {
                date: "917",
                description: "Битката при Ахелой - велика победа на цар Симеон"
            }
        ],
        images: [
            {
                src: "images/preslav/round-church.jpg",
                alt: "Кръглата църква в Преслав"
            },
            {
                src: "images/preslav/palace-complex.jpg",
                alt: "Дворцовият комплекс в Преслав"
            }
        ]
    }
};

// Функция за зареждане на детайли за локация
function loadLocationDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const locationId = urlParams.get('id');
    
    if (!locationId) {
        window.location.href = 'map.html';
        return;
    }

    // Зареждане на данните за локацията
    fetch('data/locations.json')
        .then(response => response.json())
        .then(data => {
            const location = data.locations.find(loc => loc.id === locationId);
            if (!location) {
                window.location.href = 'map.html';
                return;
            }
            displayLocationDetails(location);
        })
        .catch(error => {
            console.error('Грешка при зареждане на данните:', error);
            window.location.href = 'map.html';
        });
}

// Функция за показване на детайлите за локацията
function displayLocationDetails(location) {
    document.title = `${location.name} - История на България`;
    document.querySelector('.location-name').textContent = location.name;
    document.querySelector('.location-period').textContent = location.period;
    document.querySelector('.location-description').textContent = location.description;

    // Зареждане на събитията
    const eventsContainer = document.querySelector('.events-container');
    if (location.events && location.events.length > 0) {
        location.events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.innerHTML = `
                <div class="event-date">${event.date}</div>
                <div class="event-title">${event.title}</div>
                <div class="event-description">${event.description}</div>
            `;
            eventsContainer.appendChild(eventElement);
        });
    } else {
        eventsContainer.innerHTML = '<p>Няма налични събития за тази локация.</p>';
    }

    // Зареждане на галерията
    const imageGrid = document.querySelector('.image-grid');
    if (location.images && location.images.length > 0) {
        location.images.forEach(image => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'image-container';
            imgContainer.innerHTML = `
                <img src="${image.url}" alt="${image.caption}" loading="lazy">
                <div class="image-caption">${image.caption}</div>
            `;
            imgContainer.addEventListener('click', () => openModal(image.url, image.caption));
            imageGrid.appendChild(imgContainer);
        });
    } else {
        imageGrid.innerHTML = '<p>Няма налични изображения за тази локация.</p>';
    }
}

// Функции за модалния прозорец
function openModal(imageUrl, caption) {
    const modal = document.querySelector('.modal');
    const modalImg = modal.querySelector('img');
    modalImg.src = imageUrl;
    modalImg.alt = caption;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Инициализация на страницата
if (document.querySelector('.location-details')) {
    loadLocationDetails();
    
    // Добавяне на слушатели за модалния прозорец
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.querySelector('.modal').addEventListener('click', (e) => {
        if (e.target === document.querySelector('.modal')) {
            closeModal();
        }
    });

    // Затваряне на модала с Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.querySelector('.modal.active')) {
            closeModal();
        }
    });
} 