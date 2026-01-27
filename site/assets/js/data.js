// Site Configuration
const siteConfig = {
    name: "Ummah Press",
    description: "Rapid News Reporting",
    theme: "light",
    version: "1.0.0",
    social: {
        tiktok: "@ummahpress",
        instagram: "@ummahpress",
        upscrolled: "Ummah Press"
    }
};

// Team Members Data
const teamMembers = [
    {
        id: 1,
        name: "Ummah Step",
        title: "Founder & Editor-in-Chief",
        bio: "Experienced journalist with over 15 years in the field. Passionate about delivering accurate and timely news to the Muslim community worldwide. Specializes in Middle Eastern affairs and Islamic economics. Committed to ethical reporting and community empowerment through informed journalism.",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
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
        bio: "Award-winning journalist with expertise in Southeast Asian affairs and technology reporting. Fluent in Arabic, English, and Indonesian. Committed to ethical journalism and community engagement. Known for in-depth investigative reporting and innovative digital storytelling techniques.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
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
        authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
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
            <p>Analysts suggest this agreement could lead to increased stability in the region and open new opportunities for international investment and cooperation. However, some experts caution that implementation will be crucial and that challenges remain in building lasting trust between the parties.</p>
            
            <p>The next phase will involve the formation of joint committees to oversee the implementation of various aspects of the agreement, with quarterly progress reviews scheduled for the coming year.</p>
        `,
        categories: ["Politics", "Diplomacy", "Middle East", "Peace"],
        featured: true
    },
    {
        id: 2,
        author: "Rizky Al Indunisi",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        date: "2024-01-14",
        title: "Breakthrough in Renewable Energy Technology Announced",
        excerpt: "Scientists at the International Renewable Energy Institute have announced a major breakthrough in solar panel efficiency that could revolutionize the clean energy sector. The new photovoltaic technology achieves a record 45% efficiency rate under standard testing conditions.",
        fullContent: `
            <p>Scientists at the International Renewable Energy Institute have announced a major breakthrough in solar panel efficiency that could revolutionize the clean energy sector. The new photovoltaic technology achieves a record 45% efficiency rate under standard testing conditions.</p>
            
            <h3>Technical Innovation</h3>
            <p>The breakthrough involves a novel approach to multi-junction solar cells that can capture a broader spectrum of sunlight. Traditional silicon-based solar panels typically achieve 15-22% efficiency, while the most advanced commercial panels reach about 24%.</p>
            
            <p>"This is a game-changer for the renewable energy industry," said Dr. Sarah Chen, lead researcher on the project. "Our technology uses advanced nanomaterials to capture more of the solar spectrum, dramatically increasing efficiency while reducing production costs."</p>
            
            <h3>Commercial Applications</h3>
            <p>Initial applications are expected in:</p>
            <ul>
                <li>Space technology and satellites where efficiency is critical</li>
                <li>Utility-scale solar farms requiring maximum energy output</li>
                <li>High-performance electric vehicles with integrated solar charging</li>
                <li>Off-grid power systems in remote and underserved areas</li>
            </ul>
            
            <p>The research team estimates that widespread adoption could reduce the cost of solar electricity by up to 60% and accelerate the transition away from fossil fuels. Several major energy companies have already expressed interest in licensing the technology.</p>
            
            <h3>Environmental Impact</h3>
            <p>Environmental organizations have welcomed the development, noting that it comes at a critical time as nations work to meet their climate commitments under international agreements. The increased efficiency could significantly reduce the land area needed for solar farms, addressing one of the common criticisms of large-scale solar deployment.</p>
            
            <p>The institute plans to publish full technical details in next month's issue of Nature Energy, with pilot production expected to begin by the end of the year.</p>
        `,
        categories: ["Technology", "Environment", "Science", "Energy", "Innovation"],
        featured: true
    },
    {
        id: 3,
        author: "Ummah Step",
        authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        date: "2024-01-13",
        title: "New Archaeological Discovery Sheds Light on Early Islamic History",
        excerpt: "A team of archaeologists working in the Arabian Peninsula has uncovered what appears to be one of the earliest known Islamic settlements, dating back to the first century of Hijra. The discovery includes well-preserved residential structures, a mosque foundation, and numerous artifacts.",
        fullContent: `
            <p>A team of archaeologists working in the Arabian Peninsula has uncovered what appears to be one of the earliest known Islamic settlements, dating back to the first century of Hijra. The discovery includes well-preserved residential structures, a mosque foundation, and numerous artifacts.</p>
            
            <h3>Significant Findings</h3>
            <p>The archaeological site, located in a previously unexplored region, contains:</p>
            <ul>
                <li>Remains of 15 residential buildings arranged around a central courtyard</li>
                <li>Foundation of what appears to be a small mosque oriented toward Mecca</li>
                <li>Pottery fragments with early Arabic inscriptions</li>
                <li>Coins minted during the Umayyad period</li>
                <li>Agricultural implements suggesting settled farming practices</li>
                <li>Water management systems including wells and irrigation channels</li>
            </ul>
            
            <h3>Historical Importance</h3>
            <p>Dr. Aisha Al-Farsi, lead archaeologist on the project, stated: "This discovery provides invaluable insights into daily life during the early Islamic period. The preservation of the site is exceptional, and we believe it will significantly enhance our understanding of the transition from nomadic to settled lifestyles in the region."</p>
            
            <p>Preliminary carbon dating of organic materials found at the site suggests occupation between 650-750 CE. The settlement appears to have been abandoned suddenly, possibly due to changing climate conditions or shifting trade routes.</p>
            
            <h3>Artifacts and Inscriptions</h3>
            <p>Among the most significant finds are pottery fragments with early Kufic script inscriptions, which appear to be verses from the Quran. These represent some of the earliest examples of Quranic inscriptions on pottery ever discovered.</p>
            
            <p>The team also found evidence of advanced metalworking and textile production, suggesting the settlement was economically diverse and technologically sophisticated for its time.</p>
            
            <h3>Future Research</h3>
            <p>The archaeological team plans to continue excavations for at least two more years. They have applied for UNESCO World Heritage status for the site, which would provide additional protection and funding for preservation.</p>
            
            <p>A selection of artifacts will be displayed in a special exhibition at the National Museum next month, allowing the public to view these remarkable discoveries firsthand.</p>
        `,
        categories: ["History", "Culture", "Archaeology", "Religion", "Heritage"],
        featured: false
    },
    {
        id: 4,
        author: "Rizky Al Indunisi",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        date: "2024-01-12",
        title: "Global Economic Forum Announces New Initiatives for Developing Nations",
        excerpt: "The annual Global Economic Forum concluded today with the announcement of several major initiatives aimed at supporting economic development in emerging markets. The centerpiece is a $100 billion investment fund focused on sustainable infrastructure projects.",
        fullContent: `
            <p>The annual Global Economic Forum concluded today with the announcement of several major initiatives aimed at supporting economic development in emerging markets. The centerpiece is a $100 billion investment fund focused on sustainable infrastructure projects.</p>
            
            <h3>Key Initiatives</h3>
            <p>The forum announced three major programs:</p>
            <ol>
                <li><strong>Sustainable Infrastructure Fund:</strong> $100 billion allocated for renewable energy, transportation, and digital infrastructure projects in developing countries</li>
                <li><strong>Digital Literacy Program:</strong> Aimed at training 10 million people in digital skills across Africa and Asia by 2030</li>
                <li><strong>Climate Resilience Initiative:</strong> Funding and technical support for agricultural adaptation in regions most affected by climate change</li>
            </ol>
            
            <h3>Partnership Models</h3>
            <p>The initiatives will be implemented through public-private partnerships, with participating governments, multinational corporations, and international financial institutions. Special emphasis will be placed on projects that:</p>
            <ul>
                <li>Create local employment opportunities with fair wages</li>
                <li>Transfer technology and expertise to build local capacity</li>
                <li>Promote gender equality in the workforce</li>
                <li>Adopt environmentally sustainable practices</li>
                <li>Respect and preserve local cultural heritage</li>
            </ul>
            
            <h3>Implementation Timeline</h3>
            <p>The first projects under the Sustainable Infrastructure Fund are expected to be announced within six months, with initial disbursements beginning in the third quarter of this year. An independent oversight committee will monitor implementation and ensure transparency.</p>
            
            <p>Economic analysts have generally welcomed the announcements, though some have questioned whether the funding levels are sufficient given the scale of needs. Forum organizers have indicated that these initiatives represent a first phase, with additional programs to be developed based on lessons learned.</p>
            
            <h3>Impact Assessment</h3>
            <p>Independent researchers estimate that the Sustainable Infrastructure Fund alone could create up to 5 million new jobs globally and reduce carbon emissions by approximately 2 billion tons over the next decade through renewable energy projects.</p>
            
            <p>The next Global Economic Forum is scheduled for January 2025, where progress on these initiatives will be reviewed and new priorities established.</p>
        `,
        categories: ["Economy", "Development", "Sustainability", "Finance", "Global"],
        featured: true
    },
    {
        id: 5,
        author: "Ummah Step",
        authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        date: "2024-01-11",
        title: "Major Healthcare Initiative Launched Across Muslim Countries",
        excerpt: "A coalition of 15 Muslim-majority nations has launched a comprehensive healthcare initiative aimed at improving medical infrastructure and accessibility across the region. The $75 billion program includes building new hospitals, training healthcare workers, and establishing telemedicine networks.",
        fullContent: `
            <p>A coalition of 15 Muslim-majority nations has launched a comprehensive healthcare initiative aimed at improving medical infrastructure and accessibility across the region. The $75 billion program includes building new hospitals, training healthcare workers, and establishing telemedicine networks.</p>
            
            <h3>Program Components</h3>
            <p>The initiative, dubbed "Health for All Muslims," has three primary components:</p>
            <ul>
                <li>Construction of 50 new tertiary care hospitals across participating countries</li>
                <li>Training program for 100,000 new healthcare professionals over five years</li>
                <li>Digital health infrastructure including telemedicine and electronic health records</li>
            </ul>
            
            <h3>Focus Areas</h3>
            <p>Special attention will be given to:</p>
            <ul>
                <li>Maternal and child healthcare services</li>
                <li>Chronic disease management and prevention</li>
                <li>Mental health services and awareness programs</li>
                <li>Emergency medical services and disaster response</li>
            </ul>
            
            <p>The program is expected to benefit over 300 million people directly and has been praised by international health organizations as a model for regional cooperation in healthcare development.</p>
        `,
        categories: ["Health", "Development", "Muslim World", "Infrastructure"],
        featured: false
    },
    {
        id: 6,
        author: "Rizky Al Indunisi",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        date: "2024-01-10",
        title: "Tech Startups in Muslim World Receive Record Investment",
        excerpt: "Venture capital investment in tech startups across Muslim-majority countries reached a record $8.5 billion in the last quarter, signaling growing confidence in the region's innovation ecosystem. Fintech, edtech, and healthtech sectors led the funding rounds.",
        fullContent: `
            <p>Venture capital investment in tech startups across Muslim-majority countries reached a record $8.5 billion in the last quarter, signaling growing confidence in the region's innovation ecosystem. Fintech, edtech, and healthtech sectors led the funding rounds.</p>
            
            <h3>Regional Leaders</h3>
            <p>The United Arab Emirates, Saudi Arabia, and Indonesia accounted for over 70% of the total investment. Notable funding rounds included:</p>
            <ul>
                <li>$500 million Series D for a UAE-based fintech platform</li>
                <li>$300 million for an Indonesian edtech company</li>
                <li>$250 million for a Saudi Arabian healthtech startup</li>
            </ul>
            
            <h3>Market Trends</h3>
            <p>Industry analysts note several positive trends:</p>
            <ul>
                <li>Increasing participation of local investors in early-stage funding</li>
                <li>Growing number of successful exits through IPOs and acquisitions</li>
                <li>Expansion of startup support ecosystems including incubators and accelerators</li>
                <li>Rising interest from international venture capital firms</li>
            </ul>
            
            <p>The growth is attributed to several factors including digital transformation accelerated by the pandemic, government support programs, and a growing pool of tech talent in the region.</p>
        `,
        categories: ["Technology", "Business", "Finance", "Startups", "Innovation"],
        featured: false
    }
];

// Get all unique categories from posts
function getAllCategories() {
    const categories = new Set();
    newsPosts.forEach(post => {
        post.categories.forEach(category => {
            categories.add(category);
        });
    });
    return Array.from(categories).sort();
}

// Export data for use in other files
window.siteData = {
    config: siteConfig,
    team: teamMembers,
    posts: newsPosts,
    categories: getAllCategories()
};