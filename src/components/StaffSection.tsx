/**
 * Staff Section Component
 * 
 * Displays the CreeperCraft server staff team with Minecraft heads,
 * roles, descriptions, and interactive elements. Features responsive
 * design and engaging animations.
 * 
 * Features:
 * - Staff member cards with Minecraft avatars
 * - Role-based color coding and badges
 * - Interactive hover effects and animations
 * - Contact information and social links
 * - Responsive grid layout
 * - Staff statistics and achievements
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 1.0.2 - Added green selected state and removed help section
 */

import React, { useState } from 'react';
import { Shield, Crown, Star, Users, MessageCircle, Mail, Calendar, Award, Zap, Heart } from 'lucide-react';

// ==================== INTERFACES ====================

/**
 * Staff Member Interface
 * 
 * Represents a staff member with their role, information, and statistics.
 * 
 * @interface StaffMember
 * @property {number} id - Unique identifier for the staff member
 * @property {string} name - Minecraft username/display name
 * @property {string} role - Staff position/role title
 * @property {string} roleType - Role category for styling and filtering
 * @property {string} description - Brief description of responsibilities
 * @property {string} avatar - URL to Minecraft head from mc-heads.net
 * @property {string} joinDate - Date when they joined the staff team
 * @property {number} experience - Years of experience or months on team
 * @property {string[]} specialties - Areas of expertise
 * @property {boolean} online - Current online status
 * @property {string} timezone - Staff member's timezone
 * @property {string} contact - Preferred contact method
 * @property {number} helpedPlayers - Number of players helped
 * @property {string} quote - Personal quote or motto
 */
interface StaffMember {
  id: number;
  name: string;
  role: string;
  roleType: 'owner' | 'admin' | 'moderator' | 'helper' | 'developer' | 'builder';
  description: string;
  avatar: string;
  joinDate: string;
  experience: number;
  specialties: string[];
  online: boolean;
  timezone: string;
  contact: string;
  helpedPlayers: number;
  quote: string;
}

// ==================== STAFF DATA ====================

/**
 * Staff Members Configuration
 * 
 * Complete list of all CreeperCraft staff members with their information,
 * statistics, and contact details. Uses mc-heads.net for avatar images.
 * 
 * @constant {StaffMember[]} staffMembers
 */
