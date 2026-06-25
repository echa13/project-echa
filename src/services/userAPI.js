import axios from 'axios';


const BASE_URL = "https://umslmtorahoykwmmkjwi.supabase.co/rest/v1/users";
const API_KEY = "sb_publishable_6gXuWoCUI5Oqvd7OmKjyQA_5TqYgGCB";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
};

export const userAPI = {
    // 1. Mengambil semua data user (Untuk Halaman Admin)
    async fetchUsers() {
        const response = await axios.get(BASE_URL, { headers });
        return response.data;
    },

    // 2. Menambah User Baru (Untuk Halaman Pendaftaran / Register)
    async createUser(data) {
        const response = await axios.post(BASE_URL, data, { headers });
        return response.data;
    },

    // 3. Menghapus User berdasarkan ID (Untuk Aksi Admin)
    async deleteUser(id) {
        await axios.delete(`${BASE_URL}?id=eq.${id}`, { headers });
    },

    // 4. Mencari User berdasarkan Email (Untuk Proses Login Nyata)
    async loginCheck(email) {
        const response = await axios.get(`${BASE_URL}?email=eq.${email}`, { headers });
        return response.data; // Mengembalikan array user yang cocok
    }
};