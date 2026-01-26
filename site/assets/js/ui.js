// UI Manager
const UIManager = {
    init(siteData) {
        this.setupEventListeners();
        this.updateSiteSettings(siteData.settings);
        this.renderCategoryTabs(siteData.settings.categories);
        this.renderTeamMembers(siteData.users);
    },

    setupEventListeners() {
        // Mobile menu
        document.getElementById('mobile-menu-btn').addEventListener('click', () => this.toggleMobileMenu());
        document.getElementById('close-sidebar').addEventListener('click', () => this.closeMobileMenu());
        document.getElementById('overlay').addEventListener('click', () => this.closeMobileMenu());

        // Navigation
        document.getElementById('home-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchPage('home');
        });
        
        document.getElementById('about-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchPage('about');
        });

        // Floating refresh button
        document.getElementById('floating-refresh-btn').addEventListener('click', () => {
            window.location.reload();
        });
    },

    updateSiteSettings(settings) {
        document.getElementById('site-title').textContent = settings.site.title;
        document.getElementById('site-tagline').textContent = settings.site.description;
        document.title = `${settings.site.title} - ${settings.site.tagline}`;
        
        // Update logo if available
        const logoImg = document.getElementById('logo-image');
        if (logoImg && settings.site.logo) {
            logoImg.src = settings.site.logo;
        }

        // Update CSS variables for colors
        document.documentElement.style.setProperty('--primary', settings.site.primaryColor);
        document.documentElement.style.setProperty('--accent', settings.site.primaryColor);
    },

    renderCategoryTabs(categories) {
        const container = document.getElementById('category-tabs');
        if (!container) return;

        container.innerHTML = categories.map(cat => `
            <button class="category-tab ${cat.id === 'all' ? 'active' : ''}" 
                    data-category="${cat.id}">
                ${cat.name}
            </button>
        `).join('');

        // Add click handlers
        container.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                // Update active tab
                container.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filter posts by category
                const category = e.target.dataset.category;
                App.filterPostsByCategory(category);
            });
        });
    },

    renderTeamMembers(users) {
        const aboutPage = document.getElementById('about-page');
        if (!aboutPage) return;

        const teamHTML = users.map(user => `
            <div class="team-card">
                <div class="team-avatar">${user.initials}</div>
                <div class="team-info">
                    <h3 class="team-name">${user.name}</h3>
                    <div class="team-role">${user.role}</div>
                    <p class="team-bio">${user.bio}</p>
                    <div class="team-social">
                        ${user.social.instagram ? `<a href="${user.social.instagram}" class="social-link instagram"><i class="fab fa-instagram"></i></a>` : ''}
                        ${user.social.tiktok ? `<a href="${user.social.tiktok}" class="social-link tiktok"><i class="fab fa-tiktok"></i></a>` : ''}
                        ${user.social.upscrolled ? `<a href="${user.social.upscrolled}" class="social-link upscrolled"><i class="fas fa-arrow-up"></i></a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        aboutPage.innerHTML = `
            <h2 class="page-title"><i class="fas fa-info-circle"></i> About UMMAH Press</h2>
            <div class="about-content">
                <p>Welcome to <strong>UMMAH Press</strong>, your premier source for rapid news updates delivering real-time information as it happens.</p>
                <p>Our mission is to ensure you're always informed with the latest developments across all major categories.</p>
                <div class="features">
                    <h3><i class="fas fa-star"></i> What makes us different:</h3>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> <strong>Rapid Updates:</strong> News delivered in real-time</li>
                        <li><i class="fas fa-check-circle"></i> <strong>Verified Sources:</strong> All news verified by our editorial team</li>
                        <li><i class="fas fa-check-circle"></i> <strong>Author Attribution:</strong> Every update includes the journalist</li>
                    </ul>
                </div>
            </div>
            <div class="team-section">
                <h3><i class="fas fa-users"></i> Our Team</h3>
                <div class="team-grid">${teamHTML}</div>
            </div>
        `;
    },

    renderPosts(posts) {
        const container = document.getElementById('news-updates-container');
        if (!container) return;

        document.getElementById('update-count').textContent = posts.length;

        container.innerHTML = posts.map(post => `
            <div class="news-update ${post.breaking ? 'breaking-news' : ''}">
                ${post.breaking ? '<div class="breaking-label">BREAKING</div>' : ''}
                <div class="update-header">
                    <div class="update-icon">
                        <i class="${post.icon || 'fas fa-newspaper'}"></i>
                    </div>
                    <div class="update-info">
                        <h3>${post.title}</h3>
                        <div class="update-meta">
                            <div class="update-date"><i class="far fa-calendar"></i> ${post.date}</div>
                            <div class="update-author"><i class="fas fa-user-edit"></i> by ${post.author} | UMMAH Press</div>
                        </div>
                    </div>
                </div>
                <div class="update-content">${post.content}</div>
                ${post.tags && post.tags.length > 0 ? `
                    <div class="update-tags">
                        ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('');
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

    switchPage(page) {
        document.getElementById('home-page').style.display = page === 'home' ? 'flex' : 'none';
        document.getElementById('about-page').style.display = page === 'about' ? 'block' : 'none';
        
        // Update active nav
        document.querySelectorAll('.nav-item a').forEach(link => link.classList.remove('active'));
        if (page === 'home') {
            document.getElementById('home-link').classList.add('active');
        } else {
            document.getElementById('about-link').classList.add('active');
        }

        this.closeMobileMenu();
    }
};
