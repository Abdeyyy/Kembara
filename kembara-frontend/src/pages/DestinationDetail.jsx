import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Users, ArrowLeft, ChevronRight, Check, Image } from 'lucide-react';

const destinationsData = {
  'candi-prambanan': {
    id: 'candi-prambanan',
    title: 'Candi Prambanan',
    subtitle: 'Keajaiban Arsitektur Hindu Jawa',
    location: 'Sleman, Yogyakarta, Indonesia',
    price: 150000,
    rating: 4.8,
    reviews: 2341,
    duration: '3-4 jam',
    category: 'Candi',
    image: '/images/Candi Prambanan.jpg',
    gallery: ['/images/Prambanan.jpg', '/images/candi.jpg', '/images/Tugujogja.jpg'],
    description:
      'Candi Prambanan adalah kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9. UNESCO menetapkannya sebagai Situs Warisan Dunia pada tahun 1991. Dengan tiga candi utama yang menjulang setinggi 47 meter, Prambanan merupakan mahakarya arsitektur Hindu Jawa yang memukau.',
    highlights: [
      'Kompleks candi Hindu terbesar di Asia Tenggara',
      'Situs Warisan Dunia UNESCO sejak 1991',
      'Relief Ramayana yang mendetail di sepanjang dinding',
      'Pertunjukan Sendratari Ramayana saat malam hari',
      'Museum informatif tentang sejarah candi',
    ],
    includes: ['Tiket masuk', 'Pemandu wisata', 'Peta lokasi', 'Asuransi perjalanan'],
    schedule: ['Buka: 06.00 – 17.00 WIB', 'Pertunjukan Ramayana: 19.30 – 21.30 WIB (Selasa, Kamis, Sabtu)'],
  },
  'pantai-parangtritis': {
    id: 'pantai-parangtritis',
    title: 'Pantai Parangtritis',
    subtitle: 'Legenda Pantai Selatan Jawa',
    location: 'Bantul, Yogyakarta, Indonesia',
    price: 20000,
    rating: 4.5,
    reviews: 5812,
    duration: '2-5 jam',
    category: 'Pantai',
    image: '/images/pantai parangtritis.jpg',
    gallery: ['/images/SunsetParanngTritis.jpg', '/images/pantai.jpg', '/images/wisata.jpg'],
    description:
      'Pantai Parangtritis adalah pantai ikonik di selatan Yogyakarta yang terkenal dengan legenda Ratu Kidul. Deburan ombak Samudra Hindia yang kuat, gumuk pasir yang unik, dan panorama sunset yang memukau menjadikannya salah satu destinasi wisata paling populer di Yogyakarta.',
    highlights: [
      'Panorama sunset yang spektakuler',
      'Gumuk pasir satu-satunya di Asia Tenggara',
      'Wisata ATV & berkuda di tepi pantai',
      'Legenda mistis Ratu Kidul yang terkenal',
      'Kuliner seafood segar di warung-warung tepi pantai',
    ],
    includes: ['Tiket masuk', 'Parkir kendaraan', 'Akses ke gumuk pasir', 'Fasilitas umum'],
    schedule: ['Buka: 24 jam (area utama)', 'Lokasi ATV: 08.00 – 17.00 WIB'],
  },
  'keraton-yogyakarta': {
    id: 'keraton-yogyakarta',
    title: 'Keraton Yogyakarta',
    subtitle: 'Jantung Budaya Kesultanan Mataram',
    location: 'Kraton, Yogyakarta, Indonesia',
    price: 50000,
    rating: 4.7,
    reviews: 3104,
    duration: '2-3 jam',
    category: 'Budaya',
    image: '/images/Keraton.jpg',
    gallery: ['/images/keratonjg.jpg', '/images/Malioboro.jpg', '/images/museum.jpg'],
    description:
      'Keraton Yogyakarta adalah istana resmi Kesultanan Ngayogyakarta Hadiningrat yang masih aktif dihuni sejak tahun 1755. Di sini pengunjung dapat menyaksikan pertunjukan seni tradisional Jawa, koleksi benda-benda kerajaan bersejarah, dan arsitektur Jawa klasik yang megah.',
    highlights: [
      'Istana kerajaan yang masih aktif hingga saat ini',
      'Pertunjukan wayang, gamelan, dan tari Jawa',
      'Koleksi pusaka dan senjata kerajaan',
      'Arsitektur tradisional Jawa yang autentik',
      'Dekat dengan Malioboro dan Alun-alun Kidul',
    ],
    includes: ['Tiket masuk', 'Pemandu wisata', 'Pertunjukan seni harian', 'Akses museum'],
    schedule: [
      'Buka: Selasa – Minggu, 08.30 – 14.00 WIB',
      'Pertunjukan: Setiap hari (jadwal bervariasi)',
    ],
  },
  'malioboro': {
    id: 'malioboro',
    title: 'Malioboro',
    subtitle: 'Jantung Wisata Belanja Yogyakarta',
    location: 'Gedongtengen, Yogyakarta, Indonesia',
    price: 100000,
    rating: 4.6,
    reviews: 8932,
    duration: '3-6 jam',
    category: 'Belanja',
    image: '/images/Malioboro.jpg',
    gallery: ['/images/Keraton.jpg', '/images/keratonjg.jpg', '/images/museum.jpg'],
    description:
      'Jalan Malioboro adalah ikon wisata Yogyakarta yang paling terkenal. Sepanjang 1 km ini dipenuhi pedagang batik, kerajinan, aksesoris, dan kuliner khas Jogja. Suasana malam Malioboro yang diterangi lampu-lampu dan penuh seniman jalanan menjadikannya pengalaman yang tak terlupakan.',
    highlights: [
      'Pusat belanja batik dan kerajinan tangan terlengkap',
      'Kuliner street food khas Yogyakarta',
      'Pertunjukan seniman jalanan setiap malam',
      'Dekat dengan Keraton, Benteng Vredeburg, dan Pasar Beringharjo',
      'Spot foto ikonik di tanda "Malioboro"',
    ],
    includes: ['Paket belanja', 'Voucher kuliner', 'Peta wisata kawasan', 'Asuransi'],
    schedule: ['Buka: 08.00 – 22.00 WIB', 'Puncak ramai: 18.00 – 21.00 WIB'],
  },
};

