/**
 * Hero Section Component
 * 
 * The main landing section of the CreeperCraft website featuring:
 * - Animated background with floating particles
 * - Dynamic text slider with highlighted keywords
 * - Server statistics and social media links
 * - Interactive server IP copy functionality
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 2.0.0 - Added text slider and enhanced animations
 */

import React, { useState, useEffect } from 'react';
import { Youtube, Facebook } from 'lucide-react';
import { TikTokIcon } from './icons/TikTokIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import { CreeperHeadIcon } from './icons/CreeperHeadIcon';

// ==================== INTERFACES ====================

/**
 * Props interface for HeroSection component
 * 
 * @interface HeroSectionProps
 * @property {number} onlineCount - Currently online players count
 * @property {number} discordCount - Total Discord members count
 * @property {boolean} serverOnline - Whether Minecraft server is online
 * @property {boolean} loading - Whether statistics are loading
 * @property {boolean} copied - Whether server IP was recently copied
 * @property {function} copyServerIP - Function to copy server IP to clipboard
 */
interface HeroSectionProps {
  onlineCount: number;
  discordCount: number;
  serverOnline: boolean;
  loading: boolean;
  copied: boolean;
  copyServerIP: () => void;
}

/**
 * Text slider content structure
 * 
 * @interface SliderText
 * @property {string} text - Main text content before highlight
 * @property {string} highlight - Text to be highlighted in green
 * @property {string} suffix - Text content after highlight
 */
interface SliderText {
  text: string;
  highlight: string;
  suffix: string;
}

// ==================== CONSTANTS ====================

/**
 * Text Slider Content Configuration
 * 
 * Array of text objects that cycle through the hero section,
 * each highlighting key server features in green.
 * 
 * @constant {SliderText[]} sliderTexts
 */
const sliderTexts: SliderText[] = [
  {
    text: "Join our dynamic game and experience the best gameplay in ",
    highlight: "Hardcore",
    suffix: " mode"
  },
  {
    text: "Battle in epic ",
    highlight: "guild wars",
    suffix: " and claim your territory"
  },
  {
    text: "Explore vast worlds with custom ",
    highlight: "dungeons",
    suffix: " and bosses"
  },
  {
    text: "Build your empire and dominate the ",
    highlight: "leaderboards",
    suffix: ""
  },
  {
    text: "Experience premium features with ",
    highlight: "VIP ranks",
    suffix: ""
  },
  {
    text: "Compete in ",
    highlight: "tournaments",
    suffix: " and win exclusive rewards"
  }
];

// ==================== COMPONENT ====================

