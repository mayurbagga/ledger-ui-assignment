import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '@/providers/ThemeProvider';
var meta = {
    title: 'Components/ThemeToggle',
    component: ThemeToggle,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        function (Story) { return (_jsx(ThemeProvider, { children: _jsx(Story, {}) })); },
    ],
};
export default meta;
export var Default = {
    args: {},
};
export var Mobile = {
    args: {},
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
