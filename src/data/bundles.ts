/**
 * Bundles Data Module
 * 
 * Contains configuration for purchasable item bundles in the server shop.
 * Each bundle represents a curated collection of items with themed content
 * and progressive pricing structure.
 * 
 * Bundle Types:
 * - Starter Pack: Basic items for new players
 * - Warrior Pack: Combat-focused equipment
 * - Elite Pack: Premium items for advanced players
 * 
 * @module BundlesData
 * @author CreeperCraft Development Team
 * @version 2.0.0 - Updated currency from PLN to EUR
 */

// ==================== INTERFACES ====================

/**
 * Bundle Interface
 * 
 * Represents a purchasable item bundle in the server shop.
 * Contains metadata and item list for display in the shop carousel.
 * 
 * @interface Bundle
 * @property {string} name - Display name of the bundle
 * @property {string} price - Formatted price string with currency symbol
 * @property {string[]} items - Array of emoji representations of included items
 */
export interface Bundle {
  name: string;
  price: string;
  items: string[];
}

// ==================== BUNDLE CONFIGURATIONS ====================

/**
 * Available Bundles Configuration
 * 
 * Array of all purchasable bundles with progressive pricing.
 * Items are represented as emojis for visual appeal in the UI.
 * 
 * Bundle Progression:
 * 1. Starter Pack (€50) - Essential items for beginners
 * 2. Warrior Pack (€75) - Combat equipment and tools
 * 3. Elite Pack (€100) - Premium items and rare materials
 * 
 * @constant {Bundle[]} bundles
 */
export const bundles: Bundle[] = [
  {
    name: 'Starter Pack',
    price: '€50',
    items: ['📦', '⚔️', '🛡️', '🍖'] // Chest, Sword, Shield, Food
  },
  {
    name: 'Warrior Pack', 
    price: '€75',
    items: ['⚔️', '🏹', '🛡️', '💎'] // Sword, Bow, Shield, Diamond
  },
  {
    name: 'Elite Pack',
    price: '€100',
    items: ['👑', '💎', '🔥', '⭐'] // Crown, Diamond, Fire, Star
  }
];