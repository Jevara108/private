/**
 * Bans Section Component
 * 
 * Transparent moderation system displaying recent bans, appeals process, and server statistics.
 * Promotes fair play and community trust through open moderation practices.
 * 
 * Key Features:
 * - Real-time ban records with detailed information
 * - Advanced filtering and search functionality
 * - Pagination for large ban lists
 * - Appeal system integration
 * - Moderation statistics and transparency metrics
 * - Responsive design for all devices
 * - Professional unban services
 * 
 * Ban Information Displayed:
 * - Player details with Minecraft avatars
 * - Moderator who issued the ban
 * - Detailed ban reasons and evidence
 * - Ban duration and expiration times
 * - Ban severity levels (minor, major, severe)
 * - Current ban status (active, expired, appealed)
 * 
 * Moderation Features:
 * - Transparent ban history
 * - Appeal process information
 * - Professional unban services
 * - Fair play statistics
 * - Community guidelines enforcement
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 2.0.0 - Enhanced filtering and mobile optimization
 */

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Clock, User, Gavel, Search, Filter, ExternalLink, Ban, CheckCircle, XCircle } from 'lucide-react';

// ==================== INTERFACES ====================

/**
 * Ban Record Interface
 * 
 * Represents a complete ban record with all relevant information.
 * 
 * @interface BanRecord
 * @property {number} id - Unique identifier for the ban record
 * @property {string} playerName - Banned player's username
 * @property {string} playerAvatar - URL to player's Minecraft avatar
 * @property {string} bannedBy - Staff member who issued the ban
 * @property {string} bannedByAvatar - URL to staff member's avatar
 * @property {string} reason - Detailed reason for the ban
 * @property {Date} bannedOn - Date and time when ban was issued
 * @property {Date | null} bannedUntil - Ban expiration date (null for permanent)
 * @property {string} banType - Type of ban (temporary or permanent)
 * @property {string} severity - Severity level (minor, major, severe)
 * @property {string} status - Current ban status (active, expired, appealed)
 */
interface BanRecord {
  id: number;
  playerName: string;
  playerAvatar: string;
  bannedBy: string;
  bannedByAvatar: string;
  reason: string;
  bannedOn: Date;
  bannedUntil: Date | null; // null for permanent bans
  banType: 'temporary' | 'permanent';
  severity: 'minor' | 'major' | 'severe';
  status: 'active' | 'expired' | 'appealed';
}

/**
 * Ban Statistics Interface
 * 
 * Tracks moderation statistics for transparency.
 * 
 * @interface BanStats
 * @property {number} active - Currently active bans
 * @property {number} permanent - Permanent bans issued
 * @property {number} today - Bans issued today
 * @property {number} fairPlayRate - Percentage of players following rules
 */
interface BanStats {
  active: number;
  permanent: number;
  today: number;
  fairPlayRate: number;
}

// ==================== CONSTANTS ====================

/**
 * Ban Records Data
 * 
 * Sample ban records for demonstration. In production, this would be
 * fetched from a backend API with real moderation data.
 * 
 * @constant {BanRecord[]} banRecords
 */
