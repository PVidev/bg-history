// Инициализация на картата и DOM елементи
document.addEventListener('DOMContentLoaded', function() {
    // Достъп до DOM елементи
    const mapContainer = document.getElementById('map');
    const searchInput = document.getElementById('search-input');
    const periodFilters = document.querySelectorAll('.filter-btn');
    const locationInfo = document.getElementById('locationInfo');
    
    // Проверка дали елементите са намерени
    if (!mapContainer) {
        console.error('Контейнерът за картата не е намерен. Моля, проверете HTML структурата.');
        return;
    }
    
    // Инициализация на картата
    const map = L.map('map', {
        center: [42.7339, 25.4858], // Център на България
        zoom: 7,
        minZoom: 6,
        maxZoom: 18
    });
    
    // Добавяне на базов слой на картата
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Инициализация на слой за маркерите
    const markersLayer = new L.LayerGroup();
    map.addLayer(markersLayer);
    
    // Добавяне на маркери за всички исторически места
    historicalPlaces.forEach(place => createMarker(place, markersLayer));
    
    // Добавяне на събития за търсене и филтриране
    if (searchInput) {
        searchInput.addEventListener('input', (e) => searchPlaces(e.target.value, markersLayer, map));
    }
    
    if (periodFilters) {
        periodFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                const period = filter.dataset.period;
                filterPlaces(period, markersLayer, map);
                
                // Актуализиране на активния бутон
                periodFilters.forEach(btn => btn.classList.remove('active'));
                filter.classList.add('active');
            });
        });
    }
});

