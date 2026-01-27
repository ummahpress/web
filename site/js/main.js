// Main initialization script
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
});

function initHeaderScroll() {
    const mainHeader = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollPosition > 10) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });
}

function handleResize() {
    const sidebar = document.getElementById('sidebar');
    
    // If we're on desktop and sidebar was in mobile-open state, remove it
    if (window.innerWidth > 992) {
        if (sidebar) sidebar.classList.remove('mobile-open');
    }
}

// Navigation function
function navigateTo(page) {
    // Update navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.page === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Load page content
    loadPage(page);
}

// Global function to load pages
function loadPage(page) {
    fetch(`content/${page}.html`)
        .then(response => response.text())
        .then(data => {
            const pageContent = document.getElementById('page-content');
            if (pageContent) {
                pageContent.innerHTML = data;
                
                // Initialize page-specific functionality
                if (page === 'home') {
                    loadPosts();
                    loadCategories();
                }
                
                // Update page title
                const pageTitle = document.getElementById('pageTitle');
                if (pageTitle) {
                    pageTitle.textContent = page === 'home' 
                        ? 'Ummah Press: Rapid News Update' 
                        : 'About Us';
                }
            }
        })
        .catch(error => console.error('Error loading page:', error));
}