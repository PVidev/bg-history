document.addEventListener('DOMContentLoaded', function() {
    // Мобилно меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const body = document.body;

    // Функция за затваряне на менюто
    function closeMenu() {
        nav.classList.remove('active');
        body.classList.remove('menu-open');
        mobileMenuBtn.textContent = '☰';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    // Отваряне/затваряне на менюто при клик върху бутона
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = nav.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                nav.classList.add('active');
                body.classList.add('menu-open');
                mobileMenuBtn.textContent = '✕';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            }
        });
    }

    // Затваряне на менюто при клик върху линк
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Затваряне на менюто при клик извън него
    document.addEventListener('click', function(event) {
        const isMenuOpen = nav.classList.contains('active');
        const clickedInsideNav = nav.contains(event.target);
        const clickedOnButton = mobileMenuBtn.contains(event.target);

        if (isMenuOpen && !clickedInsideNav && !clickedOnButton) {
            closeMenu();
        }
    });

    // Затваряне на менюто при промяна на размера на прозореца
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Промяна на хедъра при скролване
    const header = document.querySelector('header');
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > scrollThreshold) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }

        lastScroll = currentScroll;
    });

    // Плавно скролване до секциите
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = header.offsetHeight;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Добавяне на transition към хедъра
    header.style.transition = 'transform 0.3s ease';
}); 