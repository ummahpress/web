// Main App
const App = {
    async init() {
        // Load all data
        const data = await DataManager.getAllData();
        
        // Store globally for easy access
        window.siteData = data;
        
        // Initialize UI
        UIManager.init(data);
        
        // Render initial posts
        this.renderAllPosts();
        
        // Setup window resize handler
        window.addEventListener('resize', this.handleResize);
    },

    renderAllPosts() {
        UIManager.renderPosts(window.siteData.posts);
    },

    filterPostsByCategory(category) {
        let filteredPosts;
        if (category === 'all') {
            filteredPosts = window.siteData.posts;
        } else {
            filteredPosts = window.siteData.posts.filter(post => post.category === category);
        }
        
        UIManager.renderPosts(filteredPosts);
    },

    handleResize() {
        // Close mobile menu if we resize to desktop
        if (window.innerWidth > 768) {
            document.getElementById('sidebar').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
            document.body.style.overflow = '';
        }
    }
};

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());