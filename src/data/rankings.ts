/**
 * Rankings Data Module
 * 
 * Contains mock data for player rankings, guild rankings, and kill rankings.
 * In a production environment, this data would be fetched from a backend API
 * or database with real-time player statistics.
 * 
 * Data Structure:
 * - Player rankings: Individual player levels and ranks
 * - Guild rankings: Guild points and team rankings  
 * - Kill rankings: PvP kill counts and combat rankings
 * 
 * @module RankingsData
 * @author CreeperCraft Development Team
 * @version 1.0.0
 */

// ==================== INTERFACES ====================

/**
 * Player Interface
 * 
 * Represents a player or guild entry in the rankings system.
 * Used for all three ranking types with different level interpretations:
 * - Players: Experience level
 * - Guilds: Guild points
 * - Kills: Total kill count
 * 
 * @interface Player
 * @property {string} name - Player or guild name
 * @property {number} level - Level/points/kills depending on ranking type
 * @property {number} rank - Current ranking position (1-based)
 * @property {string} avatar - URL to player/guild avatar image from mc-heads.net
 */
export interface Player {
  name: string;
  level: number;
  rank: number;
  avatar: string;
}

// ==================== PLAYER RANKINGS ====================

/**
 * Player Rankings Data
 * 
 * Top 20 players ranked by experience level.
 * Uses mc-heads.net service for player avatars based on usernames.
 * 
 * @constant {Player[]} playerRankings
 */
export const playerRankings: Player[] = [
  { name: 'Sketchie', level: 1263, rank: 1, avatar: 'https://mc-heads.net/avatar/Sketchie/64' },
  { name: 'Bartas10256', level: 1263, rank: 2, avatar: 'https://mc-heads.net/avatar/Bartas10256/64' },
  { name: 'LordTricker', level: 1263, rank: 3, avatar: 'https://mc-heads.net/avatar/LordTricker/64' },
  { name: 'PlayerFour', level: 1250, rank: 4, avatar: 'https://mc-heads.net/avatar/PlayerFour/64' },
  { name: 'PlayerFive', level: 1240, rank: 5, avatar: 'https://mc-heads.net/avatar/PlayerFive/64' },
  { name: 'PlayerSix', level: 1230, rank: 6, avatar: 'https://mc-heads.net/avatar/PlayerSix/64' },
  { name: 'PlayerSeven', level: 1220, rank: 7, avatar: 'https://mc-heads.net/avatar/PlayerSeven/64' },
  { name: 'PlayerEight', level: 1210, rank: 8, avatar: 'https://mc-heads.net/avatar/PlayerEight/64' },
  { name: 'PlayerNine', level: 1200, rank: 9, avatar: 'https://mc-heads.net/avatar/PlayerNine/64' },
  { name: 'PlayerTen', level: 1190, rank: 10, avatar: 'https://mc-heads.net/avatar/PlayerTen/64' },
  { name: 'PlayerEleven', level: 1180, rank: 11, avatar: 'https://mc-heads.net/avatar/PlayerEleven/64' },
  { name: 'PlayerTwelve', level: 1170, rank: 12, avatar: 'https://mc-heads.net/avatar/PlayerTwelve/64' },
  { name: 'PlayerThirteen', level: 1160, rank: 13, avatar: 'https://mc-heads.net/avatar/PlayerThirteen/64' },
  { name: 'PlayerFourteen', level: 1150, rank: 14, avatar: 'https://mc-heads.net/avatar/PlayerFourteen/64' },
  { name: 'PlayerFifteen', level: 1140, rank: 15, avatar: 'https://mc-heads.net/avatar/PlayerFifteen/64' },
  { name: 'PlayerSixteen', level: 1130, rank: 16, avatar: 'https://mc-heads.net/avatar/PlayerSixteen/64' },
  { name: 'PlayerSeventeen', level: 1120, rank: 17, avatar: 'https://mc-heads.net/avatar/PlayerSeventeen/64' },
  { name: 'PlayerEighteen', level: 1110, rank: 18, avatar: 'https://mc-heads.net/avatar/PlayerEighteen/64' },
  { name: 'PlayerNineteen', level: 1100, rank: 19, avatar: 'https://mc-heads.net/avatar/PlayerNineteen/64' },
  { name: 'PlayerTwenty', level: 1090, rank: 20, avatar: 'https://mc-heads.net/avatar/PlayerTwenty/64' }
];

// ==================== GUILD RANKINGS ====================

/**
 * Guild Rankings Data
 * 
 * Top 20 guilds ranked by total guild points.
 * Guild points are earned through collective member activities,
 * guild wars, and territory control.
 * 
 * @constant {Player[]} guildRankings
 */