// Данни за историческите места
const historicalPlaces = [
    // Античност
    {
        id: 1,
        name: "Сердика",
        period: "ancient",
        coordinates: [42.6977, 23.3219],
        description: "Древен римски град, предшественик на съвременна София. Важен център на римската провинция Тракия.",
        events: [
            {
                date: "29 г. пр.н.е.",
                title: "Завладяване от римляните",
                description: "Римляните завладяват града и го превръщат в важен административен център."
            }
        ],
        images: ["serdica1.jpg", "serdica2.jpg"]
    },
    {
        id: 2,
        name: "Филипопол",
        period: "ancient",
        coordinates: [42.1418, 24.7495],
        description: "Древен тракийски град, по-късно римски център. Днес Пловдив.",
        events: [
            {
                date: "46 г. пр.н.е.",
                title: "Завладяване от римляните",
                description: "Градът става част от Римска империя."
            }
        ],
        images: ["philipopolis1.jpg", "philipopolis2.jpg"]
    },
    {
        id: 3,
        name: "Никополис ад Иструм",
        period: "ancient",
        coordinates: [43.2167, 25.6167],
        description: "Древен римски град, основан от император Траян.",
        events: [
            {
                date: "102 г.",
                title: "Основаване на града",
                description: "Император Траян основава града след победата си над даките."
            }
        ],
        images: ["nicopolis1.jpg", "nicopolis2.jpg"]
    },

    // Първа българска държава
    {
        id: 4,
        name: "Плиска",
        period: "first-empire",
        coordinates: [43.3667, 27.1167],
        description: "Първата столица на Първата българска държава. Тук са открити множество археологически находки от ранното средновековие.",
        events: [
            {
                date: "681 г.",
                title: "Основаване на Първата българска държава",
                description: "Хан Аспарух основава Първата българска държава с център Плиска."
            }
        ],
        images: ["pliska1.jpg", "pliska2.jpg"]
    },
    {
        id: 5,
        name: "Преслав",
        period: "first-empire",
        coordinates: [43.1667, 26.8167],
        description: "Втората столица на Първата българска държава. Известна с Преславската книжовна школа.",
        events: [
            {
                date: "893 г.",
                title: "Преместване на столицата",
                description: "Цар Симеон премества столицата от Плиска в Преслав."
            }
        ],
        images: ["preslav1.jpg", "preslav2.jpg"]
    },
    {
        id: 6,
        name: "Мадара",
        period: "first-empire",
        coordinates: [43.2778, 27.1189],
        description: "Исторически резерват с известния Мадарски конник - скален релеф от 8 век.",
        events: [
            {
                date: "8 век",
                title: "Създаване на Мадарския конник",
                description: "Създаден е уникалният скален релеф, изобразяващ конник."
            }
        ],
        images: ["madara1.jpg", "madara2.jpg"]
    },

    // Втора българска държава
    {
        id: 7,
        name: "Велико Търново",
        period: "second-empire",
        coordinates: [43.0812, 25.6291],
        description: "Столица на Втората българска държава. Известна с крепостта Царевец.",
        events: [
            {
                date: "1185 г.",
                title: "Възстановяване на българската държава",
                description: "Асен и Петър възстановяват българската държава с център Търново."
            }
        ],
        images: ["veliko_tarnovo1.jpg", "veliko_tarnovo2.jpg"]
    },
    {
        id: 8,
        name: "Червен",
        period: "second-empire",
        coordinates: [43.6167, 25.9667],
        description: "Средновековна крепост от времето на Втората българска държава.",
        events: [
            {
                date: "14 век",
                title: "Разцвет на крепостта",
                description: "Крепостта достига най-голям разцвет по време на Втората българска държава."
            }
        ],
        images: ["cherven1.jpg", "cherven2.jpg"]
    },
    {
        id: 9,
        name: "Баба Вида",
        period: "second-empire",
        coordinates: [43.9911, 22.8753],
        description: "Средновековна крепост в град Видин, единствената напълно запазена средновековна крепост в България.",
        events: [
            {
                date: "10 век",
                title: "Строителство на крепостта",
                description: "Крепостта е построена на мястото на древна римска крепост."
            }
        ],
        images: ["baba_vida1.jpg", "baba_vida2.jpg"]
    },

    // Османско владичество
    {
        id: 10,
        name: "Копривщица",
        period: "ottoman",
        coordinates: [42.6333, 24.3500],
        description: "Исторически град, известен с Априлското въстание от 1876 г.",
        events: [
            {
                date: "1876 г.",
                title: "Априлско въстание",
                description: "Копривщица е един от центровете на Aприлското въстание."
            }
        ],
        images: ["koprivshtica1.jpg", "koprivshtica2.jpg"]
    },
    {
        id: 11,
        name: "Шипка",
        period: "ottoman",
        coordinates: [42.7500, 25.3333],
        description: "Исторически проход, известен с битките по време на Руско-турската война.",
        events: [
            {
                date: "1877-1878 г.",
                title: "Оборона на Шипка",
                description: "Руски и български войски защитават прохода срещу османските сили."
            }
        ],
        images: ["shipka1.jpg", "shipka2.jpg"]
    },
    {
        id: 12,
        name: "Батак",
        period: "ottoman",
        coordinates: [41.9500, 24.2167],
        description: "Град, известен с Баташкото клане по време на Aприлското въстание.",
        events: [
            {
                date: "1876 г.",
                title: "Баташко клане",
                description: "Османските сили извършват масово клане над българското население."
            }
        ],
        images: ["batak1.jpg", "batak2.jpg"]
    },

    // Модерна епоха
    {
        id: 13,
        name: "София",
        period: "modern",
        coordinates: [42.6977, 23.3219],
        description: "Столица на България от 1879 г. Важен политически и културен център.",
        events: [
            {
                date: "1879 г.",
                title: "Обявяване за столица",
                description: "София е обявена за столица на новоосвободена България."
            }
        ],
        images: ["sofia1.jpg", "sofia2.jpg"]
    },
    {
        id: 14,
        name: "Плевен",
        period: "modern",
        coordinates: [43.4167, 24.6167],
        description: "Град, известен с Плевенската епопея по време на Руско-турската война.",
        events: [
            {
                date: "1877 г.",
                title: "Плевенска епопея",
                description: "Продължителна обсада на града по време на Руско-турската война."
            }
        ],
        images: ["pleven1.jpg", "pleven2.jpg"]
    },
    {
        id: 15,
        name: "Русе",
        period: "modern",
        coordinates: [43.8564, 25.9708],
        description: "Важен град по време на Възраждането и след Освобождението.",
        events: [
            {
                date: "1866 г.",
                title: "Първа жп линия",
                description: "Открита е първата железопътна линия в България."
            }
        ],
        images: ["ruse1.jpg", "ruse2.jpg"]
    },
    {
        name: "Археологически резерват 'Сборяново'",
        description: "Комплекс от тракийски могили и светилища от V-III век пр.н.е.",
        coordinates: [43.7, 26.0],
        period: "ancient",
        events: ["Тракийско светилище", "Могилен некропол"],
        images: ["sborianovo.jpg"]
    },
    {
        name: "Музей на социалистическото изкуство",
        description: "Музей, посветен на изкуството от социалистическия период в България.",
        coordinates: [42.65, 23.35],
        period: "modern",
        events: ["Социалистическо изкуство", "Историческа изложба"],
        images: ["socialist-art.jpg"]
    },
    {
        name: "Паметник на Алеко Константинов",
        description: "Паметник на известния български писател, създател на Бай Ганьо.",
        coordinates: [42.7, 23.3],
        period: "modern",
        events: ["Литературен паметник"],
        images: ["aleko.jpg"]
    },
    {
        name: "Археологически музей - Пловдив",
        description: "Един от най-богатите археологически музеи в България.",
        coordinates: [42.15, 24.75],
        period: "ancient",
        events: ["Антични находки", "Тракийски съкровища"],
        images: ["plovdiv-museum.jpg"]
    },
    {
        name: "Паметник на Свободата - Шипка",
        description: "Паметник, посветен на героите от Шипченската битка.",
        coordinates: [42.75, 25.32],
        period: "modern",
        events: ["Руско-турска война", "Шипченска битка"],
        images: ["shipka.jpg"]
    },
    {
        name: "Тракийска гробница в Казанлък",
        description: "Уникална тракийска гробница от IV век пр.н.е., включена в Списъка на световното културно наследство на ЮНЕСКО.",
        coordinates: [42.625, 25.4],
        period: "ancient",
        events: [
            {
                date: "IV век пр.н.е.",
                title: "Създаване на гробницата",
                description: "Създадена е уникалната тракийска гробница с прекрасни фрески."
            },
            {
                date: "1944 г.",
                title: "Откриване на гробницата",
                description: "Гробницата е открита случайно по време на военни работи."
            }
        ],
        images: ["kazanlak-tomb.jpg"]
    },
    {
        name: "Крепост Асенова",
        description: "Средновековна крепост от времето на Втората българска държава, разположена в Родопите.",
        coordinates: [41.9833, 24.8667],
        period: "second-empire",
        events: [
            {
                date: "1231 г.",
                title: "Строителство на крепостта",
                description: "Цар Иван Асен II построява крепостта за защита на южните граници."
            },
            {
                date: "XIV век",
                title: "Разцвет на крепостта",
                description: "Крепостта достига най-голям разцвет по време на Втората българска държава."
            }
        ],
        images: ["asenova-fortress.jpg"]
    },
    {
        name: "Етнографски музей - Етрополе",
        description: "Музей, представящ бита и културата на българския народ през различните епохи.",
        coordinates: [42.8333, 24.0],
        period: "modern",
        events: [
            {
                date: "1971 г.",
                title: "Основаване на музея",
                description: "Създаден е Етнографският музей в сграда от Възраждането."
            },
            {
                date: "1980 г.",
                title: "Разширяване на експозицията",
                description: "Музеят е разширен с нови експонати и зали."
            }
        ],
        images: ["etnografski-etropole.jpg"]
    },
    {
        name: "Паметник на Васил Левски - Карлово",
        description: "Паметник на Апостола на свободата в роден му град.",
        coordinates: [42.6333, 24.8],
        period: "modern",
        events: [
            {
                date: "1937 г.",
                title: "Издигане на паметника",
                description: "Издигнат е паметник на Васил Левски в центъра на Карлово."
            },
            {
                date: "2007 г.",
                title: "Реставрация",
                description: "Паметникът е реставриран и обновен."
            }
        ],
        images: ["levski-karlovo.jpg"]
    },
    {
        name: "Археологически резерват 'Августа Траяна'",
        description: "Останки от древен римски град, разположен в Стара Загора.",
        coordinates: [42.4333, 25.6333],
        period: "ancient",
        events: [
            {
                date: "II век",
                title: "Основаване на града",
                description: "Император Траян основава града като римска колония."
            },
            {
                date: "1960 г.",
                title: "Археологически разкопки",
                description: "Започват систематични археологически разкопки на мястото."
            }
        ],
        images: ["augusta-traiana.jpg"]
    },
    {
        name: "Крепост Белоградчик",
        description: "Средновековна крепост, известна с уникалните си скални образувания.",
        coordinates: [43.6167, 22.6833],
        period: "second-empire",
        events: [
            {
                date: "XIV век",
                title: "Строителство на крепостта",
                description: "Построена е средновековната крепост сред скалите."
            },
            {
                date: "XIX век",
                title: "Османска реконструкция",
                description: "Крепостта е реконструирана по време на османското владичество."
            }
        ],
        images: ["belogradchik-fortress.jpg"]
    },
    {
        name: "Паметник на Христо Ботев - Враца",
        description: "Паметник на българския поет и революционер.",
        coordinates: [43.2, 23.55],
        period: "modern",
        events: [
            {
                date: "1954 г.",
                title: "Издигане на паметника",
                description: "Издигнат е паметник на Христо Ботев в центъра на Враца."
            },
            {
                date: "2002 г.",
                title: "Реставрация",
                description: "Паметникът е реставриран и обновен."
            }
        ],
        images: ["botev-vratsa.jpg"]
    },
    {
        name: "Тракийска гробница в Свещари",
        description: "Уникална тракийска гробница от III век пр.н.е., включена в Списъка на световното културно наследство на ЮНЕСКО.",
        coordinates: [43.75, 26.2],
        period: "ancient",
        events: [
            {
                date: "III век пр.н.е.",
                title: "Създаване на гробницата",
                description: "Създадена е уникалната тракийска гробница с кариатиди."
            },
            {
                date: "1982 г.",
                title: "Откриване на гробницата",
                description: "Гробницата е открита при археологически разкопки."
            }
        ],
        images: ["sveshtari-tomb.jpg"]
    },
    {
        name: "Крепост Царевец",
        description: "Средновековна крепост, бивша столица на Втората българска държава.",
        coordinates: [43.0833, 25.65],
        period: "second-empire",
        events: [
            {
                date: "XII век",
                title: "Строителство на крепостта",
                description: "Построена е крепостта като столица на Втората българска държава."
            },
            {
                date: "1393 г.",
                title: "Падане на крепостта",
                description: "Крепостта е превзета от османските войски."
            }
        ],
        images: ["tsarevets.jpg"]
    },
    {
        name: "Паметник на Априлското въстание - Панагюрище",
        description: "Паметник, посветен на героите от Априлското въстание.",
        coordinates: [42.5, 24.1833],
        period: "modern",
        events: [
            {
                date: "1976 г.",
                title: "Издигане на паметника",
                description: "Издигнат е паметник по случай 100-годишнината от Априлското въстание."
            },
            {
                date: "2006 г.",
                title: "Реставрация",
                description: "Паметникът е реставриран и обновен."
            }
        ],
        images: ["aprilsko-panagyurishte.jpg"]
    }
];

