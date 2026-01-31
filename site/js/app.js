// Ummah Press App - Fixed Version with Better Translation System

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const navLinks = document.querySelectorAll('.nav-link');
const homePage = document.getElementById('homePage');
const aboutPage = document.getElementById('aboutPage');
const pageTitle = document.getElementById('pageTitle');
const categoriesContainer = document.getElementById('categoriesContainer');
const postsContainer = document.getElementById('postsContainer');
const teamMembersContainer = document.getElementById('teamMembers');
const currentYear = document.getElementById('currentYear');

// Data variables
let authors = [];
let posts = [];
let translations = {};

// Categories (fixed list)
const categories = [
    "World News", "Politics", "Technology", "Health", "Education", 
    "Business", "Sports", "Entertainment", "Science", "Religion"
];

// Available languages
const languages = {
    'en': { name: 'English', code: 'en', dir: 'ltr' },
    'ar': { name: 'العربية', code: 'ar', dir: 'rtl' },
    'ur': { name: 'اردو', code: 'ur', dir: 'rtl' },
    'fr': { name: 'Français', code: 'fr', dir: 'ltr' },
    'es': { name: 'Español', code: 'es', dir: 'ltr' },
    'id': { name: 'Bahasa Indonesia', code: 'id', dir: 'ltr' }
};

let currentLanguage = localStorage.getItem('ummahpress-language') || 'en';

// =============================================
// Mobile Menu Functions (FIXED)
// =============================================

function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function setupMobileMenu() {
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openSidebar);
        console.log('✅ Mobile menu toggle button initialized');
    }
    
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
            const popup = document.querySelector('.language-popup');
            if (popup) popup.remove();
        }
    });
}

// =============================================
// Data Loading Functions (FIXED)
// =============================================

async function loadData() {
    try {
        console.log('🚀 Loading data...');
        
        // Load authors
        const authorsResponse = await fetch('data/authors.json');
        authors = await authorsResponse.json();
        console.log('✅ Authors loaded:', authors.length);
        
        // Load posts from folder structure
        posts = await loadPosts();
        console.log('✅ Posts loaded:', posts.length);
        
        // Load translations using NEW structure
        translations = await loadTranslations();
        console.log('✅ Translations loaded');
        
        return true;
    } catch (error) {
        console.error('❌ Error loading data:', error);
        // Show error message to user
        postsContainer.innerHTML = `
            <div class="post-card" style="text-align: center; padding: 40px;">
                <h3>Error Loading Content</h3>
                <p>Please check your internet connection and try again.</p>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: var(--accent); border: none; border-radius: 5px; color: white; cursor: pointer;">
                    Reload Page
                </button>
            </div>
        `;
        return false;
    }
}

async function loadPosts() {
    try {
        // Load posts index
        const indexResponse = await fetch('data/posts-index.json');
        const postFiles = await indexResponse.json();
        
        // Load each post file
        const postPromises = postFiles.map(async (postFile) => {
            const response = await fetch(`data/posts/${postFile}`);
            if (!response.ok) {
                console.warn(`⚠️ Could not load ${postFile}`);
                return null;
            }
            return await response.json();
        });
        
        const loadedPosts = await Promise.all(postPromises);
        
        // Filter out null posts and sort by date (newest first)
        return loadedPosts
            .filter(post => post !== null)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error('Error loading posts:', error);
        return [];
    }
}

// =============================================
// NEW: Improved Translation System
// =============================================

async function loadTranslations() {
    try {
        // Load the main translations index
        const response = await fetch('data/translations/translations-index.json');
        const translationFiles = await response.json();
        
        const allTranslations = {};
        
        // Load each translation file
        const translationPromises = translationFiles.map(async (file) => {
            const fileResponse = await fetch(`data/translations/${file}`);
            if (!fileResponse.ok) {
                console.warn(`⚠️ Could not load translation file: ${file}`);
                return null;
            }
            return await fileResponse.json();
        });
        
        const loadedTranslations = await Promise.all(translationPromises);
        
        // Combine all translations into one object
        loadedTranslations.forEach(translation => {
            if (translation) {
                Object.assign(allTranslations, translation);
            }
        });
        
        return allTranslations;
    } catch (error) {
        console.error('Error loading translations:', error);
        return {};
    }
}

// =============================================
// Post Rendering Functions
// =============================================

