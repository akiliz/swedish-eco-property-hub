
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useApi } from './useApi';

// Add a development bypass flag
const DEV_MODE_BYPASS_AUTH = true; // Set to true for development, false for production

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: async () => {},
  isAuthenticated: false
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // When in dev bypass mode, always consider authenticated
  const [token, setToken] = useState<string | null>(DEV_MODE_BYPASS_AUTH ? "dev_token" : null);
  const { logout: apiLogout } = useApi();
  
  // Check for saved token on mount (only if not in bypass mode)
  useEffect(() => {
    if (!DEV_MODE_BYPASS_AUTH) {
      const savedToken = localStorage.getItem('auth_token');
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, []);
  
  const login = (newToken: string) => {
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
  };
  
  const logout = async () => {
    if (!DEV_MODE_BYPASS_AUTH) {
      try {
        await apiLogout();
      } finally {
        localStorage.removeItem('auth_token');
        setToken(null);
      }
    } else {
      // In dev mode, just reset to the dev token
      setToken("dev_token");
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      token, 
      login, 
      logout, 
      // Always authenticated in dev bypass mode
      isAuthenticated: DEV_MODE_BYPASS_AUTH ? true : !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
