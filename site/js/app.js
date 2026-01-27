// Ummah Press App - Complete JavaScript File
// All functionality in one file

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
// Data Arrays (Replace with your content)
// =============================================

const authors = [
    {
        id: 1,
        name: "Ummah Press",
        role: "Editorial Team",
        avatar: "https://ik.imagekit.io/ummahpress/UMMAH_PRESS__2_-removebg-preview.PNG",
        bio: "The official Ummah Press editorial team dedicated to delivering accurate and timely news to the Muslim community worldwide."
    },
    {
        id: 2,
        name: "Ummah Step",
        role: "Founder & Editor-in-Chief",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        bio: "Ummah Step is the visionary behind Ummah Press, with over 10 years of experience in journalism and media."
    },
    {
        id: 3,
        name: "Rizky Al indunisi",
        role: "Chief Reporter",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        bio: "Rizky Al indunisi brings extensive reporting experience from conflict zones and international events."
    }
];

const categories = [
    "World News", "Politics", "Technology", "Health", "Education", 
    "Business", "Sports", "Entertainment", "Science", "Religion"
];

const posts = [
    {
        id: 1,
        authorId: 1,
        date: "2023-06-15",
        categories: ["World News", "Politics"],
        title: "Global Climate Summit 2023",
        content: "Global leaders gather for emergency summit on climate change. The conference, held in Dubai, brings together representatives from over 190 countries to discuss urgent measures to combat the escalating climate crisis. Key topics include carbon emission reduction targets, renewable energy investments, and climate adaptation funding for vulnerable nations.",
        excerpt: "Global leaders gather for emergency summit on climate change...",
        source: "United Nations Climate Change Conference (COP28) official statements and press releases.",
        takeaway: "The summit marks a crucial turning point in global climate policy, with unprecedented commitments from major economies.",
        media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            caption: "World leaders at the climate summit in Dubai",
            credit: "Photo by United Nations"
        },
        featured: true
    },
    {
        id: 2,
        authorId: 2,
        date: "2023-06-12",
        categories: ["Technology", "Business"],
        title: "Quantum Computing Breakthrough",
        content: "New breakthrough in quantum computing announced by researchers at leading tech institute. The development could revolutionize data processing and cryptography. The quantum processor demonstrated the ability to solve complex problems in minutes that would take traditional supercomputers thousands of years. This advancement has significant implications for fields ranging from medicine to artificial intelligence.",
        excerpt: "New breakthrough in quantum computing announced by researchers...",
        source: "Nature Journal, Volume 618, Issue 7965, pp. 467-471 (2023)",
        takeaway: "Quantum computing has reached a milestone where practical applications in medicine and cryptography are now within reach.",
        media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            caption: "Quantum processor chip",
            credit: "Photo by IBM Research"
        },
        featured: true
    },
    {
        id: 3,
        authorId: 3,
        date: "2023-06-10",
        categories: ["Health", "Science"],
        title: "Intermittent Fasting Study",
        content: "Major study reveals significant benefits of intermittent fasting for metabolic health. The research, published in the New England Journal of Medicine, followed participants for over a year and found improved insulin sensitivity, reduced inflammation markers, and better cardiovascular health among those practicing time-restricted eating. However, experts caution that the approach may not be suitable for everyone, especially those with certain medical conditions.",
        excerpt: "Major study reveals significant benefits of intermittent fasting...",
        source: "New England Journal of Medicine, Vol. 388, No. 23, June 8, 2023",
        takeaway: "Time-restricted eating shows promising results for metabolic health but requires medical supervision for certain individuals.",
        media: {
            type: "video",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            thumbnail: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            caption: "Dr. Sarah Johnson explains the study findings",
            credit: "NEJM Video Brief"
        },
        featured: false
    },
    {
        id: 4,
        authorId: 1,
        date: "2023-06-08",
        categories: ["Education", "Religion"],
        title: "Islamic Education Initiative",
        content: "New initiative launched to integrate Islamic studies with modern education curriculum. The program, developed by scholars and educators, aims to provide a holistic educational approach that combines traditional Islamic knowledge with contemporary academic disciplines. Pilot programs are set to begin in several countries next academic year, with plans for expansion based on initial results and feedback from participating communities.",
        excerpt: "New initiative launched to integrate Islamic studies with modern education...",
        source: "International Islamic Education Council annual report and press conference statements.",
        takeaway: "This program could bridge the gap between traditional Islamic education and modern academic requirements.",
        media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            caption: "Students in a modern Islamic classroom",
            credit: "Photo by Education Initiative"
        },
        featured: true
    },
    {
        id: 5,
        authorId: 2,
        date: "2023-06-05",
        categories: ["Sports", "Entertainment"],
        title: "Historic Sports Victory",
        content: "Historic victory for national team in international championship finals. The underdog team's remarkable performance has captivated the nation, with millions tuning in to watch the final match. The coach's innovative strategy and the players' exceptional teamwork were credited for the unexpected win. Celebrations erupted across the country following the victory, with fans praising the team's dedication and perseverance throughout the tournament.",
        excerpt: "Historic victory for national team in international championship finals...",
        source: "International Sports Federation official match report and post-game interviews.",
        takeaway: "The victory demonstrates the importance of innovative coaching and team unity in achieving unexpected success.",
        media: {
            type: "video",
            url: "https://www.youtube.com/embed/9bZkp7q19f0",
            thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            caption: "Championship final highlights",
            credit: "Sports Network"
        },
        featured: false
    }
];

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
    
    // Add event listeners to "Read More" buttons
    setupReadMoreButtons();
}

function createPostElement(post, author) {
    const postElement = document.createElement('div');
    postElement.className = `post-card ${post.featured ? 'featured' : ''}`;
    
    let mediaHTML = '';
    if (post.media) {
        if (post.media.type === 'image') {
            mediaHTML = `
                <div class="post-media">
                    <img src="${post.media.url}" alt="${post.media.caption}" class="media-image">
                    <div class="media-caption">${post.media.caption}</div>
                    ${post.media.credit ? `<div class="media-credit">📷 ${post.media.credit}</div>` : ''}
                </div>
            `;
        } else if (post.media.type === 'video') {
            mediaHTML = `
                <div class="post-media">
                    <div class="video-container">
                        <iframe src="${post.media.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="media-caption">${post.media.caption}</div>
                    ${post.media.credit ? `<div class="media-credit">🎥 ${post.media.credit}</div>` : ''}
                </div>
            `;
        }
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
    
    // Update active category
    document.querySelectorAll('.category').forEach(cat => {
        cat.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Render filtered posts
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
    
    // Update navigation links
    navLinks.forEach(link => {
        if (link.dataset.page === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Close sidebar
    closeSidebar();
    
    // Reset scroll position
    window.scrollTo(0, 0);
}

// =============================================
// Categories Rendering
// =============================================

function renderCategories() {
    categoriesContainer.innerHTML = '';
    
    // Add "All" category
    const allCategory = document.createElement('div');
    allCategory.className = 'category active';
    allCategory.textContent = 'All';
    allCategory.dataset.category = 'all';
    allCategory.addEventListener('click', filterPostsByCategory);
    categoriesContainer.appendChild(allCategory);
    
    // Add other categories
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
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Set initial theme
    const savedTheme = localStorage.getItem('ummahpress-theme') || 'dark';
    setTheme(savedTheme);
    
    // Set initial user
    currentUserName.textContent = authors[0].name;
    currentUserAvatar.src = authors[0].avatar;
    
    // Set initial page
    setActivePage('home');
    
    // Add event listeners
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
    
    // Escape key to close sidebar
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
