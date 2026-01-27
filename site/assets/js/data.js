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
        avatar: "https://ik.imagekit.io/ummahpress/team/ummah-step.jpg?updatedAt=1712345678901",
        social: {
            twitter: "@UmmahStep",
            email: "ummah.step@ummahpress.com"
        }
    },
    {
        id: 2,
        name: "Rizky Al Indunisi",
        title: "Senior Reporter & Content Strategist",
        bio: "Award-winning journalist with expertise in Southeast Asian affairs and technology reporting. Fluent in Arabic, English, and Indonesian. Committed to ethical journalism and community engagement.",
        avatar: "https://ik.imagekit.io/ummahpress/team/rizky-al-indunisi.jpg?updatedAt=1712345678902",
        social: {
            twitter: "@RizkyAlIndunisi",
            email: "rizky@ummahpress.com"
        }
    }
];

// News Posts Data
const newsPosts = [
    {
        id: 1,
        author: "Ummah Step",
        authorAvatar: "https://ik.imagekit.io/ummahpress/team/ummah-step.jpg?updatedAt=1712345678901",
        date: "2024-01-15",
        title: "Historic Peace Agreement Reached in Regional Summit",
        excerpt: "In a landmark development that could reshape the geopolitical landscape of the Middle East, representatives from several nations have signed a comprehensive peace agreement following months of secret negotiations facilitated by international mediators.",
        fullContent: `
            <p>In a landmark development that could reshape the geopolitical landscape of the Middle East, representatives from several nations have signed a comprehensive peace agreement following months of secret negotiations facilitated by international mediators.</p>
            
            <p>The agreement, signed today in Doha, Qatar, addresses longstanding territorial disputes, security arrangements, and economic cooperation between the participating nations. Key provisions include:</p>
            
            <ul>
                <li>Mutual recognition of sovereignty and borders</li>
                <li>Establishment of demilitarized zones monitored by UN peacekeepers</li>
                <li>Joint economic development initiatives worth an estimated $50 billion</li>
                <li>Cultural and educational exchange programs</li>
            </ul>
            
            <p>World leaders have praised the agreement as a "historic breakthrough" and a "testament to diplomatic perseverance." The signing ceremony was attended by representatives from over 30 countries, including several heads of state.</p>
            
            <p>Analysts suggest this agreement could lead to increased stability in the region and open new opportunities for international investment and cooperation. However, some experts caution that implementation will be crucial and that challenges remain in building lasting trust between the parties.</p>
            
            <p>The next phase will involve the formation of joint committees to oversee the implementation of various aspects of the agreement, with quarterly progress reviews scheduled for the coming year.</p>
        `,
        categories: ["Politics", "Diplomacy", "Middle East"],
        featured: true
    },
    {
        id: 2,
        author: "Rizky Al Indunisi",
        authorAvatar: "https://ik.imagekit.io/ummahpress/team/rizky-al-indunisi.jpg?updatedAt=1712345678902",
        date: "2024-01-14",
        title: "Breakthrough in Renewable Energy Technology Announced",
        excerpt: "Scientists at the International Renewable Energy Institute have announced a major breakthrough in solar panel efficiency that could revolutionize the clean energy sector. The new photovoltaic technology achieves a record 45% efficiency rate under standard testing conditions.",
        fullContent: `
            <p>Scientists at the International Renewable Energy Institute have announced a major breakthrough in solar panel efficiency that could revolutionize the clean energy sector. The new photovoltaic technology achieves a record 45% efficiency rate under standard testing conditions.</p>
            
            <h3>Technical Innovation</h3>
            <p>The breakthrough involves a novel approach to multi-junction solar cells that can capture a broader spectrum of sunlight. Traditional silicon-based solar panels typically achieve 15-22% efficiency, while the most advanced commercial panels reach about 24%.</p>
            
            <h3>Commercial Applications</h3>
            <p>Initial applications are expected in:</p>
            <ul>
                <li>Space technology and satellites</li>
                <li>Utility-scale solar farms</li>
                <li>High-performance electric vehicles</li>
                <li>Off-grid power systems in remote areas</li>
            </ul>
            
            <p>The research team estimates that widespread adoption could reduce the cost of solar electricity by up to 60% and accelerate the transition away from fossil fuels. Several major energy companies have already expressed interest in licensing the technology.</p>
            
            <p>Environmental organizations have welcomed the development, noting that it comes at a critical time as nations work to meet their climate commitments under international agreements.</p>
            
            <p>The institute plans to publish full technical details in next month's issue of Nature Energy, with pilot production expected to begin by the end of the year.</p>
        `,
        categories: ["Technology", "Environment", "Science"],
        featured: true
    },
    {
        id: 3,
        author: "Ummah Step",
        authorAvatar: "https://ik.imagekit.io/ummahpress/team/ummah-step.jpg?updatedAt=1712345678901",
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
            </ul>
            
            <h3>Historical Importance</h3>
            <p>Dr. Aisha Al-Farsi, lead archaeologist on the project, stated: "This discovery provides invaluable insights into daily life during the early Islamic period. The preservation of the site is exceptional, and we believe it will significantly enhance our understanding of the transition from nomadic to settled lifestyles in the region."</p>
            
            <p>Preliminary carbon dating of organic materials found at the site suggests occupation between 650-750 CE. The settlement appears to have been abandoned suddenly, possibly due to changing climate conditions or shifting trade routes.</p>
            
            <h3>Future Research</h3>
            <p>The archaeological team plans to continue excavations for at least two more years. They have applied for UNESCO World Heritage status for the site, which would provide additional protection and funding for preservation.</p>
            
            <p>A selection of artifacts will be displayed in a special exhibition at the National Museum next month, allowing the public to view these remarkable discoveries firsthand.</p>
        `,
        categories: ["History", "Culture", "Archaeology"],
        featured: false
    },
    {
        id: 4,
        author: "Rizky Al Indunisi",
        authorAvatar: "https://ik.imagekit.io/ummahpress/team/rizky-al-indunisi.jpg?updatedAt=1712345678902",
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
                <li>Create local employment opportunities</li>
                <li>Transfer technology and expertise</li>
                <li>Promote gender equality in the workforce</li>
                <li>Adopt environmentally sustainable practices</li>
            </ul>
            
            <h3>Implementation Timeline</h3>
            <p>The first projects under the Sustainable Infrastructure Fund are expected to be announced within six months, with initial disbursements beginning in the third quarter of this year. An independent oversight committee will monitor implementation and ensure transparency.</p>
            
            <p>Economic analysts have generally welcomed the announcements, though some have questioned whether the funding levels are sufficient given the scale of needs. Forum organizers have indicated that these initiatives represent a first phase, with additional programs to be developed based on lessons learned.</p>
            
            <p>The next Global Economic Forum is scheduled for January 2025, where progress on these initiatives will be reviewed and new priorities established.</p>
        `,
        categories: ["Economy", "Development", "Sustainability"],
        featured: true
    }
];

// Export data for use in other files
window.siteData = {
    config: siteConfig,
    team: teamMembers,
    posts: newsPosts
};