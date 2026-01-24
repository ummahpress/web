/* MARKUP FOR UPLOAD: Upload this to /js/components-loader.js */
/* FUNCTIONALITY: Loads HTML components dynamically for modular structure */

async function loadComponents() {
    try {
        // Load sidebar
        const sidebarResponse = await fetch('components/sidebar.html');
        const sidebarHTML = await sidebarResponse.text();
        document.getElementById('sidebar-container').innerHTML = sidebarHTML;
        
        // Load header
        const headerResponse = await fetch('components/header.html');
        const headerHTML = await headerResponse.text();
        document.getElementById('header-container').innerHTML = headerHTML;
        
        // Load about page
        const aboutResponse = await fetch('components/about.html');
        const aboutHTML = await aboutResponse.text();
        document.getElementById('about-page').innerHTML = aboutHTML;
        
        // Load social page
        const socialResponse = await fetch('components/social.html');
        const socialHTML = await socialResponse.text();
        document.getElementById('social-page').innerHTML = socialHTML;
        
        return true;
    } catch (error) {
        console.error('Error loading components:', error);
        return false;
    }
}