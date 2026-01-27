const DataManager = {
    async loadData(file) {
        try {
            const response = await fetch(`data/${file}`);
            return await response.json();
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
            return this.getDefaultData(file);
        }
    },

    getDefaultData(file) {
        const defaults = {
            'settings.json': {
                site: {
                    title: "UMMAH Network",
                    tagline: "Rapid News Updates",
                    description: "Real-time news as it happens. Stay informed with UMMAH Network.",
                    primaryColor: "#FF6600"
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
            },
            'users.json': {
                team: [
                    {
                        id: 1,
                        name: "Ummah Step",
                        role: "Senior Editor & Founder",
                        image: "https://via.placeholder.com/300x300/FF6600/FFFFFF?text=Ummah+Step",
                        bio: "Award-winning journalist with over 15 years of experience in investigative reporting and breaking news coverage.",
                        social: {
                            instagram: "#",
                            tiktok: "#",
                            upscrolled: "#"
                        }
                    },
                    {
                        id: 2,
                        name: "Rizky Al Indunisi",
                        role: "Tech Correspondent & Co-Founder",
                        image: "https://via.placeholder.com/300x300/FF6600/FFFFFF?text=Rizky+Al+Indunisi",
                        bio: "Technology expert specializing in AI, cybersecurity, and emerging tech trends with 10+ years in tech journalism.",
                        social: {
                            instagram: "#",
                            tiktok: "#",
                            upscrolled: "#"
                        }
                    }
                ]
            },
            'posts.json': {
                posts: [
                    {
                        id: 1,
                        title: "Global Climate Summit Reaches Historic Agreement",
                        content: "World leaders have finalized a landmark climate agreement after intensive negotiations. The deal includes binding commitments from all major economies to reduce carbon emissions by 45% by 2030. This agreement comes after months of difficult negotiations and represents a major breakthrough in international climate policy. Experts are calling this the most significant climate agreement since the Paris Accord. The implementation will begin next year with regular progress reviews every six months. The agreement also includes provisions for developing countries to receive financial support for their transition to clean energy.",
                        time: "5 min ago",
                        categories: ["breaking", "politics", "environment"],
                        icon: "fas fa-globe-americas",
                        author: "Sarah Chen",
                        tags: ["Climate", "Politics", "Global"],
                        breaking: true
                    },
                    {
                        id: 2,
                        title: "Tech Giant Unveils Revolutionary AI Assistant",
                        content: "A major technology company has announced a breakthrough AI assistant capable of understanding context and nuance with unprecedented accuracy. Early demonstrations show it can handle complex multi-step tasks that previously required human intervention. The new AI system uses advanced neural networks and natural language processing to understand user intent and provide relevant responses. It can assist with tasks ranging from scheduling appointments to complex data analysis. The company plans to release the assistant to the public next quarter. Early testers have reported impressive results, with the AI able to handle nuanced conversations and complex problem-solving tasks.",
                        time: "22 min ago",
                        categories: ["tech", "innovation", "business"],
                        icon: "fas fa-robot",
                        author: "Marcus Johnson",
                        tags: ["AI", "Technology", "Innovation"]
                    },
                    {
                        id: 3,
                        title: "Stock Markets Surge to Record Highs",
                        content: "Global markets have reached all-time highs following positive economic indicators and strong corporate earnings. The tech sector led gains with an average increase of 4.2% across major indices. Analysts attribute the surge to strong quarterly earnings reports and optimistic economic forecasts. The Dow Jones Industrial Average closed at a record high, while the S&P 500 and NASDAQ also posted significant gains. Market sentiment remains positive despite ongoing concerns about inflation and interest rates. Traders are optimistic about the upcoming earnings season and economic recovery.",
                        time: "35 min ago",
                        categories: ["business", "finance"],
                        icon: "fas fa-chart-line",
                        author: "David Park",
                        tags: ["Markets", "Economy", "Finance"]
                    }
                ]
            }
        };
        return defaults[file] || {};
    },

    async getAllData() {
        const [settings, users, posts] = await Promise.all([
            this.loadData('settings.json'),
            this.loadData('users.json'),
            this.loadData('posts.json')
        ]);

        return {
            settings,
            users,
            posts
        };
    }
};