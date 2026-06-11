import { useState } from "react";
import {
  HiUserAdd,
  HiSearch,
  HiSparkles,
  HiBadgeCheck,
  HiShieldCheck,
  HiStar,
  HiUsers,
} from "react-icons/hi";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui";

const initialCustomers = [
  {
    id: 1,
    name: "Andi Saputra",
    phone: "0812-3456-7890",
    address: "Jl. Melati No. 10, Jakarta",
    type: "Premium",
    status: "Aktif",
    points: 850,
    tier: "Gold",
  },
  {
    id: 2,
    name: "Siti Aisyah",
    phone: "0856-7890-1234",
    address: "Perum. Asri Blok B2, Bandung",
    type: "Reguler",
    status: "Aktif",
    points: 420,
    tier: "Silver",
  },
  {
    id: 3,
    name: "Budi Santoso",
    phone: "0813-5555-6666",
    address: "Jl. Sudirman No. 45, Surabaya",
    type: "VIP",
    status: "Nonaktif",
    points: 1200,
    tier: "Platinum",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    phone: "0821-9999-8888",
    address: "Kos Mawar Kamar 04, Yogyakarta",
    type: "Reguler",
    status: "Aktif",
    points: 310,
    tier: "Silver",
  },
  {
    id: 5,
    name: "Rizky Pratama",
    phone: "0822-3344-5566",
    address: "Jl. Kebon Jeruk No. 7, Tangerang",
    type: "Premium",
    status: "Aktif",
    points: 975,
    tier: "Gold",
  },
];

export default function Members() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("customer");
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    type: "Regular",
    points: 0,
    tier: "Silver",
  });

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search) ||
      customer.address.toLowerCase().includes(search.toLowerCase())
  );

  const loyaltySummary = {
    totalCustomers: customers.length,
    activeMembers: customers.filter((item) => item.status === "Aktif").length,
    platinumCount: customers.filter((item) => item.tier === "Platinum").length,
    goldCount: customers.filter((item) => item.tier === "Gold").length,
  };

  const topLoyalty = [...customers]
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = (event) => {
    event.preventDefault();
    if (!form.name || !form.phone) {
      return;
    }

    setCustomers((prev) => [
      {
        id: prev.length + 1,
        name: form.name,
        phone: form.phone,
        address: form.address || "-",
        type: form.type,
        status: "Aktif",
        points: Number(form.points) || 0,
        tier: form.tier,
      },
      ...prev,
    ]);

    setForm({
      name: "",
      phone: "",
      address: "",
      type: "Regular",
      points: 0,
      tier: "Silver",
    });

    setOpenDialog(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-slate-900 text-white rounded-3xl shadow-lg shadow-slate-200/10">
              <HiUsers className="text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Customer CRM</h1>
              <p className="text-slate-500 font-medium">
                Navigasi data Customer dan Loyalty menggunakan komponen Tabs, Table, dan Dialog.
              </p>
            </div>
          </div>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800">
              <HiUserAdd className="text-lg" /> Tambah Customer Baru
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Customer Baru</DialogTitle>
              <DialogDescription>
                Lengkapi informasi pelanggan untuk menambahkan data baru ke dalam CRM.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleAddCustomer}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Nama Customer
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    placeholder="Contoh: Rina Wijaya"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Nomor Telepon
                  <input
                    name="phone"
                    type="text"
                    value={form.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    placeholder="081234567890"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm font-medium text-slate-700 block">
                Alamat
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  className="min-h-[100px] w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  placeholder="Jl. Contoh No. 11, Surabaya"
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Tipe Customer
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  >
                    <option>Regular</option>
                    <option>Premium</option>
                    <option>VIP</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Tier Loyalty
                  <select
                    name="tier"
                    value={form.tier}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  >
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Poin Awal
                  <input
                    name="points"
                    type="number"
                    value={form.points}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    placeholder="0"
                  />
                </label>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <button className="inline-flex justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                    Batal
                  </button>
                </DialogClose>
                <button type="submit" className="inline-flex justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Simpan Customer
                </button>
              </DialogFooter>
            </form>
            <DialogClose asChild>
              <button className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                ×
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
        </TabsList>

        <TabsContent value="customer">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 text-slate-700">
                <HiUsers className="text-2xl text-slate-900" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Daftar Pelanggan</p>
                  <h2 className="text-2xl font-bold text-slate-900">Customer aktif dan data kontak</h2>
                </div>
              </div>
              <div className="relative w-full max-w-sm">
                <HiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama, telepon, atau alamat..."
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Poin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-lg font-bold text-slate-700">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{customer.name}</p>
                          <p className="text-xs text-slate-500">{customer.address}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-slate-800">{customer.phone}</div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">
                        {customer.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${
                        customer.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold text-slate-900">{customer.points}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="loyalty">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-slate-900">
                <HiShieldCheck className="text-3xl text-slate-900" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Ringkasan Loyalty</p>
                  <h3 className="text-xl font-bold">Program Loyalti Pelanggan</h3>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Total Customer</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">{loyaltySummary.totalCustomers}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Member Aktif</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">{loyaltySummary.activeMembers}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Gold Tier</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">{loyaltySummary.goldCount}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Platinum Tier</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">{loyaltySummary.platinumCount}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-slate-900">
                <HiStar className="text-3xl text-amber-500" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Top Loyal Customers</p>
                  <h3 className="text-xl font-bold">Poin Tertinggi</h3>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {topLoyalty.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between rounded-3xl border border-slate-100 bg-slate-50 px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">{customer.name}</p>
                      <p className="text-xs text-slate-500">{customer.tier} • {customer.type}</p>
                    </div>
                    <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">{customer.points}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
