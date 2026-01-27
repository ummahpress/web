// Site Configuration
const siteConfig = {
    name: "Ummah Press",
    description: "Rapid News Reporting",
    theme: "light",
    version: "1.0.0"
};

// Team Members Data
const teamMembers = [
    {
        id: 1,
        name: "Ummah Step",
        title: "Founder & Editor-in-Chief",
        bio: "Experienced journalist with over 15 years in the field. Passionate about delivering accurate and timely news to the Muslim community worldwide. Specializes in Middle Eastern affairs and Islamic economics.",
        avatar: "https://ik.imagekit.io/ummahpress/team/ummah-step.jpg",
        social: {
            tiktok: "@UmmahStepOfficial",
            instagram: "@UmmahStep",
            upscrolled: "UmmahStep"
        }
    },
    {
        id: 2,
        name: "Rizky Al Indunisi",
        title: "Senior Reporter & Content Strategist",
        bio: "Award-winning journalist with expertise in Southeast Asian affairs and technology reporting. Fluent in Arabic, English, and Indonesian. Committed to ethical journalism and community engagement.",
        avatar: "https://ik.imagekit.io/ummahpress/team/rizky-al-indunisi.jpg",
        social: {
            tiktok: "@RizkyJournalist",
            instagram: "@RizkyAlIndunisi",
            upscrolled: "RizkyNews"
        }
    }
];

// News Posts Data
const newsPosts = [
    {
        id: 1,
        author: "Ummah Step",
        authorAvatar: "https://ik.imagekit.io/ummahpress/team/ummah-step.jpg",
        date: "2024-01-15",
        title: "Historic Peace Agreement Reached in Regional Summit",
        excerpt: "In a landmark development that could reshape the geopolitical landscape of the Middle East, representatives from several nations have signed a comprehensive peace agreement following months of secret negotiations facilitated by international mediators.",
        fullContent: `
            <p>In a landmark development that could reshape the geopolitical landscape of the Middle East, representatives from several nations have signed a comprehensive peace agreement following months of secret negotiations facilitated by international mediators.</p>
            
            <h3>Key Provisions</h3>
            <p>The agreement, signed today in Doha, Qatar, addresses longstanding territorial disputes, security arrangements, and economic cooperation between the participating nations. Key provisions include:</p>
            
            <ul>
                <li>Mutual recognition of sovereignty and borders</li>
                <li>Establishment of demilitarized zones monitored by UN peacekeepers</li>
                <li>Joint economic development initiatives worth an estimated $50 billion</li>
                <li>Cultural and educational exchange programs to foster mutual understanding</li>
            </ul>
            
            <p>World leaders have praised the agreement as a "historic breakthrough" and a "testament to diplomatic perseverance." The signing ceremony was attended by representatives from over 30 countries, including several heads of state.</p>
            
            <h3>Economic Impact</h3>
            <p>Analysts suggest this agreement could lead to increased stability in the region and open new opportunities for international investment and cooperation.</p>
        `,
        categories: ["Politics", "Diplomacy", "Middle East"],
        featured: true
    },
    {
        id: 2,
        author: "Rizky Al Indunisi",
        authorAvatar: "https://ik.imagekit.io/ummahpress/team/rizky-al-indunisi.jpg",
        date: "2024-01-14",
        title: "Breakthrough in Renewable Energy Technology Announced",
        excerpt: "Scientists at the International Renewable Energy Institute have announced a major breakthrough in solar panel efficiency that could revolutionize the clean energy sector.",
        fullContent: `
            <p>Scientists at the International Renewable Energy Institute have announced a major breakthrough in solar panel efficiency that could revolutionize the clean energy sector.</p>
            
            <h3>Technical Innovation</h3>
            <p>The new photovoltaic technology achieves a record 45% efficiency rate under standard testing conditions, significantly higher than current commercial panels.</p>
            
            <h3>Applications</h3>
            <p>Initial applications are expected in utility-scale solar farms and high-performance electric vehicles, potentially reducing solar electricity costs by up to 60%.</p>
        `,
        categories: ["Technology", "Environment", "Science"],
        featured: true
    },
    {
        id: 3,
        author: "Ummah Step",
        authorAvatar: "https://ik.imagekit.io/ummahpress/team/ummah-step.jpg",
        date: "2024-01-13",
        title: "New Archaeological Discovery Sheds Light on Early Islamic History",
        excerpt: "A team of archaeologists working in the Arabian Peninsula has uncovered what appears to be one of the earliest known Islamic settlements.",
        fullContent: `
            <p>A team of archaeologists working in the Arabian Peninsula has uncovered what appears to be one of the earliest known Islamic settlements, dating back to the first century of Hijra.</p>
            
            <h3>Significant Findings</h3>
            <p>The discovery includes well-preserved residential structures, a mosque foundation, and numerous artifacts that provide valuable insights into early Islamic civilization.</p>
        `,
        categories: ["History", "Culture", "Archaeology"],
        featured: false
    }
];

// Get all unique categories
function getAllCategories() {
    const categories = new Set();
    newsPosts.forEach(post => {
        post.categories.forEach(category => {
            categories.add(category);
        });
    });
    return ['All', ...Array.from(categories).sort()];
}

// Export data
window.siteData = {
    config: siteConfig,
    team: teamMembers,
    posts: newsPosts,
    categories: getAllCategories()
};