/**
 * Hero Section Component
 * 
 * Main landing section with animated background, text slider,
 * and interactive elements for server engagement.
 * 
 * @param {HeroSectionProps} props - Component props
 * @returns {JSX.Element} Hero section JSX
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onlineCount, 
  discordCount,
  serverOnline,
  loading,
  copied, 
  copyServerIP 
}) => {
  // ==================== STATE MANAGEMENT ====================
  
  /**
   * Text slider state management
   * @type {number} currentTextIndex - Index of currently displayed text
   */
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // ==================== EFFECTS ====================
  
  /**
   * Text Slider Animation Effect
   * 
   * Automatically cycles through slider texts every 4 seconds
   * to showcase different server features dynamically.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % sliderTexts.length);
    }, 4000); // Change text every 4 seconds
    
    return () => clearInterval(interval);
  }, []);

  // ==================== RENDER ====================
  
  return (
    <section id="home" className="hero relative min-h-screen flex flex-col justify-center items-center pt-16 overflow-hidden">
      {/* 
        Background Image with Overlay
        Enhanced parallax effect with reduced opacity for better text readability
      */}
      <div 
        className="hero-bg absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105" 
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('/4k-gaming-phone-minecraft-earth-wikdki2k98quuhh1.jpg')`,
          filter: 'brightness(0.7) contrast(1.1)'
        }}
      />
      
      {/* 
        Animated Overlay with Floating Particles
        Creates dynamic visual interest with various particle sizes and animations
      */}
      <div className="hero-overlay absolute inset-0 bg-black/20">
        {/* Large floating particles with slow movement */}
        <div className="absolute w-3 h-3 bg-grass-green/40 rounded-full animate-float-slow shadow-lg" style={{ top: '15%', left: '8%' }} />
        <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-float-medium shadow-md" style={{ top: '35%', right: '12%' }} />
        <div className="absolute w-4 h-4 bg-grass-green/30 rounded-full animate-float-fast shadow-lg" style={{ bottom: '25%', left: '15%' }} />
        <div className="absolute w-2 h-2 bg-white/40 rounded-full animate-float-slow shadow-md" style={{ top: '55%', right: '20%' }} />
        <div className="absolute w-3 h-3 bg-grass-green/50 rounded-full animate-float-medium shadow-lg" style={{ bottom: '15%', right: '8%' }} />
        
        {/* Medium particles with varied animations */}
        <div className="absolute w-1.5 h-1.5 bg-yellow-400/60 rounded-full animate-float-fast" style={{ top: '25%', left: '25%' }} />
        <div className="absolute w-1 h-1 bg-blue-400/50 rounded-full animate-float-slow" style={{ top: '45%', left: '70%' }} />
        <div className="absolute w-2 h-2 bg-purple-400/40 rounded-full animate-float-medium" style={{ bottom: '40%', left: '80%' }} />
        <div className="absolute w-1.5 h-1.5 bg-green-400/60 rounded-full animate-float-fast" style={{ top: '70%', left: '30%' }} />
        <div className="absolute w-1 h-1 bg-red-400/50 rounded-full animate-float-slow" style={{ bottom: '60%', right: '40%' }} />
        
        {/* Small sparkle particles with twinkling effect */}
        <div className="absolute w-1 h-1 bg-white/70 rounded-full animate-twinkle-1" style={{ top: '20%', left: '60%' }} />
        <div className="absolute w-0.5 h-0.5 bg-yellow-300/80 rounded-full animate-twinkle-2" style={{ top: '40%', left: '40%' }} />
        <div className="absolute w-1 h-1 bg-blue-300/60 rounded-full animate-twinkle-3" style={{ bottom: '30%', left: '60%' }} />
        <div className="absolute w-0.5 h-0.5 bg-green-300/70 rounded-full animate-twinkle-1" style={{ top: '60%', right: '60%' }} />
        <div className="absolute w-1 h-1 bg-purple-300/50 rounded-full animate-twinkle-2" style={{ bottom: '50%', right: '30%' }} />
        
        {/* Floating light rays for atmospheric effect */}
        <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-grass-green/30 to-transparent animate-light-ray-1" style={{ top: '10%', left: '20%' }} />
        <div className="absolute w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-light-ray-2" style={{ top: '30%', right: '25%' }} />
        <div className="absolute w-px h-24 bg-gradient-to-b from-transparent via-yellow-400/25 to-transparent animate-light-ray-3" style={{ bottom: '20%', left: '70%' }} />
        
        {/* Ambient glow effects for depth */}
        <div className="absolute w-32 h-32 bg-grass-green/10 rounded-full blur-3xl animate-glow-pulse-1" style={{ top: '20%', left: '10%' }} />
        <div className="absolute w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-glow-pulse-2" style={{ bottom: '30%', right: '15%' }} />
        <div className="absolute w-40 h-40 bg-purple-500/8 rounded-full blur-3xl animate-glow-pulse-3" style={{ top: '50%', left: '50%' }} />
      </div>
      
      {/* 
        Main Hero Content
        Centered content with responsive typography and animations
      */}
      <div className="hero-content relative z-10 text-center container mx-auto px-4 sm:px-6">
        {/* Server Type Badge */}
        <div className="mb-4 sm:mb-6">
          <span className="inline-block bg-grass-green text-primary-dark text-xs px-3 py-2 sm:px-4 rounded-full font-bold mb-4 sm:mb-6 uppercase tracking-wider animate-pulse-bright">
            SERVER OF GUILD WARS
          </span>
        </div>
        
        {/* 
          Main Title with Brand Colors
          "CREEPER" in white, "CRAFT" in green for brand recognition
        */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 tracking-wider animate-fade-in-up text-shadow-lg leading-tight">
          <span className="text-white">CREEPER</span>
          <span className="text-grass-green opacity-90">CRAFT</span>
        </h1>
        
        {/* 
          Enhanced Text Slider with Highlighted Keywords
          Cycles through different server features with smooth transitions
        */}
        <div className="text-slider-container mb-6 sm:mb-8 max-w-3xl mx-auto px-4" style={{ height: '3rem' }}>
          <div className="relative overflow-hidden h-full">
            {sliderTexts.map((textObj, index) => (
              <p
                key={index}
                className={`absolute inset-0 flex items-center justify-center text-base sm:text-lg md:text-xl text-light-gray text-shadow transition-all duration-1000 transform ${
                  index === currentTextIndex
                    ? 'opacity-100 translate-y-0'
                    : index === (currentTextIndex - 1 + sliderTexts.length) % sliderTexts.length
                    ? 'opacity-0 -translate-y-full'
                    : 'opacity-0 translate-y-full'
                }`}
              >
                <span>
                  {textObj.text}
                  <span className="text-grass-green font-semibold opacity-90">
                    {textObj.highlight}
                  </span>
                  {textObj.suffix}
                </span>
              </p>
            ))}
          </div>
        </div>

        {/* 
          Social Media Icons
          Links to official CreeperCraft social media accounts
        */}
        <div className="flex justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8 animate-fade-in-up-delay-2">
          <a href="#" className="social-icon" aria-label="TikTok">
            <TikTokIcon />
          </a>
          <a href="#" className="social-icon" aria-label="Twitter">
            <TwitterIcon />
          </a>
          <a href="#" className="social-icon" aria-label="YouTube">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="#" className="social-icon" aria-label="Facebook">
            <Facebook className="w-5 h-5" />
          </a>
        </div>

        {/* 
          Server Status Boxes
          Interactive elements showing player count and Discord info
        */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8 animate-fade-in-up-delay-3 px-4">
          {/* 
            Players Box - Clickable to copy server IP
            Shows current player count with copy functionality
          */}
          <div 
            className={`status-box glass rounded-2xl p-4 sm:p-6 flex items-center space-x-3 sm:space-x-4 cursor-pointer hover:scale-105 transition-all duration-300 relative overflow-hidden border shadow-2xl w-full sm:w-auto max-w-sm ${
              serverOnline 
                ? 'border-grass-green/20 hover:border-grass-green/40' 
                : 'border-red-500/20 hover:border-red-500/40'
            }`}
            onClick={copyServerIP}
          >
            {/* Animated background pulse effect */}
            <div className={`absolute inset-0 rounded-2xl animate-pulse ${
              serverOnline ? 'bg-grass-green/10' : 'bg-red-500/10'
            }`}></div>
            
            {/* Creeper head icon */}
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center relative z-10 shadow-lg flex-shrink-0 ${
              serverOnline ? 'bg-grass-green' : 'bg-red-500'
            }`}>
              <CreeperHeadIcon />
            </div>
            
            {/* Player count and copy status */}
            <div className="relative z-10 min-w-0">
              <div className="text-white font-bold text-lg sm:text-xl">
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <>
                    {onlineCount} Players Online
                    {!serverOnline && <span className="text-red-400 text-xs block">Server Offline</span>}
                  </>
                )}
              </div>
              <div className={`text-sm font-medium ${serverOnline ? 'text-grass-green' : 'text-red-400'}`}>
                {loading ? 'Checking...' : (copied ? 'IP Copied!' : 'Click to copy')}
              </div>
            </div>
          </div>

          {/* 
            Discord Box - Links to Discord server
            Shows online Discord member count
          */}
          <div className="status-box glass rounded-2xl p-4 sm:p-6 flex items-center space-x-3 sm:space-x-4 cursor-pointer hover:scale-105 transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 shadow-2xl w-full sm:w-auto max-w-sm">
            {/* Discord icon with gradient background */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <DiscordIcon />
            </div>
            
            {/* Discord member count */}
            <div className="min-w-0">
              <div className="text-white font-bold text-lg sm:text-xl">
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <>{discordCount.toLocaleString()} Members</>
                )}
              </div>
              <div className="text-blue-400 text-sm font-medium">Join our Discord</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};