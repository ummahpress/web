// Data Manager
const DataManager = {
    // Load JSON data
    async loadData(fileName) {
        try {
            const response = await fetch(`data/${fileName}?v=${Date.now()}`);
            return await response.json();
        } catch (error) {
            console.error(`Error loading ${fileName}:`, error);
            return null;
        }
    },

    // Get all data
    async getAllData() {
        const [settings, users, posts] = await Promise.all([
            this.loadData('settings.json'),
            this.loadData('users.json'),
            this.loadData('posts.json')
        ]);

        return {
            settings: settings || this.getDefaultSettings(),
            users: users?.team || [],
            posts: posts?.posts || []
        };
    },

    // Default settings fallback
    getDefaultSettings() {
        return {
            site: {
                title: "UMMH Network",
                tagline: "Rapid News Updates",
                description: "Real-time news as it happens. Stay informed with UMMH Network.",
                primaryColor: "#FF6600",
                logo: "assets/images/logo.png"
            },
            categories: [
                {id: "all", name: "All Updates"},
                {id: "breaking", name: "Breaking News"},
                {id: "politics", name: "Politics"},
                {id: "tech", name: "Technology"},
                {id: "business", name: "Business"},
                {id: "sports", name: "Sports"},
                {id: "health", name: "Health"},
                {id: "entertainment", name: "Entertainment"}
            ]
        };
    }
};