function renderPosts(categorySlug = 'all') {
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="post-card" style="text-align: center; padding: 40px;">
                <h3>No posts yet</h3>
                <p>Check back soon for news updates!</p>
            </div>
        `;
        return;
    }
    
    const filteredPosts = categorySlug === 'all' 
        ? posts 
        : posts.filter(post => post.categories.includes(categorySlug));
    
    if (filteredPosts.length === 0) {
        postsContainer.innerHTML = `
            <div class="post-card" style="text-align: center; padding: 40px;">
                <h3>No posts found for this category</h3>
                <p>Try selecting a different category</p>
            </div>
        `;
        return;
    }
    
    filteredPosts.forEach(post => {
        const author = getAuthorById(post.authorId);
        const postElement = createPostElement(post, author);
        postsContainer.appendChild(postElement);
    });
    
    // Setup event listeners for read more buttons and media
    setTimeout(() => {
        setupPostInteractions();
    }, 100);
}

function createPostElement(post, author) {
    const postElement = document.createElement('div');
    postElement.className = `post-card ${post.featured ? 'featured' : ''}`;
    
    // Get translation for current language or use English as fallback
    const translation = translations[post.id]?.[currentLanguage] || {};
    
    postElement.innerHTML = `
        <div class="post-header">
            <img src="${author.avatar}" alt="${author.name}" class="post-avatar">
            <div>
                <div class="post-author">${author.name}</div>
                <div class="post-role">${author.role}</div>
                <div class="post-date">${formatDate(post.date)}</div>
            </div>
        </div>
        
        <div class="post-categories">
            ${post.featured ? '<span class="featured-badge">Featured</span>' : ''}
            ${post.categories.map(cat => `<span class="post-category">${cat}</span>`).join('')}
        </div>
        
        ${post.title ? `<h3 class="post-title">${translation.title || post.title}</h3>` : ''}
        
        <div class="post-content short" id="post-content-${post.id}" data-post-id="${post.id}">
            ${translation.content || post.content}
        </div>
        
        ${post.takeaway ? `
        <div class="post-takeaway">
            <div class="takeaway-label">Key Takeaway:</div>
            <div class="takeaway-text">${translation.takeaway || post.takeaway}</div>
        </div>
        ` : ''}
        
        ${post.media ? `
        <div class="post-media-link" data-media-id="${post.id}">
            <div class="media-thumbnail-container">
                <img src="${post.media.url}" alt="${post.media.caption}" class="media-thumbnail">
                ${post.media.type === 'video' ? '<div class="video-play-icon"><i class="fas fa-play"></i></div>' : ''}
            </div>
            <div class="media-info">
                <span class="media-type">${post.media.type === 'video' ? 'Video' : 'Image'}</span>
                <span class="media-caption-preview">${post.media.caption}</span>
            </div>
        </div>
        ` : ''}
        
        ${post.source ? `
        <div class="post-source">
            <div class="source-label">Source:</div>
            <div class="source-text">${makeSourceClickable(translation.source || post.source)}</div>
        </div>
        ` : ''}
        
        <div class="post-actions">
            <button class="read-more-btn" data-post-id="${post.id}">
                <i class="fas fa-book-reader"></i> Read More
            </button>
            
            ${post.media ? `
            <button class="view-media-btn" data-media-id="${post.id}">
                <i class="fas fa-photo-video"></i> View Media
            </button>
            ` : ''}
        </div>
    `;
    
    // Add translate button
    const translateBtn = createTranslationButton(post.id);
    postElement.appendChild(translateBtn);
    
    // Set text direction based on language
    const dir = languages[currentLanguage]?.dir || 'ltr';
    postElement.style.direction = dir;
    postElement.style.textAlign = dir === 'rtl' ? 'right' : 'left';
    
    return postElement;
}

function setupPostInteractions() {
    // Read More buttons
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.dataset.postId;
            const contentElement = document.getElementById(`post-content-${postId}`);
            
            if (contentElement.classList.contains('short')) {
                contentElement.classList.remove('short');
                this.innerHTML = '<i class="fas fa-book"></i> Read Less';
            } else {
                contentElement.classList.add('short');
                this.innerHTML = '<i class="fas fa-book-reader"></i> Read More';
            }
        });
    });
    
    // Media buttons
    document.querySelectorAll('.view-media-btn, .post-media-link').forEach(element => {
        element.addEventListener('click', function() {
            const postId = this.dataset.mediaId;
            const post = posts.find(p => p.id == postId);
            if (post && post.media) {
                openMediaModal(post.media);
            }
        });
    });
    
    // Auto-hide content that's too long
    document.querySelectorAll('.post-content').forEach(content => {
        const lineHeight = 24; // Approximate line height
        const maxHeight = lineHeight * 4;
        const actualHeight = content.scrollHeight;
        
        if (actualHeight <= maxHeight) {
            content.classList.remove('short');
            const postId = content.id.replace('post-content-', '');
            const readMoreBtn = document.querySelector(`.read-more-btn[data-post-id="${postId}"]`);
            if (readMoreBtn) readMoreBtn.style.display = 'none';
        }
    });
}

// =============================================
// Translation Functions
// =============================================

function createTranslationButton(postId) {
    const btn = document.createElement('button');
    btn.className = 'translate-btn';
    btn.innerHTML = '<i class="fas fa-language"></i>';
    btn.title = 'Translate post';
    btn.dataset.postId = postId;
    btn.addEventListener('click', openLanguagePopup);
    return btn;
}

function openLanguagePopup(e) {
    const postId = e.currentTarget.dataset.postId;
    
    // Remove existing popup if any
    const existingPopup = document.querySelector('.language-popup');
    if (existingPopup) existingPopup.remove();
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'language-popup';
    popup.innerHTML = `
        <div class="language-popup-header">
            <h4>Translate Post</h4>
            <button class="popup-close-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="language-list">
            ${Object.values(languages).map(lang => `
                <div class="language-option ${lang.code === currentLanguage ? 'active' : ''}" 
                     data-lang="${lang.code}" 
                     data-post-id="${postId}">
                    ${lang.name}
                </div>
            `).join('')}
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Add event listeners
    popup.querySelector('.popup-close-btn').addEventListener('click', () => popup.remove());
    popup.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            const postId = e.currentTarget.dataset.postId;
            translatePost(postId, lang);
            popup.remove();
        });
    });
}

