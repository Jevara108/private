/**
 * SEO Head Component
 * 
 * Dynamic SEO component for managing page-specific meta tags,
 * structured data, and Open Graph properties. This component
 * can be used to override default SEO settings for specific pages.
 * 
 * Features:
 * - Dynamic title and description
 * - Custom Open Graph properties
 * - Structured data injection
 * - Canonical URL management
 * - Social media optimization
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 1.0.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

// ==================== INTERFACES ====================

/**
 * SEO Head Props Interface
 * 
 * @interface SEOHeadProps
 * @property {string} title - Page title (will be appended with site name)
 * @property {string} description - Page description for meta tags
 * @property {string} keywords - Additional keywords for the page
 * @property {string} canonical - Canonical URL for the page
 * @property {string} ogImage - Open Graph image URL
 * @property {string} ogType - Open Graph type (website, article, etc.)
 * @property {Object} structuredData - JSON-LD structured data
 * @property {boolean} noIndex - Whether to prevent indexing
 */
interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noIndex?: boolean;
}

// ==================== COMPONENT ====================

/**
 * SEO Head Component
 * 
 * Manages dynamic SEO meta tags and structured data for specific pages
 * or sections. Extends the base SEO configuration from index.html.
 * 
 * @param {SEOHeadProps} props - Component props
 * @returns {JSX.Element} Helmet component with SEO tags
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  structuredData,
  noIndex = false
}) => {
  // Default values
  const defaultTitle = 'Test - Premium Minecraft Server | Hardcore PvP & Guild Wars';
  const defaultDescription = 'Join CreeperCraft, the ultimate Minecraft server experience with hardcore gameplay, epic guild wars, custom dungeons, and VIP ranks. 260+ active players, 24/7 uptime.';
  const defaultKeywords = 'minecraft server, hardcore minecraft, pvp server, guild wars, minecraft dungeons, vip ranks, minecraft community, survival server, custom minecraft, minecraft pvp';
  const siteUrl = 'https://creepercraft.net';
  
  // Construct full title
  const fullTitle = title ? `${title} | CreeperCraft` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords;
  const canonicalUrl = canonical || siteUrl;
  const imageUrl = ogImage || `${siteUrl}/og-image.jpg`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={imageUrl} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

/**
 * Default Export
 */
export default SEOHead;