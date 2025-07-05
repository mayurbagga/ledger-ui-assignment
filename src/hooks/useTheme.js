import { useContext } from 'react';
import { ThemeProviderContext } from '@/providers/theme-context';
export var useTheme = function () {
    var context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
