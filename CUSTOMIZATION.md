# 🎨 **Customization Guide**

This comprehensive guide will help you customize the CreeperCraft template to match your Minecraft server's branding and requirements.

## 📋 **Table of Contents**

1. [Quick Start Customization](#quick-start-customization)
2. [Branding & Colors](#branding--colors)
3. [Content Customization](#content-customization)
4. [Advanced Customization](#advanced-customization)
5. [Integration Examples](#integration-examples)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 **Quick Start Customization**

### Step 1: Server Information

**File:** `src/App.tsx` - Configure Live Statistics

```typescript
/**
 * Server Configuration
 * Update these values with your actual server details for live statistics
 */
const SERVER_IP = 'play.yourserver.net'; // ← Your Minecraft server IP
const DISCORD_INVITE = 'https://discord.gg/yourinvite'; // ← Your Discord invite URL

// The template will automatically:
// - Fetch live player count once on page load
// - Fetch Discord member count once on page load
// - Use fallback values if APIs fail
```

**Important Notes:**
- Leave `SERVER_IP` empty (`''`) to use simulated player counts
- Leave `DISCORD_INVITE` empty (`''`) to use fallback Discord count
- The template uses two Minecraft APIs for reliability:
  1. Primary: `mcsrvstat.us`
  2. Backup: `mcapi.us`

### Step 2: Server Name & Title

**File:** `index.html`

```html
<!-- Update page title -->
<title>YourServer - Premium Minecraft Server | Hardcore PvP & Guild Wars</title>

<!-- Update meta description -->
<meta name="description" content="Join YourServer, the ultimate Minecraft experience..." />

<!-- Update Open Graph title -->
<meta property="og:title" content="YourServer - Premium Minecraft Server" />
```

**File:** `src/components/Navigation.tsx`

```typescript
// Update navigation brand name
<span className="text-lg sm:text-xl font-bold text-white">YOURSERVER</span>
```

**File:** `src/components/HeroSection.tsx`

```typescript
// Update hero title
<h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 tracking-wider animate-fade-in-up text-shadow-lg leading-tight">
  <span className="text-white">YOUR</span>
  <span className="text-grass-green opacity-90">SERVER</span>
</h1>
```

### Step 3: Basic Colors

**File:** `tailwind.config.js`

```javascript
colors: {
  'primary-dark': '#111212',     // Main dark background
  'secondary-dark': '#1A1C1D',   // Secondary background
  'grass-green': '#YOUR_COLOR',  // ← Your brand color (hex)
  'alert-red': '#E33B3B',        // Error/warning color
  'white': '#FFFFFF',
  'light-gray': '#D0D0D0',
  'mid-gray': '#7A7A7A',
}
```

---

## 🎨 **Branding & Colors**

### Color Scheme Customization

#### Option 1: Simple Color Change
Replace `#3CCE3C` (grass-green) throughout the codebase with your brand color.

#### Option 2: Complete Color Palette
Create a custom color palette in `tailwind.config.js`:

```javascript
colors: {
  // Dark theme backgrounds
  'primary-dark': '#0A0A0B',      // Darker for more contrast
  'secondary-dark': '#1C1C1E',    // Slightly lighter
  
  // Your brand colors
  'brand-primary': '#FF6B35',     // Orange example
  'brand-secondary': '#F7931E',   // Secondary orange
  'brand-accent': '#FFD23F',      // Yellow accent
  
  // Status colors
  'success': '#28A745',
  'warning': '#FFC107', 
  'error': '#DC3545',
  'info': '#17A2B8',
  
  // Neutral colors
  'white': '#FFFFFF',
  'light-gray': '#E5E5E7',
  'mid-gray': '#8E8E93',
  'dark-gray': '#48484A',
}
```

Then update component files to use your new colors:

```typescript
// Replace grass-green with brand-primary
className="bg-brand-primary text-white"
className="text-brand-primary"
className="border-brand-primary"
```

### Logo & Favicon

1. **Replace favicon files** in `public/` folder:
   - `favicon.ico`
   - `apple-touch-icon.png`
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`

2. **Update logo in navigation** (`src/components/Navigation.tsx`):

```typescript
// Option 1: Keep Creeper icon
<div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-primary rounded flex items-center justify-center">
  <CreeperHeadIcon />
</div>

// Option 2: Use custom logo image
<img 
  src="/your-logo.png" 
  alt="Your Server Logo" 
  className="w-8 h-8 sm:w-10 sm:h-10"
/>

// Option 3: Text-only logo
<div className="text-2xl font-bold text-brand-primary">YS</div>
```

---

## 📝 **Content Customization**

### Hero Section Text Slider

**File:** `src/components/HeroSection.tsx`

Update the text slider with your server's features:

```typescript
const sliderTexts: SliderText[] = [
  {
    text: "Join our epic server and experience the best ",
    highlight: "PvP Combat",
    suffix: " in Minecraft"
  },
  {
    text: "Build your empire in our custom ",
    highlight: "Survival World",
    suffix: " with unique features"
  },
  {
    text: "Compete in weekly ",
    highlight: "Events",
    suffix: " and win amazing prizes"
  },
  // Add more slides...
];
```

### Rankings Data

**File:** `src/data/rankings.ts`

Replace with your server's top players:

```typescript
export const playerRankings: Player[] = [
  { 
    name: 'YourTopPlayer1', 
    level: 2500, 
    rank: 1, 
    avatar: 'https://mc-heads.net/avatar/YourTopPlayer1/64' 
  },
  { 
    name: 'YourTopPlayer2', 
    level: 2350, 
    rank: 2, 
    avatar: 'https://mc-heads.net/avatar/YourTopPlayer2/64' 
  },
  // Continue with your top 20 players...
];

export const guildRankings: Player[] = [
  { 
    name: 'YourTopGuild1', 
    level: 15000, 
    rank: 1, 
    avatar: 'https://mc-heads.net/avatar/YourTopGuild1/64' 
  },
  // Add your guild rankings...
];
```

### Shop Packages

**File:** `src/data/bundles.ts`

Update with your server's packages:

```typescript
export const bundles: Bundle[] = [
  {
    name: 'Starter Kit',
    price: '$9.99',
    items: ['⚔️', '🛡️', '🍖', '💰'] // Customize items
  },
  {
    name: 'Warrior Pack',
    price: '$19.99', 
    items: ['⚔️', '🏹', '🛡️', '💎']
  },
  {
    name: 'Legend Bundle',
    price: '$39.99',
    items: ['👑', '💎', '🔥', '⭐']
  }
];
```

**File:** `src/components/ServerShopSection.tsx`

Update VIP package pricing and features:

```typescript
// Find the VIP package sections and update:

// VIP Package
<div className="text-3xl font-black text-grass-green mb-2">$15/month</div>

// SVIP Package  
<div className="text-3xl font-black text-teal-400 mb-2">$25/month</div>

// VIP Lifetime
<div className="text-3xl font-black text-purple-400 mb-2">$99</div>
```

### Staff Team

**File:** `src/components/StaffSection.tsx`

Replace with your actual staff:

```typescript
const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: 'YourUsername',
    role: 'Server Owner',
    roleType: 'owner',
    description: 'Founder and owner of YourServer. Passionate about creating the best Minecraft experience.',
    avatar: 'https://mc-heads.net/avatar/YourUsername/128',
    joinDate: '2020-01-15',
    experience: 4,
    specialties: ['Server Management', 'Community Building', 'Plugin Development'],
    online: true,
    timezone: 'EST',
    contact: 'Discord: YourUsername#0001',
    helpedPlayers: 2500,
    quote: 'Building the best Minecraft community, one player at a time.'
  },
  // Add your staff members...
];
```

### FAQ Content

**File:** `src/components/FAQSection.tsx`

Update with your server-specific questions:

```typescript
const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How do I join YourServer?",
    answer: "Simply add 'play.yourserver.net' to your Minecraft server list and connect! Make sure you're using Minecraft Java Edition version 1.20+.",
    category: 'general',
    icon: <Server className="w-5 h-5" />
  },
  {
    id: 2,
    question: "What makes YourServer special?",
    answer: "We offer unique custom plugins, weekly events, active staff support, and a friendly community. Our custom survival world features unique biomes and challenges.",
    category: 'general',
    icon: <Star className="w-5 h-5" />
  },
  // Add more FAQs...
];
```

---

## 🔧 **Advanced Customization**

### Adding New Sections

1. **Create component file:**

```typescript
// src/components/YourNewSection.tsx
import React from 'react';

export const YourNewSection: React.FC = () => {
  return (
    <section id="your-section" className="py-16 sm:py-20 bg-gradient-to-b from-primary-dark to-secondary-dark">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white tracking-wider uppercase">
            YOUR SECTION TITLE
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto mb-4"></div>
          <p className="text-lg text-light-gray max-w-2xl mx-auto">
            Your section description here.
          </p>
        </div>
        
        {/* Your content here */}
        
      </div>
    </section>
  );
};
```

2. **Add to main app:**

```typescript
// src/App.tsx
import { YourNewSection } from './components/YourNewSection';

// Add in the render section:
<YourNewSection />
```

3. **Add navigation link:**

```typescript
// src/components/Navigation.tsx
<a href="#your-section" className="text-light-gray hover:text-white transition-colors text-sm font-medium nav-link">YOUR SECTION</a>
```

### Custom Animations

Add new animations in `src/index.css`:

```css
/* Custom bounce animation */
@keyframes custom-bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.animate-custom-bounce {
  animation: custom-bounce 1s ease-in-out;
}

/* Glow effect */
@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px currentColor; }
  50% { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}
