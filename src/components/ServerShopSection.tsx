/**
 * Server Shop Section Component
 * 
 * Comprehensive shop interface featuring VIP packages, bundles, and enhanced crates.
 * Includes interactive carousels, animated product cards, and themed purchasing options.
 * 
 * Features:
 * - Bundle carousel with navigation arrows
 * - VIP rank comparison table with detailed perks
 * - Enhanced crate cards with variant-specific styling
 * - Animated visual effects and hover states
 * - Responsive design for all screen sizes
 * - Themed color schemes for different product types
 * 
 * Product Categories:
 * - Bundles: Curated item sets with progressive pricing
 * - VIP Ranks: Monthly/lifetime subscriptions with exclusive perks
 * - Crates: Mystery boxes with rarity-based rewards
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 3.0.0 - Enhanced crates with visual effects and themed styling
 */

import React from 'react';
import { ChevronLeft, ChevronRight, Check, X, Crown, Star, Zap, Shield } from 'lucide-react';
import { ChestComponent } from './ChestComponent';
import Link from "next/link";

// ==================== INTERFACES ====================

/**
 * Props interface for ServerShopSection component
 * 
 * @interface ServerShopSectionProps
 * @property {number} activeSlide - Currently active bundle slide index
 * @property {function} setActiveSlide - Function to update active slide
 */
interface ServerShopSectionProps {
  activeSlide: number;
  setActiveSlide: (slide: number) => void;
}

/**
 * Crate Configuration Interface
 * 
 * Defines the complete styling and properties for each crate type.
 * Used to create consistent theming across different crate variants.
 * 
 * @interface CrateConfig
 * @property {string} name - Display name of the crate
 * @property {string} price - Formatted price with currency
 * @property {string} variant - Crate type for ChestComponent
 * @property {string} description - Brief description of crate contents
 * @property {string} color - Primary color theme
 * @property {string} bgGradient - Background gradient classes
 * @property {string} borderColor - Border color classes
 * @property {string} buttonGradient - Button gradient classes
 * @property {string} buttonHover - Button hover state classes
 * @property {string} glowColor - Glow effect color classes
 */
interface CrateConfig {
  name: string;
  price: string;
  variant: 'mystery' | 'treasure' | 'legendary';
  description: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  buttonGradient: string;
  buttonHover: string;
  glowColor: string;
}

// ==================== COMPONENT ====================

/**
 * Server Shop Section Component
 * 
 * Main shop interface component that renders all purchasable items
 * including bundles, VIP ranks, and crates with enhanced visual effects.
 * 
 * @param {ServerShopSectionProps} props - Component props
 * @returns {JSX.Element} Server shop section JSX
 */
