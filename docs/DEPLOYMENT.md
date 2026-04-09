# 🚀 **Deployment Guide**

Complete guide for deploying your CreeperCraft website to various hosting platforms.

## 📋 **Table of Contents**

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Build Process](#build-process)
3. [Hosting Platforms](#hosting-platforms)
4. [Domain & DNS Setup](#domain--dns-setup)
5. [Performance Optimization](#performance-optimization)
6. [Monitoring & Analytics](#monitoring--analytics)
7. [Troubleshooting](#troubleshooting)

---

## ✅ **Pre-Deployment Checklist**

### Content Review
- [ ] Update all server information (IP, name, descriptions)
- [ ] Replace placeholder images with your server's images
- [ ] Update staff information with your team
- [ ] Customize FAQ with server-specific questions
- [ ] Set correct pricing for VIP packages
- [ ] Update social media links
- [ ] Review and update SEO meta tags

### Technical Review
- [ ] Test all interactive features
- [ ] Verify responsive design on all devices
- [ ] Check all links and navigation
- [ ] Test form submissions (if any)
- [ ] Validate HTML and accessibility
- [ ] Run performance audit
- [ ] Test in multiple browsers

### SEO & Analytics
- [ ] Update `robots.txt` with your domain
- [ ] Update `sitemap.xml` with your URLs
- [ ] Set up Google Analytics
- [ ] Configure Google Search Console
- [ ] Add social media meta tags
- [ ] Test Open Graph previews

---

## 🔨 **Build Process**

### Local Build

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

### Build Output

The build process creates a `dist/` folder containing:
```
dist/
├── index.html          # Main HTML file
├── assets/            # Optimized CSS, JS, and images
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── [images]
└── [static files]     # Copied from public/
```

### Environment Variables

Create `.env` file for environment-specific settings:
```bash
# .env
VITE_SERVER_IP=play.yourserver.net
VITE_DISCORD_INVITE=https://discord.gg/yourserver
VITE_ANALYTICS_ID=G-XXXXXXXXXX
```

Use in components:
```typescript
const serverIP = import.meta.env.VITE_SERVER_IP;
```

---

## 🌐 **Hosting Platforms**

### 🟢 **Netlify (Recommended)**

**Why Netlify:**
- Free tier with generous limits
- Automatic deployments from Git
- Built-in CDN and SSL
- Form handling and serverless functions
- Easy custom domain setup

**Deployment Steps:**

1. **Connect Repository:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab repository

2. **Configure Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables:**
   - Go to Site settings → Environment variables
   - Add your environment variables

4. **Custom Domain:**
   - Go to Domain settings
   - Add your custom domain
   - Configure DNS (see DNS section)

**Netlify Configuration File:**
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 🔵 **Vercel**

**Why Vercel:**
- Excellent performance
- Automatic deployments
- Built-in analytics
- Edge functions support

**Deployment Steps:**

1. **Import Project:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from Git repository

2. **Configure:**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Environment Variables:**
   - Add in project settings

**Vercel Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 🟠 **Cloudflare Pages**

**Why Cloudflare Pages:**
- Global CDN
- Unlimited bandwidth
- Built-in security features
- Free SSL certificates

**Deployment Steps:**

1. **Connect Repository:**
   - Go to Cloudflare Pages
   - Connect Git repository

2. **Build Settings:**
   ```
   Build command: npm run build
   Build output directory: dist
   ```

### 🟡 **GitHub Pages**

**Why GitHub Pages:**
- Free hosting for public repositories
- Automatic deployments
- Custom domain support

**Deployment Steps:**

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Add deploy script:**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

### 🔴 **Traditional Hosting (cPanel/FTP)**

**For shared hosting providers:**

1. **Build locally:**
```bash
npm run build
```

2. **Upload files:**
   - Upload contents of `dist/` folder to your web root
   - Usually `public_html/` or `www/`

3. **Configure server:**
   - Ensure server supports SPA routing
   - Add `.htaccess` for Apache:

```apache
# .htaccess
RewriteEngine On
RewriteBase /

# Handle Angular and Vue.js routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

---

## 🌍 **Domain & DNS Setup**

### Domain Registration

**Recommended Registrars:**
- Namecheap
- Google Domains
- Cloudflare Registrar
- GoDaddy

### DNS Configuration

**For Netlify:**
```
Type: CNAME
Name: www
Value: your-site.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

**For Vercel:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

**For Cloudflare Pages:**
```
Type: CNAME
Name: www
Value: your-site.pages.dev

Type: A
Name: @
Value: [Cloudflare IP]
```

### SSL Certificate

Most modern hosting platforms provide free SSL certificates automatically. Ensure:
- [ ] HTTPS is enabled
- [ ] HTTP redirects to HTTPS
- [ ] Mixed content warnings are resolved

---

## ⚡ **Performance Optimization**

### Image Optimization

1. **Compress images:**
```bash
# Install imagemin
npm install --save-dev vite-plugin-imagemin

# Configure in vite.config.ts
import { defineConfig } from 'vite';
import { ViteImageOptimize } from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    ViteImageOptimize({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.65, 0.8] },
    })
  ]
});
```

2. **Use WebP format:**
```html
<picture>
  <source srcset="/image.webp" type="image/webp">
  <img src="/image.jpg" alt="Description">
</picture>
```

### Code Splitting

```typescript
// Lazy load components
const LazySection = React.lazy(() => import('./LazySection'));

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <LazySection />
</Suspense>
```

### Caching Strategy

**HTTP Headers:**
```
Cache-Control: public, max-age=31536000  # 1 year for assets
Cache-Control: public, max-age=3600      # 1 hour for HTML
```

**Service Worker (optional):**
```typescript
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### Performance Monitoring

**Core Web Vitals:**
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

**Tools:**
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse

---

## 📊 **Monitoring & Analytics**

### Google Analytics 4

1. **Create GA4 property:**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create new property
   - Get tracking ID

2. **Add to your site:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

3. **Track events:**
```typescript
// Track server IP copies
const copyServerIP = () => {
  navigator.clipboard.writeText('play.yourserver.net');
  gtag('event', 'server_ip_copy', {
    event_category: 'engagement',
    event_label: 'hero_section'
  });
};
```

### Google Search Console

1. **Add property:**
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Add your domain
   - Verify ownership

2. **Submit sitemap:**
   - Go to Sitemaps section
   - Submit `https://yourdomain.com/sitemap.xml`

### Error Monitoring

**Sentry Integration:**
```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

### Uptime Monitoring

**Free Services:**
- UptimeRobot
- StatusCake
- Pingdom (free tier)

---

## 🐛 **Troubleshooting**

### Common Deployment Issues

#### **Build Failures**

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: "Out of memory"**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### **Routing Issues**

**404 on page refresh:**
- Configure server for SPA routing
- Add redirect rules (see hosting sections above)

**Assets not loading:**
- Check base URL in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/', // or '/subdirectory/' if deployed in subdirectory
});
```

#### **Performance Issues**

**Slow loading:**
- Enable compression (gzip/brotli)
- Optimize images
- Use CDN
- Minimize bundle size

**Layout shifts:**
- Set explicit dimensions for images
- Reserve space for dynamic content
- Use CSS containment

#### **SSL Issues**

**Mixed content warnings:**
- Ensure all resources use HTTPS
- Update API endpoints to HTTPS
- Check third-party integrations

### Debugging Tools

**Browser DevTools:**
- Network tab for loading issues
- Performance tab for speed analysis
- Console for JavaScript errors
- Lighthouse for audits

**Online Tools:**
- [GTmetrix](https://gtmetrix.com) - Performance analysis
- [WebPageTest](https://webpagetest.org) - Detailed performance testing
- [SSL Labs](https://ssllabs.com/ssltest/) - SSL configuration test

---

## 🚀 **Post-Deployment**

### Launch Checklist

- [ ] Test all functionality on live site
- [ ] Verify analytics tracking
- [ ] Check all forms and interactions
- [ ] Test on multiple devices/browsers
- [ ] Verify SEO meta tags
- [ ] Submit to search engines
- [ ] Set up monitoring alerts
- [ ] Create backup strategy

### Ongoing Maintenance

**Weekly:**
- Check analytics for issues
- Monitor uptime alerts
- Review error logs

**Monthly:**
- Update dependencies
- Review performance metrics
- Check for broken links
- Update content as needed

**Quarterly:**
- Security audit
- Performance optimization
- SEO review
- Backup verification

---

## 📞 **Support**

Need deployment help?

- 📖 [Component Documentation](./COMPONENTS.md)
- 🎨 [Customization Guide](../CUSTOMIZATION.md)
- 🌐 Website: [bytekron.com](https://bytekron.com)
- 💬 Discord: [@bytekron](https://discord.com/users/bytekron)
- 📧 Email: contact@bytekron.com

### Professional Services

We offer deployment assistance:
- 🚀 One-click deployment setup
- 🔧 Custom hosting configuration
- 📊 Analytics and monitoring setup
- 🛡️ Security hardening

Contact us for a quote!

---

**Happy deploying! 🎉**