const banRecords: BanRecord[] = [
  {
    id: 1,
    playerName: 'GrieferKing99',
    playerAvatar: 'https://mc-heads.net/avatar/GrieferKing99/64',
    bannedBy: 'AdminSteve',
    bannedByAvatar: 'https://mc-heads.net/avatar/AdminSteve/64',
    reason: 'Griefing spawn area and destroying player builds',
    bannedOn: new Date('2025-01-10T14:30:00'),
    bannedUntil: new Date('2025-01-17T14:30:00'),
    banType: 'temporary',
    severity: 'major',
    status: 'active'
  },
  {
    id: 2,
    playerName: 'HackerPro2024',
    playerAvatar: 'https://mc-heads.net/avatar/HackerPro2024/64',
    bannedBy: 'ModeratorAlex',
    bannedByAvatar: 'https://mc-heads.net/avatar/ModeratorAlex/64',
    reason: 'Using X-ray hacks and fly modifications',
    bannedOn: new Date('2025-01-09T20:15:00'),
    bannedUntil: null,
    banType: 'permanent',
    severity: 'severe',
    status: 'active'
  },
  {
    id: 3,
    playerName: 'ToxicPlayer123',
    playerAvatar: 'https://mc-heads.net/avatar/ToxicPlayer123/64',
    bannedBy: 'AdminSteve',
    bannedByAvatar: 'https://mc-heads.net/avatar/AdminSteve/64',
    reason: 'Harassment and inappropriate language in chat',
    bannedOn: new Date('2025-01-09T16:45:00'),
    bannedUntil: new Date('2025-01-12T16:45:00'),
    banType: 'temporary',
    severity: 'minor',
    status: 'active'
  },
  {
    id: 4,
    playerName: 'DupeExploit',
    playerAvatar: 'https://mc-heads.net/avatar/DupeExploit/64',
    bannedBy: 'ModeratorSarah',
    bannedByAvatar: 'https://mc-heads.net/avatar/ModeratorSarah/64',
    reason: 'Exploiting item duplication glitches',
    bannedOn: new Date('2025-01-08T11:20:00'),
    bannedUntil: new Date('2025-01-15T11:20:00'),
    banType: 'temporary',
    severity: 'major',
    status: 'active'
  },
  {
    id: 5,
    playerName: 'SpamBot2025',
    playerAvatar: 'https://mc-heads.net/avatar/SpamBot2025/64',
    bannedBy: 'AutoMod',
    bannedByAvatar: 'https://mc-heads.net/avatar/AutoMod/64',
    reason: 'Automated spam detection - excessive chat flooding',
    bannedOn: new Date('2025-01-08T09:10:00'),
    bannedUntil: new Date('2025-01-09T09:10:00'),
    banType: 'temporary',
    severity: 'minor',
    status: 'expired'
  },
  {
    id: 6,
    playerName: 'CheatEngine',
    playerAvatar: 'https://mc-heads.net/avatar/CheatEngine/64',
    bannedBy: 'AdminSteve',
    bannedByAvatar: 'https://mc-heads.net/avatar/AdminSteve/64',
    reason: 'Multiple hacking violations and ban evasion',
    bannedOn: new Date('2025-01-07T19:30:00'),
    bannedUntil: null,
    banType: 'permanent',
    severity: 'severe',
    status: 'active'
  },
  {
    id: 7,
    playerName: 'BuildDestroyer',
    playerAvatar: 'https://mc-heads.net/avatar/BuildDestroyer/64',
    bannedBy: 'ModeratorAlex',
    bannedByAvatar: 'https://mc-heads.net/avatar/ModeratorAlex/64',
    reason: 'Destroying community builds and monuments',
    bannedOn: new Date('2025-01-07T15:45:00'),
    bannedUntil: new Date('2025-01-21T15:45:00'),
    banType: 'temporary',
    severity: 'major',
    status: 'active'
  },
  {
    id: 8,
    playerName: 'RuleBreaker',
    playerAvatar: 'https://mc-heads.net/avatar/RuleBreaker/64',
    bannedBy: 'ModeratorSarah',
    bannedByAvatar: 'https://mc-heads.net/avatar/ModeratorSarah/64',
    reason: 'Repeated violations of server rules',
    bannedOn: new Date('2025-01-06T13:20:00'),
    bannedUntil: new Date('2025-01-13T13:20:00'),
    banType: 'temporary',
    severity: 'minor',
    status: 'active'
  },
  {
    id: 9,
    playerName: 'PvPCheater',
    playerAvatar: 'https://mc-heads.net/avatar/PvPCheater/64',
    bannedBy: 'AdminSteve',
    bannedByAvatar: 'https://mc-heads.net/avatar/AdminSteve/64',
    reason: 'Using combat hacks and kill aura',
    bannedOn: new Date('2025-01-05T21:15:00'),
    bannedUntil: new Date('2025-01-19T21:15:00'),
    banType: 'temporary',
    severity: 'major',
    status: 'active'
  },
  {
    id: 10,
    playerName: 'AltAccount99',
    playerAvatar: 'https://mc-heads.net/avatar/AltAccount99/64',
    bannedBy: 'AutoMod',
    bannedByAvatar: 'https://mc-heads.net/avatar/AutoMod/64',
    reason: 'Ban evasion using alternate account',
    bannedOn: new Date('2025-01-05T18:30:00'),
    bannedUntil: null,
    banType: 'permanent',
    severity: 'severe',
    status: 'active'
  }
];