const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: 'CreeperKing',
    role: 'Server Owner',
    roleType: 'owner',
    description: 'Founder and visionary behind CreeperCraft. Oversees all server operations and community growth.',
    avatar: 'https://mc-heads.net/avatar/CreeperKing/128',
    joinDate: '2016-03-15',
    experience: 8,
    specialties: ['Server Management', 'Community Building', 'Strategic Planning'],
    online: true,
    timezone: 'EST',
    contact: 'Discord: CreeperKing#0001',
    helpedPlayers: 5000,
    quote: 'Building the ultimate Minecraft experience, one block at a time.'
  },
  {
    id: 2,
    name: 'AdminSteve',
    role: 'Head Administrator',
    roleType: 'admin',
    description: 'Senior administrator responsible for staff coordination and major server decisions.',
    avatar: 'https://mc-heads.net/avatar/AdminSteve/128',
    joinDate: '2017-06-20',
    experience: 6,
    specialties: ['Staff Management', 'Policy Development', 'Conflict Resolution'],
    online: true,
    timezone: 'PST',
    contact: 'Discord: AdminSteve#0002',
    helpedPlayers: 3500,
    quote: 'Fair play and fun for everyone!'
  },
  {
    id: 3,
    name: 'ModeratorAlex',
    role: 'Senior Moderator',
    roleType: 'moderator',
    description: 'Experienced moderator specializing in player disputes and rule enforcement.',
    avatar: 'https://mc-heads.net/avatar/ModeratorAlex/128',
    joinDate: '2018-09-10',
    experience: 5,
    specialties: ['Player Moderation', 'Rule Enforcement', 'Community Events'],
    online: false,
    timezone: 'GMT',
    contact: 'Discord: ModeratorAlex#0003',
    helpedPlayers: 2800,
    quote: 'Keeping the peace so everyone can enjoy the game.'
  },
  {
    id: 4,
    name: 'ModeratorSarah',
    role: 'Moderator',
    roleType: 'moderator',
    description: 'Dedicated moderator focusing on new player assistance and chat moderation.',
    avatar: 'https://mc-heads.net/avatar/ModeratorSarah/128',
    joinDate: '2019-11-05',
    experience: 4,
    specialties: ['New Player Help', 'Chat Moderation', 'Tutorial Creation'],
    online: true,
    timezone: 'CET',
    contact: 'Discord: ModeratorSarah#0004',
    helpedPlayers: 2200,
    quote: 'Every new player deserves a warm welcome!'
  },
  {
    id: 5,
    name: 'DevMaster',
    role: 'Lead Developer',
    roleType: 'developer',
    description: 'Technical lead responsible for server plugins, features, and performance optimization.',
    avatar: 'https://mc-heads.net/avatar/DevMaster/128',
    joinDate: '2017-12-01',
    experience: 6,
    specialties: ['Plugin Development', 'Server Optimization', 'Custom Features'],
    online: true,
    timezone: 'EST',
    contact: 'Discord: DevMaster#0005',
    helpedPlayers: 1500,
    quote: 'Code is poetry, and servers are our canvas.'
  },
  {
    id: 6,
    name: 'BuilderPro',
    role: 'Master Builder',
    roleType: 'builder',
    description: 'Creative architect designing spawn areas, dungeons, and custom structures.',
    avatar: 'https://mc-heads.net/avatar/BuilderPro/128',
    joinDate: '2018-04-18',
    experience: 5,
    specialties: ['World Building', 'Architecture', 'Dungeon Design'],
    online: false,
    timezone: 'PST',
    contact: 'Discord: BuilderPro#0006',
    helpedPlayers: 1200,
    quote: 'Every block tells a story.'
  },
  {
    id: 7,
    name: 'HelperBot',
    role: 'Support Helper',
    roleType: 'helper',
    description: 'Friendly helper always ready to assist new players and answer questions.',
    avatar: 'https://mc-heads.net/avatar/HelperBot/128',
    joinDate: '2020-02-14',
    experience: 3,
    specialties: ['Player Support', 'FAQ Assistance', 'Basic Troubleshooting'],
    online: true,
    timezone: 'GMT',
    contact: 'Discord: HelperBot#0007',
    helpedPlayers: 1800,
    quote: 'No question is too small!'
  },
  {
    id: 8,
    name: 'EventMaster',
    role: 'Event Coordinator',
    roleType: 'moderator',
    description: 'Organizes server events, competitions, and community activities.',
    avatar: 'https://mc-heads.net/avatar/EventMaster/128',
    joinDate: '2019-07-22',
    experience: 4,
    specialties: ['Event Planning', 'Community Engagement', 'Prize Management'],
    online: true,
    timezone: 'CET',
    contact: 'Discord: EventMaster#0008',
    helpedPlayers: 2500,
    quote: 'Life is better with events and celebrations!'
  }
];

/**
 * Role Configuration
 * 
 * Defines styling and properties for different staff role types.
 * 
 * @constant {Object} roleConfig
 */
const roleConfig = {
  owner: {
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    icon: <Crown className="w-5 h-5" />,
    badge: 'OWNER'
  },
  admin: {
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30',
    icon: <Shield className="w-5 h-5" />,
    badge: 'ADMIN'
  },
  moderator: {
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    icon: <Star className="w-5 h-5" />,
    badge: 'MOD'
  },
  developer: {
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30',
    icon: <Zap className="w-5 h-5" />,
    badge: 'DEV'
  },
  builder: {
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    icon: <Award className="w-5 h-5" />,
    badge: 'BUILDER'
  },
  helper: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    icon: <Heart className="w-5 h-5" />,
    badge: 'HELPER'
  }
};

// ==================== COMPONENT ====================

