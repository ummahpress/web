// Posts and categories management
let posts = [];
let categories = [];

async function loadPosts() {
    try {
        const response = await fetch('content/posts.json');
        posts = await response.json();
        renderPosts();
    } catch (error) {
        console.error('Error loading posts:', error);
        posts = [];
        renderPosts();
    }
}

async function loadCategories() {
    try {
        const response = await fetch('content/categories.json');
        categories = await response.json();
        renderCategories();
    } catch (error) {
        console.error('Error loading categories:', error);
        categories = [];
        renderCategories();
    }
}

function renderCategories() {
    const categoriesContainer = document.getElementById('categoriesContainer');
    if (!categoriesContainer) return;
    
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
        categoryElement.textContent = category.name;
        categoryElement.dataset.category = category.id;
        categoryElement.addEventListener('click', filterPostsByCategory);
        categoriesContainer.appendChild(categoryElement);
    });
}

function renderPosts(filterCategory = 'all') {
    const postsContainer = document.getElementById('postsContainer');
    if (!postsContainer) return;
    
    postsContainer.innerHTML = '';
    
    // Sort posts by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const filteredPosts = filterCategory === 'all' 
        ? sortedPosts 
        : sortedPosts.filter(post => post.categoryIds && post.categoryIds.includes(filterCategory));
    
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
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
                <div>
                    <div class="post-author">${post.author}</div>
                    <div class="post-date">${formatDate(post.date)}</div>
                </div>
            </div>
            
            <div class="post-categories">
                ${post.categories ? post.categories.map(cat => `<span class="post-category">${cat}</span>`).join('') : ''}
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

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}