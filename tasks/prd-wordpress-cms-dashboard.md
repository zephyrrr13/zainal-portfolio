# PRD: WordPress-Style Full CMS Dashboard & Editorial Ecosystem

## 1. Introduction/Overview

This project transforms Zainal Abidin's high-end portfolio into a complete, WordPress-style headless CMS platform. It provides an all-in-one administrative control center allowing Zainal to visually edit all page contents, manage photo galleries with cloud media uploads, publish articles/tutorials/news using a universal high-end editorial template, customize navigation menus, toggle essential marketing/SEO plugins, monitor traffic analytics, and interact with a floating AI Copilot tweaking assistant anywhere in the dashboard.

---

## 2. Goals

- **Zero-Code Page & Content Management:** Enable editing of homepage hero text, bio narratives, work projects, contact forms, and social links directly from the dashboard.
- **Dynamic Media & Gallery Management:** Provide direct cloud uploads for gallery artworks, 3D renders, and cover images with instant CDN link generation.
- **Universal High-End Article / News Publishing CMS:** Build an editorial publishing engine equipped with a versatile, high-end template suitable for 3D tutorials, software release updates, event stage breakdowns, and news.
- **WordPress-like Navigation Menu Editor:** Allow adding, renaming, reordering, and toggling visibility of navigation links in the header drawer and footer.
- **Essential Plugin Ecosystem:** Provide one-click toggles for SEO Meta tags, Google Analytics, Floating WhatsApp Widget, Auto XML Sitemap, and Maintenance Mode.
- **Floating AI Tweaking Copilot:** An overlay popup/drawer assistant powered by the Gemini AI Gateway for on-the-fly copywriting, SEO optimization, and design adjustments.
- **Seamless Public Integration:** Update the main navigation and homepage to include a dedicated "Articles / News" section and live gallery feed.

---

## 3. User Stories

### US-001: Live Page & Content Customizer
**Description:** As an admin, I want to edit every section of my website (Hero, Bio, Experience timeline, Contact info) so that I can update my portfolio without editing code files.

**Acceptance Criteria:**
- [ ] Form fields for Hero Title, Role, Operational Location, and About Bio.
- [ ] Editable Experience Timeline (Company, Role, Period, Description).
- [ ] Editable Contact information (Email, WhatsApp number, Behance, LinkedIn, Instagram, Discord, WeChat).
- [ ] Instant save button with toast confirmation and immediate reflection on the live site.
- [ ] Typecheck/lint passes.
- [ ] **Verify in browser using dev-browser skill**.

### US-002: Cloud Media & Gallery Manager
**Description:** As an admin, I want to upload high-resolution 3D renders and photos directly from my laptop/phone to cloud storage so that my gallery and case studies load fast and never break git storage limits.

**Acceptance Criteria:**
- [ ] Drag-and-drop cloud file uploader (supporting PNG, JPG, WebP, GIF up to 20MB).
- [ ] Gallery management grid with options to add new photos, reorder, edit titles/tags, and delete images.
- [ ] Copy CDN URL button for any uploaded asset.
- [ ] Gallery Wall page (`/gallery`) dynamically reads and renders uploaded items.
- [ ] Typecheck/lint passes.
- [ ] **Verify in browser using dev-browser skill**.

### US-003: Universal Article & News CMS with Rich Template
**Description:** As an admin, I want to create, edit, schedule, and publish articles/tutorials/software updates using a single universal high-end layout template.

**Acceptance Criteria:**
- [ ] Universal editorial template containing: Cover Image banner, Category badge, Estimated reading time, Summary callout box, Step-by-step tutorial/news content blocks, Resource/Download link section, and Author bio box.
- [ ] Markdown & visual formatting controls (Headings, bold, italic, code blocks, quote callouts, image inserts).
- [ ] Draft vs. Published status switch with scheduled publish date support.
- [ ] Public blog index (`/blog`) and article reader (`/blog/[slug]`) rendering responsive typography.
- [ ] Typecheck/lint passes.
- [ ] **Verify in browser using dev-browser skill**.

### US-004: WordPress-Style Navigation Menu Manager
**Description:** As an admin, I want to customize the links appearing in the navigation bar drawer and footer so that I can easily feature new pages or blog sections.

**Acceptance Criteria:**
- [ ] Menu list manager with drag/sort capability (e.g. 01. Home, 02. About, 03. Works, 04. Gallery, 05. Articles & News, 06. Contact).
- [ ] Option to add custom external/internal links with custom labels.
- [ ] Toggle to show/hide specific menu items without deleting them.
- [ ] Kinetic Navigation drawer and Site Footer reflect menu order dynamically.
- [ ] Typecheck/lint passes.
- [ ] **Verify in browser using dev-browser skill**.

### US-005: Essential Plugin & Addons Suite
**Description:** As an admin, I want to turn on/off essential plugins like SEO tags, WhatsApp widget, and Google Analytics from a dedicated settings screen.

