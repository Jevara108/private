/**
 * Chest Component
 * 
 * A highly detailed, animated Minecraft-style chest component with multiple variants.
 * Features realistic 3D styling, particle effects, and interactive hover animations.
 * 
 * Variants:
 * - Mystery: Standard wooden chest with smoke effects
 * - Treasure: Golden chest with sparkle animations  
 * - Legendary: Purple chest with magical particle effects
 * 
 * Sizes:
 * - Small (0.7x scale)
 * - Medium (1x scale) - Default
 * - Large (1.2x scale)
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 3.0.0 - Enhanced animations and particle effects
 */

import React from 'react';

// ==================== INTERFACES ====================

/**
 * Props interface for ChestComponent
 * 
 * @interface ChestComponentProps
 * @property {'mystery' | 'treasure' | 'legendary'} variant - Chest type/rarity
 * @property {'small' | 'medium' | 'large'} size - Chest size scale
 */
interface ChestComponentProps {
  variant?: 'mystery' | 'treasure' | 'legendary';
  size?: 'small' | 'medium' | 'large';
}

// ==================== TYPES ====================

/**
 * Chest Color Configuration
 * 
 * @interface ChestColors
 * @property {string} topWood - Main wood color for chest top
 * @property {string} topWoodShadow - Shadow color for depth
 * @property {string} bottomWood - Bottom section wood color
 * @property {string} metal - Metal frame and hardware color
 * @property {string} lock - Lock mechanism color
 * @property {string} background - CSS gradient background
 * @property {string} glowColor - Particle and glow effect color
 */
interface ChestColors {
  topWood: string;
  topWoodShadow: string;
  bottomWood: string;
  metal: string;
  lock: string;
  background: string;
  glowColor: string;
}

// ==================== COMPONENT ====================

/**
 * Chest Component
 * 
 * Renders an animated, interactive chest with variant-specific styling
 * and particle effects. Supports multiple sizes and hover interactions.
 * 
 * @param {ChestComponentProps} props - Component props
 * @returns {JSX.Element} Chest component JSX
 */
