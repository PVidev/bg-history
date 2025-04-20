const sharp = require('sharp');

async function convertImages() {
    try {
        // Конвертиране на ornament-top.png
        await sharp('images/ornament-top.png')
            .webp({ quality: 80 })
            .toFile('images/ornament-top.webp');
        console.log('ornament-top.png конвертиран успешно');

        // Конвертиране на header-pattern.png
        await sharp('images/header-pattern.png')
            .webp({ quality: 80 })
            .toFile('images/header-pattern.webp');
        console.log('header-pattern.png конвертиран успешно');

        // Конвертиране на parchment-bg.jpg
        await sharp('images/parchment-bg.jpg')
            .webp({ quality: 75 })
            .toFile('images/parchment-bg.webp');
        console.log('parchment-bg.jpg конвертиран успешно');

    } catch (error) {
        console.error('Грешка при конвертиране:', error);
    }
}

convertImages(); 