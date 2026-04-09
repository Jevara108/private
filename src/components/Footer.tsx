/**
 * Footer Component
 * 
 * Website footer containing site navigation, social media links, community information,
 * and legal/copyright details. Features responsive design and dynamic player count display.
 * 
 * Key Features:
 * - Site navigation links organized by category
 * - Social media links with proper accessibility
 * - Discord community showcase with member count
 * - Dynamic player count display
 * - Copyright and legal information
 * - Responsive grid layout for different screen sizes
 * - Minecraft character decorative elements
 * 
 * Footer Sections:
 * - Brand identity with logo and player count
 * - Site map navigation links
 * - Social media platform links
 * - Legal documents and policies
 * - Discord community promotion
 * - Developer attribution with link
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 2.1.0 - Added clickable Bytekron link
 */

import React from 'react';
import { CreeperHeadIcon } from './icons/CreeperHeadIcon';

// ==================== INTERFACES ====================

/**
 * Footer Props Interface
 * 
 * Props passed to the Footer component for dynamic content.
 * 
 * @interface FooterProps
 * @property {number} playerCount - Current number of online players
 */
interface FooterProps {
  playerCount: number;
}

/**
 * Navigation Link Interface
 * 
 * Represents a navigation link with its properties.
 * 
 * @interface NavLink
 * @property {string} href - Link destination URL or anchor
 * @property {string} label - Display text for the link
 * @property {boolean} external - Whether link opens in new tab (optional)
 */
interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

/**
 * Footer Section Interface
 * 
 * Represents a footer section with its title and links.
 * 
 * @interface FooterSection
 * @property {string} title - Section heading
 * @property {NavLink[]} links - Array of navigation links
 */
interface FooterSection {
  title: string;
  links: NavLink[];
}

// ==================== CONSTANTS ====================

/**
 * Footer Navigation Configuration
 * 
 * Defines all footer sections with their respective navigation links.
 * Organized by logical groupings for better user experience.
 * 
 * @constant {FooterSection[]} footerSections
 */
const footerSections: FooterSection[] = [
  {
    title: 'Site Map',
    links: [
      { href: '#home', label: 'Home' },
      { href: '#ranking', label: 'Rankings' },
      { href: '#shop', label: 'Shop' },
      { href: '#map', label: 'Server Map' },
      { href: '#vote', label: 'Vote' },
      { href: '#bans', label: 'Bans' },
      { href: '#staff', label: 'Staff' },
      { href: '#faq', label: 'FAQ' }
    ]
  },
  {
    title: 'Social Media',
    links: [
      { href: 'https://facebook.com/creepercraft', label: 'Facebook', external: true },
      { href: 'https://youtube.com/creepercraft', label: 'YouTube', external: true },
      { href: 'https://tiktok.com/@creepercraft', label: 'TikTok', external: true },
      { href: 'https://twitter.com/creepercraft', label: 'Twitter', external: true },
      { href: 'https://discord.gg/creepercraft', label: 'Discord', external: true }
    ]
  },
  {
    title: 'Legal',
    links: [
      { href: '/terms', label: 'Terms & Conditions', external: true },
      { href: '/privacy', label: 'Privacy Policy', external: true },
      { href: '/refunds', label: 'Refund Policy', external: true },
      { href: '/rules', label: 'Server Rules', external: true }
    ]
  }
];

/**
 * Community Statistics
 * 
 * Static community information for the Discord showcase.
 * 
 * @constant {Object} communityStats
 */
const communityStats = {
  discordMembers: 5000, // This will be updated by the parent component
  communityIcon: '💬',
  communityTitle: 'COMMUNITY',
  communitySubtitle: 'Join Discord'
};

// ==================== COMPONENT ====================

/**
 * Footer Component
 * 
 * Main footer component that renders all footer sections with proper
 * responsive design and accessibility features.
 * 
 * @param {FooterProps} props - Component props
 * @returns {JSX.Element} Footer JSX
 */
