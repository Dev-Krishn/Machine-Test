import React, {createContext, useState, ReactNode} from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  themeStyles: {
    light: ThemeStyles;
    dark: ThemeStyles;
  };
}

interface ThemeStyles {
  backgroundColor: string;
  textColor: string;
}

// Create the context
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

// Define props for the provider
interface ThemeProviderProps {
  children: ReactNode;
}

// Create a provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeStyles = {
    light: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
    },
    dark: {
      backgroundColor: '#000000',
      textColor: '#ffffff',
    },
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, themeStyles}}>
      {children}
    </ThemeContext.Provider>
  );
};