// Данни за историческите карти
const historicalMaps = {
    "ancient": {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Thrace_and_Illyria_%28English%29.svg/1200px-Thrace_and_Illyria_%28English%29.svg.png",
        description: "Карта на територията на днешна България през античността"
    },
    "first-empire": {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/First_Bulgarian_Empire_%28English%29.svg/1200px-First_Bulgarian_Empire_%28English%29.svg.png",
        description: "Карта на Първата българска държава в най-голям ѝ разцвет"
    },
    "second-empire": {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Second_Bulgarian_Empire_%28English%29.svg/1200px-Second_Bulgarian_Empire_%28English%29.svg.png",
        description: "Карта на Втората българска държава"
    },
    "ottoman": {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Ottoman_Empire_1683_%28English%29.svg/1200px-Ottoman_Empire_1683_%28English%29.svg.png",
        description: "Карта на България по време на османското владичество"
    },
    "modern": {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Bulgaria_location_map.svg/1200px-Bulgaria_location_map.svg.png",
        description: "Карта на съвременна България"
    }
};

// Маркери и група за маркерите
const markers = L.layerGroup().addTo(map);

// Функция за създаване на маркер
function createMarker(place, markersLayer) {
    // Проверка за валидни координати
    if (!place.coordinates || !Array.isArray(place.coordinates) || place.coordinates.length !== 2) {
        console.error(`Невалидни координати за ${place.name}`);
        return null;
    }

    const marker = L.marker([place.coordinates[0], place.coordinates[1]], {
        title: place.name,
        icon: L.divIcon({
            className: `marker-icon ${place.period}`,
            html: `<div class="marker-content">${getMarkerContent(place)}</div>`,
            iconSize: [30, 30]
        })
    });

    // Добавяне на попъп
    const popupContent = createPopupContent(place);
    if (popupContent) {
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            minWidth: 200,
            className: 'custom-popup'
        });
    }

    // Добавяне на маркера към слоя
    if (markersLayer && typeof markersLayer.addLayer === 'function') {
        markersLayer.addLayer(marker);
    } else {
        console.error('Невалиден слой за маркери');
    }

    return marker;
}

