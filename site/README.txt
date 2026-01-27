# Ummah Press Website

A responsive news website with dark/light theme toggle, Google Translate integration, and dynamic content loading.

## Features
- Responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle
- Google Translate integration for multiple languages
- Dynamic content loading
- Blurred transparent header on scroll
- Sidebar navigation with collapse functionality
- Sticky footer

## Folder Structure
ummah-press-website/
├── index.html # Main HTML file
├── README.md # Documentation
├── css/ # CSS stylesheets
│ ├── style.css # Main styles
│ ├── header.css # Header styles
│ ├── footer.css # Footer styles
│ └── sidebar.css # Sidebar styles
├── js/ # JavaScript files
│ ├── main.js # Main initialization
│ ├── header.js # Header functionality
│ ├── sidebar.js # Sidebar functionality
│ ├── theme.js # Theme management
│ ├── posts.js # Posts management
│ └── translate.js # Google Translate
├── partials/ # HTML partials
│ ├── header.html # Header HTML
│ ├── sidebar.html # Sidebar HTML
│ └── footer.html # Footer HTML
├── content/ # Content files
│ ├── home.html # Home page content
│ ├── about.html # About page content
│ ├── posts.json # Posts data
│ └── categories.json # Categories data
└── assets/ # Assets (images, fonts)
└── images/ # Image files

text

## How to Upload New Content

### 1. Adding New Posts
Edit `content/posts.json` and add a new post object:
```json
{
    "id": 4,
    "author": "Author Name",
    "date": "2023-06-20",
    "avatar": "path/to/avatar.jpg",
    "categories": ["Category1", "Category2"],
    "categoryIds": ["category1", "category2"],
    "content": "Your post content here...",
    "source": "Source information",
    "likes": 0,
    "shares": 0,
    "comments": 0
}
2. Adding New Categories
Edit content/categories.json and add a new category:

json
{"id": "new-category", "name": "New Category"}
3. Updating Team Information
Edit content/about.html to update team members.

4. Adding Images
Place images in assets/images/ and update references in:

partials/sidebar.html (logo)

partials/header.html (avatar)

content/posts.json (post avatars)

How to Deploy to GitHub Pages
Create a new GitHub repository

Push all files to the repository:

bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
Go to repository Settings > Pages

Under "Source", select "Deploy from a branch"

Select "main" branch and "/ (root)" folder

Click "Save"

Your site will be available at: https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/

Customization
Changing Colors
Edit CSS variables in css/style.css:

css
:root {
    --accent-light: #your-color;
    --accent-dark: #your-color;
}
Adding Languages
Edit js/translate.js:

javascript
includedLanguages: 'en,ar,fr,es,ur,id,tr'  // Add/remove language codes
Adding Social Media Links
Edit partials/sidebar.html:

html
<a href="YOUR-LINK" class="social-icon">
    <i class="fab fa-platform-name"></i>
</a>
Browser Support
Chrome 60+

Firefox 55+

Safari 10.1+

Edge 79+

License
© 2023 Ummah Press. All rights reserved.

text

## **HOW TO USE:**

1. **Download the folder structure** above
2. **Add your images** to `assets/images/` folder:
   - `logo-dark.png` (dark theme logo)
   - `logo-light.png` (light theme logo)
   - `avatar.png` (user avatar)

3. **To add new posts:**
   - Edit `content/posts.json`
   - Add new post objects following the same format

4. **To deploy to GitHub Pages:**
   ```bash
   # Create new repository on GitHub
   # Clone repository locally
   git clone https://github.com/yourusername/ummah-press.git
   
   # Copy all files to the repository folder
   cd ummah-press
   
   # Commit and push
   git add .
   git commit -m "Initial commit"
   git push origin main
   
   # Enable GitHub Pages in repository settings
   # Go to Settings > Pages > Source: main branch