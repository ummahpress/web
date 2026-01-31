// Ummah Press App - Simple Working Version

document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 Ummah Press starting...');
    
    // DOM Elements
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const logo = document.getElementById('logo');
    const navLinks = document.querySelectorAll('.nav-link');
    const homePage = document.getElementById('homePage');
    const aboutPage = document.getElementById('aboutPage');
    const pageTitle = document.getElementById('pageTitle');
    const categoriesContainer = document.getElementById('categoriesContainer');
    const postsContainer = document.getElementById('postsContainer');
    const teamMembersContainer = document.getElementById('teamMembers');
    const currentYear = document.getElementById('currentYear');
    
    // Data
    let posts = [];
    let authors = [];
    
    // Current year
    currentYear.textContent = new Date().getFullYear();
    
    // Categories
    const categories = [
        "All", "World News", "Politics", "Technology", "Health", "Education", 
        "Business", "Sports", "Entertainment", "Science", "Religion"
    ];
    
    // =============================================
    // SIDEBAR FUNCTIONS
    // =============================================
    
    function openSidebar() {
        console.log('Opening sidebar');
        if (sidebar) {
            sidebar.classList.add('mobile-open');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('active');
        }
        body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        console.log('Closing sidebar');
        if (sidebar) {
            sidebar.classList.remove('mobile-open');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        body.style.overflow = 'auto';
    }
    
    // Sidebar event listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openSidebar);
    }
    
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // =============================================
    // NAVIGATION FUNCTIONS
    // =============================================
    
    function setActivePage(page) {
        console.log('Setting active page:', page);
        
        if (page === 'home') {
            homePage.classList.remove('hidden');
            aboutPage.classList.add('hidden');
            pageTitle.textContent = 'Ummah Press: Rapid News Update';
            renderCategories();
            loadAndRenderPosts();
        } else {
            homePage.classList.add('hidden');
            aboutPage.classList.remove('hidden');
            pageTitle.textContent = 'About Us';
            renderTeamMembers();
        }
        
        // Update active nav link
        navLinks.forEach(link => {
            if (link.dataset.page === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        closeSidebar();
        window.scrollTo(0, 0);
    }
    
    // Navigation event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            setActivePage(page);
        });
    });
    
    // =============================================
    // DATA LOADING
    // =============================================
    
    async function loadData() {
        try {
            // Try to load authors
            try {
                const authorsResponse = await fetch('data/authors.json');
                if (authorsResponse.ok) {
                    authors = await authorsResponse.json();
                    console.log('✅ Authors loaded:', authors.length);
                }
            } catch (error) {
                console.warn('⚠️ Could not load authors.json, using default');
                authors = getDefaultAuthors();
            }
            
            // Try to load posts
            try {
                const postsResponse = await fetch('data/posts.json');
                if (postsResponse.ok) {
                    posts = await postsResponse.json();
                    console.log('✅ Posts loaded:', posts.length);
                }
            } catch (error) {
                console.warn('⚠️ Could not load posts.json, using default');
                posts = getDefaultPosts();
            }
            
        } catch (error) {
            console.error('❌ Error loading data:', error);
            // Use defaults
            authors = getDefaultAuthors();
            posts = getDefaultPosts();
        }
    }
    
    function getDefaultAuthors() {
        return [
            {
                "id": 1,
                "name": "Ummah Step",
                "role": "Founder & Editor-in-Chief",
                "avatar": "https://ik.imagekit.io/ummahpress/photo_2026-01-27_22-12-46.jpg",
                "bio": "Ummah Step is the visionary behind Ummah Press.",
                "social": {
                    "tiktok": "https://www.tiktok.com/@ummahstep",
                    "instagram": "https://www.instagram.com/ummahstep",
                    "upscrolled": "https://upscrolled.com/@ummahstep"
                }
            }
        ];
    }
    
    function getDefaultPosts() {
        return [
            {
                "id": 1,
                "authorId": 1,
                "date": "2026-01-27",
                "categories": ["Technology"],
                "title": "Welcome to Ummah Press",
                "content": "We're currently setting up our news platform. Posts will appear here soon!",
                "source": "Ummah Press Team",
                "takeaway": "Stay tuned for news updates",
                "featured": true
            },
            {
                "id": 2,
                "authorId": 1,
                "date": "2026-01-27",
                "categories": ["World News"],
                "title": "Test Post: Ummah Press is Live",
                "content": "This is a test post to demonstrate that Ummah Press is working correctly. Soon you'll see real news updates here.",
                "source": "Ummah Press Team",
                "takeaway": "The platform is functional and ready for content",
                "featured": false
            }
        ];
    }
    
    // =============================================
    // POST RENDERING
    // =============================================
    
    async function loadAndRenderPosts() {
        postsContainer.innerHTML = '<div class="loading">Loading posts...</div>';
        await loadData();
        renderPosts();
    }
    
    function renderPosts(filterCategory = 'All') {
        console.log('Rendering posts, filter:', filterCategory);
        
        if (!postsContainer) {
            console.error('postsContainer not found!');
            return;
        }
        
        if (posts.length === 0) {
            postsContainer.innerHTML = `
                <div class="post-card" style="text-align: center; padding: 40px;">
                    <h3>No posts available</h3>
                    <p>Try refreshing the page or check the console for errors.</p>
                </div>
            `;
            return;
        }
        
        // Filter posts if needed
        let postsToShow = posts;
        if (filterCategory !== 'All') {
            postsToShow = posts.filter(post => 
                post.categories && post.categories.includes(filterCategory)
            );
        }
        
        // Sort by date (newest first)
        postsToShow.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Clear container
        postsContainer.innerHTML = '';
        
        // Render each post
        postsToShow.forEach(post => {
            const author = authors.find(a => a.id === post.authorId) || authors[0];
            const postElement = createPostElement(post, author);
            postsContainer.appendChild(postElement);
        });
    }
    
    function createPostElement(post, author) {
        const postElement = document.createElement('div');
        postElement.className = `post-card ${post.featured ? 'featured' : ''}`;
        
        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${author.avatar}" alt="${author.name}" class="post-avatar">
                <div>
                    <div class="post-author">${author.name}</div>
                    <div class="post-role">${author.role}</div>
                    <div class="post-date">${formattedDate}</div>
                </div>
            </div>
            
            <div class="post-categories">
                ${post.featured ? '<span class="featured-badge">Featured</span>' : ''}
                ${post.categories ? post.categories.map(cat => 
                    `<span class="post-category">${cat}</span>`
                ).join('') : ''}
            </div>
            
            <h3 class="post-title">${post.title}</h3>
            
            <div class="post-content">
                ${post.content}
            </div>
            
            ${post.takeaway ? `
            <div class="post-takeaway">
                <div class="takeaway-label">Key Takeaway:</div>
                <div class="takeaway-text">${post.takeaway}</div>
            </div>
            ` : ''}
            
            <div class="post-source">
                <div class="source-label">Source:</div>
                <div class="source-text">${post.source}</div>
            </div>
        `;
        
        return postElement;
    }
    
    // =============================================
    // CATEGORIES
    // =============================================
    
    function renderCategories() {
        if (!categoriesContainer) {
            console.error('categoriesContainer not found!');
            return;
        }
        
        categoriesContainer.innerHTML = '';
        
        categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category';
            if (category === 'All') categoryElement.classList.add('active');
            categoryElement.textContent = category;
            categoryElement.addEventListener('click', function() {
                // Update active category
                document.querySelectorAll('.category').forEach(cat => {
                    cat.classList.remove('active');
                });
                this.classList.add('active');
                
                // Filter posts
                renderPosts(category);
            });
            categoriesContainer.appendChild(categoryElement);
        });
    }
    
    // =============================================
    // TEAM MEMBERS
    // =============================================
    
    function renderTeamMembers() {
        if (!teamMembersContainer) {
            console.error('teamMembersContainer not found!');
            return;
        }
        
        teamMembersContainer.innerHTML = '';
        
        authors.forEach(author => {
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member';
            
            memberElement.innerHTML = `
                <img src="${author.avatar}" alt="${author.name}" class="member-avatar">
                <h3 class="member-name">${author.name}</h3>
                <div class="member-role">${author.role}</div>
                <p class="member-bio">${author.bio}</p>
            `;
            
            teamMembersContainer.appendChild(memberElement);
        });
    }
    
    // =============================================
    // INITIALIZE APP
    // =============================================
    
    function initApp() {
        console.log('🔧 Initializing Ummah Press...');
        
        // Set initial page
        setActivePage('home');
        
        // Close sidebar on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        });
        
        // Logo click goes home
        if (logo) {
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                setActivePage('home');
            });
        }
        
        console.log('✅ Ummah Press initialized!');
    }
    
    // Start the app
    initApp();
});