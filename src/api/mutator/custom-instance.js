var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Axios from 'axios';
// Create axios instance with base configuration
export var AXIOS_INSTANCE = Axios.create({
    baseURL: '/api', // This will be handled by MSW
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add request interceptor for logging
AXIOS_INSTANCE.interceptors.request.use(function (config) {
    var _a;
    console.log("[API Request] ".concat((_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase(), " ").concat(config.url));
    return config;
}, function (error) {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
});
// Add response interceptor for error handling
AXIOS_INSTANCE.interceptors.response.use(function (response) {
    console.log("[API Response] ".concat(response.status, " ").concat(response.config.url));
    return response;
}, function (error) {
    var _a;
    console.error('[API Response Error]', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
    return Promise.reject(error);
});
// Custom instance function for Orval
export var customInstance = function (config, options) {
    var source = Axios.CancelToken.source();
    var promise = AXIOS_INSTANCE(__assign(__assign(__assign({}, config), options), { cancelToken: source.token })).then(function (_a) {
        var data = _a.data;
        return data;
    });
    // @ts-expect-error - Adding cancel method to promise for SWR compatibility
    promise.cancel = function () {
        source.cancel('Query was cancelled');
    };
    return promise;
};
// Default export for convenience
export default customInstance;