export const Footer: React.FC<FooterProps> = ({ playerCount }) => {
  
  // ==================== RENDER HELPERS ====================
  
  /**
   * Render Navigation Link
   * 
   * Renders a single navigation link with proper accessibility attributes.
   * 
   * @param {NavLink} link - Link configuration object
   * @param {number} index - Index for React key
   * @returns {JSX.Element} Navigation link JSX
   */
  const renderNavLink = (link: NavLink, index: number) => (
    <li key={index}>
      <a 
        href={link.href} 
        className="hover:text-white transition-colors duration-200 text-sm"
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        aria-label={link.external ? `${link.label} (opens in new tab)` : link.label}
      >
        {link.label}
      </a>
    </li>
  );

  /**
   * Render Footer Section
   * 
   * Renders a complete footer section with title and navigation links.
   * 
   * @param {FooterSection} section - Section configuration object
   * @param {number} index - Index for React key
   * @returns {JSX.Element} Footer section JSX
   */
  const renderFooterSection = (section: FooterSection, index: number) => (
    <div key={index}>
      <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
        {section.title}
      </h4>
      <ul className="space-y-2 text-light-gray">
        {section.links.map((link, linkIndex) => renderNavLink(link, linkIndex))}
      </ul>
    </div>
  );

  // ==================== RENDER ====================
  
  return (
    <footer className="bg-primary-dark border-t border-white/10" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
        
        {/* Discord Community Panel */}
        <div className="mb-8 sm:mb-12">
          <div className="community-callout bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-4 sm:p-6 max-w-sm relative overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
            {/* Community content */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="text-3xl sm:text-4xl flex-shrink-0" aria-hidden="true">
                {communityStats.communityIcon}
              </div>
              <div className="min-w-0">
                <h4 className="text-white font-bold text-lg sm:text-xl uppercase tracking-wider">
                  {communityStats.communityTitle}
                </h4>
                <p className="text-blue-100 text-sm sm:text-base">
                  {communityStats.communitySubtitle}
                </p>
                <p className="text-white font-bold text-xl sm:text-2xl">
                  {playerCount.toLocaleString()}+
                </p>
              </div>
            </div>
            
            {/* Decorative Minecraft character */}
            <div className="absolute -bottom-2 -right-2" aria-hidden="true">
              <img 
                src="https://mc-heads.net/body/MHF_Steve/100" 
                alt="" 
                className="w-12 h-18 sm:w-16 sm:h-24 object-contain opacity-30"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-grass-green rounded flex items-center justify-center flex-shrink-0">
                <CreeperHeadIcon />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white tracking-wider">
                CREEPERCRAFT
              </span>
            </div>
            <p className="text-light-gray text-sm mb-2">
              The ultimate Minecraft server experience with hardcore gameplay and epic adventures.
            </p>
            <p className="text-light-gray text-sm font-medium">
              <span className="text-grass-green">{playerCount.toLocaleString()}</span> online now
            </p>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => renderFooterSection(section, index))}
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          
          {/* Copyright Information */}
          <div className="text-mid-gray text-xs text-center lg:text-left">
            <p className="mb-1">
              © 2025 CREEPERCRAFT sp. z o.o. All rights reserved 2016 – 2025
            </p>
            <p>
              This server is not affiliated with Mojang AB.
            </p>
          </div>
          
          {/* Developer Attribution and Decorative Elements */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-mid-gray text-xs">
              Coded with ❤️ by{' '}
              <a 
                href="https://bytekron.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-grass-green hover:text-green-400 transition-colors duration-200 font-medium"
                aria-label="Bytekron - Web Development Agency (opens in new tab)"
              >
                Bytekron
              </a>
            </span>
            
            {/* Decorative Minecraft Characters */}
            <div className="flex space-x-2" aria-hidden="true">
              <img 
                src="https://mc-heads.net/body/MHF_Steve/50" 
                alt="" 
                className="w-6 h-9 sm:w-8 sm:h-12 object-contain opacity-50 hover:opacity-70 transition-opacity duration-200"
                loading="lazy"
              />
              <img 
                src="https://mc-heads.net/body/MHF_Alex/50" 
                alt="" 
                className="w-6 h-9 sm:w-8 sm:h-12 object-contain opacity-50 hover:opacity-70 transition-opacity duration-200"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};