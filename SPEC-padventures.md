# PAdventures Page Specification

## 1. Project Overview
- **Page Name**: PAdventures Information Page
- **Route**: `/padventures` (padventures.html)
- **Design Style**: Glassmorphism (frosted glass, transparency, soft glows)
- **Purpose**: Showcase PAdventures game information and tools in a modern, peaceful aesthetic

## 2. Technical Architecture

### Files
- `padventures.html` - Main HTML page
- `padventures.css` - Independent CSS (no shared styles)
- `padventures.js` - Independent JavaScript functionality

### Dependencies
- External: None (self-contained)
- Internal: None shared with other pages

## 3. UI/UX Specification

### Layout Structure
- **Header**: Glassmorphism navigation bar with dropdowns (following site map)
- **Hero Section**: Large background with "Play Now" button + glow effect
- **Latest Updates Section**: Glass cards with gradient overlays
- **Tools Section**: Grid of interactive tool cards (following app-card style)
- **Footer**: Simple glassmorphism footer

### Visual Design

#### Color Palette
- **Primary Action**: Golden-yellow glow (#FFD700)
- **Background**: Deep charcoals/navys (#1a1a2e, #16213e)
- **Glass Base**: rgba(255, 255, 255, 0.05) - 0.1
- **Accents**: Soft teals (#4ECDC4) and greens
- **Text**: White (#ffffff) with slight transparency variations

#### Glassmorphism Properties
- **Backdrop Filter**: blur(10px) - 15px
- **Background**: rgba(255, 255, 255, 0.05) - 0.15
- **Border**: 1px solid rgba(255, 255, 255, 0.1) - 0.2
- **Border Radius**: 12px - 20px

#### Typography
- Font Family: Inter or Montserrat (Google Fonts)
- Headings: Bold, larger sizes
- Body: Regular weight, readable

### Components

#### Navigation Bar (Glassmorphism)
- Frosted glass effect with blur
- Dropdown menus with sub-menus
- Search form (character search)
- Active state indicator

#### Hero Section
- Background: High-detail illustration (nature/peaceful theme)
- "Play Now" button: Golden glow effect (box-shadow)
- Floating UI elements with transparency

#### Latest Updates Cards (Dark Glassmorphism)
- Selected card: Colored border + outer glow
- Rounded corners (12-20px)
- Gradient overlays (top-to-bottom dark)
- Hover: Subtle glow effect

#### Tool Cards
- Similar to home page app-cards
- Glass effect with hover states
- Images + text labels

## 4. Functionality Specification

### Navigation
- Dropdown toggle on hover
- Active page highlighting
- Search form functionality
- Responsive mobile menu

### Interactions
- Card hover effects with glow
- Smooth transitions (0.3s ease)
- "Play Now" button glow pulse animation

### Data Handling
- Static content (no backend)
- Tool cards link to existing pages

## 5. Site Map (from navigation)

### Menu Structure
- **Home**: News, Changelog
- **Account**: Log In, Create Account, Recovery
- **Community**: Character Search, Who is Online, Highscores, Guilds, Wars, Dungeons, Lottery, Houses, Latest Deaths, Deletera
- **Game Information**: Interface, Events, Duels, PvP, Catching, Quests, Premium, Rules
- **Resources**: Abilities, Berries, Boxes, Emotes, Held Items, Map, Prices, TM, TM Tasks
- **Support** (no sub-menu)
- **Downloads** (no sub-menu)

## 6. Acceptance Criteria

1. ✅ Page accessible at /padventures (or padventures.html)
2. ✅ Glassmorphism design with frosted glass nav and cards
3. ✅ Independent CSS file (no shared styles)
4. ✅ Independent JS file (no shared scripts)
5. ✅ "Play Now" button with golden glow
6. ✅ Latest Updates section with dark glassmorphism cards
7. ✅ Tool cards grid similar to home page style
8. ✅ Responsive design
9. ✅ Smooth animations and transitions
10. ✅ Navigation follows site map structure