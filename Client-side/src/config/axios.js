// Helper to normalize a base URL so it ends with /api exactly once
const ensureApiBase = (raw) => {
    if (!raw) return undefined;
    let trimmed = raw.trim();
    if (trimmed.endsWith('/')) trimmed = trimmed.slice(0, -1);
    if (!/\/api$/i.test(trimmed)) {
        trimmed += '/api';
    }
    return trimmed;
};

const RAW_REMOTE_BASE = import.meta.env.VITE_API_BASE_URL;
const RAW_LOCAL_BASE = import.meta.env.VITE_API_BASE_URL_LOCAL || 'http://localhost:5000';

const REMOTE_BASE = ensureApiBase(RAW_REMOTE_BASE);
const LOCAL_BASE = ensureApiBase(RAW_LOCAL_BASE);

const allowLocalFallback = import.meta.env.DEV === true;
let AUTO_REDIRECT_ON_401 = false;

const initialBase = REMOTE_BASE || (allowLocalFallback ? LOCAL_BASE : undefined);
if (!initialBase) {
    console.warn('[API] No base URL configured; requests will fail unless provided later.');
}

let usingLocalFallback = false;

class AxiosMock {
    constructor(config) {
        this.defaults = {
            baseURL: config.baseURL || '',
            headers: config.headers || {},
            withCredentials: config.withCredentials || true
        };
        
        this.interceptors = {
            request: { use: () => {} },
            response: { use: () => {} }
        };
    }

    async request(config) {
        const baseURL = config.baseURL || this.defaults.baseURL;
        let url = config.url || '';
        
        let targetUrl;
        if (url.startsWith('http://') || url.startsWith('https://')) {
            targetUrl = url;
        } else {
            targetUrl = baseURL + (url.startsWith('/') ? url : '/' + url);
        }

        if (config.params) {
            const urlObj = new URL(targetUrl, 'http://localhost');
            Object.entries(config.params).forEach(([k, v]) => {
                if (v !== undefined) urlObj.searchParams.append(k, v);
            });
            targetUrl = targetUrl.startsWith('http') ? urlObj.toString() : urlObj.pathname + urlObj.search;
        }

        let defaultHeaders = { ...this.defaults.headers };
        const token = localStorage.getItem('token');
        if (token) {
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }
        
        const mergedHeaders = { ...defaultHeaders, ...(config.headers || {}) };

        let body = config.data;
        if (body instanceof FormData) {
            delete mergedHeaders['Content-Type'];
        } else if (body && typeof body === 'object') {
            body = JSON.stringify(body);
            if (!mergedHeaders['Content-Type']) mergedHeaders['Content-Type'] = 'application/json';
        }

        const fetchOptions = {
            method: (config.method || 'GET').toUpperCase(),
            headers: mergedHeaders,
            body: ['GET', 'HEAD'].includes((config.method || 'GET').toUpperCase()) ? undefined : body,
            credentials: (config.withCredentials || this.defaults.withCredentials) ? 'include' : 'same-origin'
        };

        const doFetch = async (target, isFallback = false) => {
            let response;
            try {
                response = await fetch(target, fetchOptions);
            } catch (err) {
                if (allowLocalFallback && REMOTE_BASE && !usingLocalFallback && !isFallback && target.startsWith(REMOTE_BASE)) {
                    usingLocalFallback = true;
                    this.defaults.baseURL = LOCAL_BASE;
                    return doFetch(target.replace(REMOTE_BASE, LOCAL_BASE), true);
                }
                const error = new Error('Network Error');
                error.request = fetchOptions;
                error.config = config;
                throw error;
            }

            const contentType = response.headers.get('content-type');
            let data;
            try {
                if (contentType && contentType.includes('application/json')) {
                    data = await response.json();
                } else {
                    data = await response.text();
                }
            } catch(e) {
                data = null;
            }

            if (!response.ok) {
                if (response.status >= 500 && allowLocalFallback && REMOTE_BASE && !usingLocalFallback && !isFallback && target.startsWith(REMOTE_BASE)) {
                    usingLocalFallback = true;
                    this.defaults.baseURL = LOCAL_BASE;
                    return doFetch(target.replace(REMOTE_BASE, LOCAL_BASE), true);
                }
                if (response.status === 401 && localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                }
                const error = new Error('Request failed with status code ' + response.status);
                error.response = { status: response.status, data, headers: response.headers };
                error.config = config;
                throw error;
            }

            return { data, status: response.status, statusText: response.statusText, headers: response.headers, config };
        };

        return doFetch(targetUrl);
    }

    get(url, config = {}) { return this.request({ ...config, method: 'GET', url }); }
    post(url, data, config = {}) { return this.request({ ...config, method: 'POST', url, data }); }
    put(url, data, config = {}) { return this.request({ ...config, method: 'PUT', url, data }); }
    patch(url, data, config = {}) { return this.request({ ...config, method: 'PATCH', url, data }); }
    delete(url, config = {}) { return this.request({ ...config, method: 'DELETE', url }); }
    create(config) { return new AxiosMock(config); }
}

const api = new AxiosMock({
    baseURL: initialBase,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

export const forceLocalApi = () => {
    usingLocalFallback = true;
    api.defaults.baseURL = LOCAL_BASE;
};

export const resetToRemoteApi = () => {
    if (REMOTE_BASE) {
        usingLocalFallback = false;
        api.defaults.baseURL = REMOTE_BASE;
    }
};

export const getCurrentApiBase = () => api.defaults.baseURL;

export const setRedirectOn401 = (value) => {
    AUTO_REDIRECT_ON_401 = !!value;
};

export default api;
