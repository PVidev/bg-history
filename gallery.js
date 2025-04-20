// Данни за артефактите
const artifacts = [
    {
        id: 1,
        title: "Златен пръстен от Плиска",
        period: "Първа българска държава",
        date: "9-ти век",
        image: "images/ring.jpg",
        description: "Златен пръстен с изящна гравировка, открит в Плиска. Представлява уникален образец на ранносредновековното златарство.",
        location: "Национален исторически музей, София"
    },
    {
        id: 2,
        title: "Мадарски конник",
        period: "Първа българска държава",
        date: "8-ми век",
        image: "images/horseman.jpg",
        description: "Скалният релеф на Мадарския конник е един от най-известните паметници на българската история.",
        location: "Мадара, Шуменска област"
    },
    {
        id: 3,
        title: "Златна маска на Тервел",
        period: "Първа българска държава",
        date: "8-ми век",
        image: "images/mask.jpg",
        description: "Златна погребална маска, принадлежала на хан Тервел.",
        location: "Национален исторически музей, София"
    },
    {
        id: 4,
        title: "Икона на Св. Иван Рилски",
        period: "Втора българска държава",
        date: "14-ти век",
        image: "images/icon.jpg",
        description: "Една от най-старите икони на светеца, изобразяваща го в пълен ръст.",
        location: "Рилски манастир"
    }
];

// Функция за създаване на HTML за артефакт
function createArtifactHTML(artifact) {
    return `
        <div class="artifact-card" data-period="${artifact.period}">
            <img src="${artifact.image}" alt="${artifact.title}">
            <div class="artifact-info">
                <h3>${artifact.title}</h3>
                <p>${artifact.date}</p>
                <button class="view-details" onclick="showArtifactDetails(${artifact.id})">
                    Виж детайли
                </button>
            </div>
        </div>
    `;
}

// Функция за показване на детайли за артефакт
function showArtifactDetails(artifactId) {
    const artifact = artifacts.find(a => a.id === artifactId);
    const modal = document.getElementById('artifactModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <span class="close-modal" onclick="closeModal()">&times;</span>
        <div class="modal-body">
            <img src="${artifact.image}" alt="${artifact.title}" class="modal-image">
            <div class="modal-info">
                <h2>${artifact.title}</h2>
                <p><strong>Период:</strong> ${artifact.period}</p>
                <p><strong>Дата:</strong> ${artifact.date}</p>
                <p><strong>Местоположение:</strong> ${artifact.location}</p>
                <p>${artifact.description}</p>
            </div>
        </div>
    `;
    
    modal.style.display = "block";
}

// Функция за затваряне на модалния прозорец
function closeModal() {
    document.getElementById('artifactModal').style.display = "none";
}

// Функция за филтриране на артефактите
function filterArtifacts(period) {
    const cards = document.querySelectorAll('.artifact-card');
    cards.forEach(card => {
        if (period === 'all' || card.dataset.period === period) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Инициализация при зареждане на страницата
document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Добавяне на артефактите в галерията
    artifacts.forEach(artifact => {
        galleryGrid.innerHTML += createArtifactHTML(artifact);
    });
    
    // Добавяне на филтри
    const periods = ['all', ...new Set(artifacts.map(a => a.period))];
    const filtersContainer = document.querySelector('.filters');
    
    periods.forEach(period => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = period === 'all' ? 'Всички' : period;
        button.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterArtifacts(period);
        };
        filtersContainer.appendChild(button);
    });
    
    // Активиране на първия филтър
    document.querySelector('.filter-btn').classList.add('active');
}); 