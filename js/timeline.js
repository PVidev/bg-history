console.log('Timeline.js loaded');

// Конфигурация за типовете събития
const eventTypes = {
    political: {
        color: 'var(--primary-color)',
        icon: '🏛️',
        label: 'Политическо събитие'
    },
    cultural: {
        color: 'var(--accent-color)',
        icon: '📚',
        label: 'Културно събитие'
    },
    battle: {
        color: '#D32F2F',
        icon: '⚔️',
        label: 'Битка'
    }
};

// Данни за историческите събития
const timelineData = {
    "first-empire": {
        title: "Първо българско царство",
        events: [
            {
                year: 681,
                title: "Създаване на българската държава",
                description: "Хан Аспарух основава българската държава след победата над Византия",
                type: "political"
            },
            {
                year: 705,
                title: "Загоре към България",
                description: "Хан Тервел получава областта Загоре от Византия",
                type: "political"
            },
            {
                year: 718,
                title: "Защита на Константинопол",
                description: "Хан Тервел спасява Константинопол от арабите",
                type: "battle"
            },
            {
                year: 864,
                title: "Покръстване на българите",
                description: "Княз Борис I приема християнството като официална религия",
                type: "cultural"
            },
            {
                year: 886,
                title: "Пристигане на учениците на Кирил и Методий",
                description: "Създаване на основите на българската писменост и литература",
                type: "cultural"
            },
            {
                year: 893,
                title: "Преславски събор",
                description: "Пренасяне на столицата в Преслав и утвърждаване на славянския език",
                type: "political"
            },
            {
                year: 917,
                title: "Битка при Ахелой",
                description: "Цар Симеон I побеждава византийската армия",
                type: "battle"
            },
            {
                year: 1014,
                title: "Битка при Беласица",
                description: "Византийците пленяват и ослепяват 14 000 български войници",
                type: "battle"
            },
            {
                year: 1018,
                title: "Край на Първото царство",
                description: "България попада под византийско владичество",
                type: "political"
            }
        ]
    },
    "second-empire": {
        title: "Второ българско царство",
        events: [
            {
                year: 1185,
                title: "Въстание на Асеневци",
                description: "Петър и Асен вдигат въстание срещу Византия и възстановяват българската държава",
                type: "political"
            },
            {
                year: 1205,
                title: "Битката при Адрианопол",
                description: "Цар Калоян побеждава латинската армия",
                type: "battle"
            },
            {
                year: 1230,
                title: "Битката при Клокотница",
                description: "Цар Иван Асен II разгромява епирския деспот Теодор Комнин",
                type: "battle"
            },
            {
                year: 1277,
                title: "Въстание на Ивайло",
                description: "Ивайло побеждава татарите и се възкачва на престола",
                type: "political"
            },
            {
                year: 1393,
                title: "Падането на Търново",
                description: "Османците превземат столицата Търново",
                type: "political"
            },
            {
                year: 1396,
                title: "Битката при Никопол",
                description: "Последна съпротива срещу османците, поражение на християнската армия",
                type: "battle"
            }
        ]
    },
    "ottoman": {
        title: "Османско владичество",
        events: [
            {
                year: 1598,
                title: "Първо Търновско въстание",
                description: "Неуспешен опит за освобождение от османска власт",
                type: "political"
            },
            {
                year: 1762,
                title: "История славянобългарска",
                description: "Паисий Хилендарски завършва своята История славянобългарска",
                type: "cultural"
            },
            {
                year: 1876,
                title: "Априлско въстание",
                description: "Масово въстание на българския народ срещу османската власт",
                type: "political"
            }
        ]
    },
    "modern": {
        title: "Съвременна България",
        events: [
            {
                year: 1878,
                title: "Освобождение на България",
                description: "България получава автономия след Руско-турската война",
                type: "political"
            },
            {
                year: 1885,
                title: "Съединение на Княжество България и Източна Румелия",
                description: "България отхвърля разделението, наложено от Берлинския конгрес",
                type: "political"
            },
            {
                year: 1908,
                title: "Обявяване на независимостта",
                description: "България става независимо царство начело с цар Фердинанд I",
                type: "political"
            },
            {
                year: 1944,
                title: "Деветосептемврийски преврат",
                description: "На власт идва Отечественият фронт с подкрепата на СССР",
                type: "political"
            },
            {
                year: 1989,
                title: "Падането на Тодор Живков",
                description: "Край на комунистическия режим в България",
                type: "political"
            },
            {
                year: 2007,
                title: "Членство в ЕС",
                description: "България официално става член на Европейския съюз",
                type: "political"
            }
        ]
    }
};

