/**
 * Navigation Component
 * 
 * Responsive navigation header with mobile menu support.
 * Features fixed positioning, glass morphism design, and smooth transitions.
 * 
 * Key Features:
 * - Responsive design (desktop/mobile)
 * - Glass morphism styling
 * - Mobile hamburger menu
 * - Smooth animations and transitions
 * - Accessibility support
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 2.0.0 - Enhanced mobile responsiveness and accessibility
 */

import React from 'react';
import { Menu, X } from 'lucide-react';
import { CreeperHeadIcon } from './icons/CreeperHeadIcon';

// ==================== INTERFACES ====================

/**
 * Props interface for Navigation component
 * 
 * @interface NavigationProps
 * @property {boolean} isMenuOpen - Current state of mobile menu
 * @property {function} setIsMenuOpen - Function to toggle mobile menu state
 */
interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

// ==================== COMPONENT ====================

/**
 * Navigation Component
 * 
 * Fixed header navigation with responsive mobile menu and glass morphism design.
 * Automatically closes mobile menu when navigation links are clicked.
 * 
 * @param {NavigationProps} props - Component props
 * @returns {JSX.Element} Navigation JSX
 */
export const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  
  // ==================== EVENT HANDLERS ====================
  
  /**
   * Handle Navigation Link Click
   * 
   * Closes the mobile menu when any navigation link is clicked.
   * Improves UX by automatically hiding the menu after navigation.
   * 
   * @function handleLinkClick
   */
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // ==================== RENDER ====================
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          
          {/* 
            Logo Section
            Brand logo with Creeper icon and text
          */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Creeper head icon with brand colors */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-grass-green rounded flex items-center justify-center">
              <CreeperHeadIcon />
            </div>
            {/* Brand name with responsive typography */}
            <span className="text-lg sm:text-xl font-bold text-white">CREEPERCRAFT</span>
          </div>
          
          {/* 
            Desktop Navigation Menu
            Hidden on mobile, visible on large screens
            Note: SHOP and RANKING positions have been swapped as requested
          */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href="#home" className="text-light-gray hover:text-white transition-colors text-sm font-medium nav-link">HOME</a>
            <a href="#ranking" className="text-light-gray hover:text-white transition-colors text-sm font-medium nav-link">RANKING</a>
            <a href="#shop" className="text-light-gray hover:text-white transition-colors text-sm font-medium nav-link">SHOP</a>
            <a href="#map" className="text-light-gray hover:text-white transition-colors text-sm font-medium nav-link">MAP</a>
            <a href="#vote" className="text-light-gray hover:text-white transition-colors text-sm font-medium nav-link">VOTE</a>
            <a href="#bans" className="text-light-gray hover:text-white transition-colors text-sm font-medium nav-link">BANS</a>
            <a href="#staff" className="text-light-gray hover:text-white transition-colors text-sm font-medium nav-link">STAFF</a>
            <a href="#faq" className="text-light-gray hover:text-white transition-colors text-sm font-medium nav-link">FAQ</a>
            <a href="#discord" className="text-light-gray hover:text-white transition-colors text-sm font-medium nav-link">DISCORD</a>
          </div>

          {/* 
            Desktop CTA Button
            Call-to-action button for server shop
          */}
          <div className="hidden lg:block flex-shrink-0">
            <button className="btn btn-green text-xs xl:text-sm px-4 xl:px-6 py-2 xl:py-3">
              SERVER SHOP
            </button>
          </div>

          {/* 
            Mobile Menu Toggle Button
            Hamburger/X icon for mobile menu control
          */}
          <button 
            className="lg:hidden p-2 -mr-2 text-white hover:text-grass-green transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 
        Mobile Navigation Overlay
        Full-screen mobile menu with backdrop blur
      */}
      {isMenuOpen && (
        <>
          {/* 
            Backdrop Overlay
            Semi-transparent backdrop that closes menu when clicked
          */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* 
            Mobile Menu Content
            Slide-down menu with navigation links and CTA
            Note: SHOP and RANKING positions swapped here too
          */}
          <div className="fixed top-14 sm:top-16 left-0 right-0 z-50 lg:hidden">
            <div className="glass border-t border-white/10 shadow-2xl">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="py-4 space-y-1">
                  {/* Mobile Navigation Links */}
                  <a 
                    href="#home" 
                    className="block px-4 py-3 text-light-gray hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 nav-link"
                    onClick={handleLinkClick}
                  >
                    HOME
                  </a>
                  <a 
                    href="#ranking" 
                    className="block px-4 py-3 text-light-gray hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 nav-link"
                    onClick={handleLinkClick}
                  >
                    RANKING
                  </a>
                  <a 
                    href="#shop" 
                    className="block px-4 py-3 text-light-gray hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 nav-link"
                    onClick={handleLinkClick}
                  >
                    SHOP
                  </a>
                  <a 
                    href="#map" 
                    className="block px-4 py-3 text-light-gray hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 nav-link"
                    onClick={handleLinkClick}
                  >
                    MAP
                  </a>
                  <a 
                    href="#vote" 
                    className="block px-4 py-3 text-light-gray hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 nav-link"
                    onClick={handleLinkClick}
                  >
                    VOTE
                  </a>
                  <a 
                    href="#bans" 
                    className="block px-4 py-3 text-light-gray hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 nav-link"
                    onClick={handleLinkClick}
                  >
                    BANS
                  </a>
                  <a 
                    href="#staff" 
                    className="block px-4 py-3 text-light-gray hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 nav-link"
                    onClick={handleLinkClick}
                  >
                    STAFF
                  </a>
                  <a 
                    href="#faq" 
                    className="block px-4 py-3 text-light-gray hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 nav-link"
                    onClick={handleLinkClick}
                  >
                    FAQ
                  </a>
                  <a 
                    href="#discord" 
                    className="block px-4 py-3 text-light-gray hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 nav-link"
                    onClick={handleLinkClick}
                  >
                    DISCORD
                  </a>
                  
                  {/* 
                    Mobile CTA Button
                    Full-width call-to-action button for mobile
                  */}
                  <div className="pt-3 border-t border-white/10 mt-3">
                    <button 
                      className="w-full btn btn-green text-center"
                      onClick={handleLinkClick}
                    >
                      SERVER SHOP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};