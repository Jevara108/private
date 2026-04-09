/**
 * Vote Section Component
 * 
 * Comprehensive voting system for server promotion and player rewards.
 * Features multiple server lists, reward tracking, and progress monitoring.
 * 
 * Key Features:
 * - Multiple server voting platforms with different rewards
 * - Real-time vote statistics and progress tracking
 * - Reward system with rarity-based items
 * - Vote streak tracking and bonus rewards
 * - Cooldown timers for each voting platform
 * - Responsive design for all devices
 * - Interactive reward preview modal
 * 
 * Voting Platforms:
 * - MinecraftServers.org: Primary platform with double rewards
 * - Minecraft-Server-List.com: Premium directory with epic crates
 * - TopMinecraftServers.org: Community platform with frequent voting
 * - MinecraftList.org: Curated collection with legendary rewards
 * - Minecraft-MP.com: Multiplayer hub with PvP bonuses
 * - MinecraftServers.biz: Business platform with market discounts
 * 
 * Reward Types:
 * - Vote Crate Keys: Common rewards (100% chance)
 * - Diamond Gear Sets: Rare equipment (25% chance)
 * - Enchanted Weapons: Epic items (10% chance)
 * - VIP Rank Trials: Legendary access (5% chance)
 * - Server Currency: Common coins (80% chance)
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 2.0.0 - Enhanced reward system and mobile optimization
 */

import React, { useState, useEffect } from 'react';
import { Vote, Gift, Trophy, Star, Clock, ExternalLink, CheckCircle, Zap, Crown, Coins, X } from 'lucide-react';

// ==================== INTERFACES ====================

/**
 * Vote Reward Interface
 * 
 * Represents a possible reward from voting with rarity and drop chance.
 * 
 * @interface VoteReward
 * @property {number} id - Unique identifier for the reward
 * @property {string} name - Display name of the reward
 * @property {string} description - Detailed description of the reward
 * @property {React.ReactNode} icon - Icon component for the reward
 * @property {string} rarity - Rarity tier (common, rare, epic, legendary)
 * @property {string} chance - Drop chance percentage as string
 */
interface VoteReward {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  chance: string;
}

/**
 * Server List Interface
 * 
 * Represents a voting platform with its configuration and state.
 * 
 * @interface ServerList
 * @property {number} id - Unique identifier for the server list
 * @property {string} name - Display name of the voting platform
 * @property {string} url - Voting URL for the platform
 * @property {string} description - Brief description of the platform
 * @property {string} reward - Reward description for voting
 * @property {number} cooldown - Cooldown period in hours
 * @property {string} difficulty - Voting difficulty (easy, medium, hard)
 * @property {string} bonus - Additional bonus description
 * @property {string} logo - Emoji logo for the platform
 * @property {boolean} voted - Whether user has voted recently
 * @property {Date} nextVoteTime - When user can vote again (optional)
 */
interface ServerList {
  id: number;
  name: string;
  url: string;
  description: string;
  reward: string;
  cooldown: number; // hours
  difficulty: 'easy' | 'medium' | 'hard';
  bonus: string;
  logo: string;
  voted: boolean;
  nextVoteTime?: Date;
}

/**
 * Vote Statistics Interface
 * 
 * Tracks voting statistics and progress.
 * 
 * @interface VoteStats
 * @property {number} total - Total votes across all platforms
 * @property {number} daily - Votes received today
 * @property {number} userStreak - Current user vote streak
 * @property {number} available - Available votes for user
 * @property {number} completed - Completed votes today
 */
interface VoteStats {
  total: number;
  daily: number;
  userStreak: number;
  available: number;
  completed: number;
}

// ==================== CONSTANTS ====================

/**
 * Vote Rewards Configuration
 * 
 * Defines all possible rewards from voting with their rarity and chances.
 * 
 * @constant {VoteReward[]} voteRewards
 */
