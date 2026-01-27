// Theme management
function initTheme() {
    const darkModeBtn = document.getElementById('darkModeBtn');
    const lightModeBtn = document.getElementById('lightModeBtn');
    const logo = document.getElementById('logo');
    
    // Set initial theme
    const savedTheme = localStorage.getItem('ummahpress-theme') || 'dark';
    setTheme(savedTheme);
    
    // Theme toggle buttons
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => setTheme('dark'));
    }
    
    if (lightModeBtn) {
        lightModeBtn.addEventListener('click', () => setTheme('light'));
    }
}

function setTheme(theme) {
    const body = document.body;
    const darkModeBtn = document.getElementById('darkModeBtn');
    const lightModeBtn = document.getElementById('lightModeBtn');
    const logo = document.getElementById('logo');
    
    if (theme === 'light') {
        body.classList.remove('dark');
        body.classList.add('light');
        if (darkModeBtn) darkModeBtn.classList.remove('active');
        if (lightModeBtn) lightModeBtn.classList.add('active');
        if (logo) logo.src = 'assets/images/logo-light.png';
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        if (lightModeBtn) lightModeBtn.classList.remove('active');
        if (darkModeBtn) darkModeBtn.classList.add('active');
        if (logo) logo.src = 'assets/images/logo-dark.png';
    }
    
    localStorage.setItem('ummahpress-theme', theme);
}