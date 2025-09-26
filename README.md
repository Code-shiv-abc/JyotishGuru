# JyotishGuru - Vedic Astrology Website

This is a professional, single-page marketing website for Acharya Ravindra Shastri, a Vedic Astrologer. The site is designed to be elegant, informative, and engaging, providing visitors with details about the Acharya's services, a way to get a free horoscope reading, and methods to get in touch for consultations.

This repository contains the complete, production-ready code after a series of bug fixes and professional enhancements.

## Key Features

*   **Elegant Design:** A dark, celestial theme with gold and accent colors, using modern fonts and a clean layout.
*   **Interactive Hero Section:** A beautiful animated sky that transitions from dawn to day as the user scrolls.
*   **Dynamic Horoscope Calculator:** Users can enter their date of birth to instantly receive their Western zodiac sign and a brief prediction.
*   **Interactive Testimonial Carousel:** Client testimonials are displayed in a carousel with both automatic rotation and manual (next/previous) controls.
*   **Service Showcase:** A clear and concise presentation of the four core services offered.
*   **Contact & Booking:** Easy-to-use contact form linked to Formspree and a prominent WhatsApp contact button.
*   **SEO Optimized:** Includes JSON-LD schema markup for better search engine visibility.
*   **Fully Responsive:** The layout is optimized for all screen sizes, from mobile phones to desktops.

## Improvements Made

This codebase was significantly improved from its initial state. The key enhancements include:

1.  **Fixed All Broken Assets:** Created the `assets/` directory structure and populated it with placeholder images and icons to fix all broken links and ensure the layout renders correctly.
2.  **Implemented Core Functionality:**
    *   The "Get Your Free Horoscope" form is now fully functional and calculates the user's zodiac sign based on their date of birth.
    *   The testimonial carousel was enhanced with next/previous buttons for manual navigation, improving user experience.
3.  **Enhanced HTML & Accessibility:**
    *   Added a `favicon.ico` for brand identity in the browser tab.
    *   Replaced all placeholder content (e.g., zodiac signs, dead links) with meaningful content or proper "coming soon" states.
    *   Improved accessibility by adding `alt` text to all social media icons.
4.  **Professional Touches:**
    *   Added this detailed `README.md` to document the project.
    *   Cleaned up commented-out code and fixed placeholder URLs in the SEO schema.

## Project Structure

```
.
├── assets
│   ├── icons/         // SVG icons for services and social media
│   └── images/        // JPG/PNG images for the site
├── favicon.ico        // Site favicon
├── index.html         // The main HTML file
├── README.md          // This file
├── script.js          // Custom JavaScript for interactivity
└── style.css          // All custom CSS styles
```

## **IMPORTANT:** Action Required - Replace Placeholder Assets

The images and icons in the `assets/` directory are currently placeholders. You must replace them with the actual brand assets.

*   **Profile Photo:** Replace `assets/images/acharya-photo.jpg` with the real photograph.
*   **Service Icons:** Replace the SVG files in `assets/icons/` (`kundli.svg`, `matchmaking.svg`, etc.) with your custom icons.
*   **Social Media Icons:** Replace the SVG files for `instagram.svg` and `youtube.svg` in `assets/icons/`.

By replacing these files with ones of the same name, the website will automatically display them without any code changes required.