export const guildRankings: Player[] = [
  { name: 'DragonSlayers', level: 5420, rank: 1, avatar: 'https://mc-heads.net/avatar/DragonSlayers/64' },
  { name: 'ShadowWarriors', level: 5380, rank: 2, avatar: 'https://mc-heads.net/avatar/ShadowWarriors/64' },
  { name: 'CrystalGuards', level: 5340, rank: 3, avatar: 'https://mc-heads.net/avatar/CrystalGuards/64' },
  { name: 'IronLegion', level: 5300, rank: 4, avatar: 'https://mc-heads.net/avatar/IronLegion/64' },
  { name: 'FireStorm', level: 5260, rank: 5, avatar: 'https://mc-heads.net/avatar/FireStorm/64' },
  { name: 'StormBreakers', level: 5220, rank: 6, avatar: 'https://mc-heads.net/avatar/StormBreakers/64' },
  { name: 'VoidHunters', level: 5180, rank: 7, avatar: 'https://mc-heads.net/avatar/VoidHunters/64' },
  { name: 'BloodMoon', level: 5140, rank: 8, avatar: 'https://mc-heads.net/avatar/BloodMoon/64' },
  { name: 'SkyRiders', level: 5100, rank: 9, avatar: 'https://mc-heads.net/avatar/SkyRiders/64' },
  { name: 'DarkKnights', level: 5060, rank: 10, avatar: 'https://mc-heads.net/avatar/DarkKnights/64' },
  { name: 'PhoenixRising', level: 5020, rank: 11, avatar: 'https://mc-heads.net/avatar/PhoenixRising/64' },
  { name: 'ThunderBolts', level: 4980, rank: 12, avatar: 'https://mc-heads.net/avatar/ThunderBolts/64' },
  { name: 'IceBreakers', level: 4940, rank: 13, avatar: 'https://mc-heads.net/avatar/IceBreakers/64' },
  { name: 'GoldenEagles', level: 4900, rank: 14, avatar: 'https://mc-heads.net/avatar/GoldenEagles/64' },
  { name: 'SilverWolves', level: 4860, rank: 15, avatar: 'https://mc-heads.net/avatar/SilverWolves/64' },
  { name: 'CrimsonTide', level: 4820, rank: 16, avatar: 'https://mc-heads.net/avatar/CrimsonTide/64' },
  { name: 'EmeraldGuard', level: 4780, rank: 17, avatar: 'https://mc-heads.net/avatar/EmeraldGuard/64' },
  { name: 'DiamondCrusher', level: 4740, rank: 18, avatar: 'https://mc-heads.net/avatar/DiamondCrusher/64' },
  { name: 'NetherLords', level: 4700, rank: 19, avatar: 'https://mc-heads.net/avatar/NetherLords/64' },
  { name: 'EnderWatch', level: 4660, rank: 20, avatar: 'https://mc-heads.net/avatar/EnderWatch/64' }
];

// ==================== KILL RANKINGS ====================

/**
 * Kill Rankings Data
 * 
 * Top 20 players ranked by total PvP kills.
 * Represents the most skilled combat players on the server.
 * Kill counts include both player vs player and boss kills.
 * 
 * @constant {Player[]} killRankings
 */
export const killRankings: Player[] = [
  { name: 'DeathBringer', level: 2847, rank: 1, avatar: 'https://mc-heads.net/avatar/DeathBringer/64' },
  { name: 'SoulReaper', level: 2803, rank: 2, avatar: 'https://mc-heads.net/avatar/SoulReaper/64' },
  { name: 'BloodHunter', level: 2759, rank: 3, avatar: 'https://mc-heads.net/avatar/BloodHunter/64' },
  { name: 'WarMachine', level: 2715, rank: 4, avatar: 'https://mc-heads.net/avatar/WarMachine/64' },
  { name: 'KillStreak', level: 2671, rank: 5, avatar: 'https://mc-heads.net/avatar/KillStreak/64' },
  { name: 'Assassin', level: 2627, rank: 6, avatar: 'https://mc-heads.net/avatar/Assassin/64' },
  { name: 'Executioner', level: 2583, rank: 7, avatar: 'https://mc-heads.net/avatar/Executioner/64' },
  { name: 'Slayer', level: 2539, rank: 8, avatar: 'https://mc-heads.net/avatar/Slayer/64' },
  { name: 'Destroyer', level: 2495, rank: 9, avatar: 'https://mc-heads.net/avatar/Destroyer/64' },
  { name: 'Terminator', level: 2451, rank: 10, avatar: 'https://mc-heads.net/avatar/Terminator/64' },
  { name: 'Predator', level: 2407, rank: 11, avatar: 'https://mc-heads.net/avatar/Predator/64' },
  { name: 'Hunter', level: 2363, rank: 12, avatar: 'https://mc-heads.net/avatar/Hunter/64' },
  { name: 'Warrior', level: 2319, rank: 13, avatar: 'https://mc-heads.net/avatar/Warrior/64' },
  { name: 'Fighter', level: 2275, rank: 14, avatar: 'https://mc-heads.net/avatar/Fighter/64' },
  { name: 'Gladiator', level: 2231, rank: 15, avatar: 'https://mc-heads.net/avatar/Gladiator/64' },
  { name: 'Champion', level: 2187, rank: 16, avatar: 'https://mc-heads.net/avatar/Champion/64' },
  { name: 'Conqueror', level: 2143, rank: 17, avatar: 'https://mc-heads.net/avatar/Conqueror/64' },
  { name: 'Vanquisher', level: 2099, rank: 18, avatar: 'https://mc-heads.net/avatar/Vanquisher/64' },
  { name: 'Dominator', level: 2055, rank: 19, avatar: 'https://mc-heads.net/avatar/Dominator/64' },
  { name: 'Overlord', level: 2011, rank: 20, avatar: 'https://mc-heads.net/avatar/Overlord/64' }
];