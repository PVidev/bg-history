const historicalEvents = {
    681: "Създаване на българската държава от хан Аспарух",
    705: "Хан Тервел получава областта Загоре от Византия",
    718: "Хан Тервел спасява Константинопол от арабите",
    864: "Покръстване на българите от княз Борис I",
    886: "Пристигане на учениците на Кирил и Методий в България",
    893: "Преславски събор – преместване на столицата и утвърждаване на славянския език",
    917: "Битка при Ахелой – Цар Симеон I побеждава византийците",
    1014: "Битка при Беласица – пленяване и ослепяване на 14 000 български войници",
    1018: "Падането на Първото българско царство под византийско владичество",
    1185: "Въстание на Асен и Петър – възстановяване на България (Второ царство)",
    1205: "Цар Калоян побеждава латините при Адрианопол",
    1218: "Завръщане на Иван Асен II и начало на златен период за Второто царство",
    1277: "Въстание на Ивайло срещу болярската свещеност и татарите",
    1393: "Завладяване на Търново от османците",
    1396: "Битката при Никопол – край на организираната българска съпротива",
    1762: "Паисий Хилендарски пише „История славянобългарска“",
    1876: "Начало на Априлското въстание в Копривщица",
    1878: "Санстефански мирен договор – Освобождение на България",
    1885: "Съединение на Княжество България с Източна Румелия",
    1908: "Обявяване на независимостта на България",
    1912: "Начало на Балканската война",
    1913: "Начало на Междусъюзническата война",
    1915: "България влиза в Първата световна война",
    1918: "Солунското примирие – край на участието на България в ПСВ",
    1923: "Деветоюнски преврат",
    1941: "България се присъединява към Тристранния пакт",
    1944: "Деветосептемврийски преврат – идване на комунистическата власт",
    1946: "Обявяване на Народна република България",
    1989: "Падането на Тодор Живков – край на комунистическия режим",
    1990: "Първите свободни избори след 45 години",
    1997: "Въвеждане на валутен борд",
    2004: "България става член на НАТО",
    2007: "България става член на Европейския съюз",
    2020: "Начало на масови антиправителствени протести в София",
    2023: "Политическа нестабилност и чести парламентарни избори"
};

const yearSlider = document.getElementById('yearSlider');
const currentYearDisplay = document.getElementById('currentYear');
const eventTitle = document.getElementById('eventTitle');
const eventDescription = document.getElementById('eventDescription');
const prevYearButton = document.getElementById('prevYear');
const nextYearButton = document.getElementById('nextYear');

// Създаваме масив от всички години с исторически събития
const historicalYears = Object.keys(historicalEvents).map(Number).sort((a, b) => a - b);

function updateEvent(year) {
    const event = historicalEvents[year];
    if (event) {
        eventTitle.textContent = `Събитие от ${year} година`;
        eventDescription.textContent = event;
    } else {
        eventTitle.textContent = "Няма записани събития";
        eventDescription.textContent = "За тази година няма записани исторически събития.";
    }
}

function findNextHistoricalYear(currentYear, direction) {
    const currentIndex = historicalYears.indexOf(currentYear);
    
    if (direction === 'next') {
        if (currentIndex < historicalYears.length - 1) {
            return historicalYears[currentIndex + 1];
        }
    } else {
        if (currentIndex > 0) {
            return historicalYears[currentIndex - 1];
        }
    }
    
    return currentYear; // Връща текущата година, ако няма следващо/предишно събитие
}

function changeYear(direction) {
    let currentYear = parseInt(yearSlider.value);
    let newYear = findNextHistoricalYear(currentYear, direction);
    
    if (newYear !== currentYear) {
        yearSlider.value = newYear;
        currentYearDisplay.textContent = newYear;
        updateEvent(newYear);
    }
}

yearSlider.addEventListener('input', function() {
    const year = parseInt(this.value);
    currentYearDisplay.textContent = year;
    updateEvent(year);
});

prevYearButton.addEventListener('click', () => changeYear('prev'));
nextYearButton.addEventListener('click', () => changeYear('next'));

// Добавяне на клавишни комбинации
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeYear('prev');
    } else if (e.key === 'ArrowRight') {
        changeYear('next');
    }
});

// Инициализиране на първото събитие
updateEvent(681); 