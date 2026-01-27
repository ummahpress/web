// Ummah Press App - Complete JavaScript File
// Clean start with two authors and no posts

// =============================================
// DOM Elements
// =============================================
const body = document.body;
const sidebar = document.getElementById('sidebar');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const darkModeBtn = document.getElementById('darkModeBtn');
const lightModeBtn = document.getElementById('lightModeBtn');
const logo = document.getElementById('logo');
const navLinks = document.querySelectorAll('.nav-link');
const homePage = document.getElementById('homePage');
const aboutPage = document.getElementById('aboutPage');
const pageTitle = document.getElementById('pageTitle');
const categoriesContainer = document.getElementById('categoriesContainer');
const postsContainer = document.getElementById('postsContainer');
const teamMembersContainer = document.getElementById('teamMembers');
const currentYear = document.getElementById('currentYear');
const currentUserName = document.getElementById('currentUserName');
const currentUserAvatar = document.getElementById('currentUserAvatar');

// =============================================
// Data Arrays - CLEAN START
// =============================================

// ONLY TWO AUTHORS
const authors = [
    {
        id: 1,
        name: "Ummah Step",
        role: "Founder & Editor-in-Chief",
        avatar: "https://ik.imagekit.io/ummahpress/UMMAH_PRESS__2_-removebg-preview.PNG",
        bio: "Ummah Step is the visionary behind Ummah Press, with over 10 years of experience in journalism and media. His passion for delivering accurate and timely news to the Muslim community drives the mission of Ummah Press."
    },
    {
        id: 2,
        name: "Rizky Al indunisi",
        role: "Chief Reporter",
        avatar: "https://ik.imagekit.io/ummahpress/UMMAH_PRESS__2_-removebg-preview.PNG",
        bio: "Rizky Al indunisi brings extensive reporting experience from conflict zones and international events. His dedication to truthful reporting and deep understanding of global affairs makes him an invaluable asset to our team."
    }
];

// Categories (you can keep or modify these)
const categories = [
    "World News", "Politics", "Technology", "Health", "Education", 
    "Business", "Sports", "Entertainment", "Science", "Religion"
];

// EMPTY POSTS ARRAY - START FRESH
const posts = [
    {
        id: 1,
        authorId: 1,
        date: "2023-11-15",
        categories: ["Technology", "Business"],
        title: "AI Breakthrough in Medical Diagnosis",
        content: "Researchers have developed an AI system that can detect early signs of diseases with 95% accuracy. The system analyzes medical images and patient data to identify patterns invisible to the human eye.",
        source: "Journal of Medical AI Research, Vol. 12, Issue 4",
        takeaway: "AI could revolutionize early disease detection, potentially saving millions of lives through timely intervention.",
        media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            caption: "AI analyzing medical imagery",
            credit: "Photo by Medical Research Institute",
            thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=50"
        },
        featured: true
    }
];

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

// =============================================
// Post Rendering Functions
// =============================================

function renderPosts(categorySlug = 'all') {
    postsContainer.innerHTML = '';
    
    // Sort posts by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const filteredPosts = categorySlug === 'all' 
        ? sortedPosts 
        : sortedPosts.filter(post => post.categories.includes(categorySlug));
    
    if (filteredPosts.length === 0) {
        postsContainer.innerHTML = `
            <div class="post-card" style="text-align: center;">
                <h3>No posts yet</h3>
                <p>Check back soon for news updates!</p>
                <div style="margin-top: 20px; color: var(--text-secondary);">
                    <p><small>To add posts, edit the <code>js/app.js</code> file</small></p>
                </div>
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
}

function createPostElement(post, author) {
    const postElement = document.createElement('div');
    postElement.className = `post-card ${post.featured ? 'featured' : ''}`;
    
    let mediaHTML = '';
    if (post.media) {
        const thumbnail = post.media.thumbnail || post.media.url;
        const mediaIcon = post.media.type === 'video' ? '▶️' : '🖼️';
        
        mediaHTML = `
            <div class="post-media-link" data-media-id="${post.id}">
                <div class="media-thumbnail-container">
                    <img src="${thumbnail}" alt="${post.media.caption}" class="media-thumbnail">
                    ${post.media.type === 'video' ? '<div class="video-play-icon"><i class="fas fa-play"></i></div>' : ''}
                </div>
                <button class="view-media-btn">
                    <i class="fas fa-external-link-alt"></i> View Media
                </button>
                <div class="media-info">
                    <span class="media-type">${mediaIcon} ${post.media.type.toUpperCase()}</span>
                    <span class="media-caption-preview">${post.media.caption}</span>
                </div>
            </div>
        `;
    }
    
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
        
        <div class="post-content short" id="post-content-${post.id}">
            ${post.content}
        </div>
        
        ${post.takeaway ? `
        <div class="post-takeaway">
            <div class="takeaway-label">Key Takeaway:</div>
            <div class="takeaway-text">${post.takeaway}</div>
        </div>
        ` : ''}
        
        ${mediaHTML}
        
        <div class="post-source">
            <div class="source-label">Source:</div>
            <div class="source-text">${post.source}</div>
        </div>
        
        <button class="read-more-btn" data-post-id="${post.id}">Read More</button>
    `;
    
    if (post.media) {
        const mediaLink = postElement.querySelector('.post-media-link');
        mediaLink.addEventListener('click', () => openMediaModal(post.media));
    }
    
    return postElement;
}

function setupReadMoreButtons() {
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', toggleReadMore);
    });
}

function toggleReadMore(e) {
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
// Theme Management
// =============================================

function setTheme(theme) {
    if (theme === 'light') {
        body.classList.remove('dark');
        body.classList.add('light');
        darkModeBtn.classList.remove('active');
        lightModeBtn.classList.add('active');
        logo.src = 'https://ik.imagekit.io/ummahpress/UMMAH_PRESS__2_-removebg-preview.PNG';
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        lightModeBtn.classList.remove('active');
        darkModeBtn.classList.add('active');
        logo.src = 'https://ik.imagekit.io/ummahpress/UMMAH_PRESS__1_-removebg-preview.png?updatedAt=1769422692002';
    }
    
    localStorage.setItem('ummahpress-theme', theme);
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

function initApp() {
    currentYear.textContent = new Date().getFullYear();
    
    const savedTheme = localStorage.getItem('ummahpress-theme') || 'dark';
    setTheme(savedTheme);
    
    currentUserName.textContent = authors[0].name;
    currentUserAvatar.src = authors[0].avatar;
    
    setActivePage('home');
    
    sidebarCloseBtn.addEventListener('click', closeSidebar);
    mobileMenuToggle.addEventListener('click', openSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    
    darkModeBtn.addEventListener('click', () => setTheme('dark'));
    lightModeBtn.addEventListener('click', () => setTheme('light'));
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.closest('.nav-link').dataset.page;
            setActivePage(page);
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
}

// =============================================
// Start the App
// =============================================

document.addEventListener('DOMContentLoaded', initApp);
