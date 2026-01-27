// Main Application Controller
class AppController {
    constructor() {
        this.dataLoaded = false;
    }

    // Initialize application
    async init() {
        try {
            // Load data from JSON files if they exist
            await this.loadExternalData();
            
            // Initialize UI
            uiController.init();
            
            // Mark as loaded
            this.dataLoaded = true;
            
            console.log('Ummah Press application initialized successfully');
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.handleInitializationError(error);
        }
    }

    // Load external data from JSON files
    async loadExternalData() {
        // Check if we need to load external data
        // If window.siteData is already defined (from data.js), use it
        if (!window.siteData) {
            window.siteData = {
                config: {},
                team: [],
                posts: []
            };
            
            // Try to load from JSON files
            try {
                const [teamResponse, postsResponse, settingsResponse] = await Promise.allSettled([
                    fetch('data/users.json'),
                    fetch('data/posts.json'),
                    fetch('data/settings.json')
                ]);
                
                if (teamResponse.status === 'fulfilled' && teamResponse.value.ok) {
                    window.siteData.team = await teamResponse.value.json();
                }
                
                if (postsResponse.status === 'fulfilled' && postsResponse.value.ok) {
                    window.siteData.posts = await postsResponse.value.json();
                }
                
                if (settingsResponse.status === 'fulfilled' && settingsResponse.value.ok) {
                    window.siteData.config = await settingsResponse.value.json();
                }
            } catch (error) {
                console.warn('Could not load external data files, using default data');
                // Use default data from data.js (if it exists)
            }
        }
    }

    // Handle initialization errors
    handleInitializationError(error) {
        // Show error message to user
        const container = document.querySelector('.posts-container') || 
                         document.querySelector('.about-container');
        
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h2>Unable to Load Content</h2>
                    <p>Please check your internet connection and try again.</p>
                    <button onclick="location.reload()" class="retry-btn">
                        Retry
                    </button>
                </div>
            `;
        }
    }

    // Add new post (for future expansion)
    addPost(postData) {
        if (!this.dataLoaded) return false;
        
        try {
            const newPost = {
                id: window.siteData.posts.length + 1,
                date: new Date().toISOString().split('T')[0],
                ...postData
            };
            
            window.siteData.posts.unshift(newPost);
            uiController.renderPosts();
            return true;
        } catch (error) {
            console.error('Failed to add post:', error);
            return false;
        }
    }

    // Get posts by category
    getPostsByCategory(category) {
        if (!this.dataLoaded) return [];
        
        return window.siteData.posts.filter(post => 
            post.categories.includes(category)
        );
    }

    // Get featured posts
    getFeaturedPosts() {
        if (!this.dataLoaded) return [];
        
        return window.siteData.posts.filter(post => post.featured);
    }

    // Search posts
    searchPosts(query) {
        if (!this.dataLoaded) return [];
        
        const searchTerm = query.toLowerCase();
        return window.siteData.posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.fullContent.toLowerCase().includes(searchTerm) ||
            post.categories.some(cat => cat.toLowerCase().includes(searchTerm))
        );
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new AppController();
    app.init();
    
    // Make app available globally for debugging/extension
    window.appController = app;
});

// Handle offline/online status
window.addEventListener('online', () => {
    console.log('Application is online');
    // You could add logic to sync data here
});

window.addEventListener('offline', () => {
    console.log('Application is offline');
    // You could show an offline indicator here
});