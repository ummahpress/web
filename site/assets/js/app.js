// Main Application Controller
class AppController {
    constructor() {
        this.dataLoaded = false;
        this.filteredPosts = [];
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
            this.setupServiceWorker();
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
                posts: [],
                categories: []
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
                    // Extract categories from posts
                    window.siteData.categories = this.extractCategories(window.siteData.posts);
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

    // Extract unique categories from posts
    extractCategories(posts) {
        const categories = new Set();
        posts.forEach(post => {
            if (post.categories && Array.isArray(post.categories)) {
                post.categories.forEach(category => {
                    categories.add(category);
                });
            }
        });
        return Array.from(categories).sort();
    }

    // Setup service worker for offline support
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                        console.log('ServiceWorker registration successful');
                    })
                    .catch(err => {
                        console.log('ServiceWorker registration failed: ', err);
                    });
            });
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
                    <button onclick="location.reload()" class="read-more-btn">
                        <i class="fas fa-redo"></i> Retry
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
            
            // Update categories
            window.siteData.categories = this.extractCategories(window.siteData.posts);
            
            uiController.renderCategoryFilters();
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
            post.categories && post.categories.includes(category)
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
            (post.title && post.title.toLowerCase().includes(searchTerm)) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm)) ||
            (post.fullContent && post.fullContent.toLowerCase().includes(searchTerm)) ||
            (post.categories && post.categories.some(cat => cat.toLowerCase().includes(searchTerm)))
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
    // Show online notification
    showNotification('You are back online!', 'success');
});

window.addEventListener('offline', () => {
    console.log('Application is offline');
    // Show offline notification
    showNotification('You are offline. Some features may be limited.', 'warning');
});

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles for notification
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                animation: slideIn 0.3s ease;
            }
            .notification-success {
                background: linear-gradient(135deg, #4CAF50, #2E7D32);
            }
            .notification-warning {
                background: linear-gradient(135deg, #FF9800, #EF6C00);
            }
            .notification-info {
                background: linear-gradient(135deg, #2196F3, #0D47A1);
            }
            .notification button {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                margin-left: 15px;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}