export default function DestinationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dest = destinationsData[slug];
  const [activeImg, setActiveImg] = useState(0);

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

  const allImages = [dest.image, ...dest.gallery];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition font-medium"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Kembali</span>
        </button>
        <span className="text-xl font-bold tracking-wider text-primary">KEMBARA</span>
        <div className="w-20" />
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <span
            className="hover:text-primary cursor-pointer transition"
            onClick={() => navigate('/')}
          >
            Beranda
          </span>
          <ChevronRight size={14} />
          <span className="text-gray-600 font-medium">{dest.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Gallery */}
          <div>
            <div className="h-80 md:h-[420px] rounded-3xl overflow-hidden mb-3 shadow-lg">
              <img
                src={allImages[activeImg]}
                alt={dest.title}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => { e.target.src = '/images/Tugujogja.jpg'; }}
              />
            </div>
            <div className="flex gap-3">
              {allImages.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 h-20 rounded-2xl overflow-hidden border-2 transition ${
                    activeImg === i ? 'border-primary scale-95' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`gallery-${i}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/images/Tugujogja.jpg'; }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {dest.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{dest.title}</h1>
              <p className="text-gray-500 text-lg mb-4">{dest.subtitle}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-green-500" />
                  {dest.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-blue-500" />
                  {dest.duration}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i <= Math.round(dest.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="font-bold">{dest.rating}</span>
                <span className="text-gray-400 text-sm">({dest.reviews.toLocaleString()} ulasan)</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{dest.description}</p>

              <div className="mb-6">
                <h3 className="font-bold mb-3">Yang Termasuk</h3>
                <div className="grid grid-cols-2 gap-2">
                  {dest.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={14} className="text-green-500 flex-shrink-0" />
                      {inc}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <span className="text-sm text-gray-500">Mulai dari</span>
                  <div className="text-3xl font-bold text-primary">
                    Rp {dest.price.toLocaleString('id-ID')}
                  </div>
                  <span className="text-sm text-gray-400">/ orang</span>
                </div>
                <div className="flex items-center gap-1 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <Users size={13} /> Tersedia
                </div>
              </div>
              <button
                onClick={() => navigate(`/booking/${dest.id}`)}
                className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-lg hover:bg-secondary transition shadow-md hover:shadow-lg active:scale-95"
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Highlights & Jadwal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-5">Highlight</h2>
            <ul className="space-y-3">
              {dest.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-5">Jadwal & Info</h2>
            <ul className="space-y-3">
              {dest.schedule.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                  <Clock size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-8 border-t border-gray-100">
          <p className="text-gray-500 mb-4">Siap merasakan pengalaman wisata yang tak terlupakan?</p>
          <button
            onClick={() => navigate(`/booking/${dest.id}`)}
            className="bg-primary text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-secondary transition shadow-lg hover:shadow-xl active:scale-95 inline-flex items-center gap-2"
          >
            Booking Sekarang <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
