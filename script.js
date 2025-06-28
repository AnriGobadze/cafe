document.addEventListener('DOMContentLoaded', () => {

    // --- DATA STORE ---
    const menuData = [
        { category: 'antipasti', name: 'Burrata Caprese', price: '$22', desc: 'Fresh burrata, heirloom tomatoes, basil, and a drizzle of aged balsamic glaze.' },
        { category: 'antipasti', name: 'Whipped Feta Dip', price: '$18', desc: 'Creamy whipped feta with hot honey, pistachios, and served with grilled pita.' },
        { category: 'antipasti', name: 'Octopus Carpaccio', price: '$24', desc: 'Thinly sliced octopus with lemon, olive oil, celery, and chili flakes.' },
        { category: 'mains', name: 'Saffron Risotto', price: '$28', desc: 'Creamy Arborio rice with saffron, parmigiano-reggiano, and white truffle.' },
        { category: 'mains', name: 'Lamb Ragu Pappardelle', price: '$32', desc: 'Slow-braised lamb ragu with wide pappardelle pasta and pecorino cheese.' },
        { category: 'mains', name: 'Branzino al Sale', price: '$38', desc: 'Whole salt-baked sea bass, filleted tableside, with lemon and herbs.' },
        { category: 'mains', name: 'Braised Short Rib', price: '$42', desc: 'Red wine braised beef short rib, creamy polenta, and gremolata.' },
        { category: 'dolci', name: 'Olive Oil Cake', price: '$14', desc: 'A simple, moist cake with citrus zest, served with whipped mascarpone.' },
        { category: 'dolci', name: 'Classic Tiramisu', price: '$15', desc: 'Espresso-soaked ladyfingers layered with a creamy mascarpone mixture.' },
        { category: 'dolci', name: 'Pistachio Panna Cotta', price: '$14', desc: 'Silky cooked cream infused with pistachio, topped with a berry coulis.' }
    ];
    
    const menuGrid = document.querySelector('.menu__grid');
    if (menuGrid) {
        menuGrid.innerHTML = menuData.map(item => `
            <div class="menu-card animate-item" data-category="${item.category}">
                <div class="menu-card__header"><h4>${item.name}</h4><span class="price">${item.price}</span></div>
                <p class="menu-card__description">${item.desc}</p>
            </div>`).join('');
    }

    // --- ELEMENT SELECTORS ---
    const body = document.body;
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const allViewLinks = document.querySelectorAll('.nav-link[data-view]');
    const allContactLinks = document.querySelectorAll('#contact-nav-link, #contact-footer-link');
    const views = document.querySelectorAll('.view');
    const contactModal = document.querySelector('#contact-modal');
    const closeModalBtn = document.querySelector('.modal__close');
    const modalOverlay = document.querySelector('.modal__overlay');
    const pageOverlay = document.querySelector('.page-overlay');
    const viewFullMenuBtn = document.querySelector('#view-full-menu-btn');

    // --- CORE FUNCTIONS ---
    
    /**
     * Updates active class on navigation links based on the current view.
     * @param {string} viewName - The name of the active view.
     */
    const updateActiveLink = (viewName) => {
        allViewLinks.forEach(link => {
            link.classList.toggle('active-link', link.dataset.view === viewName);
        });
    };
    
    /**
     * Switches the active view and updates the URL hash.
     * @param {string} viewName - The name of the view to switch to (e.g., 'home', 'menu').
     */
    const switchView = (viewName) => {
        window.location.hash = viewName;
        views.forEach(view => view.classList.toggle('active', view.id === `${viewName}-view`));
        updateActiveLink(viewName);
        
        body.classList.remove('nav-open', 'no-scroll');
        window.scrollTo(0, 0);
    };
    
    const openModal = () => contactModal.classList.add('active');
    const closeModal = () => contactModal.classList.remove('active');

    // --- EVENT LISTENERS ---

    // 1. Header scroll effect
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));

    // 2. Hamburger menu toggle
    hamburger.addEventListener('click', () => body.classList.toggle('nav-open'));
    pageOverlay.addEventListener('click', () => body.classList.remove('nav-open'));


    // 3. View switching from navigation links
    allViewLinks.forEach(link => {
        const viewName = link.dataset.view;
        if (viewName) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                switchView(viewName);
            });
        }
    });
    
    // 4. "See Full Menu" button
    viewFullMenuBtn.addEventListener('click', () => switchView('menu'));
    
    // 5. Contact modal controls
    allContactLinks.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    }));
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) closeModal();
    });

    // 6. Menu filtering logic
    const filterContainer = document.querySelector('.menu__filters');
    const menuCards = menuGrid.querySelectorAll('.menu-card');
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn-filter')) return;

            filterContainer.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            const filterValue = e.target.getAttribute('data-filter');

            menuCards.forEach(card => {
                const shouldShow = filterValue === 'all' || card.dataset.category === filterValue;
                card.classList.toggle('hidden', !shouldShow);
            });
        });
    }

    // --- INITIALIZATION (ROUTING) ---
    const handleInitialRoute = () => {
        const hash = window.location.hash.substring(1) || 'home';
        switchView(hash);
    };
    handleInitialRoute();
    window.addEventListener('hashchange', handleInitialRoute);
});