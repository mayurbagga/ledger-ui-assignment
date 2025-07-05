import { useState, useEffect } from 'react';
export function useMediaQuery(query) {
    var _a = useState(false), matches = _a[0], setMatches = _a[1];
    useEffect(function () {
        var media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        var listener = function () { return setMatches(media.matches); };
        window.addEventListener('resize', listener);
        return function () { return window.removeEventListener('resize', listener); };
    }, [matches, query]);
    return matches;
}
