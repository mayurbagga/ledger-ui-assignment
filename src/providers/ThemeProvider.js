import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { ThemeProviderContext } from './theme-context';
export function ThemeProvider(_a) {
    var children = _a.children, _b = _a.defaultTheme, defaultTheme = _b === void 0 ? 'system' : _b, _c = _a.storageKey, storageKey = _c === void 0 ? 'vite-ui-theme' : _c;
    var _d = useState(function () { return localStorage.getItem(storageKey) || defaultTheme; }), theme = _d[0], setTheme = _d[1];
    useEffect(function () {
        var root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        if (theme === 'system') {
            var systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
                .matches
                ? 'dark'
                : 'light';
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [theme]);
    var value = {
        theme: theme,
        setTheme: function (theme) {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };
    return (_jsx(ThemeProviderContext.Provider, { value: value, children: children }));
}
