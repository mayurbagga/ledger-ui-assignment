import { createContext } from 'react';
var initialState = {
    theme: 'system',
    setTheme: function () { return null; },
};
export var ThemeProviderContext = createContext(initialState);
