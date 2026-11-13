import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const adminApiClient = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

adminApiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token && token !== 'undefined' && token !== 'null') {
            config.headers['x-access-token'] = token;
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ===================== AUTH =====================
export const adminAuthAPI = {
    login: (data: { username: string; password: string }) =>
        adminApiClient.post('/admin/auth/signin', data),
};

// ===================== DASHBOARD =====================
export const dashboardAPI = {
    getStats: () => adminApiClient.get('/admin/panel/dashboard'),
    refreshStats: () => adminApiClient.post('/admin/panel/stats/refresh'),
};

// ===================== USERS =====================
export const adminUsersAPI = {
    getAll: (page = 1, limit = 20) =>
        adminApiClient.get(`/admin/panel/users?page=${page}&limit=${limit}`),
    deactivate: (id: string) => adminApiClient.post(`/admin/panel/users/${id}/deactivate`),
};

// ===================== VENDORS =====================
export const adminVendorsAPI = {
    getAll: (page = 1, limit = 20) =>
        adminApiClient.get(`/admin/panel/vendors?page=${page}&limit=${limit}`),
    getPending: () => adminApiClient.get('/admin/panel/vendors/pending'),
    approve: (id: string) => adminApiClient.post(`/admin/panel/vendors/${id}/approve`),
    reject: (id: string, reason: string) =>
        adminApiClient.post(`/admin/panel/vendors/${id}/reject`, { reason }),
    deactivate: (id: string, reason: string) =>
        adminApiClient.post(`/admin/panel/vendors/${id}/deactivate`, { reason }),
};

// ===================== PRODUCTS =====================
export const adminProductsAPI = {
    getAll: (page = 1, limit = 20) =>
        adminApiClient.get(`/admin/panel/products?page=${page}&limit=${limit}`),
    highlight: (id: string) => adminApiClient.post(`/admin/panel/products/${id}/highlight`),
    removeHighlight: (id: string) => adminApiClient.post(`/admin/panel/products/${id}/remove-highlight`),
    promote: (id: string) => adminApiClient.post(`/admin/panel/products/${id}/promote`),
    removePromote: (id: string) => adminApiClient.post(`/admin/panel/products/${id}/remove-promote`),
};

// ===================== ORDERS =====================
export const adminOrdersAPI = {
    getAll: (page = 1, limit = 20) =>
        adminApiClient.get(`/admin/panel/orders?page=${page}&limit=${limit}`),
};

// ===================== INVOICES =====================
export const adminInvoicesAPI = {
    getAll: () => adminApiClient.get('/admin/panel/invoices'),
};

// ===================== REVIEWS =====================
export const adminReviewsAPI = {
    getAll: () => adminApiClient.get('/admin/panel/reviews'),
    hide: (id: string) => adminApiClient.post(`/admin/panel/reviews/${id}/hide`),
    unhide: (id: string) => adminApiClient.post(`/admin/panel/reviews/${id}/unhide`),
};

// ===================== PACKAGES =====================
export const adminPackagesAPI = {
    getAll: () => adminApiClient.get('/admin/panel/packages'),
    create: (data: Record<string, unknown>) => adminApiClient.post('/admin/panel/packages', data),
    update: (id: string, data: Record<string, unknown>) =>
        adminApiClient.put(`/admin/panel/packages/${id}`, data),
};

// ===================== LOCATIONS =====================
export const adminLocationsAPI = {
    getAll: () => adminApiClient.get('/admin/panel/locations'),
    create: (regionName: string) =>
        adminApiClient.post('/admin/panel/locations', { region_name: regionName }),
    delete: (id: string) => adminApiClient.delete(`/admin/panel/locations/${id}`),
};

// ===================== CHAT =====================
export const adminChatAPI = {
    getAll: () => adminApiClient.get('/admin/panel/chat'),
    getMessages: (convId: string) =>
        adminApiClient.get(`/admin/panel/chat/${convId}/messages`),
};
