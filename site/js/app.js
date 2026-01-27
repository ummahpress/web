// All JavaScript in one file - Simple and straightforward

// DOM Elements
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

// Data - Defined inline for simplicity (you can replace with JSON loading)
const authors = [
    {
        id: 1,
        name: "Ummah Press",
        role: "Editorial Team",
        avatar: "assets/images/avatar.png",
        bio: "The official Ummah Press editorial team dedicated to delivering accurate and timely news to the Muslim community worldwide.",
        social: {
            upscrolled: "#",
            instagram: "#"
        }
    },
    {
        id: 2,
        name: "Ummah Step",
        role: "Founder & Editor-in-Chief",
        avatar: "assets/images/avatar.png",
        bio: "Ummah Step is the visionary behind Ummah Press, with over 10 years of experience in journalism and media. His passion for delivering accurate and timely news to the Muslim community drives the mission of Ummah Press."
    },
    {
        id: 3,
        name: "Rizky Al indunisi",
        role: "Chief Reporter",
        avatar: "assets/images/avatar.png",
        bio: "Rizky Al indunisi brings extensive reporting experience from conflict zones and international events. His dedication to truthful reporting and deep understanding of global affairs makes him an invaluable asset to our team."
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
        content: "Global leaders gather for emergency summit on climate change. The conference, held in Dubai, brings together representatives from over 190 countries to discuss urgent measures to combat the escalating climate crisis. Key topics include carbon emission reduction targets, renewable energy investments, and climate adaptation funding for vulnerable nations.",
        source: "United Nations Climate Change Conference (COP28) official statements and press releases."
    },
    {
        id: 2,
        authorId: 2,
        date: "2023-06-12",
        categories: ["Technology", "Business"],
        content: "New breakthrough in quantum computing announced by researchers at leading tech institute. The development could revolutionize data processing and cryptography. The quantum processor demonstrated the ability to solve complex problems in minutes that would take traditional supercomputers thousands of years. This advancement has significant implications for fields ranging from medicine to artificial intelligence.",
        source: "Nature Journal, Volume 618, Issue 7965, pp. 467-471 (2023)"
    },
    {
        id: 3,
        authorId: 3,
        date: "2023-06-10",
        categories: ["Health", "Science"],
        content: "Major study reveals significant benefits of intermittent fasting for metabolic health. The research, published in the New England Journal of Medicine, followed participants for over a year and found improved insulin sensitivity, reduced inflammation markers, and better cardiovascular health among those practicing time-restricted eating. However, experts caution that the approach may not be suitable for everyone, especially those with certain medical conditions.",
        source: "New England Journal of Medicine, Vol. 388, No. 23, June 8, 2023"
    },
    {
        id: 4,
        authorId: 1,
        date: "2023-06-08",
        categories: ["Education", "Religion"],
        content: "New initiative launched to integrate Islamic studies with modern education curriculum. The program, developed by scholars and educators, aims to provide a holistic educational approach that combines traditional Islamic knowledge with contemporary academic disciplines. Pilot programs are set to begin in several countries next academic year, with plans for expansion based on initial results and feedback from participating communities.",
        source: "International Islamic Education Council annual report and press conference statements."
    },
    {
        id: 5,
        authorId: 2,
        date: "2023-06-05",
        categories: ["Sports", "Entertainment"],
        content: "Historic victory for national team in international championship finals. The underdog team's remarkable performance has captivated the nation, with millions tuning in to watch the final match. The coach's innovative strategy and the players' exceptional teamwork were credited for the unexpected win. Celebrations erupted across the country following the victory, with fans praising the team's dedication and perseverance throughout the tournament.",
        source: "International Sports Federation official match report and post-game interviews."
    }
];

// Helper Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function getAuthorById(id) {
    return authors.find(author => author.id === id) || authors[0];
}

// Render Functions
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
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${author.avatar}" alt="${author.name}" class="post-avatar">
                <div>
                    <div class="post-author">${author.name}</div>
                    <div class="post-date">${formatDate(post.date)}</div>
                </div>
            </div>
            
            <div class="post-categories">
                ${post.categories.map(cat => `<span class="post-category">${cat}</span>`).join('')}
            </div>
            
            <div class="post-content short" id="post-content-${post.id}">
                ${post.content}
            </div>
            
            <div class="post-source">
                <div class="source-label">Source:</div>
                <div class="source-text">${post.source}</div>
            </div>
            
            <button class="read-more-btn" data-post-id="${post.id}">Read More</button>
        `;
        
        postsContainer.appendChild(postElement);
    });
    
    // Add event listeners to "Read More" buttons
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', toggleReadMore);
    });
}

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

// Event Handlers
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

function setActivePage(page) {
    if (page === 'home') {
        homePage.classList.remove('hidden');
        aboutPage.classList.add('hidden');
        pageTitle.textContent = 'Ummah Press: Rapid News Update';
    } else {
        homePage.classList.add('hidden');
        aboutPage.classList.remove('hidden');
        pageTitle.textContent = 'About Us';
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

function setTheme(theme) {
    if (theme === 'light') {
        body.classList.remove('dark');
        body.classList.add('light');
        darkModeBtn.classList.remove('active');
        lightModeBtn.classList.add('active');
        logo.src = 'assets/images/logo-light.png';
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        lightModeBtn.classList.remove('active');
        darkModeBtn.classList.add('active');
        logo.src = 'assets/images/logo-dark.png';
    }
    
    localStorage.setItem('ummahpress-theme', theme);
}

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

// Initialize the app
function initApp() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Set initial theme
    const savedTheme = localStorage.getItem('ummahpress-theme') || 'dark';
    setTheme(savedTheme);
    
    // Set initial user
    currentUserName.textContent = authors[0].name;
    currentUserAvatar.src = authors[0].avatar;
    
    // Render content
    renderCategories();
    renderPosts();
    renderTeamMembers();
    
    // Set active page
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

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);