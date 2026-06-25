import { useState, useEffect } from "react";
import { userAPI } from "../services/userAPI";
import GenericTable from "../components/GenericTable";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await userAPI.fetchUsers();
            setUsers(data);
        } catch (err) {
            setError("Gagal memuat data user dari database.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await userAPI.deleteUser(id);
            loadUsers(); // Refresh data setelah berhasil dihapus
        } catch (err) {
            setError(`Gagal menghapus user: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manajemen Data User</h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">Kelola data pengguna terdaftar melalui database Supabase.</p>
                </div>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {loading && <LoadingSpinner />}

            {!loading && users.length === 0 && !error && (
                <EmptyState message="Belum ada user terdaftar di database." />
            )}

            {!loading && users.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Menggunakan format props GenericTable yang sudah kita sepakati */}
                    <GenericTable
                        headers={["No", "Username", "Email", "Role"]}
                        data={users}
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </div>
    );
}