7. README.md
markdown
# Ummah Press Website

A simple news website built with vanilla JavaScript and CSS.

## Features

- Dark/Light theme toggle
- Mobile-responsive design
- Category filtering
- Read more/less functionality
- Simple sidebar navigation
- No external dependencies (except Font Awesome and Google Fonts)

## File Structure
ummah-press-website/
├── index.html
├── css/
│ └── style.css
├── js/
│ └── app.js
├── data/
│ ├── posts.json
│ ├── categories.json
│ └── authors.json
└── assets/
└── images/
├── logo-dark.png
├── logo-light.png
└── avatar.png

text

## How to Use

1. Edit the content in `js/app.js` or the JSON files in the `data/` folder
2. Replace the placeholder images in `assets/images/`
3. Open `index.html` in a web browser

## Customization

- Edit colors in `css/style.css` under the `:root` section
- Add more posts in the `posts` array in `js/app.js`
- Update author information in the `authors` array

## Deployment to GitHub Pages

1. Push the code to a GitHub repository
2. Go to repository Settings > Pages
3. Select the main branch as the source
4. Your site will be available at `https://username.github.io/repository-name/`