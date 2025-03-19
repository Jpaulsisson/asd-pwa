import { createContext, useState, useContext, ReactNode, useEffect } from "react";

type ThemeContextType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

type ThemeProviderProps = {
    children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        console.log("Stored Theme:", storedTheme)
        if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
            setTheme(storedTheme);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};