function translatePost(postId, languageCode) {
    const post = posts.find(p => p.id == postId);
    if (!post) return;
    
    // Update current language
    currentLanguage = languageCode;
    localStorage.setItem('ummahpress-language', languageCode);
    
    // Get translation data
    const translation = translations[postId]?.[languageCode];
    
    // Find post card elements
    const postCard = document.querySelector(`.translate-btn[data-post-id="${postId}"]`)?.closest('.post-card');
    if (!postCard) return;
    
    // Update content with translation or fallback to original
    const titleElement = postCard.querySelector('.post-title');
    const contentElement = postCard.querySelector('.post-content');
    const takeawayElement = postCard.querySelector('.takeaway-text');
    const sourceElement = postCard.querySelector('.source-text');
    
    if (titleElement) {
        titleElement.textContent = translation?.title || post.title;
    }
    
    if (contentElement) {
        contentElement.innerHTML = translation?.content || post.content;
    }
    
    if (takeawayElement) {
        takeawayElement.textContent = translation?.takeaway || post.takeaway;
    }
    
    if (sourceElement) {
        const source = translation?.source || post.source;
        sourceElement.innerHTML = makeSourceClickable(source);
    }
    
    // Update language direction
    const dir = languages[languageCode]?.dir || 'ltr';
    postCard.style.direction = dir;
    postCard.style.textAlign = dir === 'rtl' ? 'right' : 'left';
}

// =============================================
// Helper Functions
// =============================================

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Recent';
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    } catch (error) {
        return 'Recent';
    }
}

function getAuthorById(id) {
    return authors.find(author => author.id === id) || authors[0];
}

function makeSourceClickable(source) {
    if (!source) return '';
    
    // Split by pipe if multiple sources
    if (source.includes('|')) {
        const sources = source.split('|').map(s => s.trim());
        return sources.map(s => {
            if (s.startsWith('http')) {
                return `<a href="${s}" target="_blank" rel="noopener noreferrer" class="source-link">${s}</a>`;
            }
            return s;
        }).join('<br>');
    }
    
    if (source.startsWith('http')) {
        return `<a href="${source}" target="_blank" rel="noopener noreferrer" class="source-link">${source}</a>`;
    }
    
    return source;
}

// =============================================
// Modal Functions
// =============================================

