/* MARKUP FOR UPLOAD: Upload this to /js/news-loader.js */
/* FUNCTIONALITY: Loads and manages news data from JSON file */

let newsData = [];

async function loadNewsData() {
    try {
        const response = await fetch('data/news.json');
        const data = await response.json();
        newsData = data.updates;
        
        // Render initial news
        renderNewsUpdates();
        
        // Update count
        const updateCount = document.getElementById('update-count');
        if (updateCount) {
            updateCount.textContent = newsData.length;
        }
        
        return newsData;
    } catch (error) {
        console.error('Error loading news data:', error);
        return [];
    }
}

function renderNewsUpdates() {
    const newsUpdatesContainer = document.getElementById('news-updates-container');
    const updateCount = document.getElementById('update-count');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    if (!newsUpdatesContainer) return;
    
    // Clear current updates
    newsUpdatesContainer.innerHTML = '';
    
    // Filter news based on current category
    let filteredNews = newsData;
    if (window.currentCategory && window.currentCategory !== 'all') {
        filteredNews = newsData.filter(item => item.category === window.currentCategory);
    }
    
    // Update count display
    if (updateCount) {
        updateCount.textContent = filteredNews.length;
    }
    
    // Create and append news updates
    filteredNews.forEach(news => {
        const newsElement = createNewsElement(news);
        newsUpdatesContainer.appendChild(newsElement);
    });
    
    // Hide loading indicator
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

function createNewsElement(news) {
    const newsDiv = document.createElement('div');
    newsDiv.className = `news-update ${news.category === 'breaking' ? 'breaking-news' : ''}`;
    
    // Create breaking news label if applicable
    const breakingLabel = news.category === 'breaking' 
        ? '<div class="breaking-label">BREAKING</div>' 
        : '';
    
    // Create tags HTML
    const tagsHtml = news.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');
    
    newsDiv.innerHTML = `
        ${breakingLabel}
        <div class="update-header">
            <div class="update-icon">
                <i class="${news.icon}"></i>
            </div>
            <div class="update-info">
                <h3>${news.title}</h3>
                <div class="update-meta">
                    <div class="update-time"><i class="far fa-clock"></i> ${news.time}</div>
                    <div class="update-author"><i class="fas fa-user-edit"></i> by ${news.author} | UMMH Network</div>
                </div>
            </div>
        </div>
        <div class="update-content">
            ${news.content}
        </div>
        <div class="update-tags">
            ${tagsHtml}
        </div>
    `;
    
    return newsDiv;
}

function loadNewUpdates() {
    // This function simulates loading new updates
    const newUpdate = {
        id: newsData.length + 1,
        title: `Live Update: New Development`,
        content: "New information has just been released. Stay tuned for further updates.",
        time: "Just now",
        category: "breaking",
        icon: "fas fa-megaphone",
        author: "UMMH Network",
        tags: ["Update", "Breaking", "News"]
    };
    
    newsData.unshift(newUpdate);
    renderNewsUpdates();
    
    // Hide indicator
    const newUpdateIndicator = document.getElementById('new-update-indicator');
    if (newUpdateIndicator) {
        newUpdateIndicator.style.display = 'none';
    }
}

// Make functions available globally
window.newsData = newsData;
window.loadNewsData = loadNewsData;
window.renderNewsUpdates = renderNewsUpdates;
window.createNewsElement = createNewsElement;
window.loadNewUpdates = loadNewUpdates;