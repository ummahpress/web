// Sidebar functionality
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Close sidebar button
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', closeSidebar);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.closest('.nav-link').dataset.page;
            
            // Use global navigation function
            if (typeof navigateTo === 'function') {
                navigateTo(page);
            }
            
            // Close mobile sidebar if open
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('mobile-open');
            }
        });
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        const isMobile = window.innerWidth <= 992;
        const isSidebarOpen = sidebar.classList.contains('mobile-open');
        const isClickInsideSidebar = sidebar.contains(e.target);
        const isClickOnMobileToggle = e.target === mobileMenuToggle || 
                                     (mobileMenuToggle && mobileMenuToggle.contains(e.target));
        
        if (isMobile && isSidebarOpen && !isClickInsideSidebar && !isClickOnMobileToggle) {
            sidebar.classList.remove('mobile-open');
        }
    });
    
    // Close sidebar with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('mobile-open');
            }
        }
    });
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const isMobile = window.innerWidth <= 992;
    
    if (isMobile) {
        // On mobile, just close the sidebar
        sidebar.classList.remove('mobile-open');
    } else {
        // On desktop, toggle collapsed state
        sidebar.classList.toggle('collapsed');
    }
}