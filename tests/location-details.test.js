// Мокваме Leaflet библиотеката
jest.mock('leaflet', () => ({
    map: jest.fn().mockReturnValue({
        setView: jest.fn(),
        addLayer: jest.fn()
    }),
    tileLayer: jest.fn().mockReturnValue({
        addTo: jest.fn()
    }),
    marker: jest.fn().mockReturnValue({
        addTo: jest.fn(),
        bindPopup: jest.fn(),
        openPopup: jest.fn()
    })
}));

// Мокваме DOM елементите
document.body.innerHTML = `
    <div id="location-title"></div>
    <div id="period-badge"></div>
    <div id="location-description"></div>
    <div id="location-images"></div>
    <div id="events-timeline"></div>
    <div id="historical-figures"></div>
    <div id="external-links"></div>
    <div id="location-map"></div>
`;

// Импортираме функциите за тестване
const { getUrlParams, loadLocationDetails } = require('../js/location-details');

describe('Тестове за location-details.js', () => {
    beforeEach(() => {
        // Изчистваме моковете преди всеки тест
        jest.clearAllMocks();
        // Изчистваме DOM елементите
        document.body.innerHTML = `
            <div id="location-title"></div>
            <div id="period-badge"></div>
            <div id="location-description"></div>
            <div id="location-images"></div>
            <div id="events-timeline"></div>
            <div id="historical-figures"></div>
            <div id="external-links"></div>
            <div id="location-map"></div>
        `;
    });

    describe('getUrlParams', () => {
        test('трябва да извлече правилно параметрите от URL', () => {
            // Мокваме window.location.search
            delete window.location;
            window.location = { search: '?id=1&name=Плиска' };

            const params = getUrlParams();
            expect(params).toEqual({
                id: '1',
                name: 'Плиска'
            });
        });

        test('трябва да върне празни стойности при липсващи параметри', () => {
            window.location.search = '';
            const params = getUrlParams();
            expect(params).toEqual({
                id: null,
                name: null
            });
        });
    });

    describe('loadLocationDetails', () => {
        test('трябва да зареди правилно информацията за мястото', async () => {
            window.location.search = '?id=1&name=Плиска';

            global.historicalPlaces = [{
                id: 1,
                name: 'Плиска',
                period: 'first-empire',
                description: 'Първата столица на Първата българска държава',
                coordinates: [43.3667, 27.1167],
                events: [{
                    date: '681 г.',
                    title: 'Основаване на Първата българска държава',
                    description: 'Хан Аспарух основава Първата българска държава'
                }],
                images: ['pliska1.jpg', 'pliska2.jpg']
            }];

            await loadLocationDetails();

            expect(document.getElementById('location-title').textContent).toBe('Плиска');
            expect(document.getElementById('period-badge').textContent).toBe('Първа българска държава');
            expect(document.getElementById('location-description').textContent)
                .toBe('Първата столица на Първата българска държава');
            
            const eventsContainer = document.getElementById('events-timeline');
            expect(eventsContainer.innerHTML).toContain('681 г.');
            expect(eventsContainer.innerHTML).toContain('Основаване на Първата българска държава');
            
            const imagesContainer = document.getElementById('location-images');
            expect(imagesContainer.innerHTML).toContain('pliska1.jpg');
            expect(imagesContainer.innerHTML).toContain('pliska2.jpg');
        });

        test('трябва да покаже съобщение за грешка при липсващо място', async () => {
            window.location.search = '?id=999&name=Несъществуващо място';
            global.historicalPlaces = [];

            await loadLocationDetails();

            expect(document.getElementById('location-title').textContent)
                .toBe('Мястото не е намерено');
        });

        test('трябва да обработи правилно място без снимки', async () => {
            window.location.search = '?id=2&name=ТестМясто';
            global.historicalPlaces = [{
                id: 2,
                name: 'ТестМясто',
                period: 'ancient',
                description: 'Тестово описание',
                coordinates: [42.0, 24.0],
                events: []
            }];

            await loadLocationDetails();

            const imagesContainer = document.getElementById('location-images');
            expect(imagesContainer.innerHTML).toBe('');
        });

        test('трябва да обработи правилно място със string събития', async () => {
            window.location.search = '?id=3&name=ТестМясто2';
            global.historicalPlaces = [{
                id: 3,
                name: 'ТестМясто2',
                period: 'modern',
                description: 'Тестово описание',
                coordinates: [42.0, 24.0],
                events: ['Събитие 1', 'Събитие 2']
            }];

            await loadLocationDetails();

            const eventsContainer = document.getElementById('events-timeline');
            expect(eventsContainer.innerHTML).toContain('Събитие 1');
            expect(eventsContainer.innerHTML).toContain('Събитие 2');
        });
    });
}); 