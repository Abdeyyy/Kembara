import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Users, Calendar, ChevronRight, Check, AlertCircle } from 'lucide-react';

const destinationsData = {
  'candi-prambanan': {
    title: 'Candi Prambanan',
    price: 150000,
    image: '/images/Candi Prambanan.jpg',
    rating: 4.8,
    location: 'Sleman, Yogyakarta',
  },
  'pantai-parangtritis': {
    title: 'Pantai Parangtritis',
    price: 20000,
    image: '/images/pantai parangtritis.jpg',
    rating: 4.5,
    location: 'Bantul, Yogyakarta',
  },
  'keraton-yogyakarta': {
    title: 'Keraton Yogyakarta',
    price: 50000,
    image: '/images/Keraton.jpg',
    rating: 4.7,
    location: 'Kraton, Yogyakarta',
  },
  malioboro: {
    title: 'Malioboro',
    price: 100000,
    image: '/images/Malioboro.jpg',
    rating: 4.6,
    location: 'Gedongtengen, Yogyakarta',
  },
};

const today = new Date().toISOString().split('T')[0];

export default function BookingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dest = destinationsData[slug];

  const [step, setStep] = useState(1); // 1 = form, 2 = konfirmasi, 3 = sukses
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    adults: 1,
    children: 0,
    note: '',
  });
  const [errors, setErrors] = useState({});

  if (!dest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Destinasi tidak ditemukan</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-primary text-white px-6 py-3 rounded-full hover:bg-secondary transition"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const totalPeople = Number(form.adults) + Number(form.children) * 0.5;
  const totalPrice = dest.price * totalPeople;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nama wajib diisi';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email tidak valid';
    if (!form.phone.trim() || form.phone.length < 9) e.phone = 'Nomor telepon tidak valid';
    if (!form.date) e.date = 'Tanggal kunjungan wajib dipilih';
    if (form.adults < 1) e.adults = 'Minimal 1 tiket dewasa';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    setStep(3);
  };

  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 text-sm outline-none transition ${
      errors[field]
        ? 'border-red-400 focus:border-red-500 bg-red-50'
        : 'border-gray-200 focus:border-primary bg-white'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <button
          onClick={() => (step > 1 ? setStep(step - 1) : navigate(`/destination/${slug}`))}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition font-medium"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Kembali</span>
        </button>
        <span className="text-xl font-bold tracking-wider text-primary">KEMBARA</span>
        <div className="w-20" />
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {['Detail Perjalanan', 'Konfirmasi', 'Selesai'].map((label, i) => {
            const s = i + 1;
            const active = step >= s;
            return (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step > s
                        ? 'bg-green-500 text-white'
                        : active
                        ? 'bg-primary text-white shadow-lg scale-110'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {step > s ? <Check size={16} /> : s}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${active ? 'text-primary' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 max-w-20 h-1 rounded-full transition-all duration-500 ${
                      step > s ? 'bg-green-500' : step === s ? 'bg-primary/40' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form / Konfirmasi / Sukses */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Detail Perjalanan</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="contoh@email.com"
                        className={inputClass('email')}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">No. Telepon *</label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="08xxxxxxxxxx"
                        className={inputClass('phone')}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Kunjungan *</label>
                    <input
                      name="date"
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={handleChange}
                      className={inputClass('date')}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.date}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Tiket Dewasa *</label>
                      <input
                        name="adults"
                        type="number"
                        min={1}
                        max={20}
                        value={form.adults}
                        onChange={handleChange}
                        className={inputClass('adults')}
                      />
                      {errors.adults && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.adults}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Tiket Anak (½ harga)</label>
                      <input
                        name="children"
                        type="number"
                        min={0}
                        max={20}
                        value={form.children}
                        onChange={handleChange}
                        className={inputClass('children')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Catatan Tambahan</label>
                    <textarea
                      name="note"
                      value={form.note}
                      onChange={handleChange}
                      placeholder="Permintaan khusus, kebutuhan aksesibilitas, dll..."
                      rows={3}
                      className="w-full border border-gray-200 focus:border-primary rounded-xl px-4 py-3 text-sm outline-none transition resize-none"
                    />
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-base hover:bg-secondary transition shadow-md active:scale-95 flex items-center justify-center gap-2 mt-2"
                  >
                    Lanjutkan ke Konfirmasi <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Konfirmasi Pemesanan</h2>
                <div className="space-y-4 mb-8">
                  {[
                    { label: 'Nama', value: form.name },
                    { label: 'Email', value: form.email },
                    { label: 'Telepon', value: form.phone },
                    { label: 'Tanggal Kunjungan', value: new Date(form.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                    { label: 'Tiket Dewasa', value: `${form.adults} orang` },
                    { label: 'Tiket Anak', value: `${form.children} orang` },
                    ...(form.note ? [{ label: 'Catatan', value: form.note }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start py-3 border-b border-gray-100 gap-4">
                      <span className="text-sm text-gray-500 flex-shrink-0">{label}</span>
                      <span className="text-sm font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 rounded-2xl p-5 mb-6 border border-primary/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Total Pembayaran</p>
                      <p className="text-2xl font-bold text-primary mt-1">
                        Rp {totalPrice.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p>{form.adults} dewasa × Rp {dest.price.toLocaleString('id-ID')}</p>
                      {form.children > 0 && (
                        <p>{form.children} anak × Rp {(dest.price / 2).toLocaleString('id-ID')}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition active:scale-95"
                  >
                    Edit Data
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-primary text-white py-4 rounded-2xl font-semibold hover:bg-secondary transition shadow-md active:scale-95"
                  >
                    Konfirmasi Booking
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-3xl shadow-sm p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-green-600">Booking Berhasil!</h2>
                <p className="text-gray-500 mb-2">
                  Terima kasih, <strong>{form.name}</strong>!
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  Konfirmasi akan dikirim ke <strong>{form.email}</strong>
                </p>
                <p className="text-gray-400 text-sm mb-8">
                  Nomor booking: <strong className="text-primary">#KBR-{Math.random().toString(36).substr(2, 8).toUpperCase()}</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => navigate('/')}
                    className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition"
                  >
                    Kembali ke Beranda
                  </button>
                  <button
                    onClick={() => navigate(`/destination/${slug}`)}
                    className="border border-gray-200 text-gray-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                  >
                    Lihat Destinasi
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Ringkasan Destinasi */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden sticky top-24">
              <div className="h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{dest.title}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                  <MapPin size={12} className="text-green-500" />
                  {dest.location}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <span>{dest.rating} / 5</span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Harga/orang</span>
                    <span className="font-semibold">Rp {dest.price.toLocaleString('id-ID')}</span>
                  </div>
                  {form.adults > 0 && (
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">{form.adults} Dewasa</span>
                      <span className="font-semibold">Rp {(dest.price * form.adults).toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  {form.children > 0 && (
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">{form.children} Anak</span>
                      <span className="font-semibold">Rp {(dest.price * 0.5 * form.children).toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold border-t border-gray-100 pt-3 mt-2">
                    <span>Total</span>
                    <span className="text-primary">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
