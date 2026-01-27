class UIController {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.sidebarOpen = false;
        this.currentPage = 'home';
        this.activeFilter = 'All';
        this.expandedPosts = new Set();
        this.isMobile = window.innerWidth <= 1023;
    }

    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.updateThemeSwitch();
        this.updateTime();
        this.setupPageNavigation();
        this.renderCategories();
        this.renderPosts();
        this.renderTeam();
        
        setInterval(() => this.updateTime(), 60000);
        
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 1023;
        });
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('change', () => this.toggleTheme());
        
        // Menu toggle
        document.getElementById('menuToggle').addEventListener('click', () => this.toggleSidebar());
        document.getElementById('sidebarClose').addEventListener('click', () => this.closeSidebar());
        
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.switchPage(page);
                if (this.isMobile) this.closeSidebar();
            });
        });
        
        // Close sidebar on outside click
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const menuToggle = document.getElementById('menuToggle');
            
            if (this.isMobile && 
                sidebar.classList.contains('active') &&
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                this.closeSidebar();
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
        this.updateThemeSwitch();
    }

    updateThemeSwitch() {
        document.getElementById('themeToggle').checked = this.currentTheme === 'dark';
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
        this.sidebarOpen = !this.sidebarOpen;
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('active');
        this.sidebarOpen = false;
    }

    switchPage(page) {
        if (this.currentPage === page) return;
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });
        
        document.querySelectorAll('.page').forEach(pageEl => {
            pageEl.classList.remove('active');
        });
        
        document.getElementById(`${page}Page`).classList.add('active');
        this.currentPage = page;
    }

    updateTime() {
        const now = new Date();
        const options = { 
            weekday: 'short',
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        document.getElementById('currentTime').textContent = now.toLocaleDateString('en-US', options);
    }

    renderCategories() {
        const container = document.getElementById('categoryScroll');
        if (!container) return;
        
        const categories = window.siteData?.categories || [];
        
        container.innerHTML = categories.map(category => `
            <button class="category-btn ${this.activeFilter === category ? 'active' : ''}" 
                    onclick="uiController.filterPosts('${category}')">
                ${category}
            </button>
        `).join('');
    }

    filterPosts(category) {
        this.activeFilter = category;
        this.renderCategories();
        this.renderPosts();
    }

    renderPosts() {
        const container = document.getElementById('newsFeed');
        if (!container) return;
        
        let posts = window.siteData?.posts || [];
        
        if (this.activeFilter !== 'All') {
            posts = posts.filter(post => 
                post.categories.includes(this.activeFilter)
            );
        }
        
        if (posts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-newspaper"></i>
                    <h3>No Posts Found</h3>
                    <p>Try selecting a different category.</p>
                    <button class="btn-gradient" onclick="uiController.filterPosts('All')">
                        Show All Posts
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = posts.map(post => {
            const isExpanded = this.expandedPosts.has(post.id);
            const excerptClass = isExpanded ? '' : 'collapsed';
            const buttonText = isExpanded ? 'Read less' : 'Read more';
            const buttonIcon = isExpanded ? 'fa-chevron-up' : 'fa-chevron-down';
            
            return `
                <article class="news-card" data-post-id="${post.id}">
                    ${post.featured ? '<div class="featured-badge">Featured</div>' : ''}
                    
                    <div class="news-header">
                        <img src="${post.authorAvatar}" 
                             alt="${post.author}" 
                             class="author-avatar"
                             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=000000&color=fff&size=48'">
                        <div class="author-info">
                            <h3>${post.author}</h3>
                            <div class="post-date">
                                <i class="far fa-calendar"></i>
                                ${this.formatDate(post.date)}
                            </div>
                        </div>
                    </div>
                    
                    <div class="news-content">
                        <h2>${post.title}</h2>
                        <div class="news-excerpt ${excerptClass}">
                            ${isExpanded ? post.fullContent : post.excerpt}
                        </div>
                        <button class="read-more-btn" onclick="uiController.toggleReadMore(${post.id})">
                            <i class="fas ${buttonIcon}"></i>
                            ${buttonText}
                        </button>
                    </div>
                    
                    <div class="news-categories">
                        ${post.categories.map(cat => `
                            <span class="category-tag" onclick="uiController.filterPosts('${cat}')">
                                ${cat}
                            </span>
                        `).join('')}
                    </div>
                </article>
            `;
        }).join('');
    }

    toggleReadMore(postId) {
        if (this.expandedPosts.has(postId)) {
            this.expandedPosts.delete(postId);
        } else {
            this.expandedPosts.add(postId);
        }
        this.renderPosts();
    }

    renderTeam() {
        const container = document.getElementById('teamGrid');
        if (!container) return;
        
        const members = window.siteData?.team || [];
        
        container.innerHTML = members.map(member => `
            <div class="team-member">
                <img src="${member.avatar}" 
                     alt="${member.name}" 
                     class="member-avatar"
                     onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=000000&color=fff&size=120'">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-title">${member.title}</p>
                <div class="member-bio">${member.bio}</div>
                <div class="member-social">
                    <a href="#" class="social-icon" title="TikTok">
                        <i class="fab fa-tiktok"></i>
                    </a>
                    <a href="#" class="social-icon" title="Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="social-icon" title="Upscrolled">
                        <i class="fas fa-arrow-up"></i>
                    </a>
                </div>
            </div>
        `).join('');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

const uiController = new UIController();