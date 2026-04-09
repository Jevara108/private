/**
 * Server Map Section Component
 * 
 * Interactive world map showcasing different biomes, regions, and server areas.
 * Features responsive design with adaptive layouts for mobile, tablet, and desktop.
 * 
 * Key Features:
 * - 9 unique biome tiles with hover effects
 * - Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
 * - Animated connecting paths between biomes
 * - Floating particle effects and ambient lighting
 * - Interactive map legend with zone types
 * - Server statistics display
 * - Central spawn area with special highlighting
 * 
 * Biome Types:
 * - Ice Peaks: Frozen mountains with rare crystals
 * - Dragon's Ridge: Ancient peaks hiding secrets
 * - Sky Islands: Floating islands in the clouds
 * - Mystic Forest: Enchanted woods full of magic
 * - Central Hub: Main spawn and trading center
 * - Golden Dunes: Vast desert with hidden temples
 * - Deep Ocean: Mysterious underwater ruins
 * - Emerald Jungle: Dense jungle with ancient temples
 * - Nether Portal: Gateway to the underworld
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 2.0.0 - Enhanced responsive design and accessibility
 */

import React from 'react';

// ==================== INTERFACES ====================

/**
 * Biome Configuration Interface
 * 
 * Defines the properties and styling for each biome tile.
 * 
 * @interface BiomeConfig
 * @property {string} name - Display name of the biome
 * @property {string} description - Brief description of the biome
 * @property {string} icon - Emoji icon representing the biome
 * @property {string} cssClass - CSS class for biome-specific styling
 * @property {boolean} isSpawn - Whether this is the main spawn area
 */
interface BiomeConfig {
  name: string;
  description: string;
  icon: string;
  cssClass: string;
  isSpawn?: boolean;
}

/**
 * Map Statistics Interface
 * 
 * Defines the server statistics displayed below the map.
 * 
 * @interface MapStats
 * @property {number} biomes - Number of unique biomes
 * @property {string} dungeons - Number of dungeons (can include '+' for 50+)
 * @property {number} bosses - Number of boss encounters
 * @property {string} adventures - Adventure count (∞ for infinite)
 */
interface MapStats {
  biomes: number;
  dungeons: string;
  bosses: number;
  adventures: string;
}

// ==================== CONSTANTS ====================

/**
 * Biome Configuration Array
 * 
 * Defines all 9 biomes in the server map with their properties.
 * Arranged in a 3x3 grid layout for desktop view.
 * 
 * @constant {BiomeConfig[]} biomes
 */
const biomes: BiomeConfig[] = [
  // Row 1
  {
    name: 'Frozen Peaks',
    description: 'Icy mountains with rare crystals',
    icon: '❄️',
    cssClass: 'ice-biome'
  },
  {
    name: 'Dragon\'s Ridge',
    description: 'Ancient peaks hiding secrets',
    icon: '⛰️',
    cssClass: 'mountain-biome'
  },
  {
    name: 'Sky Islands',
    description: 'Floating islands in the clouds',
    icon: '☁️',
    cssClass: 'sky-biome'
  },
  // Row 2
  {
    name: 'Mystic Forest',
    description: 'Enchanted woods full of magic',
    icon: '🌲',
    cssClass: 'forest-biome'
  },
  {
    name: 'Central Hub',
    description: 'Main spawn and trading center',
    icon: '🏰',
    cssClass: 'spawn-biome',
    isSpawn: true
  },
  {
    name: 'Golden Dunes',
    description: 'Vast desert with hidden temples',
    icon: '🏜️',
    cssClass: 'desert-biome'
  },
  // Row 3
  {
    name: 'Deep Ocean',
    description: 'Mysterious underwater ruins',
    icon: '🌊',
    cssClass: 'ocean-biome'
  },
  {
    name: 'Emerald Jungle',
    description: 'Dense jungle with ancient temples',
    icon: '🌿',
    cssClass: 'jungle-biome'
  },
  {
    name: 'Nether Portal',
    description: 'Gateway to the underworld',
    icon: '🔥',
    cssClass: 'nether-biome'
  }
];

/**
 * Map Statistics Configuration
 * 
 * Server statistics displayed in the stats grid.
 * 
 * @constant {MapStats} mapStats
 */
const mapStats: MapStats = {
  biomes: 9,
  dungeons: '50+',
  bosses: 25,
  adventures: '∞'
};

/**
 * Legend Configuration
 * 
 * Map legend items explaining different zone types.
 * 
 * @constant {Array} legendItems
 */
const legendItems = [
  {
    color: 'bg-blue-400',
    label: 'Safe Zones',
    description: 'PvP disabled areas'
  },
  {
    color: 'bg-red-500',
    label: 'PvP Zones',
    description: 'Combat enabled areas'
  },
  {
    color: 'bg-yellow-500',
    label: 'Resource Rich',
    description: 'High-value materials'
  }
];

// ==================== COMPONENT ====================

/**
 * Server Map Section Component
 * 
 * Main component that renders the interactive server map with all biomes,
 * statistics, and responsive design features.
 * 
 * @returns {JSX.Element} Server map section JSX
 */
