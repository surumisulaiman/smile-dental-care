# Your Smile

Responsive two-clinic dental website for Smile Dental Care (South Chittoor) and Your Dental Clinic (Cheranalloor), Kochi. Built with HTML, CSS and JavaScript.

## Preview

Run `python3 -m http.server 4173 --bind 127.0.0.1` and open http://127.0.0.1:4173.

Check JavaScript: `node --check script.js`.

## Design

Based on the supplied Your Smile brand board: deep teal, warm ivory, gold smile arcs, serif headings, and the original script logo. Logos are displayed from the supplied artwork using CSS viewports. Replace `assets/brand-board.png` with approved standalone logo masters before production; the current SVG wrappers are reference viewports, not vector logo masters.

Home, service details, clinics, approach, team and contact are anchored sections. The navigation clinic selector updates contact details and highlights the selected clinic. Booking dropdowns offer both clinics; South Chittoor links to its existing Gonimo page, while Cheranalloor is marked as coming soon. Mobile includes a fixed booking button.

## Before launch

Confirm Cheranalloor address, contacts, treatment availability and booking destination. Confirm opening hours for both branches. Replace illustrative Unsplash interiors with approved clinic photography and add team portraits when available. No appointment requests or medical information are collected on this site. External booking is handled by Gonimo. Google Fonts and Unsplash load remotely.

## Current pages

- `/brand/`: logo variants, colour and typography guide, reception concepts.
- `/clinics/south-chittoor/` and `/clinics/cheranalloor/`: dedicated branch pages and doctor portraits.
- `/services/general-dentistry/`, `/services/smile-care/`, `/services/restorative-dentistry/`: service pages.
- `/international/gulf/`: Arabic by default with English switching.
- `/international/maldives/`: English-only.

Both clinics use +91 75588 03737. Cheranalloor uses call-to-book. Dr. Anna leads the Cheranalloor page. Testimonials are explicitly fictional design examples; replace them with approved real reviews before launch. AI-generated interiors are illustrative concepts. Doctor portraits use supplied photos with AI-edited backgrounds. Current logo artwork is blended into light surfaces using CSS.
