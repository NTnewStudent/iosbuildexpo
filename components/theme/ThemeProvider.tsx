import React, { createContext, ReactNode } from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
type Theme = {
    dark: boolean,
    colors: {
        primary: string,
        background: string,
        card: string,
        text: string,
        border: string,
        notification: string,
    },
}

const DefaultTheme = {
    dark: false,
    colors: {
        primary: 'rgb(0, 122, 255)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(216, 216, 216)',
        notification: 'rgb(255, 59, 48)',
    },
}

const DarkTheme = {
    dark: true,
    colors: {
        primary: 'rgb(10, 132, 255)',
        background: 'rgb(1, 1, 1)',
        card: 'rgb(18, 18, 18)',
        text: 'rgb(229, 229, 231)',
        border: 'rgb(39, 39, 41)',
        notification: 'rgb(255, 69, 58)',
    },
}

interface ThemeContextProps {
    theme:Theme
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [colorModel, setColorModel] = React.useState(useColorScheme());
    const colorThemeContextValue = React.useMemo(
        () => ({
          colorModel,
          theme:colorModel==='light'?DefaultTheme:DarkTheme,
          setColorModel,
        }),
        [colorModel]
      );


    return <ThemeContext.Provider value={ colorThemeContextValue }>{children}</ThemeContext.Provider>;
};

export default ThemeContext