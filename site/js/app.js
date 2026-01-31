// Ummah Press App - Complete Fixed Version

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
// Load Data from Files
// =============================================

async function loadData() {
    try {
        console.log('🚀 Starting data loading...');
        
        // 1. Load authors
        try {
            const authorsResponse = await fetch('data/authors.json');
            if (!authorsResponse.ok) throw new Error('Authors file not found');
            authors = await authorsResponse.json();
            console.log('✅ Authors loaded:', authors.length);
        } catch (error) {
            console.error('❌ Error loading authors:', error);
            authors = []; // Default empty
        }
        
        // 2. Try to load from folder structure first
        posts = await loadPostsFromFolder();
        
        // 3. If folder structure fails, try single file
        if (posts.length === 0) {
            console.log('📁 No posts in folder, trying single file...');
            posts = await loadPostsFromSingleFile();
        }
        
        // 4. Load translations
        translations = await loadTranslations();
        
        console.log('✅ Data loading complete');
        console.log('📊 Stats:', {
            authors: authors.length,
            posts: posts.length,
            translations: Object.keys(translations).length
        });
        
        return true;
    } catch (error) {
        console.error('❌ Fatal error loading data:', error);
        // Use default data to keep app running
        posts = getDefaultPosts();
        return true; // Return true so app continues
    }
}

