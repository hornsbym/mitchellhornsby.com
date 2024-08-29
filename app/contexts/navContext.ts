import { createContext } from 'react';

export const NavContext = createContext({
    isNavOpen: false,
    setNavOpen: (open: boolean) => {}
})