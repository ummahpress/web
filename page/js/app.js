/* MARKUP FOR UPLOAD: Upload this to /js/app.js */
/* FUNCTIONALITY: Main application logic - navigation, state management, event handling */

// Global variables
let currentCategory = 'all';
let currentPage = 'home';
let isMobile = window.innerWidth <= 768;

// Initialize the app
function initApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Initial setup
    updateMobileMenuState();
    switchPage('home');
    
    // Hide loading indicator after 1.5 seconds
    setTimeout(() => {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) loadingIndicator.style.display = 'none';
    }, 1500);
}

// Setup all event listeners
function setupEventListeners() {
    // Navigation links
    const homeLink = document.getElementById('home-link');
    const aboutLink = document.getElementById('about-link');
    const socialLink = document.getElementById('social-link');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const floatingRefreshBtn = document.getElementById('floating-refresh-btn');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const newUpdateIndicator = document.getElementById('new-update-indicator');
    
    if (homeLink) homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchPage('home');
        closeMobileMenu();
    });
    
    if (aboutLink) aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchPage('about');
        closeMobileMenu();
    });
    
    if (socialLink) socialLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchPage('social');
        closeMobileMenu();
    });
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update current category and render news
            currentCategory = tab.getAttribute('data-category');
            if (typeof window.renderNewsUpdates === 'function') {
                window.renderNewsUpdates();
            }
        });
    });
    
    if (floatingRefreshBtn) {
        floatingRefreshBtn.addEventListener('click', handleRefresh);
    }
    
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);
    if (newUpdateIndicator) newUpdateIndicator.addEventListener('click', loadNewUpdates);
    
    window.addEventListener('resize', handleResize);
}

// Handle window resize
function handleResize() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;
    
    if (wasMobile !== isMobile) {
        updateMobileMenuState();
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar) sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close mobile menu
function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Update mobile menu state based on screen size
function updateMobileMenuState() {
    isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile - hide sidebar by default
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Show mobile menu button
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'block';
    } else {
        // Desktop - show sidebar
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Hide mobile menu button
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
    }
}

// Handle refresh button click
function handleRefresh() {
    const floatingRefreshBtn = document.getElementById('floating-refresh-btn');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    // Animate the button
    floatingRefreshBtn.style.transform = 'rotate(180deg)';
    
    // Show loading
    loadingIndicator.style.display = 'block';
    
    // Simulate refresh
    setTimeout(() => {
        if (typeof window.renderNewsUpdates === 'function') {
            window.renderNewsUpdates();
        }
        loadingIndicator.style.display = 'none';
        
        // Reset button animation
        setTimeout(() => {
            floatingRefreshBtn.style.transform = '';
        }, 300);
        
        // Show confirmation with button color change
        const originalBg = floatingRefreshBtn.style.backgroundColor;
        floatingRefreshBtn.style.backgroundColor = 'var(--success)';
        floatingRefreshBtn.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            floatingRefreshBtn.style.backgroundColor = originalBg;
            floatingRefreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
        }, 1500);
    }, 1000);
}

// Switch between pages
function switchPage(page) {
    currentPage = page;
    
    // Get page elements
    const homePage = document.getElementById('home-page');
    const aboutPage = document.getElementById('about-page');
    const socialPage = document.getElementById('social-page');
    const homeLink = document.getElementById('home-link');
    const aboutLink = document.getElementById('about-link');
    const socialLink = document.getElementById('social-link');
    
    // Hide all pages
    const pages = [homePage, aboutPage, socialPage];
    pages.forEach(page => {
        if (page) page.style.display = 'none';
    });
    
    // Remove active class from all nav items
    const navLinks = [homeLink, aboutLink, socialLink];
    navLinks.forEach(link => {
        if (link) link.classList.remove('active');
    });
    
    // Show selected page and set active nav item
    if (page === 'home' && homePage && homeLink) {
        homePage.style.display = 'flex';
        homeLink.classList.add('active');
    } else if (page === 'about' && aboutPage && aboutLink) {
        aboutPage.style.display = 'block';
        aboutLink.classList.add('active');
    } else if (page === 'social' && socialPage && socialLink) {
        socialPage.style.display = 'block';
        socialLink.classList.add('active');
    }
}