// Функция за създаване на HTML за събитие
function createEventHTML(event) {
    const typeInfo = eventTypes[event.type];
    return `
        <div class="timeline-event" data-type="${event.type}" style="border-color: ${typeInfo.color}">
            <div class="event-year">${event.year}</div>
            <div class="event-content">
                <h3>${typeInfo.icon} ${event.title}</h3>
                <p>${event.description}</p>
                <button class="event-details-btn" onclick="showEventDetails(this.parentElement.parentElement)">
                    Повече информация
                </button>
            </div>
        </div>
    `;
}

// Функция за показване на събития
function displayEvents(activePeriod = 'all', activeType = 'all') {
    const timelineContainer = document.querySelector('.timeline-container');
    let html = '';

    if (activePeriod === 'all') {
        // Display all events from all periods
        Object.values(timelineData).forEach(period => {
            html += `<h2 class="period-title">${period.title}</h2>`;
            const filteredEvents = period.events.filter(event => 
                activeType === 'all' || event.type === activeType
            );
            filteredEvents.sort((a, b) => a.year - b.year);
            filteredEvents.forEach(event => {
                html += createEventHTML(event);
            });
        });
    } else {
        // Display events from selected period
        const period = timelineData[activePeriod];
        if (period) {
            html += `<h2 class="period-title">${period.title}</h2>`;
            const filteredEvents = period.events.filter(event => 
                activeType === 'all' || event.type === activeType
            );
            filteredEvents.sort((a, b) => a.year - b.year);
            filteredEvents.forEach(event => {
                html += createEventHTML(event);
            });
        }
    }

    timelineContainer.innerHTML = html;

    // Добавяне на анимации при появяване
    const events = timelineContainer.querySelectorAll('.timeline-event');
    events.forEach((event, index) => {
        event.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    });
}

// Функция за филтриране на събития
function filterEvents() {
    const activePeriod = document.querySelector('.filter-options [data-period].active').dataset.period;
    const activeType = document.querySelector('.filter-options [data-type].active').dataset.type;
    displayEvents(activePeriod, activeType);
}

// Функция за търсене на събития
function searchEvents(query) {
    const searchTerm = query.toLowerCase();
    document.querySelectorAll('.event').forEach(event => {
        const title = event.querySelector('.event-title').textContent.toLowerCase();
        const description = event.querySelector('.event-description').textContent.toLowerCase();
        const date = event.querySelector('.event-date').textContent.toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       date.includes(searchTerm);
        
        event.style.display = matches ? 'block' : 'none';
    });
}

// Функция за сортиране на събития
function sortEvents(sortBy) {
    const timeline = document.querySelector('.timeline');
    const periods = Array.from(document.querySelectorAll('.period'));
    
    periods.forEach(period => {
        const eventsContainer = period.querySelector('.events-container');
        const events = Array.from(period.querySelectorAll('.event'));
        
        events.sort((a, b) => {
            const dateA = parseInt(a.querySelector('.event-date').textContent);
            const dateB = parseInt(b.querySelector('.event-date').textContent);
            
            return sortBy === 'asc' ? dateA - dateB : dateB - dateA;
        });
        
        events.forEach(event => eventsContainer.appendChild(event));
    });
}

// Функция за показване на детайли за събитие
function showEventDetails(eventElement) {
    const year = eventElement.querySelector('.event-year').textContent;
    const title = eventElement.querySelector('h3').textContent;
    const description = eventElement.querySelector('p').textContent;
    const type = eventElement.dataset.type;
    const typeInfo = eventTypes[type];

    const modal = document.createElement('div');
    modal.className = 'event-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="event-header" style="border-color: ${typeInfo.color}">
                <div class="event-type-badge" style="background-color: ${typeInfo.color}">
                    ${typeInfo.icon} ${typeInfo.label}
                </div>
                <h2>${title}</h2>
                <div class="event-year-large">${year} г.</div>
            </div>
            <div class="event-body">
                <p class="event-description">${description}</p>
                <div class="event-actions">
                    <button onclick="shareEvent(this.closest('.modal-content'))">
                        📤 Споделяне
                    </button>
                    <button onclick="window.open('https://bg.wikipedia.org/wiki/' + encodeURIComponent(title), '_blank')">
                        📖 Научи повече
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Добавяне на стилове за модала
    const style = document.createElement('style');
    style.textContent = `
        .event-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: var(--border-radius-lg);
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }

        .close-modal {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 24px;
            cursor: pointer;
            color: var(--text-color);
        }

        .event-header {
            border-bottom: 3px solid;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }

        .event-type-badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: var(--border-radius-sm);
            color: white;
            margin-bottom: 10px;
        }

        .event-year-large {
            font-size: 1.5rem;
            color: var(--primary-color);
            margin-top: 10px;
        }

        .event-body {
            padding: 20px 0;
        }

        .event-description {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .event-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }

        .event-actions button {
            padding: 8px 16px;
            border: 1px solid var(--primary-color);
            border-radius: var(--border-radius-sm);
            background-color: white;
            color: var(--primary-color);
            cursor: pointer;
            transition: var(--transition-normal);
        }

        .event-actions button:hover {
            background-color: var(--primary-color);
            color: white;
        }
    `;
    document.head.appendChild(style);

    // Затваряне на модала
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Функция за добавяне на анимации при скролване
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.period, .event').forEach(element => {
        observer.observe(element);
    });
}

