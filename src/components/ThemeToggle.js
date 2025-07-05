import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useMediaQuery } from '@/hooks/useMediaQuery';
export var ThemeToggle = function () {
    var _a = useTheme(), theme = _a.theme, setTheme = _a.setTheme;
    var isMobile = useMediaQuery('(max-width: 768px)');
    return (_jsxs(Button, { variant: "ghost", size: isMobile ? "default" : "sm", onClick: function () { return setTheme(theme === 'light' ? 'dark' : 'light'); }, className: "".concat(isMobile ? 'w-10 h-10' : 'w-9', " px-0 bg-background hover:bg-muted/50 dark:hover:bg-muted/50 border"), children: [_jsx(Sun, { className: "".concat(isMobile ? 'h-5 w-5' : 'h-4 w-4', " transition-all ").concat(theme === 'light' ? 'rotate-0 scale-100' : '-rotate-90 scale-0') }), _jsx(Moon, { className: "absolute ".concat(isMobile ? 'h-5 w-5' : 'h-4 w-4', " transition-all ").concat(theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0') }), _jsx("span", { className: "sr-only", children: "Toggle theme" })] }));
};
