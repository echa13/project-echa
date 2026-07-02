import axios from 'axios';

const BASE_URL = "https://umslmtorahoykwmmkjwi.supabase.co/rest/v1";
const API_KEY = "sb_publishable_6gXuWoCUI5Oqvd7OmKjyQA_5TqYgGCB";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
};

export const serviceAPI = {
    // Ambil semua layanan laundry
    async fetchServices() {
        const response = await axios.get(`${BASE_URL}/services`, {
            headers,
            params: { order: 'id.asc' }
        });
        return response.data;
    },

    // Buat order baru
    async createOrder(data) {
        const response = await axios.post(`${BASE_URL}/orders`, data, { headers });
        return response.data;
    },

    // Ambil semua order
    async fetchOrders() {
        const response = await axios.get(`${BASE_URL}/orders`, {
            headers,
            params: { order: 'created_at.desc' }
        });
        return response.data;
    },

    // Update status order
    async updateOrderStatus(id, status) {
        const response = await axios.patch(`${BASE_URL}/orders?id=eq.${id}`, { status }, { headers });
        return response.data;
    },

    // Ambil order berdasarkan user_id
    async fetchOrdersByUser(userId) {
        const response = await axios.get(`${BASE_URL}/orders?user_id=eq.${userId}`, {
            headers,
            params: { order: 'created_at.desc' }
        });
        return response.data;
    }
};
