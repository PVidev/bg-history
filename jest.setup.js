// Глобални мокове за браузър API-та
global.URL = {
    createObjectURL: jest.fn(),
    revokeObjectURL: jest.fn()
};

// Мок за localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
global.localStorage = localStorageMock;

// Мок за fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(''),
        ok: true
    })
);

// Мок за IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
}; 