/**
 * Staff Section Component
 * 
 * Main component that renders the complete staff section with filtering,
 * statistics, and interactive staff member cards.
 * 
 * @returns {JSX.Element} Staff section JSX
 */
export const StaffSection: React.FC = () => {
  // ==================== STATE MANAGEMENT ====================
  
  /**
   * Filter state for staff role types
   * @type {string} activeFilter - Currently active role filter
   */
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  /**
   * Expanded card state for detailed view
   * @type {number | null} expandedCard - ID of currently expanded staff card
   */
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // ==================== COMPUTED VALUES ====================
  
  /**
   * Filter staff members based on active filter
   * @type {StaffMember[]} filteredStaff - Filtered staff members array
   */
  const filteredStaff = activeFilter === 'all' 
    ? staffMembers 
    : staffMembers.filter(member => member.roleType === activeFilter);

  /**
   * Calculate staff statistics
   * @type {Object} stats - Staff statistics object
   */
  const stats = {
    total: staffMembers.length,
    online: staffMembers.filter(member => member.online).length,
    totalHelped: staffMembers.reduce((sum, member) => sum + member.helpedPlayers, 0),
    avgExperience: Math.round(staffMembers.reduce((sum, member) => sum + member.experience, 0) / staffMembers.length)
  };

  /**
   * Get unique role types for filter buttons
   * @type {string[]} roleTypes - Array of unique role types
   */
  const roleTypes = ['all', ...Array.from(new Set(staffMembers.map(member => member.roleType)))];

  // ==================== EVENT HANDLERS ====================
  
  /**
   * Toggle expanded card state with proper event handling
   * 
   * Prevents default browser behavior and stops event propagation
   * to avoid unwanted page scrolling or navigation issues.
   * 
   * @param {React.MouseEvent} event - Mouse click event
   * @param {number} memberId - ID of staff member to toggle
   */
  const toggleCard = (event: React.MouseEvent, memberId: number) => {
    // Prevent default browser behavior
    event.preventDefault();
    event.stopPropagation();
    
    // Toggle the expanded state
    setExpandedCard(expandedCard === memberId ? null : memberId);
  };

  /**
   * Handle filter change with proper event handling
   * 
   * @param {React.MouseEvent} event - Mouse click event
   * @param {string} roleType - Role type to filter by
   */
  const handleFilterChange = (event: React.MouseEvent, roleType: string) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveFilter(roleType);
  };

  /**
   * Format join date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  // ==================== RENDER ====================
  
  return (
    <section id="staff" className="py-16 sm:py-20 bg-gradient-to-b from-secondary-dark to-primary-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-40 h-40 bg-blue-500 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-purple-500 rounded-full blur-3xl bottom-20 right-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-24 h-24 bg-grass-green rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-500 text-white text-xs px-4 py-2 rounded-full font-bold mb-4 uppercase tracking-wider">
            MEET THE TEAM
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white tracking-wider uppercase">
            SERVER STAFF
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-light-gray max-w-2xl mx-auto">
            Our dedicated team of professionals working 24/7 to ensure the best gaming experience
          </p>
        </div>

        {/* Staff Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black text-blue-400 mb-1">{stats.total}</div>
            <div className="text-light-gray text-sm">Staff Members</div>
          </div>
          
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-grass-green/20 hover:border-grass-green/40 transition-all duration-300">
            <div className="w-12 h-12 bg-grass-green rounded-xl flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-primary-dark" />
            </div>
            <div className="text-2xl font-black text-grass-green mb-1">{stats.online}</div>
            <div className="text-light-gray text-sm">Online Now</div>
          </div>
          
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black text-purple-400 mb-1">{stats.totalHelped.toLocaleString()}</div>
            <div className="text-light-gray text-sm">Players Helped</div>
          </div>
          
          <div className="glass rounded-2xl p-4 sm:p-6 text-center border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-primary-dark" />
            </div>
            <div className="text-2xl font-black text-yellow-400 mb-1">{stats.avgExperience}y</div>
            <div className="text-light-gray text-sm">Avg Experience</div>
          </div>
        </div>

        {/* Role Filter with Green Selected State */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {roleTypes.map((roleType) => (
            <button
              key={roleType}
              onClick={(e) => handleFilterChange(e, roleType)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeFilter === roleType
                  ? 'bg-grass-green text-primary-dark shadow-lg scale-105'
                  : 'bg-secondary-dark/60 text-light-gray hover:text-white hover:bg-secondary-dark/80 border border-white/10'
              }`}
            >
              {roleType !== 'all' && roleConfig[roleType as keyof typeof roleConfig]?.icon}
              <span className="capitalize">
                {roleType === 'all' ? 'All Staff' : roleConfig[roleType as keyof typeof roleConfig]?.badge || roleType}
              </span>
            </button>
          ))}
        </div>

        {/* Staff Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((member) => {
            const config = roleConfig[member.roleType];
            const isExpanded = expandedCard === member.id;
            
            return (
              <div
                key={member.id}
                className={`glass rounded-2xl overflow-hidden border-2 ${config.borderColor} hover:border-opacity-60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer group relative select-none`}
                onClick={(e) => toggleCard(e, member.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCard(e as any, member.id);
                  }
                }}
                aria-expanded={isExpanded}
                aria-label={`${member.name} - ${member.role}. Click to ${isExpanded ? 'collapse' : 'expand'} details.`}
              >
                {/* Animated background glow */}
                <div className={`absolute inset-0 ${config.bgColor} opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl`}></div>
                
                {/* Online status indicator */}
                {member.online && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-3 h-3 bg-grass-green rounded-full animate-pulse shadow-lg"></div>
                  </div>
                )}
                
                {/* Card Header */}
                <div className={`${config.bgColor} p-6 text-center relative overflow-hidden`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute w-20 h-20 bg-white/10 rounded-full -top-10 -left-10 animate-pulse"></div>
                    <div className="absolute w-16 h-16 bg-white/5 rounded-full -bottom-8 -right-8 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <div className="relative z-10">
                    {/* Avatar */}
                    <div className="w-20 h-20 mx-auto mb-4 relative">
                      <img
                        src={member.avatar}
                        alt={`${member.name}'s Minecraft avatar`}
                        className="w-full h-full rounded-xl border-4 border-white/20 group-hover:border-white/40 transition-all duration-300 group-hover:scale-110 shadow-lg"
                        loading="lazy"
                      />
                      {/* Role badge */}
                      <div className={`absolute -bottom-2 -right-2 ${config.bgColor} ${config.color} rounded-lg p-1 border-2 border-white/20`}>
                        {config.icon}
                      </div>
                    </div>
                    
                    {/* Name and Role */}
                    <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.color} border ${config.borderColor}`}>
                      {config.badge}
                    </div>
                    <p className="text-white/80 text-sm mt-2">{member.role}</p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 relative z-10">
                  <p className="text-light-gray text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${config.color}`}>{member.helpedPlayers.toLocaleString()}</div>
                      <div className="text-xs text-light-gray">Players Helped</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${config.color}`}>{member.experience}y</div>
                      <div className="text-xs text-light-gray">Experience</div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="animate-fade-in-up border-t border-white/10 pt-4 mt-4">
                      {/* Specialties */}
                      <div className="mb-4">
                        <h4 className="text-white font-semibold text-sm mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-white/10 text-light-gray rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Additional Info */}
                      <div className="space-y-2 text-xs text-light-gray">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span>Joined {formatJoinDate(member.joinDate)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-3 h-3 flex-shrink-0" />
                          <span className="break-all">{member.contact}</span>
                        </div>
                      </div>
                      
                      {/* Quote */}
                      <div className="mt-4 p-3 bg-white/5 rounded-lg border-l-4 border-grass-green">
                        <p className="text-light-gray text-xs italic">"{member.quote}"</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Click indicator */}
                  <div className="text-center mt-4">
                    <span className="text-xs text-light-gray opacity-60">
                      {isExpanded ? 'Click to collapse' : 'Click for more info'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};