**Acceptance Criteria:**
- [ ] **SEO Meta Plugin:** Input custom OG title, description, keywords, and share image.
- [ ] **Google Analytics Plugin:** Input GA4 Measurement ID (`G-XXXXXXXXXX`) with automatic script injection.
- [ ] **WhatsApp Floating Widget Plugin:** Toggle on/off a floating WhatsApp chat button with custom pre-filled message.
- [ ] **Maintenance Mode Plugin:** One-click toggle that displays a sleek "Under Maintenance // Updating 3D Assets" overlay to public visitors while allowing admin access.
- [ ] **XML Sitemap Plugin:** Automatically generates dynamic `/sitemap.xml` including all pages and published articles.
- [ ] Typecheck/lint passes.
- [ ] **Verify in browser using dev-browser skill**.

### US-006: Floating Overlay AI Copilot Tweaking Assistant
**Description:** As an admin, I want a floating AI assistant popup accessible across the entire dashboard so that I can get instant help writing tutorials, generating SEO descriptions, and tweaking site content.

**Acceptance Criteria:**
- [ ] Floating glowing trigger button in the bottom-right corner of all `/admin/*` pages.
- [ ] Sliding overlay drawer with Gemini AI chat interface.
- [ ] Context-aware prompt shortcuts: "Draft 3D Octane tutorial", "Generate SEO description for stage design", "Summarize traffic analytics", "Write client proposal".
- [ ] One-click copy output button.
- [ ] Typecheck/lint passes.
- [ ] **Verify in browser using dev-browser skill**.

### US-007: Homepage & Navigation Bar Blog / News Integration
**Description:** As a visitor, I want to see the latest articles and news directly on the homepage and easily navigate to them from the menu.

**Acceptance Criteria:**
- [ ] Homepage features a "Latest News & Case Studies" teaser grid showing the 3 most recent published articles with cover image, category, and read time.
- [ ] Header Kinetic Navigation menu drawer and Footer contain active links to `/blog`.
- [ ] Smooth hover states and transition animations matching the dark Swiss aesthetic.
- [ ] Typecheck/lint passes.
- [ ] **Verify in browser using dev-browser skill**.

---

## 4. Functional Requirements

- **FR-1:** All administrative pages must reside under the `/admin` path and be protected by JWT session cookies via `middleware.ts`.
- **FR-2:** The dashboard navigation sidebar must follow the collapsible design system using Google Font `Inter` with high-contrast active route indicators.
- **FR-3:** Media uploads must integrate with cloud storage (Cloudinary / Supabase Storage) via `/api/admin/media` and return direct HTTPS CDN URLs.
- **FR-4:** The Article Editor must support slug generation, automatic read-time calculation, category classification, and tags array.
- **FR-5:** The Navigation Menu manager must persist menu configurations in the CMS database schema and be consumed by `components/ui/sterling-gate-kinetic-navigation.tsx` and `components/site-footer.tsx`.
- **FR-6:** The Plugin manager must expose an API endpoint (`/api/admin/plugins`) to save and retrieve active plugin toggles and configuration keys.
- **FR-7:** The AI Assistant must communicate via `/api/admin/ai` connecting to the Gemini 1.5 Flash AI Gateway with fallback to free AI text gateways.
- **FR-8:** A dynamic `/sitemap.xml` route handler must query all static pages and published blog posts.

---

## 5. Non-Goals (Out of Scope)

- Multi-user role management with complex permissions (this is a single-owner administrative CMS for Zainal Abidin).
- Native WooCommerce / e-commerce payment gateway processing (focus is on portfolio, 3D architectural showcase, and editorial news).
- Direct server-side PHP plugin execution (all plugins are native Next.js 14 modular components).

---

## 6. Design Considerations

- **Dashboard UI Theme:** Dark luxury Swiss tech (`#08080a`, `#0d0d11`), crisp 1px borders (`border-white/10`), emerald active status badges, and typography powered by **Google Font Inter**.
- **Public Website Theme:** Preserves 100% of Zainal's original typography, monochrome aesthetic, and kinetic interactions without interference from the dashboard styling.
- **Floating AI Drawer:** Glassmorphic slide-over overlay with backdrop blur (`backdrop-blur-xl`), purple gradient ambient glow, and high-contrast message bubbles.

---

## 7. Technical Considerations

- **Framework:** Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide Icons, GSAP CustomEase.
- **Authentication:** Stateless Cryptographic JWT, `httpOnly` secure cookies, Argon2/Bcrypt password hashing, and anti-bot cryptographic CAPTCHA.
- **Serverless Persistence:** Dual-layer storage (Persistent Password Vault Cookies + Cloudinary / Supabase Media CDN + CMS Store JSON).
- **SEO & Performance:** Server-rendered metadata on `/blog/[slug]`, dynamic OpenGraph images, and dynamic sitemap.

---

## 8. Success Metrics

- Admin can publish a new article or upload a gallery image in less than **60 seconds**.
- Homepage and navigation changes take effect **immediately without rebuilding code**.
- AI Copilot responses delivered within **< 1.5 seconds**.
- 100% responsive design across Mobile, Tablet, and Desktop screens.

---

## 9. Open Questions & Future Enhancements

- In the future, should we add RSS feed generation (`/feed.xml`) for news syndication?
- Would you like automatic email notifications when a visitor submits the contact form?
