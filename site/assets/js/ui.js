// UI Controller
class UIController {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        this.currentPage = 'home';
        this.expandedPosts = new Set();
    }

    // Initialize UI
    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.updateSidebarState();
        this.updateTime();
        this.setupPageNavigation();
        this.renderTeamMembers();
        this.renderPosts();
        
        // Update time every minute
        setInterval(() => this.updateTime(), 60000);
    }

    // Setup event listeners
    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // Menu toggle
        document.getElementById('menuToggle').addEventListener('click', () => this.toggleSidebar());
        document.getElementById('mobileMenuToggle').addEventListener('click', () => this.toggleMobileMenu());
        
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.switchPage(page);
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const mobileToggle = document.getElementById('mobileMenuToggle');
            
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Toggle theme
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
        
        // Update button text
        const themeBtn = document.getElementById('themeToggle');
        const icon = themeBtn.querySelector('i');
        const text = themeBtn.querySelector('.nav-text');
        
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
    }

    // Apply current theme
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    // Toggle sidebar
    toggleSidebar() {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        localStorage.setItem('sidebarCollapsed', this.sidebarCollapsed);
        this.updateSidebarState();
    }

    // Toggle mobile menu
    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    }

    // Update sidebar state
    updateSidebarState() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (this.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('collapsed');
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
        } else if (page === 'about') {
            pageTitle.textContent = 'About Our Team';
        }
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('active');
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
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const timeString = now.toLocaleDateString('en-US', options);
        document.getElementById('currentTime').textContent = timeString;
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
                     onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${this.currentTheme === 'dark' ? '4ECDC4' : '2D9596'}&color=fff&size=150'">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-title">${member.title}</p>
                <div class="member-bio">${member.bio}</div>
                <div class="member-contact">
                    <p><strong>Contact:</strong> ${member.social.email}</p>
                    <p><strong>Twitter:</strong> ${member.social.twitter}</p>
                </div>
            </div>
        `).join('');
    }

    // Render posts
    renderPosts() {
        const container = document.querySelector('.posts-container');
        if (!container) return;
        
        const posts = window.siteData?.posts || [];
        
        container.innerHTML = posts.map(post => {
            const isExpanded = this.expandedPosts.has(post.id);
            const excerptClass = isExpanded ? 'expanded' : 'collapsed';
            const buttonText = isExpanded ? 'Read less' : 'Read more';
            
            return `
                <article class="post-card" data-post-id="${post.id}">
                    <div class="post-header">
                        <img src="${post.authorAvatar}" 
                             alt="${post.author}" 
                             class="author-avatar"
                             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=${this.currentTheme === 'dark' ? '4ECDC4' : '2D9596'}&color=fff&size=48'">
                        <div class="author-info">
                            <div class="author-name">${post.author}</div>
                            <div class="post-date">${this.formatDate(post.date)}</div>
                        </div>
                    </div>
                    
                    <div class="post-content">
                        <h2 class="post-title">${post.title}</h2>
                        <div class="post-excerpt ${excerptClass}">
                            ${isExpanded ? post.fullContent : post.excerpt}
                        </div>
                        <button class="read-more-btn" 
                                onclick="uiController.toggleReadMore(${post.id})">
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
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Initialize UI Controller
const uiController = new UIController();