function openMediaModal(media) {
    let modal = document.getElementById('mediaModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'mediaModal';
        modal.className = 'media-modal';
        modal.innerHTML = `
            <div class="modal-overlay" id="modalOverlay"></div>
            <div class="modal-content">
                <button class="modal-close-btn" id="modalCloseBtn">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-media-container" id="modalMediaContainer"></div>
                <div class="modal-caption" id="modalCaption"></div>
                <div class="modal-credit" id="modalCredit"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        document.getElementById('modalOverlay').addEventListener('click', closeMediaModal);
        document.getElementById('modalCloseBtn').addEventListener('click', closeMediaModal);
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeMediaModal();
            }
        });
    }
    
    const mediaContainer = document.getElementById('modalMediaContainer');
    const captionElement = document.getElementById('modalCaption');
    const creditElement = document.getElementById('modalCredit');
    
    mediaContainer.innerHTML = '';
    captionElement.textContent = '';
    creditElement.textContent = '';
    
    if (media.type === 'image') {
        mediaContainer.innerHTML = `<img src="${media.url}" alt="${media.caption}" class="modal-image">`;
    } else if (media.type === 'video') {
        mediaContainer.innerHTML = `
            <div class="modal-video-container">
                <iframe src="${media.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    }
    
    captionElement.textContent = media.caption;
    if (media.credit) {
        creditElement.textContent = `📷 ${media.credit}`;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMediaModal() {
    const modal = document.getElementById('mediaModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// =============================================
// Page Navigation
// =============================================

function setActivePage(page) {
    if (page === 'home') {
        homePage.classList.remove('hidden');
        aboutPage.classList.add('hidden');
        pageTitle.textContent = 'Ummah Press: Rapid News Update';
        renderCategories();
        renderPosts();
    } else {
        homePage.classList.add('hidden');
        aboutPage.classList.remove('hidden');
        pageTitle.textContent = 'About Us';
        renderTeamMembers();
    }
    
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

function renderCategories() {
    categoriesContainer.innerHTML = '';
    
    const allCategory = document.createElement('div');
    allCategory.className = 'category active';
    allCategory.textContent = 'All';
    allCategory.dataset.category = 'all';
    allCategory.addEventListener('click', filterPostsByCategory);
    categoriesContainer.appendChild(allCategory);
    
    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.textContent = category;
        categoryElement.dataset.category = category;
        categoryElement.addEventListener('click', filterPostsByCategory);
        categoriesContainer.appendChild(categoryElement);
    });
}

function filterPostsByCategory(e) {
    const category = e.target.dataset.category;
    
    document.querySelectorAll('.category').forEach(cat => {
        cat.classList.remove('active');
    });
    e.target.classList.add('active');
    
    renderPosts(category);
}

function renderTeamMembers() {
    teamMembersContainer.innerHTML = '';
    
    authors.forEach(author => {
        const memberElement = document.createElement('div');
        memberElement.className = 'team-member';
        
        let socialHTML = '';
        if (author.social) {
            socialHTML = `
                <div class="member-social">
                    ${author.social.tiktok ? `
                        <a href="${author.social.tiktok}" target="_blank" class="member-social-icon" title="TikTok">
                            <i class="fab fa-tiktok"></i>
                        </a>
                    ` : ''}
                    
                    ${author.social.instagram ? `
                        <a href="${author.social.instagram}" target="_blank" class="member-social-icon" title="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                    ` : ''}
                    
                    ${author.social.upscrolled ? `
                        <a href="${author.social.upscrolled}" target="_blank" class="member-social-icon" title="Upscrolled">
                            <img src="https://ik.imagekit.io/ummahpress/G_pVEEvWYAA8qoX.png" alt="Upscrolled" class="upscrolled-icon-small">
                        </a>
                    ` : ''}
                </div>
            `;
        }
        
        memberElement.innerHTML = `
            <img src="${author.avatar}" alt="${author.name}" class="member-avatar">
            <h3 class="member-name">${author.name}</h3>
            <div class="member-role">${author.role}</div>
            <p class="member-bio">${author.bio}</p>
            ${socialHTML}
        `;
        teamMembersContainer.appendChild(memberElement);
    });
}

// =============================================
// App Initialization
// =============================================

async function initApp() {
    console.log('🔧 Initializing Ummah Press...');
    
    try {
        // Set current year
        currentYear.textContent = new Date().getFullYear();
        
        // Setup mobile menu FIRST
        setupMobileMenu();
        
        // Setup navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.currentTarget.dataset.page;
                setActivePage(page);
            });
        });
        
        // Load data
        await loadData();
        
        // Set initial page
        setActivePage('home');
        
        console.log('✅ Ummah Press initialized successfully!');
    } catch (error) {
        console.error('❌ App initialization error:', error);
        postsContainer.innerHTML = `
            <div class="post-card" style="text-align: center; padding: 40px;">
                <h3>Application Error</h3>
                <p>There was an issue loading the content. Please refresh the page.</p>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: var(--accent); border: none; border-radius: 5px; color: white; cursor: pointer;">
                    Refresh Page
                </button>
            </div>
        `;
    }
}

// Start app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