```

### Responsive Breakpoints

Customize breakpoints in `tailwind.config.js`:

```javascript
theme: {
  screens: {
    'xs': '475px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
    // Custom breakpoints
    'tablet': '640px',
    'laptop': '1024px',
    'desktop': '1280px',
  }
}
```

---

## 🔌 **Integration Examples**

### Live Player Count API

The template includes built-in live statistics! Here's how it works:

```typescript
// Built-in Live Statistics (src/App.tsx)
const SERVER_IP = 'play.zaosmc.com'; // Your server IP
const DISCORD_INVITE = 'https://discord.gg/PJu5qUfUbA'; // Your Discord invite

// Automatic features:
// ✅ Live player count every 30 seconds
// ✅ Discord member count every 5 minutes
// ✅ Dual API system for reliability
// ✅ Graceful fallbacks if APIs fail
// ✅ Error handling and loading states
```

**API Configuration:**

```typescript
// Primary API: mcsrvstat.us
https://api.mcsrvstat.us/2/play.yourserver.net

// Backup API: mcapi.us  
https://mcapi.us/server/status?ip=play.yourserver.net

// Discord API: Official Discord widget
https://discord.com/api/v10/invites/yourinvite?with_counts=true
```

**Custom API Integration:**

If you want to use your own API instead, modify `src/hooks/useMinecraftStats.ts`:

```typescript
// Replace the API calls with your own endpoint
const response = await fetch(`/api/your-server-status/${cleanIP}`);
const data = await response.json();