export const ServerMapSection: React.FC = () => {
  
  // ==================== RENDER HELPERS ====================
  
  /**
   * Render Biome Tile
   * 
   * Renders an individual biome tile with proper styling and effects.
   * 
   * @param {BiomeConfig} biome - Biome configuration object
   * @param {number} index - Index of the biome in the array
   * @returns {JSX.Element} Biome tile JSX
   */
  const renderBiomeTile = (biome: BiomeConfig, index: number) => (
    <div
      key={index}
      className={`map-tile ${biome.cssClass} group`}
      role="button"
      tabIndex={0}
      aria-label={`${biome.name}: ${biome.description}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Handle biome selection if needed
        }
      }}
    >
      <div className="tile-content">
        <div className="biome-icon">{biome.icon}</div>
        <div className="biome-name">{biome.name}</div>
        <div className="biome-description">{biome.description}</div>
      </div>
      <div className={`tile-glow ${biome.cssClass.replace('-biome', '-glow')}`}></div>
      {biome.isSpawn && (
        <div className="spawn-indicator">SPAWN</div>
      )}
    </div>
  );

  /**
   * Render Legend Item
   * 
   * Renders an individual legend item with color indicator and description.
   * 
   * @param {Object} item - Legend item configuration
   * @param {number} index - Index of the item
   * @returns {JSX.Element} Legend item JSX
   */
  const renderLegendItem = (item: any, index: number) => (
    <div 
      key={index}
      className="legend-item glass p-3 sm:p-4 rounded-xl border border-white/10 hover:border-grass-green/30 transition-colors"
    >
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className={`w-3 h-3 sm:w-4 sm:h-4 ${item.color} rounded-full animate-pulse flex-shrink-0`}></div>
        <div className="min-w-0">
          <div className="text-white font-semibold text-xs sm:text-sm">{item.label}</div>
          <div className="text-light-gray text-xs">{item.description}</div>
        </div>
      </div>
    </div>
  );

  /**
   * Render Stat Card
   * 
   * Renders an individual statistics card with icon and value.
   * 
   * @param {string} value - Statistic value to display
   * @param {string} label - Label for the statistic
   * @param {string} description - Description of the statistic
   * @param {string} colorClass - CSS color class for styling
   * @param {number} index - Index for responsive grid positioning
   * @returns {JSX.Element} Stat card JSX
   */
  const renderStatCard = (value: string | number, label: string, description: string, colorClass: string, index: number) => (
    <div 
      key={index}
      className={`stat-card glass p-4 sm:p-6 rounded-xl text-center border border-white/10 hover:border-${colorClass}/30 transition-all duration-300 hover:scale-105 ${
        index === 3 ? 'col-span-2 lg:col-span-1' : ''
      }`}
    >
      <div className={`text-xl sm:text-2xl font-black text-${colorClass} mb-1 sm:mb-2`}>{value}</div>
      <div className="text-white font-semibold text-xs sm:text-sm mb-1">{label}</div>
      <div className="text-light-gray text-xs">{description}</div>
    </div>
  );

  // ==================== RENDER ====================
  
  return (
    <section id="map" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-secondary-dark to-primary-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-grass-green rounded-full blur-3xl top-10 sm:top-20 left-5 sm:left-10 animate-pulse"></div>
        <div className="absolute w-24 sm:w-32 lg:w-48 h-24 sm:h-32 lg:h-48 bg-blue-500 rounded-full blur-3xl bottom-10 sm:bottom-20 right-5 sm:right-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-purple-500 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        {/* Header Section - Responsive */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block bg-grass-green text-primary-dark text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold mb-3 sm:mb-4 uppercase tracking-wider">
            EXPLORE THE WORLD
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 text-white tracking-wider uppercase">SERVER MAP</h2>
          <div className="w-12 sm:w-16 h-1 bg-grass-green mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base lg:text-lg text-light-gray max-w-xl lg:max-w-2xl mx-auto px-4">
            Discover vast landscapes, hidden treasures, and epic adventures across our custom-built world
          </p>
        </div>

        {/* Interactive Map Container - Fully Responsive */}
        <div className="map-container relative max-w-5xl mx-auto">
          {/* Map Background */}
          <div className="map-background glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden border-2 border-grass-green/20 hover:border-grass-green/40 transition-all duration-500">
            {/* Animated grid overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid-pattern w-full h-full"></div>
            </div>

            {/* Responsive Map Grid */}
            <div className="map-grid relative z-10">
              {biomes.map((biome, index) => renderBiomeTile(biome, index))}
            </div>

            {/* Connecting paths - Hidden on mobile, visible on desktop */}
            <div className="map-paths absolute inset-0 pointer-events-none">
              {/* Horizontal paths */}
              <div className="path horizontal-path path-1"></div>
              <div className="path horizontal-path path-2"></div>
              <div className="path horizontal-path path-3"></div>
              
              {/* Vertical paths */}
              <div className="path vertical-path path-4"></div>
              <div className="path vertical-path path-5"></div>
              <div className="path vertical-path path-6"></div>
            </div>

            {/* Floating elements - Hidden on mobile for performance */}
            <div className="floating-elements absolute inset-0 pointer-events-none">
              <div className="floating-particle particle-1">✨</div>
              <div className="floating-particle particle-2">⭐</div>
              <div className="floating-particle particle-3">💎</div>
              <div className="floating-particle particle-4">🌟</div>
              <div className="floating-particle particle-5">✨</div>
              <div className="floating-particle particle-6">⚡</div>
            </div>
          </div>

          {/* Responsive Map Legend */}
          <div className="map-legend mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {legendItems.map((item, index) => renderLegendItem(item, index))}
          </div>

          {/* Responsive Server Stats */}
          <div className="server-stats mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {renderStatCard(mapStats.biomes, 'Biomes', 'Unique regions', 'grass-green', 0)}
            {renderStatCard(mapStats.dungeons, 'Dungeons', 'Hidden treasures', 'blue-400', 1)}
            {renderStatCard(mapStats.bosses, 'Bosses', 'Epic encounters', 'purple-400', 2)}
            {renderStatCard(mapStats.adventures, 'Adventures', 'Endless possibilities', 'yellow-400', 3)}
          </div>
        </div>
      </div>
    </section>
  );
};