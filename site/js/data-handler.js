// Data Handler - Manages loading and processing of JSON data
const DataHandler = {
    // Cache loaded data
    cache: {
        posts: null,
        categories: null,
        authors: null
    },
    
    // Load JSON data
    async loadData(type) {
        try {
            const response = await fetch(`data/${type}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${type}`);
            }
            this.cache[type] = await response.json();
            return this.cache[type];
        } catch (error) {
            console.error(`Error loading ${type}:`, error);
            return this.getDefaultData(type);
        }
    },
    
    // Get data from cache or load it
    async getData(type) {
        if (this.cache[type]) {
            return this.cache[type];
        }
        return await this.loadData(type);
    },
    
    // Get default data if loading fails
    getDefaultData(type) {
        const defaults = {
            posts: [],
            categories: [],
            authors: []
        };
        
        // Return default data structure based on type
        switch(type) {
            case 'posts':
                return [
                    {
                        id: 1,
                        authorId: 1,
                        date: new Date().toISOString().split('T')[0],
                        categories: ["World News", "Politics"],
                        title: "Welcome to Ummah Press",
                        content: "Welcome to our new platform for rapid news updates from around the world.",
                        source: "Ummah Press Editorial Team",
                        excerpt: "Welcome to our new platform for rapid news updates...",
                        featured: true,
                        status: "published"
                    }
                ];
            case 'categories':
                return [
                    { id: 1, name: "World News", slug: "world-news", count: 5 },
                    { id: 2, name: "Technology", slug: "technology", count: 3 }
                ];
            case 'authors':
                return [
                    {
                        id: 1,
                        name: "Ummah Press",
                        role: "Editorial Team",
                        avatar: "assets/images/avatar-default.png",
                        bio: "The official Ummah Press editorial team",
                        social: {
                            twitter: "#",
                            instagram: "#"
                        }
                    }
                ];
            default:
                return defaults[type] || [];
        }
    },
    
    // Get post by ID
    async getPostById(id) {
        const posts = await this.getData('posts');
        return posts.find(post => post.id === id);
    },
    
    // Get posts by category
    async getPostsByCategory(categorySlug) {
        const posts = await this.getData('posts');
        if (categorySlug === 'all') return posts;
        
        return posts.filter(post => 
            post.categories.some(cat => 
                typeof cat === 'string' 
                    ? cat.toLowerCase().includes(categorySlug.toLowerCase())
                    : false
            )
        );
    },
    
    // Get author by ID
    async getAuthorById(id) {
        const authors = await this.getData('authors');
        return authors.find(author => author.id === id) || authors[0];
    },
    
    // Get all categories with post counts
    async getCategoriesWithCounts() {
        const categories = await this.getData('categories');
        const posts = await this.getData('posts');
        
        return categories.map(category => {
            const count = posts.filter(post => 
                post.categories.some(cat => 
                    typeof cat === 'string' 
                        ? cat.toLowerCase().includes(category.slug.toLowerCase())
                        : false
                )
            ).length;
            
            return {
                ...category,
                count
            };
        });
    },
    
    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    },
    
    // Get recent posts
    async getRecentPosts(limit = 5) {
        const posts = await this.getData('posts');
        return posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    },
    
    // Get featured posts
    async getFeaturedPosts() {
        const posts = await this.getData('posts');
        return posts.filter(post => post.featured);
    },
    
    // Initialize all data
    async init() {
        try {
            await Promise.all([
                this.loadData('posts'),
                this.loadData('categories'),
                this.loadData('authors')
            ]);
            console.log('All data loaded successfully');
            return true;
        } catch (error) {
            console.error('Failed to initialize data:', error);
            return false;
        }
    }
},
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
};