export const ChestComponent: React.FC<ChestComponentProps> = ({ 
  variant = 'mystery', 
  size = 'medium' 
}) => {
  
  // ==================== COLOR CONFIGURATION ====================
  
  /**
   * Get Chest Colors by Variant
   * 
   * Returns color configuration object based on chest variant.
   * Each variant has unique colors and visual themes.
   * 
   * @function getChestColors
   * @returns {ChestColors} Color configuration for the variant
   */
  const getChestColors = (): ChestColors => {
    switch (variant) {
      case 'mystery':
        // Standard wooden chest with brown tones
        return {
          topWood: '#8B4513',
          topWoodShadow: '#654321',
          bottomWood: '#4A2C2A',
          metal: '#C0C0C0',
          lock: '#8B4513',
          background: 'linear-gradient(135deg, #4A2C2A 0%, #8B4513 50%, #654321 100%)',
          glowColor: '#8B4513'
        };
      case 'treasure':
        // Golden treasure chest with warm tones
        return {
          topWood: '#DAA520',
          topWoodShadow: '#B8860B',
          bottomWood: '#8B4513',
          metal: '#FFD700',
          lock: '#B8860B',
          background: 'linear-gradient(135deg, #8B4513 0%, #DAA520 50%, #FFD700 100%)',
          glowColor: '#FFD700'
        };
      case 'legendary':
        // Magical purple chest with mystical appearance
        return {
          topWood: '#4B0082',
          topWoodShadow: '#301934',
          bottomWood: '#2F1B69',
          metal: '#9370DB',
          lock: '#4B0082',
          background: 'linear-gradient(135deg, #2F1B69 0%, #4B0082 50%, #9370DB 100%)',
          glowColor: '#9370DB'
        };
      default:
        // Fallback to mystery variant
        return {
          topWood: '#8B4513',
          topWoodShadow: '#654321',
          bottomWood: '#4A2C2A',
          metal: '#C0C0C0',
          lock: '#8B4513',
          background: 'linear-gradient(135deg, #4A2C2A 0%, #8B4513 50%, #654321 100%)',
          glowColor: '#8B4513'
        };
    }
  };

  // Get colors for current variant
  const colors = getChestColors();
  
  // Calculate scale based on size prop
  const scale = size === 'small' ? 0.7 : size === 'large' ? 1.2 : 1;

  // ==================== RENDER ====================
  
  return (
    <div className="chest-wrapper relative group">
      {/* 
        Animated Background Glow
        Provides ambient lighting effect that intensifies on hover
      */}
      <div 
        className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse"
        style={{
          background: colors.background,
          width: `${140 * scale}px`,
          height: `${140 * scale}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          filter: `drop-shadow(0 0 20px ${colors.glowColor}40)`
        }}
      />
      
      {/* 
        Outer Glow Ring
        Rotating glow effect that appears on hover
      */}
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700 animate-spin-slow"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${colors.glowColor}60, transparent)`,
          width: `${160 * scale}px`,
          height: `${160 * scale}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(8px)'
        }}
      />
      
      {/* 
        Main Chest Container
        Contains all chest elements with hover scaling
      */}
      <div 
        className="chest-container relative mx-auto transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl cursor-pointer"
        style={{
          width: `${120 * scale}px`,
          height: `${102 * scale}px`,
          transform: `scale(${scale})`,
          filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.3)) drop-shadow(0 0 15px ${colors.glowColor}30)`
        }}
      >
        {/* 
          Top Chest Section
          Upper part of the chest with lid and metal frame
        */}
        <div className="absolute" style={{ width: '120px', height: '102px' }}>
          {/* Top Wood Panel */}
          <div 
            className="absolute rounded-md transition-all duration-300 group-hover:brightness-110"
            style={{
              width: '120px',
              height: '57px',
              background: colors.topWood,
              top: '9px',
              boxShadow: `inset 0px -30px 3px 0px ${colors.topWoodShadow}`,
              border: `1px solid ${colors.topWoodShadow}`
            }}
          />
          
          {/* Metal Frame Structure */}
          <div className="absolute">
            {/* Left Metal Strip */}
            <div 
              className="absolute rounded transition-all duration-300 group-hover:brightness-125"
              style={{
                width: '12px',
                height: '66px',
                background: `linear-gradient(90deg, ${colors.metal}, #E5E5E5, ${colors.metal})`,
                left: '0px',
                top: '0px',
                zIndex: 10,
                border: '1px solid rgba(0,0,0,0.2)'
              }}
            />
            {/* Center Metal Strip */}
            <div 
              className="absolute rounded transition-all duration-300 group-hover:brightness-125"
              style={{
                width: '12px',
                height: '66px',
                background: `linear-gradient(90deg, ${colors.metal}, #E5E5E5, ${colors.metal})`,
                left: '54px',
                top: '0px',
                zIndex: 10,
                border: '1px solid rgba(0,0,0,0.2)'
              }}
            />
            {/* Right Metal Strip */}
            <div 
              className="absolute rounded transition-all duration-300 group-hover:brightness-125"
              style={{
                width: '12px',
                height: '66px',
                background: `linear-gradient(90deg, ${colors.metal}, #E5E5E5, ${colors.metal})`,
                left: '108px',
                top: '0px',
                zIndex: 10,
                border: '1px solid rgba(0,0,0,0.2)'
              }}
            />
            {/* Top Metal Bar */}
            <div 
              className="absolute rounded transition-all duration-300 group-hover:brightness-125"
              style={{
                width: '120px',
                height: '12px',
                background: `linear-gradient(180deg, ${colors.metal}, #E5E5E5, ${colors.metal})`,
                top: '60px',
                zIndex: 10,
                boxShadow: '0px 2px 4px rgba(0,0,0,0.3)',
                border: '1px solid rgba(0,0,0,0.2)'
              }}
            />
            
            {/* 
              Lock Mechanism
              Central lock with keyhole detail
            */}
            <div 
              className="absolute rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:brightness-125"
              style={{
                width: '30px',
                height: '24px',
                background: `linear-gradient(135deg, ${colors.metal}, #E5E5E5)`,
                left: '45px',
                top: '60px',
                zIndex: 12,
                border: '1px solid rgba(0,0,0,0.3)',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              {/* Keyhole Circle */}
              <div 
                className="absolute rounded-full"
                style={{
                  background: colors.lock,
                  width: '10px',
                  height: '10px',
                  top: '3px',
                  left: '10px',
                  border: '1px solid rgba(0,0,0,0.4)'
                }}
              />
              {/* Keyhole Slot */}
              <div 
                className="absolute rounded"
                style={{
                  background: colors.lock,
                  width: '5px',
                  height: '12px',
                  top: '6px',
                  left: '12.5px',
                  border: '1px solid rgba(0,0,0,0.4)'
                }}
              />
            </div>
          </div>
        </div>

        {/* 
          Bottom Chest Section
          Lower part of the chest with base and frame
        */}
        <div className="absolute" style={{ width: '120px', height: '48px', top: '60px' }}>
          {/* Bottom Wood Panel */}
          <div 
            className="absolute rounded-md transition-all duration-300 group-hover:brightness-110"
            style={{
              width: '120px',
              height: '24px',
              background: colors.bottomWood,
              top: '36px',
              border: `1px solid ${colors.topWoodShadow}`
            }}
          />
          
          {/* Bottom Metal Frame */}
          <div className="absolute">
            {/* Left Metal Strip */}
            <div 
              className="absolute rounded transition-all duration-300 group-hover:brightness-125"
              style={{
                width: '12px',
                height: '48px',
                background: `linear-gradient(90deg, ${colors.metal}, #E5E5E5, ${colors.metal})`,
                left: '0px',
                top: '0px',
                zIndex: 5,
                border: '1px solid rgba(0,0,0,0.2)'
              }}
            />
            {/* Right Metal Strip */}
            <div 
              className="absolute rounded transition-all duration-300 group-hover:brightness-125"
              style={{
                width: '12px',
                height: '48px',
                background: `linear-gradient(90deg, ${colors.metal}, #E5E5E5, ${colors.metal})`,
                left: '108px',
                top: '0px',
                zIndex: 5,
                border: '1px solid rgba(0,0,0,0.2)'
              }}
            />
            {/* Bottom Metal Bar */}
            <div 
              className="absolute rounded transition-all duration-300 group-hover:brightness-125"
              style={{
                width: '120px',
                height: '12px',
                background: `linear-gradient(180deg, ${colors.metal}, #E5E5E5, ${colors.metal})`,
                top: '48px',
                border: '1px solid rgba(0,0,0,0.2)'
              }}
            />
          </div>
        </div>

        {/* 
          Variant-Specific Particle Effects
          Different particle animations for each chest type
        */}
        
        {/* Legendary Chest - Magical Effects */}
        {variant === 'legendary' && (
          <>
            {/* Magical Glow Background */}
            <div 
              className="absolute inset-0 rounded-lg opacity-60 animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(147,112,219,0.4) 0%, transparent 70%)',
                filter: 'blur(6px)',
                zIndex: -1
              }}
            />
            {/* Floating Magical Particles */}
            <div className="absolute w-1 h-1 bg-purple-300 rounded-full animate-float-1" style={{ top: '10px', left: '20px' }} />
            <div className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full animate-float-2" style={{ top: '30px', right: '15px' }} />
            <div className="absolute w-1 h-1 bg-purple-200 rounded-full animate-float-3" style={{ bottom: '20px', left: '15px' }} />
            <div className="absolute w-2 h-2 bg-purple-500 rounded-full animate-float-4" style={{ top: '50px', right: '25px' }} />
          </>
        )}

        {/* Treasure Chest - Golden Sparkles */}
        {variant === 'treasure' && (
          <>
            <div className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-sparkle-1" style={{ top: '10px', left: '20px' }} />
            <div className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-sparkle-2" style={{ top: '30px', right: '15px' }} />
            <div className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full animate-sparkle-3" style={{ bottom: '20px', left: '15px' }} />
            <div className="absolute w-1 h-1 bg-yellow-500 rounded-full animate-sparkle-4" style={{ top: '45px', right: '30px' }} />
            <div className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-sparkle-5" style={{ bottom: '30px', right: '20px' }} />
          </>
        )}

        {/* Mystery Chest - Smoke Effects */}
        {variant === 'mystery' && (
          <>
            <div className="absolute w-1 h-1 bg-gray-400 rounded-full animate-smoke-1 opacity-60" style={{ top: '5px', left: '25px' }} />
            <div className="absolute w-1.5 h-1.5 bg-gray-300 rounded-full animate-smoke-2 opacity-50" style={{ top: '8px', right: '20px' }} />
            <div className="absolute w-1 h-1 bg-gray-500 rounded-full animate-smoke-3 opacity-70" style={{ top: '12px', left: '50px' }} />
          </>
        )}
      </div>
    </div>
  );
};