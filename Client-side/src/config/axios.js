import axios from 'axios';

// Helper to normalize a base URL so it ends with /api exactly once
const ensureApiBase = (raw) => {
    if (!raw) return undefined;
    // Trim trailing slashes
    let trimmed = raw.trim();
    if (trimmed.endsWith('/')) trimmed = trimmed.slice(0, -1);
    // If it already ends with /api (case sensitive) leave it; else append
    if (!/\/api$/i.test(trimmed)) {
        trimmed += '/api';
    }
    return trimmed;
};

// Primary (remote / production) and fallback (local) API base URLs
const RAW_REMOTE_BASE = import.meta.env.VITE_API_BASE_URL; // user may or may not include /api
const RAW_LOCAL_BASE = import.meta.env.VITE_API_BASE_URL_LOCAL || 'http://localhost:5000/api';

const REMOTE_BASE = ensureApiBase(RAW_REMOTE_BASE);
const LOCAL_BASE = ensureApiBase(RAW_LOCAL_BASE);

// Flag to optionally disable automatic redirect on 401 (helps avoid loops during provider mounting)
let AUTO_REDIRECT_ON_401 = true;

// Create axios instance pointing first to remote if defined, else local, always API scoped
const initialBase = REMOTE_BASE || LOCAL_BASE;
if (!initialBase) {
    console.warn('[API] No base URL configured; requests will fail unless provided later. Configure VITE_API_BASE_URL or VITE_API_BASE_URL_LOCAL.');
}

const api = axios.create({
    baseURL: initialBase,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});
console.info('[API] Initial base URL set to:', api.defaults.baseURL);

// Track if we've already switched to local to avoid repeated retries
let usingLocalFallback = false;

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // No need to manually add token since we're using HTTP-only cookies
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalConfig = error.config;

        // If remote is set, not yet on local, and this looks like a network error or 5xx, try fallback
        const isNetworkIssue = !error.response && !!error.request; // no response received
        const status = error.response?.status;
        const isServerError = status >= 500;
        const isNotFound = status === 404;

        // If we get 404 from remote for top-level endpoints like /products it could indicate missing /api prefix.
        if (REMOTE_BASE && !usingLocalFallback && isNotFound) {
            console.warn('[API] 404 from remote. Verify VITE_API_BASE_URL includes backend root (without /api). We normalized to:', REMOTE_BASE);
        }

        const shouldAttemptFallback = REMOTE_BASE && !usingLocalFallback && (isNetworkIssue || isServerError);

        if (shouldAttemptFallback) {
            console.warn('[API] Remote unreachable or failing. Falling back to local API:', LOCAL_BASE);
            usingLocalFallback = true;
            api.defaults.baseURL = LOCAL_BASE;
            originalConfig.baseURL = LOCAL_BASE;
            try {
                return await api.request(originalConfig);
            } catch (fallbackErr) {
                console.error('[API] Fallback request also failed:', fallbackErr);
                throw fallbackErr;
            }
        }

        // Auth error handling (401) -> redirect
        if (status === 401) {
            if (AUTO_REDIRECT_ON_401) {
                // Avoid redirect loops when already on signin
                if (!window.location.pathname.startsWith('/signin')) {
                    window.location.href = '/signin';
                }
            }
        }

        // Log errors for visibility
        if (error.response) {
            console.error('Response Error:', error.response.data);
        } else if (error.request) {
            console.error('Request Error (no response):', error.request);
        } else {
            console.error('Setup Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Helper to manually force local (e.g., during dev troubleshooting)
export const forceLocalApi = () => {
    usingLocalFallback = true;
    api.defaults.baseURL = LOCAL_BASE;
    console.info('[API] Forced local API base URL:', LOCAL_BASE);
};

// Helper to reset to remote (will not switch automatically back unless page reloads)
export const resetToRemoteApi = () => {
    if (REMOTE_BASE) {
        usingLocalFallback = false;
        api.defaults.baseURL = REMOTE_BASE;
        console.info('[API] Reset to remote API base URL:', REMOTE_BASE);
    } else {
        console.warn('[API] No remote base URL configured; staying on local.');
    }
};

export const getCurrentApiBase = () => api.defaults.baseURL;

export const setRedirectOn401 = (value) => {
    AUTO_REDIRECT_ON_401 = !!value;
    console.info('[API] AUTO_REDIRECT_ON_401 set to', AUTO_REDIRECT_ON_401);
};

export default api; 