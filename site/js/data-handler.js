// Synchronous data getter (for immediate rendering)
getDataSync(type) {
    if (this.cache[type]) {
        return this.cache[type];
    }
    
    // Try to return default data immediately
    return this.getDefaultData(type);
},

// Initialize all data with fallback
async init() {
    try {
        // Load all data in parallel
        await Promise.all([
            this.loadData('posts'),
            this.loadData('categories'),
            this.loadData('authors')
        ]);
        console.log('All data loaded successfully');
        return true;
    } catch (error) {
        console.log('Using default data:', error);
        // Load default data into cache
        this.cache.posts = this.getDefaultData('posts');
        this.cache.categories = this.getDefaultData('categories');
        this.cache.authors = this.getDefaultData('authors');
        return true; // Still return true, we have default data
    }
},