// Функция за споделяне на събитие
function shareEvent(eventContent) {
    const title = eventContent.querySelector('h2').textContent;
    const year = eventContent.querySelector('.event-year-large').textContent;
    const description = eventContent.querySelector('.event-description').textContent;
    
    const shareText = `${title} (${year})\n${description}`;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback за браузъри без Web Share API
        const tempInput = document.createElement('input');
        tempInput.value = shareText;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Текстът е копиран в клипборда!');
    }
}

// Функция за добавяне на бележки
function addNote(event) {
    const note = prompt('Добавете бележка към това събитие:');
    if (note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'event-note';
        noteElement.innerHTML = `
            <div class="note-content">${note}</div>
            <button class="delete-note">&times;</button>
        `;
        
        event.appendChild(noteElement);
        
        // Запазване на бележката в localStorage
        const eventId = event.dataset.id || Date.now();
        event.dataset.id = eventId;
        const notes = JSON.parse(localStorage.getItem('eventNotes') || '{}');
        notes[eventId] = note;
        localStorage.setItem('eventNotes', JSON.stringify(notes));
        
        // Добавяне на слушател за изтриване
        noteElement.querySelector('.delete-note').addEventListener('click', () => {
            noteElement.remove();
            const notes = JSON.parse(localStorage.getItem('eventNotes') || '{}');
            delete notes[eventId];
            localStorage.setItem('eventNotes', JSON.stringify(notes));
        });
    }
}

// Функция за сравнение на периоди
function comparePeriods(period1, period2) {
    const modal = document.createElement('div');
    modal.className = 'comparison-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Сравнение на периоди</h2>
            <div class="comparison-container">
                <div class="period-comparison">
                    <h3>${period1.querySelector('.period-title').textContent}</h3>
                    <div class="period-stats">
                        <p>Брой събития: ${period1.querySelectorAll('.event').length}</p>
                        <p>Продължителност: ${calculateDuration(period1)} години</p>
                    </div>
                </div>
                <div class="period-comparison">
                    <h3>${period2.querySelector('.period-title').textContent}</h3>
                    <div class="period-stats">
                        <p>Брой събития: ${period2.querySelectorAll('.event').length}</p>
                        <p>Продължителност: ${calculateDuration(period2)} години</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
}

// Функция за изчисляване на продължителността на период
function calculateDuration(period) {
    const events = period.querySelectorAll('.event');
    const dates = Array.from(events).map(event => {
        const dateText = event.querySelector('.event-date').textContent;
        return parseInt(dateText.split('-')[0]);
    });
    
    if (dates.length < 2) return 'Няма достатъчно данни';
    
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    return maxDate - minDate;
}

