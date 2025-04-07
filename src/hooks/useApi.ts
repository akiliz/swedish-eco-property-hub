import { useState, useEffect } from 'react';

// Update API_URL to use the current hostname with path or default to localhost
const API_URL = typeof window !== 'undefined' 
  ? `${window.location.protocol}//${window.location.hostname}:5000/api` 
  : 'http://localhost:5000/api';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const useApi = () => {
  const [tokens, setTokens] = useState<AuthTokens | null>(() => {
    const savedTokens = localStorage.getItem('auth_tokens');
    return savedTokens ? JSON.parse(savedTokens) : null;
  });

  const saveTokens = (newTokens: AuthTokens) => {
    localStorage.setItem('auth_tokens', JSON.stringify(newTokens));
    setTokens(newTokens);
  };

  const clearTokens = () => {
    localStorage.removeItem('auth_tokens');
    setTokens(null);
  };

  // Automatically handle token refresh
  const getAuthHeaders = async () => {
    if (!tokens) return {};

    // Check if token needs refresh (using a helper function to decode JWT)
    const needsRefresh = isTokenExpiring(tokens.accessToken);
    
    if (needsRefresh) {
      try {
        const newTokens = await refreshTokens(tokens.refreshToken);
        saveTokens(newTokens);
        return { Authorization: `Bearer ${newTokens.accessToken}` };
      } catch (error) {
        // If refresh fails, log the user out
        clearTokens();
        return {};
      }
    }
    
    return { Authorization: `Bearer ${tokens.accessToken}` };
  };

  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const headers = await getAuthHeaders();
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          ...headers,
          'Content-Type': 'application/json',
        },
      });
      
      // Check for a new token in the response headers
      const newToken = response.headers.get('X-New-Token');
      if (newToken && tokens) {
        saveTokens({
          accessToken: newToken,
          refreshToken: tokens.refreshToken,
        });
      }
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API request failed');
      }
      
      return response.json();
    } catch (error: any) {
      if (error.message === 'Failed to fetch' || error instanceof TypeError) {
        throw new Error('Network error: Unable to connect to the server. Please ensure the API server is running.');
      }
      throw error;
    }
  };

  // Auth API calls
  const login = async (email: string, password: string, totpCode?: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, totpCode }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      if (data.accessToken && data.refreshToken) {
        saveTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      }
      
      return data;
    } catch (error: any) {
      if (error.message === 'Failed to fetch' || error instanceof TypeError) {
        throw new Error('Network error: Unable to connect to the server. Please ensure the API server is running.');
      }
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, confirmPassword: string, role: string = 'user') => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, confirmPassword, role }),
      });
      
      // Check if the response exists before trying to parse it
      if (!response) {
        throw new Error('Network error: No response received from the server');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      return data;
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message === 'Failed to fetch' || error instanceof TypeError) {
        throw new Error('Network error: Unable to connect to the server. Please ensure the API server is running at ' + API_URL);
      }
      throw error;
    }
  };

  const logout = async () => {
    if (!tokens) return;
    
    try {
      await fetchWithAuth('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearTokens();
    }
  };

  const logoutAll = async () => {
    if (!tokens) return;
    
    try {
      await fetchWithAuth('/auth/logout-all', { method: 'POST' });
    } catch (error) {
      console.error('Logout all failed:', error);
    } finally {
      clearTokens();
    }
  };

  // MFA methods
  const enableMfa = async () => {
    return fetchWithAuth('/auth/enable-mfa', { method: 'POST' });
  };

  const verifyMfa = async (totpCode: string) => {
    return fetchWithAuth('/auth/verify-mfa', {
      method: 'POST',
      body: JSON.stringify({ totpCode }),
    });
  };

  const disableMfa = async (totpCode: string) => {
    return fetchWithAuth('/auth/disable-mfa', {
      method: 'POST',
      body: JSON.stringify({ totpCode }),
    });
  };

  // Property API calls
  const fetchProperties = async () => {
    const response = await fetch(`${API_URL}/properties`);
    return response.json();
  };

  const createProperty = async (propertyData: any) => {
    return fetchWithAuth('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  };

  // Helper functions
  const refreshTokens = async (refreshToken: string) => {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to refresh token');
    }
    
    return data;
  };

  const isTokenExpiring = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiresIn = payload.exp - Math.floor(Date.now() / 1000);
      return expiresIn < 300; // refresh if less than 5 minutes left
    } catch (error) {
      return true; // if we can't decode the token, assume it needs refresh
    }
  };

  return {
    // Auth
    login,
    register,
    logout,
    logoutAll,
    isAuthenticated: !!tokens,
    // MFA
    enableMfa,
    verifyMfa,
    disableMfa,
    // Properties
    fetchProperties,
    createProperty,
    // Generic fetch
    fetchWithAuth,
  };
};