// Функция за търсене на места
function searchPlaces(query, markersLayer, map) {
    if (!markersLayer || !map) {
        console.error('Липсва слой за маркери или карта');
        return;
    }

    query = query.toLowerCase().trim();
    markersLayer.clearLayers();
    
    const filteredPlaces = historicalPlaces.filter(place => {
        if (!place || !place.name) return false;
        
        return place.name.toLowerCase().includes(query) ||
               (place.description && place.description.toLowerCase().includes(query)) ||
               (place.events && place.events.some(event => 
                   event.title.toLowerCase().includes(query) ||
                   event.description.toLowerCase().includes(query)
               ));
    });
    
    filteredPlaces.forEach(place => {
        const marker = createMarker(place, markersLayer);
        if (marker) {
            marker.addTo(markersLayer);
        }
    });
    
    updateMapView(filteredPlaces, map);
}

// Функция за филтриране по период
function filterPlaces(period, markersLayer, map) {
    if (!markersLayer || !map) {
        console.error('Липсва слой за маркери или карта');
        return;
    }

    markersLayer.clearLayers();
    
    const filteredPlaces = period === 'all' 
        ? historicalPlaces 
        : historicalPlaces.filter(place => place.period === period);
    
    filteredPlaces.forEach(place => {
        const marker = createMarker(place, markersLayer);
        if (marker) {
            marker.addTo(markersLayer);
        }
    });
    
    updateMapView(filteredPlaces, map);
}

