// Main Application - Coordinates everything
class UmmahPressApp {
    constructor() {
        this.isInitialized = false;
    }
    
    async init() {
        if (this.isInitialized) return;
        
        try {
            console.log('Initializing Ummah Press App...');
            
            // Initialize Google Translate
            GoogleTranslateManager.init();
            
            // Initialize Data Handler
            await DataHandler.init();
            
            // Initialize UI Manager
            UIManager.init();
            
            // Set initial theme from localStorage or default
            const savedTheme = localStorage.getItem('ummahpress-theme') || 'dark';
            UIManager.setTheme(savedTheme);
            
            // Load all content
            await UIManager.loadAllContent();
            
            // Set initial page
            UIManager.setCurrentPage('home');
            
            this.isInitialized = true;
            console.log('Ummah Press App initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError();
        }
    }
    
    showError() {
        const postsContainer = document.getElementById('postsContainer');
        if (postsContainer) {
            postsContainer.innerHTML = `
                <div class="post-card" style="text-align: center;">
                    <h3>Error Loading Content</h3>
                    <p>We're having trouble loading the news. Please try refreshing the page.</p>
                    <button onclick="location.reload()" style="
                        background: var(--accent);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-top: 10px;
                    ">
                        Refresh Page
                    </button>
                </div>
            `;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new UmmahPressApp();
    app.init();
});