const voteRewards: VoteReward[] = [
  {
    id: 1,
    name: 'Vote Crate Key',
    description: 'Unlock exclusive items and resources',
    icon: <Gift className="w-5 h-5" />,
    rarity: 'common',
    chance: '100%'
  },
  {
    id: 2,
    name: 'Diamond Gear Set',
    description: 'Full diamond armor and tools',
    icon: <Star className="w-5 h-5" />,
    rarity: 'rare',
    chance: '25%'
  },
  {
    id: 3,
    name: 'Enchanted Weapons',
    description: 'Powerful enchanted sword and bow',
    icon: <Zap className="w-5 h-5" />,
    rarity: 'epic',
    chance: '10%'
  },
  {
    id: 4,
    name: 'VIP Rank (7 Days)',
    description: 'Temporary VIP access with all perks',
    icon: <Crown className="w-5 h-5" />,
    rarity: 'legendary',
    chance: '5%'
  },
  {
    id: 5,
    name: 'Server Currency',
    description: '1000-5000 coins for the server shop',
    icon: <Coins className="w-5 h-5" />,
    rarity: 'common',
    chance: '80%'
  }
];

/**
 * Server Lists Configuration
 * 
 * Defines all voting platforms with their rewards and cooldowns.
 * 
 * @constant {ServerList[]} serverLists
 */
const serverLists: ServerList[] = [
  {
    id: 1,
    name: 'MinecraftServers.org',
    url: 'https://minecraftservers.org/vote/123456',
    description: 'The largest Minecraft server list',
    reward: '2x Vote Crates + 500 Coins',
    cooldown: 24,
    difficulty: 'easy',
    bonus: 'Double XP for 1 hour',
    logo: '🏆',
    voted: false
  },
  {
    id: 2,
    name: 'Minecraft-Server-List.com',
    url: 'https://minecraft-server-list.com/vote/123456',
    description: 'Premium server directory',
    reward: '1x Epic Crate + 750 Coins',
    cooldown: 24,
    difficulty: 'medium',
    bonus: 'Rare item chance +50%',
    logo: '⭐',
    voted: false
  },
  {
    id: 3,
    name: 'TopMinecraftServers.org',
    url: 'https://topminecraftservers.org/vote/123456',
    description: 'Top-rated server community',
    reward: '3x Vote Crates + 1000 Coins',
    cooldown: 12,
    difficulty: 'easy',
    bonus: 'Guild points +100',
    logo: '🎯',
    voted: true,
    nextVoteTime: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours from now
  },
  {
    id: 4,
    name: 'MinecraftList.org',
    url: 'https://minecraftlist.org/vote/123456',
    description: 'Curated server collection',
    reward: '1x Legendary Crate + 1500 Coins',
    cooldown: 24,
    difficulty: 'hard',
    bonus: 'VIP trial 24h',
    logo: '💎',
    voted: false
  },
  {
    id: 5,
    name: 'Minecraft-MP.com',
    url: 'https://minecraft-mp.com/vote/123456',
    description: 'Multiplayer server hub',
    reward: '2x Epic Crates + 800 Coins',
    cooldown: 24,
    difficulty: 'medium',
    bonus: 'PvP damage +25%',
    logo: '⚔️',
    voted: false
  },
  {
    id: 6,
    name: 'MinecraftServers.biz',
    url: 'https://minecraftservers.biz/vote/123456',
    description: 'Business-grade server listing',
    reward: '4x Vote Crates + 1200 Coins',
    cooldown: 12,
    difficulty: 'easy',
    bonus: 'Market discount 20%',
    logo: '🏪',
    voted: false
  }
];

// ==================== COMPONENT ====================

/**
 * Vote Section Component
 * 
 * Main voting interface component with statistics, server lists, and rewards.
 * 
 * @returns {JSX.Element} Vote section JSX
 */
