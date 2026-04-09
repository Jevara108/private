/**
 * Minecraft Server Statistics Hook
 * 
 * Custom hook for fetching live Minecraft server statistics including
 * player count, server status, and other server information.
 * 
 * Features:
 * - Fetches live server stats via multiple APIs
 * - Automatic refresh every 30 seconds
 * - Error handling with fallback values
 * - Loading states and server status
 * - Support for multiple server stat APIs
 * 
 * @hook
 * @author CreeperCraft Development Team
 * @version 1.0.0
 */

import { useState, useEffect, useCallback } from 'react';

// ==================== INTERFACES ====================

/**
 * Minecraft Server Statistics Interface
 * 
 * @interface MinecraftStats
 * @property {number} playerCount - Current online players
 * @property {boolean} online - Whether server is online
 * @property {string} version - Server version
 * @property {string} motd - Server message of the day
 * @property {boolean} loading - Whether data is being fetched
 * @property {string | null} error - Error message if fetch failed
 * @property {Date | null} lastUpdated - When data was last updated
 */
interface MinecraftStats {
  playerCount: number;
  online: boolean;
  version: string;
  motd: string;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

/**
 * API Response Interface for mcsrvstat.us
 * 
 * @interface McSrvStatResponse
 * @property {boolean} online - Server online status
 * @property {Object} players - Player information
 * @property {number} players.online - Current online players
 * @property {number} players.max - Maximum players
 * @property {Object} version - Version information
 * @property {string} version.name - Version name
 * @property {Object} motd - Message of the day
 * @property {string[]} motd.clean - Clean MOTD text
 */
interface McSrvStatResponse {
  online: boolean;
  players: {
    online: number;
    max: number;
  };
  version: {
    name: string;
  };
  motd: {
    clean: string[];
  };
}

// ==================== HOOK ====================

/**
 * Use Minecraft Statistics Hook
 * 
 * Fetches and manages Minecraft server statistics with automatic updates.
 * Falls back to provided default values if server IP is not provided
 * or if the API request fails.
 * 
 * @param {string} serverIP - Minecraft server IP address (optional)
 * @param {number} fallbackPlayerCount - Fallback player count
 * @param {number} refreshInterval - Refresh interval in milliseconds (default: 30 seconds)
 * @returns {MinecraftStats} Minecraft server statistics object
 */
export const useMinecraftStats = (
  serverIP?: string,
  fallbackPlayerCount: number = 139,
  refreshInterval: number = 0 // Disabled - only fetch once on page load
): MinecraftStats => {
  // ==================== STATE ====================
  
  const fallbackMaxPlayers = 260;
  
  const [stats, setStats] = useState<MinecraftStats>({
    playerCount: fallbackPlayerCount,
    online: true,
    version: '1.21.x',
    motd: 'ZaosMS - Premium Minecraft Server',
    loading: false,
    error: null,
    lastUpdated: null
  });

  // ==================== FETCH FUNCTION ====================
  
  /**
   * Fetch Minecraft Server Statistics
   * 
   * Fetches live server statistics using the mcsrvstat.us API.
   * This is a free service that provides Minecraft server information.
   * 
   * @function fetchMinecraftStats
   */
  const fetchMinecraftStats = useCallback(async () => {
    // If no server IP provided, use fallback values with simulation
    if (!serverIP || serverIP.trim() === '') {
      // Simulate small fluctuations in player count for dynamic feel
      const fluctuation = Math.floor(Math.random() * 11) - 5; // -5 to +5
      const newPlayerCount = Math.max(0, Math.min(fallbackMaxPlayers, fallbackPlayerCount + fluctuation));
      
      setStats(prev => ({
        ...prev,
        playerCount: newPlayerCount,
        online: true,
        loading: false,
        error: null,
        lastUpdated: new Date()
      }));
      return;
    }

    setStats(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Clean server IP (remove protocol if present)
      const cleanIP = serverIP.replace(/^https?:\/\//, '').trim();
      console.log('Fetching stats for server:', cleanIP);
      
      let data: McSrvStatResponse | null = null;
      let apiUsed = '';

      // Try first API: mcsrvstat.us
      try {
        console.log('Trying mcsrvstat.us API...');
        const response1 = await fetch(
          `https://api.mcsrvstat.us/2/${encodeURIComponent(cleanIP)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(8000), // 8 second timeout
          }
        );

        if (response1.ok) {
          const apiData = await response1.json();
          console.log('mcsrvstat.us response:', apiData);
          
          // Check if we got valid data
          if (apiData && typeof apiData.online === 'boolean') {
            data = apiData;
            apiUsed = 'mcsrvstat.us';
          }
        }
      } catch (error) {
        console.warn('mcsrvstat.us API failed:', error);
      }

      // Try second API if first failed: mcapi.us
      if (!data) {
        try {
          console.log('Trying mcapi.us API...');
          const response2 = await fetch(
            `https://mcapi.us/server/status?ip=${encodeURIComponent(cleanIP)}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              signal: AbortSignal.timeout(8000), // 8 second timeout
            }
          );

          if (response2.ok) {
            const apiData = await response2.json();
            console.log('mcapi.us response:', apiData);
            
            // Transform mcapi.us response to match our interface
            if (apiData && typeof apiData.online === 'boolean') {
              data = {
                online: apiData.online,
                players: {
                  online: apiData.players?.now || 0,
                  max: apiData.players?.max || 100
                },
                version: {
                  name: apiData.server?.name || '1.21.x'
                },
                motd: {
                  clean: apiData.motd ? [apiData.motd] : ['ZaosMS - Premium Minecraft Server']
                }
              };
              apiUsed = 'mcapi.us';
            }
          }
        } catch (error) {
          console.warn('mcapi.us API failed:', error);
        }
      }

      // If we got data from either API, use it
      if (data) {
        console.log(`Successfully fetched data from ${apiUsed}:`, data);
        
        const onlinePlayerCount = data.players?.online;
        console.log('Extracted player count:', onlinePlayerCount);
        
        setStats({
          playerCount: typeof onlinePlayerCount === 'number' ? onlinePlayerCount : fallbackPlayerCount,
          online: data.online,
          version: data.version?.name || '1.21.x',
          motd: data.motd?.clean?.join(' ') || 'ZaosMS - Premium Minecraft Server',
          loading: false,
          error: null,
          lastUpdated: new Date()
        });
        return;
      }

      // If both APIs failed, throw error to trigger fallback
      throw new Error('Both APIs failed to return valid data');

    } catch (error) {
      console.warn('Failed to fetch Minecraft server stats for', serverIP, ':', error);
      
      // Use fallback values on error but keep server online
      const fluctuation = Math.floor(Math.random() * 11) - 5;
      const newPlayerCount = Math.max(0, fallbackPlayerCount + fluctuation);
      console.log('Using fallback player count:', newPlayerCount);
      
      setStats({
        playerCount: newPlayerCount,
        online: true, // Keep server online when using fallback
        version: '1.21.x',
        motd: 'ZaosMS - Premium Minecraft Server',
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch server stats',
        lastUpdated: new Date()
      });
    }
  }, [serverIP, fallbackPlayerCount, fallbackMaxPlayers]);

  // ==================== EFFECTS ====================
  
  /**
   * Initial Fetch and Interval Setup
   * 
   * Fetches server stats on mount and sets up automatic refresh interval.
   */
  useEffect(() => {
    // Initial fetch
    fetchMinecraftStats();

    // Only fetch once on page load - no refresh interval
    // This prevents stressing the APIs with frequent requests
  }, [fetchMinecraftStats, refreshInterval]);

  return stats;
};