const UIManager = {
    data: null,
    currentCategory: 'all',

    async init() {
        this.data = await DataManager.getAllData();
        this.setupTheme();
        this.setupEventListeners();
        this.renderCategoryTabs();
        this.renderPosts();
        this.renderAboutPage();
        this.updateLogos();
    },

    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const savedTheme = localStorage.getItem('ummah-theme') || 'dark';
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('ummah-theme', newTheme);
            themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            this.updateLogos();
        });
    },

    updateLogos() {
        const theme = document.documentElement.getAttribute('data-theme');
        const logoDark = "https://ik.imagekit.io/ummahpress/UMMAH_PRESS__1_-removebg-preview.png?updatedAt=1769422692002";
        const logoLight = "https://ik.imagekit.io/ummahpress/UMMAH_PRESS__2_-removebg-preview.PNG";
        
        const headerLogo = document.querySelector('.header-logo');
        const sidebarLogo = document.getElementById('sidebar-logo');
        
        if (theme === 'dark') {
            headerLogo.src = logoDark;
            sidebarLogo.src = logoDark;
        } else {
            headerLogo.src = logoLight;
            sidebarLogo.src = logoLight;
        }
    },

    setupEventListeners() {
        // Mobile menu
        document.getElementById('mobile-menu-btn').addEventListener('click', () => this.toggleMobileMenu());
        document.getElementById('close-sidebar').addEventListener('click', () => this.closeMobileMenu());
        document.getElementById('overlay').addEventListener('click', () => this.closeMobileMenu());

        // Navigation
        document.getElementById('home-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.showPage('home');
        });
        
        document.getElementById('about-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.showPage('about');
        });

        // Refresh button
        document.getElementById('floating-refresh-btn').addEventListener('click', () => {
            this.animateRefreshButton();
            setTimeout(() => this.renderPosts(), 500);
        });

        // New update indicator
        document.getElementById('new-update-indicator').addEventListener('click', () => {
            this.simulateNewUpdate();
        });

        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    },

    renderCategoryTabs() {
        const container = document.getElementById('category-tabs');
        const categories = this.data.settings.categories;
        
        container.innerHTML = categories.map(cat => `
            <button class="category-tab ${cat.id === 'all' ? 'active' : ''}" 
                    data-category="${cat.id}">
                ${cat.name}
            </button>
        `).join('');

        container.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                container.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.renderPosts();
            });
        });
    },

    renderPosts() {
        const container = document.getElementById('news-updates-container');
        let posts = this.data.posts.posts;
        
        if (this.currentCategory !== 'all') {
            posts = posts.filter(post => 
                post.categories && post.categories.includes(this.currentCategory)
            );
        }
        
        document.getElementById('update-count').textContent = posts.length;
        
        container.innerHTML = posts.map(post => {
            const isLong = post.content.length > 200;
            const shortContent = isLong ? post.content.substring(0, 200) + '...' : post.content;
            const isBreaking = post.breaking || (post.categories && post.categories.includes('breaking'));
            
            return `
                <div class="news-update ${isBreaking ? 'breaking-news' : ''}">
                    ${isBreaking ? '<div class="breaking-label">BREAKING</div>' : ''}
                    <div class="update-header">
                        <div class="update-icon">
                            <i class="${post.icon || 'fas fa-newspaper'}"></i>
                        </div>
                        <div class="update-info">
                            <h3>${post.title}</h3>
                            <div class="update-meta">
                                <div class="update-time"><i class="far fa-clock"></i> ${post.time}</div>
                                <div class="update-author"><i class="fas fa-user-edit"></i> by ${post.author}</div>
                            </div>
                        </div>
                    </div>
                    <div class="update-content ${isLong ? 'truncated' : ''}" data-full="${post.content}">
                        ${isLong ? shortContent : post.content}
                    </div>
                    ${isLong ? `
                        <button class="read-more-btn" onclick="UIManager.toggleReadMore(this)">
                            <span>Read more</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    ` : ''}
                    ${post.categories && post.categories.length > 0 ? `
                        <div class="update-categories">
                            ${post.categories.map(cat => `
                                <span class="category-badge">${cat}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                    ${post.tags && post.tags.length > 0 ? `
                        <div class="update-tags">
                            ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    },

    toggleReadMore(button) {
        const content = button.previousElementSibling;
        const isTruncated = content.classList.contains('truncated');
        
        if (isTruncated) {
            content.textContent = content.dataset.full;
            content.classList.remove('truncated');
            button.innerHTML = '<span>Read less</span> <i class="fas fa-chevron-up"></i>';
            button.classList.add('active');
        } else {
            content.textContent = content.dataset.full.substring(0, 200) + '...';
            content.classList.add('truncated');
            button.innerHTML = '<span>Read more</span> <i class="fas fa-chevron-down"></i>';
            button.classList.remove('active');
        }
    },

    renderAboutPage() {
        const aboutPage = document.getElementById('about-page');
        const team = this.data.users.team;
        
        aboutPage.innerHTML = `
            <h2 class="page-title"><i class="fas fa-info-circle"></i> About UMMAH Network</h2>
            <div class="about-content">
                <p>Welcome to <strong>UMMAH Network</strong>, your premier source for rapid news updates delivering real-time information as it happens.</p>
                <p>Our mission is to ensure you're always informed with the latest developments across all major categories.</p>
            </div>
            <div class="team-section">
                <h3><i class="fas fa-users"></i> Our Team</h3>
                <div class="team-grid">
                    ${team.map(member => `
                        <div class="team-card">
                            <img src="${member.image}" alt="${member.name}" class="team-avatar">
                            <h3 class="team-name">${member.name}</h3>
                            <div class="team-role">${member.role}</div>
                            <p class="team-bio">${member.bio}</p>
                            <div class="team-social">
                                ${member.social.instagram ? `<a href="${member.social.instagram}" class="social-link instagram"><i class="fab fa-instagram"></i></a>` : ''}
                                ${member.social.tiktok ? `<a href="${member.social.tiktok}" class="social-link tiktok"><i class="fab fa-tiktok"></i></a>` : ''}
                                ${member.social.upscrolled ? `<a href="${member.social.upscrolled}" class="social-link upscrolled"><i class="fas fa-arrow-up"></i></a>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    animateRefreshButton() {
        const btn = document.getElementById('floating-refresh-btn');
        btn.style.transform = 'rotate(180deg)';
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            btn.style.transform = '';
            btn.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-sync-alt"></i>';
            }, 1000);
        }, 500);
    },

    simulateNewUpdate() {
        const newPost = {
            id: this.data.posts.posts.length + 1,
            title: "Live Update: Breaking News Alert",
            content: "New developments are emerging as the situation continues to evolve. We're tracking this story closely and will provide updates as more information becomes available. Additional details are coming in from multiple sources on the ground. Stay tuned for further developments in this ongoing story.",
            time: "Just now",
            categories: ["breaking"],
            icon: "fas fa-bullhorn",
            author: "UMMAH News Desk",
            tags: ["Live", "Update", "Breaking"]
        };
        
        this.data.posts.posts.unshift(newPost);
        this.renderPosts();
        
        const indicator = document.getElementById('new-update-indicator');
        indicator.style.background = 'linear-gradient(90deg, var(--success), #00AA55)';
        indicator.innerHTML = '<i class="fas fa-check"></i> New update loaded!';
        
        setTimeout(() => {
            indicator.style.background = '';
            indicator.innerHTML = '<i class="fas fa-bell"></i> New updates available. Click to load.';
            indicator.style.display = 'none';
        }, 2000);
    },

    toggleMobileMenu() {
        document.getElementById('sidebar').classList.add('active');
        document.getElementById('overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeMobileMenu() {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
        document.body.style.overflow = '';
    },

    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    },

    showPage(page) {
        document.getElementById('home-page').style.display = 'none';
        document.getElementById('about-page').style.display = 'none';
        
        document.querySelectorAll('.nav-item a').forEach(link => link.classList.remove('active'));
        
        if (page === 'home') {
            document.getElementById('home-page').style.display = 'flex';
            document.getElementById('home-link').classList.add('active');
        } else if (page === 'about') {
            document.getElementById('about-page').style.display = 'block';
            document.getElementById('about-link').classList.add('active');
        }
        
        this.closeMobileMenu();
    }
};