// Update the data mapping to match your API response
setStats({
  playerCount: data.your_player_count_field,
  online: data.your_online_status_field,
  // ... other fields
});
```

### Payment Integration (Stripe)

```typescript
// src/utils/payments.ts
export const createCheckoutSession = async (priceId: string) => {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/shop`,
    }),
  });

  const session = await response.json();
  
  // Redirect to Stripe Checkout
  const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);
  await stripe?.redirectToCheckout({ sessionId: session.id });
};
```

Use in shop component:

```typescript
// In ServerShopSection.tsx
const handlePurchase = async (packageType: string) => {
  const priceIds = {
    'vip': 'price_vip_monthly',
    'svip': 'price_svip_monthly', 
    'lifetime': 'price_vip_lifetime'
  };
  
  await createCheckoutSession(priceIds[packageType]);
};
```

### Discord Integration

```typescript
// src/utils/discord.ts
export const getDiscordStats = async (guildId: string) => {
  try {
    const response = await fetch(`/api/discord/guild/${guildId}/stats`);
    const data = await response.json();
    
    return {
      memberCount: data.approximate_member_count,
      onlineCount: data.approximate_presence_count
    };
  } catch (error) {
    console.error('Failed to fetch Discord stats:', error);
    return { memberCount: 0, onlineCount: 0 };
  }
};
```

---

## 🐛 **Troubleshooting**

### Common Issues

#### **Images Not Loading**
```bash
# Check if images are in public/ folder
ls public/images/

# Verify image paths in components
# Use: /image.jpg (not ./image.jpg)
```

#### **Styles Not Applying**
```bash
# Rebuild Tailwind CSS
npm run build

# Check if Tailwind classes are correct
# Verify tailwind.config.js is properly configured
```

#### **TypeScript Errors**
```bash
# Check for type errors
npm run type-check

# Install missing type definitions
npm install @types/package-name
```

#### **Build Failures**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for conflicting dependencies
npm ls
```

### Performance Optimization

#### **Image Optimization**
```typescript
// Use next/image equivalent for Vite
import { defineConfig } from 'vite';
import { imageOptimize } from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    imageOptimize({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.65, 0.8] },
    })
  ]
});
```

#### **Bundle Size Optimization**
```typescript
// Lazy load components
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

// Use in component:
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

### Browser Compatibility

#### **CSS Grid Fallbacks**
```css
/* Fallback for older browsers */
.grid-fallback {
  display: flex;
  flex-wrap: wrap;
}

@supports (display: grid) {
  .grid-fallback {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
```

#### **JavaScript Polyfills**
```typescript
// Add to main.tsx for older browser support
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

---

## 📞 **Need More Help?**

### Resources
- 📖 [Component Documentation](./docs/COMPONENTS.md)
- 🚀 [Deployment Guide](./docs/DEPLOYMENT.md)
- 🎨 [Design System](./docs/DESIGN.md)

### Support Channels
- 🌐 Website: [bytekron.com](https://bytekron.com)
- 💬 Discord: [@bytekron](https://discord.com/users/bytekron)
- 📧 Email: contact@bytekron.com

### Professional Services
Need custom development? We offer:
- 🎨 Custom design modifications
- 🔌 API integrations
- 🚀 Performance optimization
- 📱 Mobile app development

Contact us for a quote!

---

**Happy customizing! 🎉**