// Функция за актуализиране на изгледа на картата
function updateMapView(places, map) {
    if (places.length === 0) {
        return;
    }
    
    const bounds = L.latLngBounds(places.map(place => [
        place.coordinates[0],
        place.coordinates[1]
    ]));
    
    map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 12
    });
}

// Функция за създаване на съдържание на маркера
function getMarkerContent(place) {
    return '📍';
}

// Функция за създаване на съдържание на попъп
function createPopupContent(place) {
    if (!place || !place.name) {
        console.error('Невалидни данни за място');
        return null;
    }

    return `
        <div class="popup-content">
            <h3>${place.name}</h3>
            <p>${place.description ? place.description.slice(0, 100) + '...' : 'Няма описание'}</p>
            <a href="location-details.html?id=${place.id || ''}" class="details-btn">
                Повече информация
            </a>
        </div>
    `;
}

// Функция за показване на информация за локацията
function showLocationInfo(place) {
    if (!locationInfo) return;
    
    locationInfo.innerHTML = `
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <a href="location-details.html?id=${place.id}" class="details-btn">
            Повече информация
        </a>
    `;
}

// Функция за показване на историческа карта
function showHistoricalMap(period) {
    const mapContainer = document.getElementById('map');
    let historicalMap = document.querySelector('.historical-map');
    
    if (!historicalMap) {
        historicalMap = document.createElement('div');
        historicalMap.className = 'historical-map';
        mapContainer.appendChild(historicalMap);
    }
    
    if (period === 'all') {
        historicalMap.style.display = 'none';
        return;
    }
    
    const mapData = historicalMaps[period];
    if (mapData) {
        historicalMap.style.backgroundImage = `url(${mapData.url})`;
        historicalMap.style.display = 'block';
        historicalMap.title = mapData.description;
    }
}

