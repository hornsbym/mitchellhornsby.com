import { createContext } from 'react';

export const DarkModeContext = createContext<{
    toggleDarkMode: () => void
    darkMode?: boolean,
}>({
    darkMode: false,
    toggleDarkMode: () => { }
})