// ==================== COMPONENT ====================

/**
 * Bans Section Component
 * 
 * Main component that renders the complete bans interface with filtering,
 * pagination, and appeal system integration.
 * 
 * @returns {JSX.Element} Bans section JSX
 */
export const BansSection: React.FC = () => {
  // ==================== STATE MANAGEMENT ====================
  
  /**
   * Ban records state
   * @type {BanRecord[]} bans - Array of ban records
   */
  const [bans, setBans] = useState<BanRecord[]>(banRecords);
  
  /**
   * Filter and search state
   * @type {string} searchTerm - Current search query
   * @type {string} filterType - Ban type filter (all, temporary, permanent)
   * @type {string} filterSeverity - Severity filter (all, minor, major, severe)
   */
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'temporary' | 'permanent'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'minor' | 'major' | 'severe'>('all');
  
  /**
   * Pagination state
   * @type {number} currentPage - Current page number (1-based)
   */
  const [currentPage, setCurrentPage] = useState(1);
  
  /**
   * UI state
   * @type {boolean} showUnbanModal - Whether unban service modal is visible
   */
  const [showUnbanModal, setShowUnbanModal] = useState(false);
  
  /**
   * Pagination configuration
   * @type {number} itemsPerPage - Number of bans to show per page
   */
  const itemsPerPage = 5;

  // ==================== COMPUTED VALUES ====================
  
  /**
   * Filter bans based on search and filters
   * @type {BanRecord[]} filteredBans - Filtered ban records
   */
  const filteredBans = bans.filter(ban => {
    const matchesSearch = ban.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ban.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ban.bannedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || ban.banType === filterType;
    const matchesSeverity = filterSeverity === 'all' || ban.severity === filterSeverity;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  /**
   * Pagination calculations
   * @type {number} totalPages - Total number of pages
   * @type {number} startIndex - Starting index for current page
   * @type {BanRecord[]} paginatedBans - Bans for current page
   */
  const totalPages = Math.ceil(filteredBans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBans = filteredBans.slice(startIndex, startIndex + itemsPerPage);

  /**
   * Calculate ban statistics
   * @type {BanStats} stats - Computed ban statistics
   */
  const stats: BanStats = {
    active: bans.filter(ban => ban.status === 'active').length,
    permanent: bans.filter(ban => ban.banType === 'permanent' && ban.status === 'active').length,
    today: bans.filter(ban => {
      const today = new Date();
      const banDate = ban.bannedOn;
      return banDate.toDateString() === today.toDateString();
    }).length,
    fairPlayRate: 99.2
  };

  // ==================== UTILITY FUNCTIONS ====================
  
  /**
   * Format Date for Display
   * 
   * Formats a date object into a readable string format.
   * 
   * @param {Date} date - Date to format
   * @returns {string} Formatted date string
   */
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Format Time Remaining
   * 
   * Calculates and formats the remaining time for a temporary ban.
   * 
   * @param {Date | null} bannedUntil - Ban expiration date
   * @returns {string} Formatted time remaining or status
   */
  const formatTimeRemaining = (bannedUntil: Date | null): string => {
    if (!bannedUntil) return 'Permanent';
    
    const now = new Date();
    const diff = bannedUntil.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    return `${hours}h`;
  };

  /**
   * Get Severity Color Classes
   * 
   * Returns CSS classes for styling based on ban severity.
   * 
   * @param {string} severity - Ban severity level
   * @returns {string} CSS classes for severity styling
   */
  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'minor': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'major': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'severe': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  /**
   * Get Status Color Classes
   * 
   * Returns CSS classes for styling based on ban status.
   * 
   * @param {string} status - Ban status
   * @returns {string} CSS classes for status styling
   */
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-red-500/20 text-red-400';
      case 'expired': return 'bg-green-500/20 text-green-400';
      case 'appealed': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // ==================== RENDER ====================
  
  return (
    <section id="bans" className="py-16 sm:py-20 bg-gradient-to-b from-secondary-dark to-primary-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-40 h-40 bg-red-500 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-orange-500 rounded-full blur-3xl bottom-20 right-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-24 h-24 bg-yellow-500 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-red-500 text-white text-xs px-4 py-2 rounded-full font-bold mb-4 uppercase tracking-wider">
            SERVER MODERATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white tracking-wider uppercase">
            RECENT BANS
          </h2>
          <div className="w-16 h-1 bg-red-500 mx-auto mb-4"></div>
          <p className="text-lg text-light-gray max-w-2xl mx-auto">
            Transparency in moderation - view recent bans and appeals to maintain a fair gaming environment
          </p>
        </div>

        {/* Ban Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Ban className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black text-red-400 mb-1">{stats.active}</div>
            <div className="text-light-gray text-sm">Active Bans</div>
          </div>
          
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black text-orange-400 mb-1">{stats.permanent}</div>
            <div className="text-light-gray text-sm">Permanent Bans</div>
          </div>
          
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-primary-dark" />
            </div>
            <div className="text-2xl font-black text-yellow-400 mb-1">{stats.today}</div>
            <div className="text-light-gray text-sm">Today's Bans</div>
          </div>
          
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-grass-green/20 hover:border-grass-green/40 transition-all duration-300">
            <div className="w-12 h-12 bg-grass-green rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-primary-dark" />
            </div>
            <div className="text-2xl font-black text-grass-green mb-1">{stats.fairPlayRate}%</div>
            <div className="text-light-gray text-sm">Fair Play Rate</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass rounded-2xl p-6 mb-8 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray w-5 h-5" />
              <input
                type="text"
                placeholder="Search players, reasons, or staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-secondary-dark/60 border border-white/10 rounded-lg text-white placeholder-light-gray focus:border-grass-green focus:outline-none transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 bg-secondary-dark/60 border border-white/10 rounded-lg text-white focus:border-grass-green focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="temporary">Temporary</option>
                <option value="permanent">Permanent</option>
              </select>

              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value as any)}
                className="px-4 py-2 bg-secondary-dark/60 border border-white/10 rounded-lg text-white focus:border-grass-green focus:outline-none"
              >
                <option value="all">All Severities</option>
                <option value="minor">Minor</option>
                <option value="major">Major</option>
                <option value="severe">Severe</option>
              </select>

              <button
                onClick={() => setShowUnbanModal(true)}
                className="btn bg-blue-600 hover:bg-blue-500 text-white flex items-center space-x-2"
              >
                <Gavel className="w-4 h-4" />
                <span>Unban Service</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bans Table */}
        <div className="glass rounded-2xl overflow-hidden border border-white/10 mb-8">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-dark/80">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-light-gray uppercase tracking-wider">Player</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-light-gray uppercase tracking-wider">Banned By</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-light-gray uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-light-gray uppercase tracking-wider">Banned On</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-light-gray uppercase tracking-wider">Banned Until</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-light-gray uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedBans.map((ban) => (
                  <tr key={ban.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={ban.playerAvatar}
                          alt={ban.playerName}
                          className="w-10 h-10 rounded-lg border-2 border-white/20"
                        />
                        <div>
                          <div className="text-white font-semibold">{ban.playerName}</div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs border ${getSeverityColor(ban.severity)}`}>
                            {ban.severity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={ban.bannedByAvatar}
                          alt={ban.bannedBy}
                          className="w-8 h-8 rounded-lg border border-grass-green/50"
                        />
                        <span className="text-grass-green font-medium">{ban.bannedBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-light-gray text-sm max-w-xs">
                        {ban.reason}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-light-gray text-sm">
                        {formatDate(ban.bannedOn)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-light-gray text-sm">
                        {ban.bannedUntil ? formatDate(ban.bannedUntil) : 'Permanent'}
                      </div>
                      <div className="text-xs text-orange-400 font-medium">
                        {formatTimeRemaining(ban.bannedUntil)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ban.status)}`}>
                        {ban.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {paginatedBans.map((ban) => (
              <div key={ban.id} className="bg-secondary-dark/60 rounded-xl p-4 border border-white/10">
                {/* Player Info */}
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={ban.playerAvatar}
                    alt={ban.playerName}
                    className="w-12 h-12 rounded-lg border-2 border-white/20"
                  />
                  <div className="flex-1">
                    <div className="text-white font-semibold">{ban.playerName}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs border ${getSeverityColor(ban.severity)}`}>
                        {ban.severity.toUpperCase()}
                      </span>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(ban.status)}`}>
                        {ban.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ban Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-grass-green" />
                    <span className="text-light-gray">Banned by:</span>
                    <div className="flex items-center space-x-2">
                      <img
                        src={ban.bannedByAvatar}
                        alt={ban.bannedBy}
                        className="w-6 h-6 rounded border border-grass-green/50"
                      />
                      <span className="text-grass-green font-medium">{ban.bannedBy}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-light-gray">Reason:</span>
                      <p className="text-white">{ban.reason}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-light-gray">Banned:</span>
                    <span className="text-white">{formatDate(ban.bannedOn)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-red-400" />
                    <span className="text-light-gray">Until:</span>
                    <span className="text-white">
                      {ban.bannedUntil ? formatDate(ban.bannedUntil) : 'Permanent'}
                    </span>
                    <span className="text-orange-400 font-medium text-xs">
                      ({formatTimeRemaining(ban.bannedUntil)})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-secondary-dark/60 border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-grass-green text-primary-dark font-bold'
                      : 'bg-secondary-dark/60 border border-white/10 text-white hover:bg-white/5'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-secondary-dark/60 border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Responsive Unban Service Modal */}
        {showUnbanModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="glass rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-blue-500/30">
              {/* Modal Header - Responsive */}
              <div className="p-4 sm:p-6 lg:p-8 border-b border-white/10">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Gavel className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Unban Service</h3>
                  <p className="text-sm sm:text-base text-light-gray">
                    Appeal your ban or request an unban review through our official channels
                  </p>
                </div>
              </div>

              {/* Modal Content - Responsive */}
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="space-y-3 sm:space-y-4 mb-6">
                  {/* Email Appeal Option */}
                  <div className="bg-secondary-dark/60 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-xl sm:text-2xl flex-shrink-0">📧</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Email Appeal</h4>
                        <p className="text-light-gray text-xs sm:text-sm mb-2">
                          Send a detailed appeal to our moderation team
                        </p>
                        <a 
                          href="mailto:appeals@creepercraft.net"
                          className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium break-all"
                        >
                          appeals@creepercraft.net
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Discord Appeal Option */}
                  <div className="bg-secondary-dark/60 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-xl sm:text-2xl flex-shrink-0">💬</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Discord Appeal</h4>
                        <p className="text-light-gray text-xs sm:text-sm mb-2">
                          Join our Discord and create a ticket in #appeals
                        </p>
                        <button className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium flex items-center space-x-1">
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>Join Discord Server</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Premium Unban Option */}
                  <div className="bg-secondary-dark/60 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-xl sm:text-2xl flex-shrink-0">⚡</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Premium Unban</h4>
                        <p className="text-light-gray text-xs sm:text-sm mb-2 sm:mb-3">
                          Fast-track unban service (24h response)
                        </p>
                        <button className="btn bg-yellow-600 hover:bg-yellow-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-2">
                          Purchase for €25
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Responsive */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => setShowUnbanModal(false)}
                    className="flex-1 btn bg-gray-600 hover:bg-gray-500 text-white text-sm sm:text-base py-2 sm:py-3"
                  >
                    Close
                  </button>
                  <button className="flex-1 btn btn-green text-sm sm:text-base py-2 sm:py-3">
                    Start Appeal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Information Panel */}
        <div className="mt-12">
          <div className="glass rounded-2xl p-8 border border-grass-green/20">
            <div className="text-center mb-6">
              <Shield className="w-12 h-12 text-grass-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Fair Play Policy</h3>
              <p className="text-light-gray">
                We maintain a transparent and fair moderation system to ensure the best gaming experience for all players
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-grass-green mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Transparent Process</h4>
                <p className="text-light-gray text-sm">
                  All bans are logged and publicly viewable with clear reasons and durations
                </p>
              </div>
              
              <div className="text-center">
                <Gavel className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Appeal System</h4>
                <p className="text-light-gray text-sm">
                  Every player has the right to appeal their ban through multiple channels
                </p>
              </div>
              
              <div className="text-center">
                <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Professional Staff</h4>
                <p className="text-light-gray text-sm">
                  Our moderation team is trained to handle situations fairly and consistently
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};