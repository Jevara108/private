/**
 * Discord Statistics Hook
 * 
 * Custom hook for fetching live Discord server statistics including
 * member count.
 * 
 * Features:
 * - Fetches live Discord server stats via Discord API
 * - Automatic refresh every 5 minutes
 * - Error handling with fallback values
 * - Loading states for better UX
 * - Configurable refresh intervals
 * 
 * @hook
 * @author CreeperCraft Development Team
 * @version 1.0.0
 */

import { useState, useEffect, useCallback } from 'react';

// ==================== INTERFACES ====================

/**
 * Discord Statistics Interface
 * 
 * @interface DiscordStats
 * @property {number} memberCount - Total server members
 * @property {boolean} loading - Whether data is being fetched
 * @property {string | null} error - Error message if fetch failed
 * @property {Date | null} lastUpdated - When data was last updated
 */
interface DiscordStats {
  memberCount: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

/**
 * Discord API Response Interface
 * 
 * @interface DiscordApiResponse
 * @property {number} approximate_member_count - Total members
 */
interface DiscordApiResponse {
  approximate_member_count: number;
}

// ==================== HOOK ====================

/**
 * Use Discord Statistics Hook
 * 
 * Fetches and manages Discord server statistics with automatic updates.
 * Falls back to provided default values if Discord invite is not provided
 * or if the API request fails.
 * 
 * @param {string} discordInvite - Discord server invite code (optional)
 * @param {number} fallbackMemberCount - Fallback member count
 * @param {number} refreshInterval - Refresh interval in milliseconds (default: 5 minutes)
 * @returns {DiscordStats} Discord statistics object
 */
export const useDiscordStats = (
  discordInvite?: string,
  fallbackMemberCount: number = 5000,
  refreshInterval: number = 0 // Disabled - only fetch once on page load
): DiscordStats => {
  // ==================== STATE ====================
  
  const [stats, setStats] = useState<DiscordStats>({
    memberCount: fallbackMemberCount,
    loading: false,
    error: null,
    lastUpdated: null
  });

  // ==================== FETCH FUNCTION ====================
  
  /**
   * Fetch Discord Statistics
   * 
   * Fetches live Discord server statistics from the Discord API.
   * Uses the Discord invite widget API which provides approximate counts.
   * 
   * @function fetchDiscordStats
   */
  const fetchDiscordStats = useCallback(async () => {
    // If no Discord invite provided, use fallback values
    if (!discordInvite || discordInvite.trim() === '') {
      setStats(prev => ({
        ...prev,
        memberCount: fallbackMemberCount,
        loading: false,
        error: null,
        lastUpdated: new Date()
      }));
      return;
    }

    setStats(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Extract invite code from full Discord URL if provided
      const inviteCode = discordInvite.includes('discord.gg/') 
        ? discordInvite.split('discord.gg/')[1].split('?')[0]
        : discordInvite;

      // Fetch from Discord API using invite code
      const response = await fetch(
        `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Discord API error: ${response.status}`);
      }

      const data: DiscordApiResponse = await response.json();

      setStats({
        memberCount: data.approximate_member_count || fallbackMemberCount,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });

    } catch (error) {
      console.warn('Failed to fetch Discord stats, using fallback values:', error);
      
      // Use fallback values on error
      setStats({
        memberCount: fallbackMemberCount,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch Discord stats',
        lastUpdated: new Date()
      });
    }
  }, [discordInvite, fallbackMemberCount]);

  // ==================== EFFECTS ====================
  
  /**
   * Initial Fetch and Interval Setup
   * 
   * Fetches Discord stats on mount and sets up automatic refresh interval.
   */
  useEffect(() => {
    // Initial fetch
    fetchDiscordStats();

    // Only fetch once on page load - no refresh interval
    // This prevents stressing the APIs with frequent requests
  }, [fetchDiscordStats, refreshInterval]);

  return stats;
};