// Функция за анимация при преход между периоди
function animatePeriodTransition() {
    const markers = document.querySelectorAll('.custom-marker');
    markers.forEach(marker => {
        marker.classList.add('period-transition');
        setTimeout(() => {
            marker.classList.remove('period-transition');
        }, 500);
    });
}

// Добавяне на контроли за картите
function addMapControls() {
    const controlsContainer = document.querySelector('.map-controls');
    const periodMapControls = document.createElement('div');
    periodMapControls.className = 'period-map-controls';
    
    Object.keys(historicalMaps).forEach(period => {
        const button = document.createElement('button');
        button.className = 'map-control-btn';
        button.dataset.period = period;
        button.innerHTML = `
            <i class="fas fa-map"></i>
            ${getPeriodName(period)}
        `;
        button.addEventListener('click', () => {
            document.querySelectorAll('.map-control-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showHistoricalMap(period);
        });
        periodMapControls.appendChild(button);
    });
    
    controlsContainer.appendChild(periodMapControls);
}

// Функция за цвят според периода
function getPeriodColor(period) {
    const colors = {
        "ancient": "#8B4513",
        "first-empire": "#FFD700",
        "second-empire": "#FFA500",
        "ottoman": "#800000",
        "modern": "#0000FF"
    };
    return colors[period] || "#000000";
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

// Функция за споделяне на място
function shareLocation(place) {
    const shareData = {
        title: place.name,
        text: `${place.name}\n${place.description}\n\nИсторически период: ${getPeriodName(place.period)}\n\nРазгледайте в Историческата карта на България`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .catch(err => {
                console.error('Грешка при споделяне:', err);
                alert('Неуспешно споделяне. Моля, опитайте отново.');
            });
    } else {
        // Fallback за браузъри, които не поддържат Web Share API
        const textToCopy = `${place.name}\n${place.description}\n\nИсторически период: ${getPeriodName(place.period)}\n\nРазгледайте в Историческата карта на България: ${window.location.href}`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Информацията е копирана в клипборда. Можете да я споделите.');
            })
            .catch(err => {
                console.error('Грешка при копиране:', err);
                alert('Неуспешно копиране. Моля, опитайте отново.');
            });
    }
}

// Добавяне на слушатели за събития
document.addEventListener('DOMContentLoaded', () => {
    // Търсене
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchPlaces(e.target.value, markers, map);
        });
    }
    
    // Филтри за периоди
    if (periodFilters) {
        periodFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                const period = filter.dataset.period;
                
                // Актуализиране на активния бутон
                periodFilters.forEach(btn => btn.classList.remove('active'));
                filter.classList.add('active');
                
                filterPlaces(period, markers, map);
            });
        });
    }
    
    // Затваряне на детайлна информация при клик извън нея
    document.addEventListener('click', (e) => {
        if (locationInfo && 
            locationInfo.classList.contains('active') && 
            !locationInfo.contains(e.target) && 
            !e.target.closest('.leaflet-popup')) {
            closeLocationInfo();
        }
    });
    
    // Затваряне при натискане на ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLocationInfo();
            const modal = document.querySelector('.image-modal');
            if (modal) modal.remove();
        }
    });
}); 