export const ServerShopSection: React.FC<ServerShopSectionProps> = ({ activeSlide, setActiveSlide }) => {
  
  // ==================== CRATE CONFIGURATIONS ====================
  
  /**
   * Crate Configuration Array
   * 
   * Defines all available crates with their complete styling properties.
   * Each crate has unique theming, pricing, and visual effects.
   * 
   * @constant {CrateConfig[]} crateConfigs
   */
  const crateConfigs: CrateConfig[] = [
    { 
      name: 'Mystery Crate', 
      price: '€30', 
      variant: 'mystery',
      description: 'Common rewards with surprise elements',
      color: 'brown',
      bgGradient: 'from-amber-900/20 to-yellow-800/20',
      borderColor: 'border-amber-600/30',
      buttonGradient: 'from-amber-700 to-yellow-700',
      buttonHover: 'hover:from-amber-600 hover:to-yellow-600',
      glowColor: 'shadow-amber-600/30'
    },
    { 
      name: 'Treasure Crate', 
      price: '€45', 
      variant: 'treasure',
      description: 'Rare golden rewards and valuable items',
      color: 'gold',
      bgGradient: 'from-yellow-600/20 to-orange-500/20',
      borderColor: 'border-yellow-500/30',
      buttonGradient: 'from-yellow-600 to-orange-600',
      buttonHover: 'hover:from-yellow-500 hover:to-orange-500',
      glowColor: 'shadow-yellow-500/30'
    },
    { 
      name: 'Legendary Crate', 
      price: '€60', 
      variant: 'legendary',
      description: 'Epic magical items and exclusive rewards',
      color: 'purple',
      bgGradient: 'from-purple-600/20 to-indigo-600/20',
      borderColor: 'border-purple-500/30',
      buttonGradient: 'from-purple-600 to-indigo-600',
      buttonHover: 'hover:from-purple-500 hover:to-indigo-500',
      glowColor: 'shadow-purple-500/30'
    }
  ];

  // ==================== RENDER HELPERS ====================
  
  /**
   * Render Crate Particles
   * 
   * Generates variant-specific floating particles for visual enhancement.
   * Each crate type has unique particle animations and colors.
   * 
   * @param {string} variant - Crate variant type
   * @returns {JSX.Element | null} Particle elements or null
   */
  const renderCrateParticles = (variant: string) => {
    switch (variant) {
      case 'mystery':
        return (
          <>
            <div className="absolute w-1 h-1 bg-amber-400/60 rounded-full animate-float-1 group-hover:opacity-100 opacity-30" style={{ top: '15%', left: '15%' }} />
            <div className="absolute w-1.5 h-1.5 bg-yellow-300/50 rounded-full animate-float-2 group-hover:opacity-100 opacity-40" style={{ top: '25%', right: '20%' }} />
            <div className="absolute w-1 h-1 bg-amber-300/70 rounded-full animate-float-3 group-hover:opacity-100 opacity-20" style={{ bottom: '20%', left: '25%' }} />
          </>
        );
      case 'treasure':
        return (
          <>
            <div className="absolute w-2 h-2 bg-yellow-400/70 rounded-full animate-sparkle-1 group-hover:opacity-100 opacity-50" style={{ top: '10%', left: '20%' }} />
            <div className="absolute w-1 h-1 bg-orange-300/80 rounded-full animate-sparkle-2 group-hover:opacity-100 opacity-40" style={{ top: '30%', right: '15%' }} />
            <div className="absolute w-1.5 h-1.5 bg-yellow-300/60 rounded-full animate-sparkle-3 group-hover:opacity-100 opacity-60" style={{ bottom: '25%', left: '15%' }} />
            <div className="absolute w-1 h-1 bg-orange-400/70 rounded-full animate-sparkle-4 group-hover:opacity-100 opacity-30" style={{ bottom: '15%', right: '25%' }} />
          </>
        );
      case 'legendary':
        return (
          <>
            <div className="absolute w-2 h-2 bg-purple-400/60 rounded-full animate-float-1 group-hover:opacity-100 opacity-40" style={{ top: '12%', left: '18%' }} />
            <div className="absolute w-1 h-1 bg-indigo-300/80 rounded-full animate-float-2 group-hover:opacity-100 opacity-30" style={{ top: '28%', right: '12%' }} />
            <div className="absolute w-1.5 h-1.5 bg-violet-300/70 rounded-full animate-float-3 group-hover:opacity-100 opacity-50" style={{ bottom: '22%', left: '22%' }} />
            <div className="absolute w-1 h-1 bg-purple-300/60 rounded-full animate-float-4 group-hover:opacity-100 opacity-35" style={{ bottom: '18%', right: '18%' }} />
            {/* Magical aura for legendary */}
            <div className="absolute inset-0 bg-gradient-conic from-purple-500/5 via-violet-500/3 to-indigo-500/5 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-xl"></div>
          </>
        );
      default:
        return null;
    }
  };

  /**
   * Get Crate Icon
   * 
   * Returns the appropriate icon component for each crate variant.
   * 
   * @param {string} variant - Crate variant type
   * @returns {JSX.Element} Icon component
   */
  const getCrateIcon = (variant: string) => {
    switch (variant) {
      case 'legendary': return <Crown className="w-4 h-4" />;
      case 'treasure': return <Star className="w-4 h-4" />;
      case 'mystery': return <Zap className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  /**
   * Get Crate Tier Label
   * 
   * Returns the tier label and styling for each crate variant.
   * 
   * @param {string} variant - Crate variant type
   * @returns {Object} Tier configuration object
   */
  const getCrateTier = (variant: string) => {
    switch (variant) {
      case 'legendary': 
        return { 
          label: 'Epic Tier', 
          classes: 'bg-purple-500/20 text-purple-300 border border-purple-400/30' 
        };
      case 'treasure': 
        return { 
          label: 'Rare Tier', 
          classes: 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' 
        };
      case 'mystery': 
        return { 
          label: 'Common Tier', 
          classes: 'bg-amber-500/20 text-amber-300 border border-amber-400/30' 
        };
      default: 
        return { 
          label: 'Unknown Tier', 
          classes: 'bg-gray-500/20 text-gray-300 border border-gray-400/30' 
        };
    }
  };

  // ==================== RENDER ====================
  
  return (
    <section id="shop" className="py-20 bg-secondary-dark">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="inline-block bg-grass-green text-primary-dark text-xs px-4 py-2 rounded-full font-bold mb-4 uppercase tracking-wider">
            DISCOVER OUR SERVICES
          </span>
          <h2 className="text-4xl font-black mb-4 text-white tracking-wider uppercase">SERVER SHOP</h2>
          <p className="text-lg text-light-gray max-w-2xl">Join our dynamic game and experience the best gameplay in Hardcore mode</p>
        </div>

        {/* Bundles Carousel Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-wide">SETS</h3>
          <div className="bundles-carousel glass rounded-2xl p-6 relative">
            {/* Navigation arrows */}
            <button 
              className="carousel-arrow left-4"
              onClick={() => setActiveSlide(activeSlide > 0 ? activeSlide - 1 : bundles.length - 1)}
              aria-label="Previous bundle"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              className="carousel-arrow right-4"
              onClick={() => setActiveSlide(activeSlide < bundles.length - 1 ? activeSlide + 1 : 0)}
              aria-label="Next bundle"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <div className="mb-4">
                  <span className="text-sm text-light-gray mb-1 block uppercase">Set</span>
                  <h4 className="text-2xl font-bold text-white mb-4">{bundles[activeSlide].name}</h4>
                </div>
                
                <div className="items-grid grid grid-cols-4 gap-3 mb-6">
                  {bundles[activeSlide].items.map((item, index) => (
                    <div key={index} className="item-slot">
                      <div className="text-2xl mb-1">{item}</div>
                      <div className="text-xs text-light-gray uppercase">Item</div>
                    </div>
                  ))}
                </div>

                <button className="btn btn-green">
                  BUY FOR {bundles[activeSlide].price}
                </button>
                

              </div>
              <div className="text-center">
                <div className="w-48 h-48 mx-auto flex items-center justify-center">
                  <img 
                    src="https://mc-heads.net/body/MHF_Steve/200" 
                    alt="Minecraft Character" 
                    className="w-32 h-48 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced VIP Packages Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-wide">PREMIUM RANKS</h3>
          <div className="compare-table grid lg:grid-cols-3 gap-8">
            
            {/* VIP Package - Enhanced */}
            <div className="vip-container group relative overflow-hidden rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-grass-green/20 via-green-500/10 to-emerald-600/20 opacity-60 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-xl"></div>
              
              {/* Floating particles */}
              <div className="absolute w-2 h-2 bg-grass-green/60 rounded-full animate-float-1 group-hover:opacity-100 opacity-40" style={{ top: '15%', left: '10%' }} />
              <div className="absolute w-1 h-1 bg-green-400/80 rounded-full animate-float-2 group-hover:opacity-100 opacity-30" style={{ top: '25%', right: '15%' }} />
              <div className="absolute w-1.5 h-1.5 bg-emerald-300/70 rounded-full animate-float-3 group-hover:opacity-100 opacity-50" style={{ bottom: '20%', left: '20%' }} />
              
              {/* Main container */}
              <div className="relative z-10 glass rounded-3xl overflow-hidden border-2 border-grass-green/30 group-hover:border-grass-green/60 transition-all duration-500">
                {/* Header with enhanced styling */}
                <div className="bg-gradient-to-br from-grass-green via-green-500 to-emerald-600 p-8 text-center relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute w-32 h-32 bg-white/10 rounded-full -top-16 -left-16 animate-pulse"></div>
                    <div className="absolute w-24 h-24 bg-white/5 rounded-full -bottom-12 -right-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-28 h-28 mx-auto mb-4 relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      <img 
                        src="/6b325bb7a64f9caca7ceedbd933505c5.png" 
                        alt="VIP Badge" 
                        className="w-full h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-full"></div>
                    </div>
                    <h4 className="text-3xl font-black text-primary-dark mb-2 tracking-wider drop-shadow-lg">VIP</h4>
                    <p className="text-primary-dark/80 font-bold uppercase text-sm tracking-widest">Premium Rank</p>
                    <div className="flex justify-center mt-3 space-x-1">
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-3xl font-black text-grass-green mb-2">€50</div>
                    <a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  role="button"
  aria-label="Purchase VIP"
  className="btn btn-green w-full inline-flex items-center justify-center text-lg py-4 no-underline group-hover:shadow-2xl group-hover:shadow-grass-green/30 transition-all duration-300 relative overflow-hidden"
>
  <span className="relative z-10">PURCHASE VIP</span>
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
</a>

                  </div>
                  
                  <div className="perks-list space-y-4">
                    {[
                      { text: 'Extra item drops', icon: <Zap className="w-4 h-4" /> },
                      { text: 'Market price bonus', icon: <Star className="w-4 h-4" /> },
                      { text: 'Exclusive war zone access', icon: <Shield className="w-4 h-4" /> },
                      { text: 'Priority queue access', icon: <Crown className="w-4 h-4" /> },
                      { text: 'Custom chat colors', icon: <Star className="w-4 h-4" /> },
                      { text: 'Special commands', icon: <Zap className="w-4 h-4" /> },
                      { text: '+10% XP Boost', icon: <Star className="w-4 h-4" /> },
                      { text: '+10% Drop Rate', icon: <Zap className="w-4 h-4" /> },
                      { text: 'VIP Support', icon: <Shield className="w-4 h-4" /> }
                    ].map((feature, index) => (
                      <div key={index} className="perk-item flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/item">
                        <div className="flex items-center space-x-3">
                          <div className="text-grass-green group-hover/item:scale-110 transition-transform duration-200">
                            {feature.icon}
                          </div>
                          <span className="text-light-gray text-sm font-medium">{feature.text}</span>
                        </div>
                        <Check className="w-5 h-5 text-grass-green group-hover/item:scale-110 transition-transform duration-200" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SVIP Package - Enhanced */}
            <div className="svip-container group relative overflow-hidden rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 via-cyan-500/15 to-blue-500/20 opacity-60 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-xl"></div>
              
              {/* Floating particles */}
              <div className="absolute w-2 h-2 bg-teal-400/60 rounded-full animate-float-2 group-hover:opacity-100 opacity-40" style={{ top: '20%', right: '10%' }} />
              <div className="absolute w-1 h-1 bg-cyan-300/80 rounded-full animate-float-1 group-hover:opacity-100 opacity-30" style={{ top: '35%', left: '15%' }} />
              <div className="absolute w-1.5 h-1.5 bg-blue-300/70 rounded-full animate-float-3 group-hover:opacity-100 opacity-50" style={{ bottom: '25%', right: '20%' }} />
              
              {/* Main container */}
              <div className="relative z-10 glass rounded-3xl overflow-hidden border-2 border-teal-400/30 group-hover:border-teal-400/60 transition-all duration-500">
                {/* Header with enhanced styling */}
                <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 p-8 text-center relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute w-32 h-32 bg-white/10 rounded-full -top-16 -right-16 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute w-24 h-24 bg-white/5 rounded-full -bottom-12 -left-12 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-28 h-28 mx-auto mb-4 relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <img 
                        src="/vip-plus.png" 
                        alt="SVIP Badge" 
                        className="w-full h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-full"></div>
                    </div>
                    <h4 className="text-3xl font-black text-white mb-2 tracking-wider drop-shadow-lg">SVIP</h4>
                    <p className="text-white/90 font-bold uppercase text-sm tracking-widest">Super VIP Rank</p>
                    <div className="flex justify-center mt-3 space-x-1">
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-3xl font-black text-teal-400 mb-2">€75</div>
                    <button className="btn bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white w-full text-lg py-4 group-hover:shadow-2xl group-hover:shadow-teal-400/30 transition-all duration-300 relative overflow-hidden">
                      <span className="relative z-10">PURCHASE SVIP</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </div>
                  
                  <div className="perks-list space-y-4">
                    {[
                      { text: 'Extra item drops', icon: <Zap className="w-4 h-4" />, available: true },
                      { text: 'Market price bonus', icon: <Star className="w-4 h-4" />, available: true },
                      { text: 'Exclusive war zone access', icon: <Shield className="w-4 h-4" />, available: true },
                      { text: 'Priority queue access', icon: <Crown className="w-4 h-4" />, available: true },
                      { text: 'Custom chat colors', icon: <Star className="w-4 h-4" />, available: true },
                      { text: 'Special commands', icon: <Zap className="w-4 h-4" />, available: true },
                      { text: '+20% XP Boost', icon: <Star className="w-4 h-4" />, available: true, bonus: '+20%' },
                      { text: '+20% Drop Rate', icon: <Zap className="w-4 h-4" />, available: true, bonus: '+20%' },
                      { text: 'Premium Support', icon: <Shield className="w-4 h-4" />, available: false }
                    ].map((feature, index) => (
                      <div key={index} className="perk-item flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/item">
                        <div className="flex items-center space-x-3">
                          <div className="text-teal-400 group-hover/item:scale-110 transition-transform duration-200">
                            {feature.icon}
                          </div>
                          <span className="text-light-gray text-sm font-medium">{feature.text}</span>
                        </div>
                        {feature.available ? (
                          feature.bonus ? (
                            <span className="bonus-badge bg-teal-400/20 text-teal-400">{feature.bonus}</span>
                          ) : (
                            <Check className="w-5 h-5 text-teal-400 group-hover/item:scale-110 transition-transform duration-200" />
                          )
                        ) : (
                          <X className="w-5 h-5 text-alert-red group-hover/item:scale-110 transition-transform duration-200" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Lifetime Package - Enhanced */}
            <div className="vip-lifetime-container group relative overflow-hidden rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-violet-600/15 to-indigo-600/20 opacity-60 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-xl"></div>
              
              {/* Floating particles */}
              <div className="absolute w-2 h-2 bg-purple-400/60 rounded-full animate-float-3 group-hover:opacity-100 opacity-40" style={{ top: '10%', left: '15%' }} />
              <div className="absolute w-1 h-1 bg-violet-300/80 rounded-full animate-float-1 group-hover:opacity-100 opacity-30" style={{ top: '30%', right: '10%' }} />
              <div className="absolute w-1.5 h-1.5 bg-indigo-300/70 rounded-full animate-float-2 group-hover:opacity-100 opacity-50" style={{ bottom: '15%', left: '25%' }} />
              
              {/* Magical aura effect */}
              <div className="absolute inset-0 bg-gradient-conic from-purple-500/10 via-violet-500/5 to-indigo-500/10 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl"></div>
              
              {/* Main container */}
              <div className="relative z-10 glass rounded-3xl overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-500">
                {/* Header with enhanced styling */}
                <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 p-8 text-center relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute w-32 h-32 bg-white/10 rounded-full -top-16 -left-16 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute w-24 h-24 bg-white/5 rounded-full -bottom-12 -right-12 animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute w-20 h-20 bg-white/5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-28 h-28 mx-auto mb-4 relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <img 
                        src="/vip-lifetime.png" 
                        alt="VIP Lifetime Badge" 
                        className="w-full h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-full"></div>
                      {/* Crown effect */}
                      <Crown className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
                    </div>
                    <h4 className="text-3xl font-black text-white mb-2 tracking-wider drop-shadow-lg">VIP LIFETIME</h4>
                    <p className="text-white/90 font-bold uppercase text-sm tracking-widest">Ultimate Rank</p>
                    <div className="flex justify-center mt-3 space-x-1">
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-3xl font-black text-purple-400 mb-2">€100</div>
                    <div className="text-xs text-purple-300 mb-4 font-semibold">LIFETIME ACCESS</div>
                    <button className="btn bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:via-violet-500 hover:to-indigo-500 text-white w-full text-lg py-4 group-hover:shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-300 relative overflow-hidden">
                      <span className="relative z-10">PURCHASE LIFETIME</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </div>
                  
                  <div className="perks-list space-y-4">
                    {[
                      { text: 'Extra item drops', icon: <Zap className="w-4 h-4" />, available: true },
                      { text: 'Market price bonus', icon: <Star className="w-4 h-4" />, available: true },
                      { text: 'Exclusive war zone access', icon: <Shield className="w-4 h-4" />, available: true },
                      { text: 'Priority queue access', icon: <Crown className="w-4 h-4" />, available: false },
                      { text: 'Custom chat colors', icon: <Star className="w-4 h-4" />, available: false },
                      { text: 'Special commands', icon: <Zap className="w-4 h-4" />, available: false },
                      { text: '+50% XP Boost', icon: <Star className="w-4 h-4" />, available: true, bonus: '+50%' },
                      { text: '+50% Drop Rate', icon: <Zap className="w-4 h-4" />, available: true, bonus: '+50%' },
                      { text: 'Elite Support', icon: <Shield className="w-4 h-4" />, available: false }
                    ].map((feature, index) => (
                      <div key={index} className="perk-item flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/item">
                        <div className="flex items-center space-x-3">
                          <div className="text-purple-400 group-hover/item:scale-110 transition-transform duration-200">
                            {feature.icon}
                          </div>
                          <span className="text-light-gray text-sm font-medium">{feature.text}</span>
                        </div>
                        {feature.available ? (
                          feature.bonus ? (
                            <span className="bonus-badge bg-purple-400/20 text-purple-400">{feature.bonus}</span>
                          ) : (
                            <Check className="w-5 h-5 text-purple-400 group-hover/item:scale-110 transition-transform duration-200" />
                          )
                        ) : (
                          <X className="w-5 h-5 text-alert-red group-hover/item:scale-110 transition-transform duration-200" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Crates Section */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-wide">CRATES</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {crateConfigs.map((crate, index) => {
              const tier = getCrateTier(crate.variant);
              
              return (
                <div 
                  key={index} 
                  className={`card glass p-6 text-center hover:scale-105 transition-all duration-500 group relative overflow-hidden border-2 ${crate.borderColor} hover:border-opacity-60`}
                >
                  {/* Animated background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${crate.bgGradient} opacity-40 group-hover:opacity-70 transition-opacity duration-500 rounded-xl`}></div>
                  
                  {/* Floating particles based on crate type */}
                  {renderCrateParticles(crate.variant)}
                  
                  <div className="relative z-10">
                    <div className="text-sm text-light-gray mb-1 uppercase tracking-wider">Crate</div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-opacity-90 transition-colors">{crate.name}</h4>
                    <p className="text-xs text-light-gray mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{crate.description}</p>
                    
                    <div className="w-full h-40 mx-auto mb-6 flex items-center justify-center relative">
                      <ChestComponent variant={crate.variant} size="medium" />
                    </div>
                    
                    {/* Enhanced themed button with visual effects */}
                    <button className={`
                      btn w-full text-white font-bold py-3 px-6 rounded-lg text-sm uppercase tracking-wider
                      bg-gradient-to-r ${crate.buttonGradient} ${crate.buttonHover}
                      transform transition-all duration-300 
                      group-hover:scale-105 group-hover:shadow-2xl group-hover:${crate.glowColor}
                      relative overflow-hidden
                      border border-white/20 group-hover:border-white/40
                    `}>
                      {/* Button shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      {/* Button content */}
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>BUY FOR {crate.price}</span>
                        {getCrateIcon(crate.variant)}
                      </span>
                      
                      {/* Button pulse effect on hover */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-pulse bg-white/10"></div>
                    </button>
                    
                    {/* Crate rarity indicator */}
                    <div className="mt-3 flex justify-center">
                      <div className={`
                        px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                        ${tier.classes}
                        group-hover:scale-105 transition-transform duration-300
                      `}>
                        {tier.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};