# Portfolio Website - Srivatsav Saravanan

A sophisticated, dual-theme portfolio website showcasing expertise in software engineering, AI, and data science. Built with vanilla HTML, CSS, and JavaScript for maximum performance and simplicity.

[![Live Site](https://img.shields.io/badge/Live-Site-blue)](https://srivatsav1298.github.io/PersonalPortfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Features

### 🎨 Dual Theme System
- **Premium Mode**: Professional, MAANG-inspired design with glassmorphism effects and teal accents
- **Mystic Mode**: Creative horror-themed alternate design with gothic typography and atmospheric effects
- Smooth theme transitions with persistent user preference

### 💻 Technical Highlights
- **Pure Vanilla Stack**: No frameworks - just HTML, CSS, and JavaScript
- **Advanced CSS**: Glassmorphism, fluid typography, CSS custom properties, sophisticated animations
- **Performance Optimized**: Fast loading, smooth 60fps animations, optimized assets
- **Fully Responsive**: Mobile-first design that works beautifully on all devices
- **SEO Ready**: Complete meta tags for search engines and social media sharing

### 🚀 Interactive Features
- Custom particle system (Mystic mode)
- Animated scroll progress bar
- Reveal animations with Intersection Observer
- 3D card tilt effects
- Theme-aware custom cursor
- Text scramble effects
- Form integration with Google Sheets

## Project Showcase

### Featured Projects

1. **Financial AI Agent** (2025)
   - AI agent using RAG to answer Norwegian financial queries
   - Technologies: Python, Llama, Statistics Norway API
   - [View Repository](https://github.com/Srivatsav1298/Financial_AI_ReAct_Agent)

2. **AV Dansestudio** (2024)
   - Digital platform for classical dance with premium UX
   - Technologies: React, Node.js, PostgreSQL, AWS
   - [Visit Live Site](https://avdanse.no/)

3. **Tennis Connect** (2023)
   - Scalable club management infrastructure for Australia
   - Technologies: React, Python, SQL Server, Azure
   - [View Platform](https://tc.tennis.com.au/)

4. **Simulated Impact** (2022)
   - Environmental crisis simulation with predictive modeling
   - Technologies: Python, Data Science, Geospatial Analysis
   - [View Repository](https://github.com/Srivatsav1298/INF202_Project)

## Tech Stack

### Core Technologies
- HTML5
- CSS3 (Advanced: CSS Grid, Flexbox, Custom Properties, Animations)
- Vanilla JavaScript (ES6+)

### External Libraries & APIs
- Font Awesome (Icons)
- Google Fonts (Typography)
- Google Sheets API (Form submissions)

### Design Principles
- Mobile-first responsive design
- Accessibility-focused
- Performance-first architecture
- Progressive enhancement
- Semantic HTML

## Project Structure

```
Personal-Portfolio/
├── index.html              # Main HTML file
├── style.css               # Complete stylesheet with dual-theme support
├── Scripts/
│   └── Index.js           # JavaScript for interactivity and effects
├── Images/                 # Image assets and media
│   ├── Logo.png
│   ├── bg.jpg
│   └── my-cv.pdf
├── README.md              # Project documentation
└── .gitignore             # Git ignore rules
```

## Local Development

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (optional but recommended)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Srivatsav1298/PersonalPortfolio.git
cd PersonalPortfolio
```

2. Open with a local server:
```bash
# Using Python 3
python -m http.server 8080

# Using Node.js http-server
npx http-server -p 8080

# Or simply open index.html in your browser
```

3. Navigate to `http://localhost:8080` in your browser

### VS Code Debug Configuration
The project includes VS Code launch configuration for debugging:
- Launch Chrome at `http://localhost:8080`
- Set breakpoints directly in VS Code
- Debug JavaScript with full Chrome DevTools integration

## Customization Guide

### Changing Colors
Edit CSS custom properties in `style.css` (lines 3-41):
```css
:root {
    --bg-color: #0E0F12;
    --text-primary: #EDEDED;
    --accent-teal: #14B8A6;
    /* Modify these variables */
}
```

### Adding Projects
Add new project entries in `index.html` (around line 250):
```html
<article class="maang-project-item">
    <div class="project-header">
        <span class="project-year">YEAR</span>
        <h3 class="project-name">Project Name</h3>
    </div>
    <p class="project-description">Description...</p>
    <div class="project-tech-stack">
        <span class="tech-badge">Tech</span>
    </div>
    <div class="project-links">
        <a href="URL" class="text-link">Link</a>
    </div>
</article>
```

### Modifying Contact Form
Update the Google Sheets script URL in `Scripts/Index.js` (search for "submit-to-google-sheet"):
```javascript
const scriptURL = 'YOUR_GOOGLE_SHEETS_SCRIPT_URL';
```

## Deployment

### GitHub Pages (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from `main` branch, root folder
   - Save and wait for deployment

3. Access your site at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Other Deployment Options
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repository
- **Traditional Hosting**: Upload all files via FTP

## Performance Metrics

- Lighthouse Performance Score: >90
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Total Bundle Size: <500KB (excluding images)
- SEO Score: >95

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Srivatsav1298/PersonalPortfolio/issues).

## License

This project is [MIT](LICENSE) licensed.

## Contact

**Srivatsav Saravanan**
- Portfolio: [https://srivatsav1298.github.io/PersonalPortfolio/](https://srivatsav1298.github.io/PersonalPortfolio/)
- GitHub: [@Srivatsav1298](https://github.com/Srivatsav1298)
- LinkedIn: [Connect on LinkedIn](https://www.linkedin.com/in/srivatsav-saravanan)

## Acknowledgments

- Design inspiration from Apple, Linear, and modern MAANG company websites
- Typography: Inter, Poppins, and specialized fonts from Google Fonts
- Icons: Font Awesome
- Horror mode inspiration: Classic gothic and horror aesthetics

---

Made with ❤️ and lots of code by Srivatsav Saravanan

**Note**: This portfolio is a living project. Check back regularly for updates as new projects and features are added!