// Функция за показване на статистика
function showStatistics() {
    const modal = document.createElement('div');
    modal.className = 'statistics-modal';
    
    const periods = document.querySelectorAll('.period');
    const totalEvents = document.querySelectorAll('.event').length;
    const eventTypes = {};
    const periodDurations = {};
    
    // Събиране на статистика
    periods.forEach(period => {
        const periodTitle = period.querySelector('.period-title').textContent;
        const events = period.querySelectorAll('.event');
        const dates = Array.from(events).map(event => {
            const dateText = event.querySelector('.event-date').textContent;
            return parseInt(dateText.split('-')[0]);
        });
        
        const duration = dates.length >= 2 ? Math.max(...dates) - Math.min(...dates) : 0;
        periodDurations[periodTitle] = duration;
        
        events.forEach(event => {
            const type = event.dataset.type;
            eventTypes[type] = (eventTypes[type] || 0) + 1;
        });
    });
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Статистика</h2>
            <div class="statistics-container">
                <div class="stat-card">
                    <h3>Обща статистика</h3>
                    <p>Общ брой събития: ${totalEvents}</p>
                    <p>Брой периоди: ${periods.length}</p>
                </div>
                <div class="stat-card">
                    <h3>Типове събития</h3>
                    ${Object.entries(eventTypes).map(([type, count]) => `
                        <p>${type}: ${count} (${Math.round(count/totalEvents*100)}%)</p>
                    `).join('')}
                </div>
                <div class="stat-card">
                    <h3>Продължителност на периодите</h3>
                    ${Object.entries(periodDurations).map(([period, duration]) => `
                        <p>${period}: ${duration} години</p>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
}

// Функция за интерактивна карта
function showInteractiveMap() {
    const modal = document.createElement('div');
    modal.className = 'map-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Историческа карта</h2>
            <div class="map-container">
                <div class="map-controls">
                    <button class="map-period-btn" data-period="first-empire">Първо царство</button>
                    <button class="map-period-btn" data-period="second-empire">Второ царство</button>
                    <button class="map-period-btn" data-period="ottoman">Османско владичество</button>
                    <button class="map-period-btn" data-period="modern">Съвременна история</button>
                </div>
                <div class="map-view">
                    <!-- Тук ще се показва картата -->
                    <img src="map-placeholder.jpg" alt="Историческа карта" class="map-image">
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Добавяне на слушатели за бутоните на картата
    modal.querySelectorAll('.map-period-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const period = btn.dataset.period;
            // Тук ще се зарежда съответната карта за периода
            console.log(`Зареждане на карта за период: ${period}`);
        });
    });
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
}

// Функция за образователни тестове
function showQuiz() {
    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    
    const questions = [
        {
            question: "Кой е основал Първата българска държава?",
            options: ["Хан Аспарух", "Хан Крум", "Цар Симеон", "Хан Тервел"],
            correct: 0
        },
        {
            question: "Кога е прието християнството в България?",
            options: ["681", "864", "1018", "1185"],
            correct: 1
        },
        {
            question: "Кой е автор на 'История славянобългарска'?",
            options: ["Паисий Хилендарски", "Неофит Бозвели", "Георги Раковски", "Любен Каравелов"],
            correct: 0
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    function showQuestion() {
        const question = questions[currentQuestion];
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Исторически тест</h2>
                <div class="quiz-container">
                    <div class="question">${question.question}</div>
                    <div class="options">
                        ${question.options.map((option, index) => `
                            <button class="option-btn" data-index="${index}">${option}</button>
                        `).join('')}
                    </div>
                    <div class="quiz-progress">
                        Въпрос ${currentQuestion + 1} от ${questions.length}
                    </div>
                </div>
            </div>
        `;
        
        // Добавяне на слушатели за отговорите
        modal.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedIndex = parseInt(btn.dataset.index);
                if (selectedIndex === question.correct) {
                    score++;
                    btn.classList.add('correct');
                } else {
                    btn.classList.add('wrong');
                    modal.querySelector(`.option-btn[data-index="${question.correct}"]`).classList.add('correct');
                }
                
                setTimeout(() => {
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        showQuestion();
                    } else {
                        showResults();
                    }
                }, 1000);
            });
        });
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }
    
    function showResults() {
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Резултати</h2>
                <div class="results-container">
                    <p>Вашият резултат: ${score} от ${questions.length}</p>
                    <p>Процент успеваемост: ${Math.round(score/questions.length*100)}%</p>
                    <button class="restart-quiz">Нов тест</button>
                </div>
            </div>
        `;
        
        modal.querySelector('.restart-quiz').addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            showQuestion();
        });
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }
    
    document.body.appendChild(modal);
    showQuestion();
}

// Добавяне на CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .timeline-event {
        opacity: 0;
    }

    .event-details-btn {
        padding: 5px 10px;
        margin-top: 10px;
        border: 1px solid var(--primary-color);
        border-radius: var(--border-radius-sm);
        background-color: transparent;
        color: var(--primary-color);
        cursor: pointer;
        transition: var(--transition-normal);
    }

    .event-details-btn:hover {
        background-color: var(--primary-color);
        color: white;
    }
`;
document.head.appendChild(style);

// Инициализация при зареждане на страницата
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from siblings
            const filterOptions = button.closest('.filter-options');
            filterOptions.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update display
            filterEvents();
        });
    });

    // Показване на всички събития при зареждане
    displayEvents();
}); 