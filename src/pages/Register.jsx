import { useState } from "react";
import { userAPI } from "../services/userAPI";
import AlertBox from "../components/AlertBox";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const [dataForm, setDataForm] = useState({
        username: "", email: "", password: "", role: "user" // default role sebagai user biasa
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            // Kirim data ke Supabase lewat Axios
            await userAPI.createUser(dataForm);

            setSuccess("Pendaftaran akun berhasil! Silakan menuju halaman login.");
            setDataForm({ username: "", email: "", password: "", role: "user" }); // Reset form
        } catch (err) {
            setError(`Gagal mendaftar: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Halaman Pendaftaran</h2>
            
            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="username"
                    value={dataForm.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                    type="email"
                    name="email"
                    value={dataForm.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                    type="password"
                    name="password"
                    value={dataForm.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl disabled:opacity-50 transition-all duration-200 shadow-lg"
                >
                    {loading ? "Mohon Tunggu..." : "Daftar Akun"}
                </button>
            </form>
        </div>
    );
}