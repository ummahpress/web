// UI Controller
class UIController {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        this.currentPage = 'home';
        this.activeFilter = 'all';
        this.expandedPosts = new Set();
        this.isMobile = window.innerWidth <= 1200;
    }

    // Initialize UI
    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.updateThemeSwitch();
        this.updateSidebarState();
        this.updateTime();
        this.setupPageNavigation();
        this.renderTeamMembers();
        this.renderCategoryFilters();
        this.renderPosts();
        this.setupCategoryFilterNavigation();
        
        // Update time every minute
        setInterval(() => this.updateTime(), 60000);
        
        // Update mobile detection on resize
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 1200;
            this.updateSidebarState();
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Theme toggle switch
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('change', () => this.toggleTheme());
        }
        
        // Menu toggle
        document.getElementById('menuToggle').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSidebar();
        });
        
        // Sidebar close button
        const sidebarClose = document.getElementById('sidebarClose');
        if (sidebarClose) {
            sidebarClose.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeSidebar();
            });
        }
        
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const page = item.dataset.page;
                this.switchPage(page);
                if (this.isMobile) {
                    this.closeSidebar();
                }
            });
        });
        
        // Close sidebar when clicking outside on mobile
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
        
        // Close sidebar with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
            }
        });
    }

    // Setup category filter navigation
    setupCategoryFilterNavigation() {
        const filtersScroll = document.querySelector('.filters-scroll');
        const prevBtn = document.getElementById('filterPrev');
        const nextBtn = document.getElementById('filterNext');
        
        if (!filtersScroll || !prevBtn || !nextBtn) return;
        
        prevBtn.addEventListener('click', () => {
            filtersScroll.scrollBy({ left: -200, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            filtersScroll.scrollBy({ left: 200, behavior: 'smooth' });
        });
        
        // Show/hide navigation buttons based on scroll position
        filtersScroll.addEventListener('scroll', () => {
            const scrollLeft = filtersScroll.scrollLeft;
            const scrollWidth = filtersScroll.scrollWidth;
            const clientWidth = filtersScroll.clientWidth;
            
            prevBtn.style.display = scrollLeft > 0 ? 'flex' : 'none';
            nextBtn.style.display = scrollLeft < (scrollWidth - clientWidth - 10) ? 'flex' : 'none';
        });
        
        // Initial check
        setTimeout(() => {
            filtersScroll.dispatchEvent(new Event('scroll'));
        }, 100);
    }

    // Toggle theme
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
        this.updateThemeSwitch();
    }

    // Update theme switch position
    updateThemeSwitch() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.checked = this.currentTheme === 'dark';
        }
    }

    // Apply current theme
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    // Toggle sidebar
    toggleSidebar() {
        if (this.isMobile) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('active');
        } else {
            this.sidebarCollapsed = !this.sidebarCollapsed;
            localStorage.setItem('sidebarCollapsed', this.sidebarCollapsed);
            this.updateSidebarState();
        }
    }

    // Close sidebar (mobile only)
    closeSidebar() {
        if (this.isMobile) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('active');
        }
    }

    // Update sidebar state
    updateSidebarState() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (this.isMobile) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('active');
        } else {
            if (this.sidebarCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('collapsed');
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('collapsed');
            }
        }
    }

    // Switch between pages
    switchPage(page) {
        if (this.currentPage === page) return;
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.dataset.page === page) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update page content
        document.querySelectorAll('.page').forEach(pageElement => {
            pageElement.classList.remove('active');
        });
        
        document.getElementById(`${page}Page`).classList.add('active');
        
        // Update page title
        const pageTitle = document.querySelector('.page-title');
        if (page === 'home') {
            pageTitle.textContent = 'Ummah Press';
            document.querySelector('.tagline').style.display = 'block';
        } else if (page === 'about') {
            pageTitle.textContent = 'About Our Team';
            document.querySelector('.tagline').style.display = 'none';
        }
        
        this.currentPage = page;
    }

    // Setup page navigation
    setupPageNavigation() {
        // Default to home page
        this.switchPage('home');
    }

    // Update current time
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
        const timeString = now.toLocaleDateString('en-US', options);
        document.getElementById('currentTime').textContent = timeString;
    }

    // Render category filters
    renderCategoryFilters() {
        const container = document.querySelector('.filters-scroll');
        if (!container) return;
        
        const categories = window.siteData?.categories || [];
        
        container.innerHTML = `
            <button class="filter-btn ${this.activeFilter === 'all' ? 'active' : ''}" 
                    data-filter="all" onclick="uiController.filterPosts('all')">
                <i class="fas fa-globe"></i> All News
            </button>
            ${categories.map(category => `
                <button class="filter-btn ${this.activeFilter === category ? 'active' : ''}" 
                        data-filter="${category}" onclick="uiController.filterPosts('${category}')">
                    <i class="fas fa-hashtag"></i> ${category}
                </button>
            `).join('')}
        `;
        
        // Re-setup navigation after rendering
        setTimeout(() => this.setupCategoryFilterNavigation(), 100);
    }

    // Filter posts by category
    filterPosts(category) {
        this.activeFilter = category;
        this.renderCategoryFilters();
        this.renderPosts();
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            }
        });
    }

    // Render team members
    renderTeamMembers() {
        const container = document.querySelector('.team-members');
        if (!container) return;
        
        const members = window.siteData?.team || [];
        
        container.innerHTML = members.map(member => `
            <div class="team-member">
                <img src="${member.avatar}" 
                     alt="${member.name}" 
                     class="member-avatar"
                     onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=FF6B35&color=fff&size=120'">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-title">${member.title}</p>
                <div class="member-bio">${member.bio}</div>
                <div class="member-social">
                    <a href="https://tiktok.com/${member.social.tiktok.replace('@', '')}" 
                       target="_blank" 
                       class="social-link tiktok"
                       title="TikTok">
                        <i class="fab fa-tiktok"></i>
                    </a>
                    <a href="https://instagram.com/${member.social.instagram.replace('@', '')}" 
                       target="_blank" 
                       class="social-link instagram"
                       title="Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" 
                       class="social-link upscrolled"
                       title="Upscrolled"
                       onclick="alert('Upscrolled profile: ${member.social.upscrolled}')">
                        <i class="fas fa-arrow-up"></i>
                    </a>
                </div>
            </div>
        `).join('');
    }

    // Render posts with filtering
    renderPosts() {
        const container = document.getElementById('postsContainer');
        if (!container) return;
        
        let posts = window.siteData?.posts || [];
        
        // Apply category filter
        if (this.activeFilter !== 'all') {
            posts = posts.filter(post => 
                post.categories.includes(this.activeFilter)
            );
        }
        
        if (posts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-newspaper"></i>
                    <h3>No Posts Found</h3>
                    <p>No news articles match the selected category.</p>
                    <button class="read-more-btn" onclick="uiController.filterPosts('all')">
                        Show All Posts
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = posts.map(post => {
            const isExpanded = this.expandedPosts.has(post.id);
            const excerptClass = isExpanded ? 'expanded' : 'collapsed';
            const buttonText = isExpanded ? 'Read less' : 'Read more';
            const buttonIcon = isExpanded ? 'fa-chevron-up' : 'fa-chevron-down';
            
            return `
                <article class="post-card" data-post-id="${post.id}">
                    <div class="post-header">
                        <img src="${post.authorAvatar}" 
                             alt="${post.author}" 
                             class="author-avatar"
                             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=FF6B35&color=fff&size=50'">
                        <div class="author-info">
                            <div class="author-name">${post.author}</div>
                            <div class="post-date">
                                <i class="far fa-calendar"></i>
                                ${this.formatDate(post.date)}
                            </div>
                        </div>
                    </div>
                    
                    <div class="post-content">
                        <h2 class="post-title">${post.title}</h2>
                        <div class="post-excerpt ${excerptClass}">
                            ${isExpanded ? post.fullContent : post.excerpt}
                        </div>
                        <button class="read-more-btn" 
                                onclick="uiController.toggleReadMore(${post.id})">
                            <i class="fas ${buttonIcon}"></i>
                            ${buttonText}
                        </button>
                    </div>
                    
                    <div class="post-categories">
                        ${post.categories.map(cat => `
                            <span class="category-tag">${cat}</span>
                        `).join('')}
                    </div>
                    
                    ${post.featured ? '<div class="featured-badge">Featured</div>' : ''}
                </article>
            `;
        }).join('');
    }

    // Toggle read more/less
    toggleReadMore(postId) {
        if (this.expandedPosts.has(postId)) {
            this.expandedPosts.delete(postId);
        } else {
            this.expandedPosts.add(postId);
        }
        this.renderPosts();
    }

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
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

// Initialize UI Controller
const uiController = new UIController();