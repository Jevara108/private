# 📚 **Component Documentation**

Complete documentation for all components in the CreeperCraft template.

## 📋 **Table of Contents**

1. [Component Overview](#component-overview)
2. [Core Components](#core-components)
3. [Section Components](#section-components)
4. [Utility Components](#utility-components)
5. [Props Reference](#props-reference)
6. [Styling Guide](#styling-guide)

---

## 🔍 **Component Overview**

The CreeperCraft template is built with a modular component architecture. Each component is:

- **Self-contained** - Manages its own state and styling
- **Reusable** - Can be easily customized and reused
- **Accessible** - Follows WCAG guidelines
- **Responsive** - Works on all screen sizes
- **Documented** - Comprehensive JSDoc comments

### Component Hierarchy

```
App.tsx
├── Navigation.tsx
├── HeroSection.tsx
├── RankingsSection.tsx
├── ServerShopSection.tsx
│   └── ChestComponent.tsx
├── ServerMapSection.tsx
├── VoteSection.tsx
├── BansSection.tsx
├── StaffSection.tsx
├── FAQSection.tsx
└── Footer.tsx
```

---

## ⚛️ **Core Components**

### App.tsx

**Purpose:** Main application component that orchestrates all sections and manages global state including live server statistics.

**Key Features:**
- Global state management for all sections
- Live player count fetching from Minecraft APIs
- Live Discord member count fetching
- Server IP copy functionality with clipboard API
- Mobile navigation state management
- Error handling and loading states for live data

**Configuration:**
```typescript
/**
 * Server Configuration - Update with your details
 */
const SERVER_IP = 'play.yourserver.net'; // Your Minecraft server IP
const DISCORD_INVITE = 'https://discord.gg/yourinvite'; // Your Discord invite URL
```

**Live Statistics Hooks:**
```typescript
// Fetches live Discord stats once on page load
const discordStats = useDiscordStats(DISCORD_INVITE, 5000);

// Fetches live Minecraft stats once on page load
const minecraftStats = useMinecraftStats(SERVER_IP, 139);
```

**State Management:**
```typescript
const [copied, setCopied] = useState(false);        // Server IP copy status
const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
const [activeTab, setActiveTab] = useState('players'); // Rankings tab
const [activeSlide, setActiveSlide] = useState(0);   // Shop carousel
```

**Customization:**
- Configure SERVER_IP and DISCORD_INVITE for live statistics
- Update fallback values for when APIs are unavailable
- Add new sections and state management
- Modify refresh intervals for live data
- Customize error handling and loading states

**API Integration:**
- **Minecraft APIs**: Uses dual API system (mcsrvstat.us + mcapi.us)
- **Discord API**: Official Discord widget API for member counts
- **Fallback System**: Graceful degradation when APIs are unavailable
- **Error Handling**: Comprehensive error handling with user-friendly fallbacks

### Navigation.tsx

**Purpose:** Fixed header navigation with responsive mobile menu.

**Props:**
```typescript
interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}
```

**Features:**
- Responsive hamburger menu
- Glass morphism design
- Smooth transitions
- Accessibility support

**Customization:**
- Update navigation links
- Change brand name/logo
- Modify mobile menu behavior
- Add new navigation items

---

## 📄 **Section Components**

### HeroSection.tsx

**Purpose:** Main landing section with animated background and text slider.

**Props:**
```typescript
interface HeroSectionProps {
  playerCount: number;
  onlineCount: number;
  copied: boolean;
  copyServerIP: () => void;
}
```

**Features:**
- Animated text slider
- Floating particles
- Social media links
- Interactive status boxes

**Customization:**
- Update slider text content
- Modify background image
- Change social media links
- Customize particle effects

### RankingsSection.tsx

**Purpose:** Interactive leaderboard system with tabbed interface.

**Props:**
```typescript
interface RankingsSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
```

**Features:**
- Three ranking categories
- Top 3 podium display
- Extended leaderboard
- Server join CTA

**Data Source:** `src/data/rankings.ts`

**Customization:**
- Update ranking data
- Add new ranking categories
- Modify podium styling
- Change leaderboard length

### ServerShopSection.tsx

**Purpose:** Comprehensive shop interface with VIP packages and crates.

**Props:**
```typescript
interface ServerShopSectionProps {
  activeSlide: number;
  setActiveSlide: (slide: number) => void;
}
```

**Features:**
- Bundle carousel
- VIP comparison table
- Enhanced crate cards
- Animated effects

**Data Source:** `src/data/bundles.ts`

**Customization:**
- Update package pricing
- Modify VIP features
- Add new bundles
- Customize crate variants

### ServerMapSection.tsx

**Purpose:** Interactive world map with biome tiles and statistics.

**Features:**
- 9 unique biome tiles
- Responsive grid layout
- Animated particles
- Map legend and stats

**Customization:**
- Update biome information
- Modify map layout
- Change statistics
- Add new biomes

### VoteSection.tsx

**Purpose:** Voting system with multiple platforms and rewards.

**Features:**
- Multiple voting platforms
- Reward tracking
- Progress monitoring
- Cooldown timers

**Customization:**
- Update voting platforms
- Modify reward system
- Change vote statistics
- Add new platforms

### BansSection.tsx

**Purpose:** Transparent moderation system with ban records.

**Features:**
- Advanced filtering
- Pagination system
- Appeal integration
- Responsive design

**Customization:**
- Update ban records
- Modify filter options
- Change appeal process
- Add new ban types

### StaffSection.tsx

**Purpose:** Staff team showcase with detailed profiles.

**Features:**
- Role-based filtering
- Expandable cards
- Staff statistics
- Contact information

**Customization:**
- Update staff members
- Add new roles
- Modify card layout
- Change statistics

### FAQSection.tsx

**Purpose:** Comprehensive FAQ with categorized filtering.

**Features:**
- Category filtering
- Expandable questions
- Search functionality
- Support integration

**Customization:**
- Update FAQ content
- Add new categories
- Modify questions
- Change support links

### Footer.tsx

**Purpose:** Site footer with navigation and community information.

**Props:**
```typescript
interface FooterProps {
  playerCount: number;
}
```

**Features:**
- Site navigation
- Social media links
- Discord showcase
- Legal information

**Customization:**
- Update navigation links
- Modify social media
- Change community stats
- Add new sections

---

## 🛠️ **Utility Components**

### ChestComponent.tsx

**Purpose:** Animated Minecraft-style chest with multiple variants.

**Props:**
```typescript
interface ChestComponentProps {
  variant?: 'mystery' | 'treasure' | 'legendary';
  size?: 'small' | 'medium' | 'large';
}
```

**Features:**
- Three chest variants
- Multiple sizes
- Particle effects
- Hover animations

**Customization:**
- Add new variants
- Modify animations
- Change colors
- Update effects

### Icon Components

Located in `src/components/icons/`:

- **CreeperHeadIcon.tsx** - Minecraft creeper head
- **DiscordIcon.tsx** - Discord logo
- **TikTokIcon.tsx** - TikTok logo  
- **TwitterIcon.tsx** - Twitter/X logo

**Customization:**
- Replace with custom icons
- Modify SVG paths
- Change colors
- Add new icons

---

## 📝 **Props Reference**

### Common Props Patterns

#### **Section Props**
Most section components follow this pattern:
```typescript
interface SectionProps {
  // State management
  activeState?: string | number;
  setState?: (value: any) => void;
  
  // Data
  data?: any[];
  
  // Callbacks
  onAction?: () => void;
}
```

#### **Card Props**
Card components typically use:
```typescript
interface CardProps {
  // Content
  title: string;
  description?: string;
  
  // Styling
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  
  // Interaction
  onClick?: () => void;
  disabled?: boolean;
}
```

#### **Data Props**
Data-driven components use:
```typescript
interface DataProps {
  items: DataItem[];
  loading?: boolean;
  error?: string;
  onRefresh?: () => void;
}
```

---

## 🎨 **Styling Guide**

### CSS Classes

#### **Layout Classes**
```css
.container          /* Max-width container with responsive padding */
.glass             /* Glass morphism background */
.card              /* Standard card styling */
.btn               /* Button base styles */
.btn-green         /* Primary green button */
.btn-red           /* Danger/alert button */
```

#### **Animation Classes**
```css
.animate-float-slow     /* Slow floating animation */
.animate-float-medium   /* Medium floating animation */
.animate-float-fast     /* Fast floating animation */
.animate-pulse-bright   /* Bright pulsing effect */
.animate-fade-in-up     /* Fade in from bottom */
```

#### **Responsive Classes**
```css
.xs:*              /* Extra small screens (475px+) */
.sm:*              /* Small screens (640px+) */
.md:*              /* Medium screens (768px+) */
.lg:*              /* Large screens (1024px+) */
.xl:*              /* Extra large screens (1280px+) */
```

### Color System

#### **Brand Colors**
```css
.text-grass-green      /* Primary brand color */
.bg-grass-green        /* Primary background */
.border-grass-green    /* Primary border */
```

#### **Background Colors**
```css
.bg-primary-dark       /* Main dark background */
.bg-secondary-dark     /* Secondary dark background */
.bg-white/10           /* Semi-transparent white */
```

#### **Text Colors**
```css
.text-white            /* Primary text */
.text-light-gray       /* Secondary text */
.text-mid-gray         /* Tertiary text */
```

### Component-Specific Styles

#### **Navigation**
```css
.nav-link              /* Navigation link base */
.nav-link:hover::after /* Hover underline effect */
.social-icon           /* Social media icon styling */
```

#### **Rankings**
```css
.tabs                  /* Tab container */
.tab                   /* Individual tab */
.tab.active            /* Active tab state */
.top-3-grid            /* Podium grid layout */
.list-entries          /* Leaderboard entries */
```

#### **Shop**
```css
.bundles-carousel      /* Carousel container */
.carousel-arrow        /* Navigation arrows */
.compare-table         /* VIP comparison table */
.perks-list            /* Feature list */
.bonus-badge           /* Bonus indicator */
```

---

## 🔧 **Customization Examples**

### Adding a New Section

1. **Create component:**
```typescript
// src/components/NewsSection.tsx
import React from 'react';

export const NewsSection: React.FC = () => {
  return (
    <section id="news" className="py-16 sm:py-20 bg-gradient-to-b from-primary-dark to-secondary-dark">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white tracking-wider uppercase">
            SERVER NEWS
          </h2>
          <div className="w-16 h-1 bg-grass-green mx-auto mb-4"></div>
        </div>
        
        {/* News content */}
        
      </div>
    </section>
  );
};
```

2. **Add to App.tsx:**
```typescript
import { NewsSection } from './components/NewsSection';

// In render:
<NewsSection />
```

3. **Add navigation:**
```typescript
// In Navigation.tsx
<a href="#news" className="text-light-gray hover:text-white transition-colors text-sm font-medium nav-link">NEWS</a>
```

### Modifying Existing Components

#### **Change Hero Background:**
```typescript
// In HeroSection.tsx
<div 
  className="hero-bg absolute inset-0 bg-cover bg-center" 
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('/your-background.jpg')`,
  }}
/>
```

#### **Add New Ranking Tab:**
```typescript
// In RankingsSection.tsx
const tabConfigs: TabConfig[] = [
  { id: 'players', label: 'PLAYER RANKING', dataLabel: 'Player Points' },
  { id: 'guilds', label: 'GUILD RANKING', dataLabel: 'Guild Points' },
  { id: 'kills', label: 'KILL RANKING', dataLabel: 'Kills' },
  { id: 'wealth', label: 'WEALTH RANKING', dataLabel: 'Money' }, // New tab
];
```

#### **Customize Shop Pricing:**
```typescript
// In ServerShopSection.tsx
<div className="text-3xl font-black text-grass-green mb-2">$19.99</div> // Update price
```

---

## 🚀 **Performance Tips**

### Optimization Strategies

1. **Lazy Loading:**
```typescript
const LazyComponent = React.lazy(() => import('./HeavyComponent'));
```

2. **Memoization:**
```typescript
const MemoizedComponent = React.memo(ExpensiveComponent);
```

3. **Image Optimization:**
```typescript
<img 
  src="/image.jpg" 
  alt="Description"
  loading="lazy"
  className="w-full h-auto"
/>
```

4. **Bundle Splitting:**
```typescript
// Dynamic imports
const loadFeature = () => import('./feature');
```

### Accessibility

1. **ARIA Labels:**
```typescript
<button aria-label="Close menu" onClick={closeMenu}>
  <X className="w-6 h-6" />
</button>
```

2. **Semantic HTML:**
```typescript
<main role="main">
  <section aria-label="Server rankings">
    <h2>Rankings</h2>
  </section>
</main>
```

3. **Keyboard Navigation:**
```typescript
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
}}
```

---

## 📞 **Support**

Need help with components? Check out:

- 🎨 [Customization Guide](../CUSTOMIZATION.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 🌐 Website: [bytekron.com](https://bytekron.com)
- 💬 Discord: [@bytekron](https://discord.com/users/bytekron)
- 📧 Email: contact@bytekron.com

---

**Happy coding! 🎉**