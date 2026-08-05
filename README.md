# Jude Diniz Portfolio

A polished personal portfolio website for Jude Diniz, crafted for graduate software developer, web developer, and IT support opportunities.

## Overview

This repository contains a responsive, production-ready portfolio built with HTML, CSS, and JavaScript. The design is modern, accessible, and optimized for GitHub Pages deployment.

## Features

- Clean dark theme with blue gradients and glassmorphism
- Professional responsive layout for desktop, tablet, and mobile
- Typed hero animation and scroll reveal effects
- Simplified sticky navigation for recruiter focus
- Accessible form design with ARIA support and fallback
- Academic project showcase and featured project placeholders
- Technical skills section with progress indicators
- Modern work timeline and education summary
- GitHub section for profile activity placeholders
- SEO metadata, Open Graph, and structured data

## Technologies

- HTML5
- CSS3
- JavaScript
- Google Fonts
- Font Awesome Icons

## Folder Structure

- `index.html` — Main portfolio page
- `assets/css/style.css` — Visual styling and responsive layout
- `assets/js/script.js` — Interactive behavior and form handling
- `assets/images/` — Portfolio image assets and icons
- `assets/files/` — Downloadable CV file
- `README.md` — Project documentation
- `LICENSE` — MIT license

## Installation

Clone the repository:

```bash
git clone https://github.com/phoenix200316/portfolio.git
```

Change into the project directory:

```bash
cd portfolio
```

## Running Locally

Open `index.html` directly in a browser, or use a local server:

```bash
npx serve .
```

Then visit the local server address shown in the terminal.

## Deployment

This site is ready for GitHub Pages deployment. Ensure the repository is published from the `main` branch or the branch configured for Pages.

### GitHub Pages Setup

1. Go to your repository settings.
2. Under Pages, select the `main` branch and `/ (root)` folder.
3. Save and wait for the site to publish.

The `.nojekyll` file is included so GitHub Pages will serve the static site without Jekyll processing.

## Contact Form Setup

The contact form is preconfigured for Formspree, but it requires a valid Formspree form ID:

1. Create a free account at https://formspree.io/.
2. Add a new form and configure delivery to `dinizjude@gmail.com`.
3. Replace `your-form-id` in the `action` attribute of the `<form>` element in `index.html`.

If the form action is not configured yet, the site will fallback to opening the default email client.

## Local Backend

If you run the local backend included in this repo, use the following:

```powershell
npm install
npm start
# open http://localhost:5001
```

- Submit the contact form on the site root or POST to `/submit-contact`.
- Download collected contacts: GET `/download-contacts` (downloads `assets/contact info.csv`).
 - Admin UI: GET `/admin` (protected by Basic Auth). Set environment variables `ADMIN_USER` and `ADMIN_PASS` before running the server, for example:

```powershell
setx ADMIN_USER "admin"
setx ADMIN_PASS "yourpassword"
npm start
```

Then open `http://localhost:5001/admin` and authenticate with the credentials.

## Future Improvements

- Add real portfolio project screenshots and case studies
- Replace project placeholders with published project links
- Integrate GitHub activity widgets or API cards
- Add a blog or case study section
- Connect to a backend contact solution or serverless function

## Author

Jude Diniz

- Email: dinizjude@gmail.com
- GitHub: https://github.com/phoenix200316
- LinkedIn: https://linkedin.com/in/jude-diniz-57226b3b7

## License

This project is released under the MIT License.