async function loadPostsFromFolder() {
    const posts = [];
    
    try {
        // Try to load an index file first
        const indexResponse = await fetch('data/posts-index.json');
        if (indexResponse.ok) {
            const postFiles = await indexResponse.json();
            
            // Load each post file
            for (const postFile of postFiles) {
                try {
                    const response = await fetch(`data/posts/${postFile}`);
                    if (response.ok) {
                        const post = await response.json();
                        posts.push(post);
                        console.log(`✅ Loaded post: ${postFile}`);
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not load post ${postFile}:`, error);
                }
            }
        }
    } catch (error) {
        console.log('📁 No posts folder structure found');
    }
    
    return posts;
}

async function loadPostsFromSingleFile() {
    try {
        const response = await fetch('data/posts.json');
        if (!response.ok) throw new Error('Posts file not found');
        const posts = await response.json();
        console.log('✅ Loaded posts from single file:', posts.length);
        return posts;
    } catch (error) {
        console.warn('⚠️ No posts.json file found');
        return [];
    }
}

async function loadTranslations() {
    const translations = {};
    
    try {
        // First try folder structure
        for (const post of posts) {
            const postId = post.id;
            
            // Check if translation folder exists
            try {
                const indexResponse = await fetch(`data/translations/post-${postId}/index.json`);
                if (indexResponse.ok) {
                    const langFiles = await indexResponse.json();
                    
                    if (!translations[postId]) translations[postId] = {};
                    
                    for (const langFile of langFiles) {
                        try {
                            const response = await fetch(`data/translations/post-${postId}/${langFile}`);
                            if (response.ok) {
                                const translation = await response.json();
                                translations[postId][langFile.replace('.json', '')] = translation;
                            }
                        } catch (error) {
                            console.warn(`Could not load ${langFile} for post ${postId}`);
                        }
                    }
                }
            } catch (error) {
                // Translation folder doesn't exist, that's okay
            }
        }
        
        // If no translations loaded, try single file
        if (Object.keys(translations).length === 0) {
            try {
                const response = await fetch('data/translations.json');
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                console.log('📁 No translations file found');
            }
        }
    } catch (error) {
        console.warn('⚠️ Error loading translations:', error);
    }
    
    return translations;
}

function getDefaultPosts() {
    console.log('📝 Using default posts');
    return [
        {
            id: 1,
            authorId: 1,
            date: new Date().toISOString().split('T')[0],
            categories: ["Announcement"],
            title: "Welcome to Ummah Press",
            content: "We're currently setting up our news platform. Posts will appear here soon!",
            source: "Ummah Press Team",
            takeaway: "Stay tuned for news updates",
            featured: true
        }
    ];
}

// =============================================
// Modal/Overlay Functions
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
        mediaContainer.innerHTML = `
            <img src="${media.url}" alt="${media.caption}" class="modal-image">
        `;
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
        <div class="language-list" id="languageList-${postId}">
            ${Object.values(languages).map(lang => `
                <div class="language-option ${lang.code === currentLanguage ? 'active' : ''}" 
                     data-lang="${lang.code}" 
                     data-post-id="${postId}">
                    ${lang.name}
                </div>
            `).join('')}
        </div>
    `;
    
    // Position popup at bottom-right corner
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.zIndex = '2000';
    
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
    
    // Close popup when clicking outside
    setTimeout(() => {
        const clickHandler = (event) => {
            if (!popup.contains(event.target) && !e.currentTarget.contains(event.target)) {
                popup.remove();
                document.removeEventListener('click', clickHandler);
            }
        };
        document.addEventListener('click', clickHandler);
    }, 100);
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
    const takeawayElement = postCard.querySelector('.post-takeaway .takeaway-text');
    const sourceElement = postCard.querySelector('.source-text');
    
    if (titleElement) {
        titleElement.textContent = translation?.title || post.title;
    }
    
    if (contentElement) {
        contentElement.innerHTML = translation?.content || post.content;
        // Re-check if we need "Read More" button after translation
        setTimeout(() => checkContentHeight(contentElement), 100);
    }
    
    if (takeawayElement) {
        takeawayElement.textContent = translation?.takeaway || post.takeaway;
    }
    
    if (sourceElement) {
        const source = translation?.source || post.source;
        sourceElement.innerHTML = makeSourceClickable(source);
    }
    
    // Update language direction if needed
    const dir = languages[languageCode]?.dir || 'ltr';
    postCard.style.direction = dir;
    postCard.style.textAlign = dir === 'rtl' ? 'right' : 'left';
}

// =============================================
// Helper Functions
// =============================================

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function getAuthorById(id) {
    return authors.find(author => author.id === id) || authors[0];
}

function makeSourceClickable(source) {
    if (!source) return '';
    
    // Check if source is a URL
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    if (urlPattern.test(source)) {
        return source.replace(urlPattern, url => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="source-link">${url}</a>`;
        });
    }
    
    // Check if source contains a domain without http
    const domainPattern = /\b(www\.[^\s]+|\b[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?)/gi;
    return source.replace(domainPattern, domain => {
        if (!domain.startsWith('http')) {
            return `<a href="http://${domain}" target="_blank" rel="noopener noreferrer" class="source-link">${domain}</a>`;
        }
        return domain;
    });
}

function checkContentHeight(contentElement) {
    const lineHeight = parseInt(getComputedStyle(contentElement).lineHeight) || 24;
    const maxHeight = lineHeight * 4; // 4 lines
    const actualHeight = contentElement.scrollHeight;
    
    const postId = contentElement.id.replace('post-content-', '');
    const readMoreBtn = document.querySelector(`.read-more-btn[data-post-id="${postId}"]`);
    
    if (readMoreBtn) {
        if (actualHeight <= maxHeight) {
            // Content is short, hide read more button
            readMoreBtn.style.display = 'none';
            contentElement.classList.remove('short');
        } else {
            // Content is long, show read more button
            readMoreBtn.style.display = 'flex';
            contentElement.classList.add('short');
        }
    }
}

// =============================================
// Post Rendering Functions
// =============================================

function renderPosts(categorySlug = 'all') {
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="post-card" style="text-align: center;">
                <h3>No posts yet</h3>
                <p>Check back soon for news updates!</p>
            </div>
        `;
        return;
    }
    
    // Sort posts by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const filteredPosts = categorySlug === 'all' 
        ? sortedPosts 
        : sortedPosts.filter(post => post.categories.includes(categorySlug));
    
    if (filteredPosts.length === 0) {
        postsContainer.innerHTML = `
            <div class="post-card" style="text-align: center;">
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
    
    setupReadMoreButtons();
    setupMediaButtons();
    
    // Check content height after rendering
    setTimeout(() => {
        document.querySelectorAll('.post-content').forEach(contentElement => {
            checkContentHeight(contentElement);
        });
    }, 100);
}

function createPostElement(post, author) {
    const postElement = document.createElement('div');
    postElement.className = `post-card ${post.featured ? 'featured' : ''}`;
    
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
        
        ${post.title ? `<h3 class="post-title">${post.title}</h3>` : ''}
        
        <div class="post-content short" id="post-content-${post.id}" data-post-id="${post.id}">
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
            <div class="source-text">${makeSourceClickable(post.source)}</div>
        </div>
        
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
    
    // Add translate button to top right corner
    const translateBtn = createTranslationButton(post.id);
    postElement.appendChild(translateBtn);
    
    return postElement;
}

function setupReadMoreButtons() {
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', toggleReadMore);
    });
}

function setupMediaButtons() {
    document.querySelectorAll('.view-media-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.dataset.mediaId;
            const post = posts.find(p => p.id == postId);
            if (post && post.media) {
                openMediaModal(post.media);
            }
        });
    });
}

function toggleReadMore(e) {
    const btn = e.currentTarget;
    const postId = btn.dataset.postId;
    const contentElement = document.getElementById(`post-content-${postId}`);
    
    if (contentElement.classList.contains('short')) {
        contentElement.classList.remove('short');
        btn.innerHTML = '<i class="fas fa-book"></i> Read Less';
    } else {
        contentElement.classList.add('short');
        btn.innerHTML = '<i class="fas fa-book-reader"></i> Read More';
    }
}

function filterPostsByCategory(e) {
    const category = e.target.dataset.category;
    
    document.querySelectorAll('.category').forEach(cat => {
        cat.classList.remove('active');
    });
    e.target.classList.add('active');
    
    renderPosts(category);
}

// =============================================
// Team Members Rendering
// =============================================

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

// =============================================
// Categories Rendering
// =============================================

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

// =============================================
// Sidebar Management
// =============================================

function openSidebar() {
    sidebar.classList.add('mobile-open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// =============================================
// App Initialization
// =============================================

async function initApp() {
    try {
        console.log('🔧 Initializing Ummah Press...');
        
        // Set current year
        currentYear.textContent = new Date().getFullYear();
        
        // Load data from files
        await loadData();
        
        // Set active page
        setActivePage('home');
        
        // Event listeners for sidebar
        sidebarCloseBtn.addEventListener('click', closeSidebar);
        mobileMenuToggle.addEventListener('click', openSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Event listeners for navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.closest('.nav-link').dataset.page;
                setActivePage(page);
            });
        });
        
        // Escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSidebar();
                const popup = document.querySelector('.language-popup');
                if (popup) popup.remove();
            }
        });
        
        // Apply saved language preference
        if (currentLanguage !== 'en') {
            setTimeout(() => {
                document.querySelectorAll('.post-card').forEach(card => {
                    const postId = card.querySelector('.post-content')?.dataset.postId;
                    if (postId) {
                        translatePost(postId, currentLanguage);
                    }
                });
            }, 500);
        }
        
        console.log('✅ Ummah Press initialized successfully!');
    } catch (error) {
        console.error('❌ App initialization failed:', error);
        // Show error to user
        postsContainer.innerHTML = `
            <div class="post-card" style="text-align: center;">
                <h3>Application Error</h3>
                <p>There was an issue loading the content. Please refresh the page.</p>
                <p><small>Error: ${error.message}</small></p>
            </div>
        `;
    }
}

// Start the app
console.log('📱 Ummah Press starting...');
document.addEventListener('DOMContentLoaded', initApp);