export const VoteSection: React.FC = () => {
  // ==================== STATE MANAGEMENT ====================
  
  /**
   * Server voting state
   * @type {ServerList[]} servers - Array of server list configurations
   */
  const [servers, setServers] = useState<ServerList[]>(serverLists);
  
  /**
   * Vote statistics state
   * @type {number} totalVotes - Total votes across all time
   * @type {number} dailyVotes - Votes received today
   * @type {number} userVoteStreak - Current user vote streak
   */
  const [totalVotes, setTotalVotes] = useState(1247);
  const [dailyVotes, setDailyVotes] = useState(23);
  const [userVoteStreak, setUserVoteStreak] = useState(7);
  
  /**
   * UI state management
   * @type {boolean} showRewards - Whether rewards modal is visible
   */
  const [showRewards, setShowRewards] = useState(false);

  // ==================== EFFECTS ====================
  
  /**
   * Vote Count Simulation Effect
   * 
   * Simulates real-time vote count updates to make the interface feel dynamic.
   * In production, this would be replaced with WebSocket connections.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalVotes(prev => prev + Math.floor(Math.random() * 3));
      if (Math.random() > 0.7) {
        setDailyVotes(prev => prev + 1);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // ==================== COMPUTED VALUES ====================
  
  /**
   * Calculate vote statistics
   * @type {VoteStats} stats - Computed voting statistics
   */
  const stats: VoteStats = {
    total: totalVotes,
    daily: dailyVotes,
    userStreak: userVoteStreak,
    available: servers.filter(s => !s.voted).length,
    completed: servers.filter(s => s.voted).length
  };

  // ==================== EVENT HANDLERS ====================
  
  /**
   * Handle Vote Action
   * 
   * Processes a vote for a specific server list, opens the voting URL,
   * and updates the local state to reflect the vote.
   * 
   * @param {number} serverId - ID of the server list to vote for
   */
  const handleVote = (serverId: number) => {
    const server = servers.find(s => s.id === serverId);
    if (server && !server.voted) {
      // Open vote link in new tab
      window.open(server.url, '_blank');
      
      // Update server state (in real app, this would be handled by backend)
      setServers(prev => prev.map(s => 
        s.id === serverId 
          ? { 
              ...s, 
              voted: true, 
              nextVoteTime: new Date(Date.now() + s.cooldown * 60 * 60 * 1000) 
            }
          : s
      ));
      
      setDailyVotes(prev => prev + 1);
      setUserVoteStreak(prev => prev + 1);
    }
  };

  // ==================== UTILITY FUNCTIONS ====================
  
  /**
   * Get Rarity Color Classes
   * 
   * Returns CSS classes for styling based on reward rarity.
   * 
   * @param {string} rarity - Reward rarity level
   * @returns {string} CSS classes for rarity styling
   */
  const getRarityColor = (rarity: string): string => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400/30';
      case 'rare': return 'text-blue-400 border-blue-400/30';
      case 'epic': return 'text-purple-400 border-purple-400/30';
      case 'legendary': return 'text-yellow-400 border-yellow-400/30';
      default: return 'text-gray-400 border-gray-400/30';
    }
  };

  /**
   * Get Difficulty Color Classes
   * 
   * Returns CSS classes for styling based on voting difficulty.
   * 
   * @param {string} difficulty - Voting difficulty level
   * @returns {string} CSS classes for difficulty styling
   */
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  /**
   * Format Time Remaining
   * 
   * Formats the remaining cooldown time in a human-readable format.
   * 
   * @param {Date} nextVoteTime - When the user can vote again
   * @returns {string} Formatted time remaining
   */
  const formatTimeRemaining = (nextVoteTime: Date): string => {
    const now = new Date();
    const diff = nextVoteTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // ==================== RENDER ====================
  
  return (
    <section id="vote" className="py-16 sm:py-20 bg-gradient-to-b from-primary-dark to-secondary-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-40 h-40 bg-yellow-500 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-purple-500 rounded-full blur-3xl bottom-20 right-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-24 h-24 bg-grass-green rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-yellow-500 text-primary-dark text-xs px-4 py-2 rounded-full font-bold mb-4 uppercase tracking-wider">
            SUPPORT THE SERVER
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white tracking-wider uppercase">
            VOTE FOR REWARDS
          </h2>
          <div className="w-16 h-1 bg-yellow-500 mx-auto mb-4"></div>
          <p className="text-lg text-light-gray max-w-2xl mx-auto">
            Vote for CreeperCraft on server lists to earn amazing rewards and help us grow our community
          </p>
        </div>

        {/* Vote Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Vote className="w-6 h-6 text-primary-dark" />
            </div>
            <div className="text-2xl font-black text-yellow-500 mb-1">{stats.total.toLocaleString()}</div>
            <div className="text-light-gray text-sm">Total Votes</div>
          </div>
          
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-grass-green/20 hover:border-grass-green/40 transition-all duration-300">
            <div className="w-12 h-12 bg-grass-green rounded-xl flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-primary-dark" />
            </div>
            <div className="text-2xl font-black text-grass-green mb-1">{stats.daily}</div>
            <div className="text-light-gray text-sm">Today's Votes</div>
          </div>
          
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black text-purple-400 mb-1">{stats.userStreak}</div>
            <div className="text-light-gray text-sm">Vote Streak</div>
          </div>
          
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black text-blue-400 mb-1">{stats.available}</div>
            <div className="text-light-gray text-sm">Available Votes</div>
          </div>
        </div>

        {/* Vote Progress */}
        <div className="glass rounded-2xl p-6 mb-12 border border-grass-green/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Daily Vote Progress</h3>
            <span className="text-grass-green font-bold">{stats.completed}/{servers.length}</span>
          </div>
          <div className="w-full bg-secondary-dark rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-grass-green to-green-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(stats.completed / servers.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-light-gray">Complete all votes for bonus rewards!</span>
            <span className="text-yellow-400 font-semibold">+2000 Bonus Coins</span>
          </div>
        </div>

        {/* Server Lists */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white uppercase tracking-wide">SERVER LISTS</h3>
            <button 
              onClick={() => setShowRewards(!showRewards)}
              className="btn bg-purple-600 hover:bg-purple-500 text-white flex items-center space-x-2"
            >
              <Gift className="w-4 h-4" />
              <span>View Rewards</span>
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servers.map((server) => (
              <div 
                key={server.id} 
                className={`glass rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                  server.voted 
                    ? 'border-grass-green/40 bg-grass-green/5' 
                    : 'border-white/10 hover:border-yellow-500/30'
                }`}
              >
                {/* Server Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{server.logo}</div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{server.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(server.difficulty)}`}>
                        {server.difficulty.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {server.voted && (
                    <CheckCircle className="w-6 h-6 text-grass-green" />
                  )}
                </div>

                {/* Server Description */}
                <p className="text-light-gray text-sm mb-4">{server.description}</p>

                {/* Rewards */}
                <div className="bg-secondary-dark/60 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Gift className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-semibold text-sm">Rewards</span>
                  </div>
                  <p className="text-yellow-400 text-sm font-medium mb-2">{server.reward}</p>
                  <p className="text-grass-green text-xs">Bonus: {server.bonus}</p>
                </div>

                {/* Vote Button or Cooldown */}
                {server.voted && server.nextVoteTime ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-light-gray mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Next vote in: {formatTimeRemaining(server.nextVoteTime)}</span>
                    </div>
                    <button className="btn bg-gray-600 text-gray-400 w-full cursor-not-allowed" disabled>
                      VOTED
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleVote(server.id)}
                    className="btn btn-green w-full flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-grass-green/30 transition-all duration-300"
                  >
                    <Vote className="w-4 h-4" />
                    <span>VOTE NOW</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}

                {/* Cooldown Info */}
                <div className="text-center mt-3">
                  <span className="text-xs text-light-gray">
                    Cooldown: {server.cooldown}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Modal/Section */}
        {showRewards && (
          <div className="glass rounded-2xl p-8 border border-purple-500/30 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white uppercase tracking-wide">VOTE REWARDS</h3>
              <button 
                onClick={() => setShowRewards(false)}
                className="text-light-gray hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {voteRewards.map((reward) => (
                <div 
                  key={reward.id}
                  className={`glass rounded-xl p-4 border-2 ${getRarityColor(reward.rarity)} hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      reward.rarity === 'legendary' ? 'bg-yellow-500/20' :
                      reward.rarity === 'epic' ? 'bg-purple-500/20' :
                      reward.rarity === 'rare' ? 'bg-blue-500/20' : 'bg-gray-500/20'
                    }`}>
                      {reward.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{reward.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        reward.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                        reward.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                        reward.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {reward.rarity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p className="text-light-gray text-xs mb-2">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-grass-green text-xs font-semibold">Drop Rate</span>
                    <span className="text-white text-xs font-bold">{reward.chance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto border-2 border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-primary-dark" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Help Us Reach #1!</h3>
            <p className="text-light-gray mb-6 leading-relaxed">
              Every vote helps CreeperCraft climb the server rankings and brings more players to our amazing community. 
              Vote daily to earn incredible rewards and support your favorite server!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-green flex items-center justify-center space-x-2">
                <Vote className="w-5 h-5" />
                <span>VOTE ON ALL SITES</span>
              </button>
              <button className="btn bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center space-x-2">
                <Gift className="w-5 h-5" />
                <span>CLAIM REWARDS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};