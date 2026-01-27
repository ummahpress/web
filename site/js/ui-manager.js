// UI Manager - Handles all DOM manipulation and UI updates
const UIManager = {
    // DOM Elements
    elements: {
        body: null,
        sidebar: null,
        sidebarCloseBtn: null,
        mobileMenuToggle: null,
        sidebarOverlay: null,
        darkModeBtn: null,
        lightModeBtn: null,
        logo: null,
        navLinks: null,
        homePage: null,
        aboutPage: null,
        pageTitle: null,
        categoriesContainer: null,
        postsContainer: null,
        teamMembersContainer: null,
        loadingSpinner: null,
        mainHeader: null,
        currentUserName: null,
        currentUserAvatar: null
    },
    
    // Current state
    state: {
        currentPage: 'home',
        currentCategory: 'all',
        currentTheme: 'dark',
        isSidebarOpen: false,
        currentUser: null
    },
    
    // Initialize UI
    init() {
        this.cacheElements();
        this.setCurrentYear();
        this.setupEventListeners();
        this.initHeaderScrollEffect();
        
        // Set initial user
        this.setCurrentUser(1); // Default to first user
    },
    
    // Cache DOM elements
    cacheElements() {
        this.elements = {
            body: document.body,
            sidebar: document.getElementById('sidebar'),
            sidebarCloseBtn: document.getElementById('sidebarCloseBtn'),
            mobileMenuToggle: document.getElementById('mobileMenuToggle'),
            sidebarOverlay: document.getElementById('sidebarOverlay'),
            darkModeBtn: document.getElementById('darkModeBtn'),
            lightModeBtn: document.getElementById('lightModeBtn'),
            logo: document.getElementById('logo'),
            navLinks: document.querySelectorAll('.nav-link'),
            homePage: document.getElementById('homePage'),
            aboutPage: document.getElementById('aboutPage'),
            pageTitle: document.getElementById('pageTitle'),
            categoriesContainer: document.getElementById('categoriesContainer'),
            postsContainer: document.getElementById('postsContainer'),
            teamMembersContainer: document.getElementById('teamMembers'),
            loadingSpinner: document.getElementById('loadingSpinner'),
            mainHeader: document.getElementById('mainHeader'),
            currentUserName: document.getElementById('currentUserName'),
            currentUserAvatar: document.getElementById('currentUserAvatar')
        };
    },
    
    // Set current year in footer
    setCurrentYear() {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
    },
    
    // Render categories
    async renderCategories() {
        const categories = await DataHandler.getCategoriesWithCounts();
        this.elements.categoriesContainer.innerHTML = '';
        
        // Add "All" category
        const allCategory = this.createCategoryElement('All', 'all', categories.reduce((sum, cat) => sum + cat.count, 0), true);
        this.elements.categoriesContainer.appendChild(allCategory);
        
        // Add other categories
        categories.forEach(category => {
            const categoryElement = this.createCategoryElement(category.name, category.slug, category.count);
            this.elements.categoriesContainer.appendChild(categoryElement);
        });
    },
    
    // Create category element
    createCategoryElement(name, slug, count, isActive = false) {
        const categoryElement = document.createElement('div');
        categoryElement.className = `category ${isActive ? 'active' : ''}`;
        categoryElement.textContent = `${name} (${count})`;
        categoryElement.dataset.category = slug;
        categoryElement.addEventListener('click', (e) => this.handleCategoryClick(e));
        return categoryElement;
    },
    
    // Render posts
    async renderPosts(categorySlug = 'all') {
        // Show loading spinner
        if (this.elements.loadingSpinner) {
            this.elements.loadingSpinner.style.display = 'flex';
        }
        
        // Update active category
        this.updateActiveCategory(categorySlug);
        
        // Get posts
        const posts = await DataHandler.getPostsByCategory(categorySlug);
        
        // Hide loading spinner
        if (this.elements.loadingSpinner) {
            this.elements.loadingSpinner.style.display = 'none';
        }
        
        // Clear posts container
        this.elements.postsContainer.innerHTML = '';
        
        if (posts.length === 0) {
            this.renderNoPostsMessage();
            return;
        }
        
        // Render each post
        for (const post of posts) {
            const author = await DataHandler.getAuthorById(post.authorId);
            const postElement = this.createPostElement(post, author);
            this.elements.postsContainer.appendChild(postElement);
        }
        
        // Add event listeners to "Read More" buttons
        this.setupReadMoreButtons();
    },
    
    // Create post element
    createPostElement(post, author) {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${author.avatar}" alt="${author.name}" class="post-avatar" 
                     onerror="this.src='assets/images/avatar-default.png'">
                <div>
                    <div class="post-author">${author.name}</div>
                    <div class="post-role">${author.role}</div>
                    <div class="post-date">${DataHandler.formatDate(post.date)}</div>
                </div>
            </div>
            
            <div class="post-categories">
                ${post.categories.map(cat => `<span class="post-category">${cat}</span>`).join('')}
            </div>
            
            ${post.title ? `<h3 class="post-title">${post.title}</h3>` : ''}
            
            <div class="post-content short" id="post-content-${post.id}">
                ${post.content}
            </div>
            
            <div class="post-source">
                <div class="source-label">Source:</div>
                <div class="source-text">${post.source}</div>
            </div>
            
            <button class="read-more-btn" data-post-id="${post.id}">Read More</button>
        `;
        
        return postElement;
    },
    
    // Render no posts message
    renderNoPostsMessage() {
        this.elements.postsContainer.innerHTML = `
            <div class="post-card" style="text-align: center;">
                <h3>No posts found</h3>
                <p>Try selecting a different category or check back later for new updates.</p>
            </div>
        `;
    },
    
    // Render team members
    async renderTeamMembers() {
        const authors = await DataHandler.getData('authors');
        this.elements.teamMembersContainer.innerHTML = '';
        
        authors.forEach(author => {
            const memberElement = this.createTeamMemberElement(author);
            this.elements.teamMembersContainer.appendChild(memberElement);
        });
    },
    
    // Create team member element
    createTeamMemberElement(author) {
        const memberElement = document.createElement('div');
        memberElement.className = 'team-member';
        memberElement.innerHTML = `
            <img src="${author.avatar}" alt="${author.name}" class="member-avatar"
                 onerror="this.src='assets/images/avatar-default.png'">
            <h3 class="member-name">${author.name}</h3>
            <div class="member-role">${author.role}</div>
            <p class="member-bio">${author.bio}</p>
        `;
        return memberElement;
    },
    
    // Setup "Read More" buttons
    setupReadMoreButtons() {
        document.querySelectorAll('.read-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleReadMore(e));
        });
    },
    
    // Toggle read more/less
    toggleReadMore(e) {
        const postId = e.target.dataset.postId;
        const contentElement = document.getElementById(`post-content-${postId}`);
        const btn = e.target;
        
        if (contentElement.classList.contains('short')) {
            contentElement.classList.remove('short');
            btn.textContent = 'Read Less';
        } else {
            contentElement.classList.add('short');
            btn.textContent = 'Read More';
        }
    },
    
    // Handle category click
    handleCategoryClick(e) {
        const category = e.target.dataset.category;
        this.state.currentCategory = category;
        this.renderPosts(category);
    },
    
    // Update active category
    updateActiveCategory(categorySlug) {
        document.querySelectorAll('.category').forEach(cat => {
            cat.classList.remove('active');
            if (cat.dataset.category === categorySlug) {
                cat.classList.add('active');
            }
        });
    },
    
    // Set current page
    setCurrentPage(page) {
        this.state.currentPage = page;
        
        // Update page visibility
        if (page === 'home') {
            this.elements.homePage.classList.remove('hidden');
            this.elements.aboutPage.classList.add('hidden');
            this.elements.pageTitle.textContent = 'Ummah Press: Rapid News Update';
        } else {
            this.elements.homePage.classList.add('hidden');
            this.elements.aboutPage.classList.remove('hidden');
            this.elements.pageTitle.textContent = 'About Us';
        }
        
        // Update navigation links
        this.elements.navLinks.forEach(link => {
            if (link.dataset.page === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Close sidebar
        this.closeSidebar();
        
        // Reset scroll position
        window.scrollTo(0, 0);
    },
    
    // Set current user
    async setCurrentUser(userId) {
        const user = await DataHandler.getAuthorById(userId);
        this.state.currentUser = user;
        
        if (this.elements.currentUserName) {
            this.elements.currentUserName.textContent = user.name;
        }
        
        if (this.elements.currentUserAvatar) {
            this.elements.currentUserAvatar.src = user.avatar;
            this.elements.currentUserAvatar.alt = user.name;
        }
    },
    
    // Set theme
    setTheme(theme) {
        this.state.currentTheme = theme;
        
        if (theme === 'light') {
            this.elements.body.classList.remove('dark');
            this.elements.body.classList.add('light');
            this.elements.darkModeBtn.classList.remove('active');
            this.elements.lightModeBtn.classList.add('active');
            this.elements.logo.src = 'assets/images/logo-light.png';
        } else {
            this.elements.body.classList.remove('light');
            this.elements.body.classList.add('dark');
            this.elements.lightModeBtn.classList.remove('active');
            this.elements.darkModeBtn.classList.add('active');
            this.elements.logo.src = 'assets/images/logo-dark.png';
        }
        
        localStorage.setItem('ummahpress-theme', theme);
    },
    
    // Open sidebar
    openSidebar() {
        this.elements.sidebar.classList.add('mobile-open');
        this.elements.sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.state.isSidebarOpen = true;
    },
    
    // Close sidebar
    closeSidebar() {
        this.elements.sidebar.classList.remove('mobile-open');
        this.elements.sidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.state.isSidebarOpen = false;
    },
    
    // Initialize header scroll effect
    initHeaderScrollEffect() {
        this.handleHeaderScroll();
        window.addEventListener('scroll', () => this.handleHeaderScroll());
    },
    
    // Handle header scroll
    handleHeaderScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollPosition > 10) {
            this.elements.mainHeader.classList.add('scrolled');
        } else {
            this.elements.mainHeader.classList.remove('scrolled');
        }
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Close sidebar button
        this.elements.sidebarCloseBtn.addEventListener('click', () => this.closeSidebar());
        
        // Mobile menu toggle
        this.elements.mobileMenuToggle.addEventListener('click', () => this.openSidebar());
        
        // Overlay click to close sidebar
        this.elements.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
        
        // Theme toggle buttons
        this.elements.darkModeBtn.addEventListener('click', () => this.setTheme('dark'));
        this.elements.lightModeBtn.addEventListener('click', () => this.setTheme('light'));
        
        // Navigation
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.closest('.nav-link').dataset.page;
                this.setCurrentPage(page);
            });
        });
        
        // Escape key to close sidebar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isSidebarOpen) {
                this.closeSidebar();
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    },
    
    // Handle window resize
    handleResize() {
        // Update title responsiveness
        const title = this.elements.pageTitle;
        if (title) {
            title.style.fontSize = '';
            void title.offsetWidth; // Trigger reflow
        }
        
        // Auto-close sidebar on mobile when resizing to desktop
        if (window.innerWidth > 768 && this.state.isSidebarOpen) {
            this.closeSidebar();
        }
    },
    
    // Load all content
    async loadAllContent() {
        await this.renderCategories();
        await this.renderPosts();
        await this.renderTeamMembers();
    }
};