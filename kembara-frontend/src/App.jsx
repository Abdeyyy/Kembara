import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Star, Mail, Phone, Linkedin, Instagram, Facebook, Globe, Menu } from 'lucide-react';

function ScrollReveal({ children, delay = 0 }) {
  const [state, setState] = useState({ visible: false, animate: false });
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rect = entry.boundingClientRect;

          if (entry.isIntersecting) {
            if (rect.top >= 0) {
              // Elemen masuk dari bawah (scroll ke bawah) → animasi
              setState({ visible: true, animate: true });
            } else {
              // Elemen masuk dari atas (scroll ke atas) → tampil langsung tanpa animasi
              setState({ visible: true, animate: false });
            }
          } else {
            if (rect.top > 0) {
              // Elemen keluar ke bawah (scroll ke atas melewatinya) → reset, animasi muncul lagi
              setState({ visible: false, animate: false });
            }
            // Elemen keluar ke atas (scroll ke bawah melewatinya) → biarkan tetap terlihat
          }
        });
      },
      { threshold: 0.1 }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: (state.visible && state.animate) ? `${delay}ms` : '0ms' }}
      className={`w-full ${
        !state.visible
          ? 'opacity-0 translate-y-10'
          : state.animate
          ? 'opacity-100 translate-y-0 transition-all duration-700 ease-out'
          : 'opacity-100 translate-y-0'
      }`}
    >
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <video
            src="/images/animasikan_untuk_di_web.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Navbar */}
        <ScrollReveal delay={100}>
          <nav className="relative z-10 flex items-center justify-between px-4 md:px-8 py-6 max-w-7xl mx-auto text-white">
            <div className="text-2xl font-bold tracking-wider">KEMBARA</div>
            <div className="hidden md:flex gap-8 text-sm font-medium">
              <a href="#" className="hover:text-gray-200">Home</a>
              <a href="#" className="hover:text-gray-200">Destination</a>
              <a href="#" className="hover:text-gray-200">Tour</a>
              <a href="#" className="hover:text-gray-200">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden sm:inline-block bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                Daftar Sekarang
              </button>
              <button className="md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur">
                <Menu size={24} />
              </button>
            </div>
          </nav>
        </ScrollReveal>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-8 max-w-7xl mx-auto -mt-20">
          <ScrollReveal delay={300}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              Nikmati<br />Liburan<br />Impianmu.
            </h1>
            <div>
              <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
                Mulai Jelajahi
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tour Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-4 text-xs font-semibold tracking-wider text-gray-500">TOUR</div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <h2 className="text-3xl md:text-5xl font-bold max-w-xl leading-tight">
              Jelajahi Destinasi Terbaik Yogyakarta.
            </h2>
            <button className="bg-primary text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-secondary transition w-full md:w-auto">
              Explore more
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            {/* Card 1 */}
            <div className="group cursor-pointer">
              <div className="h-80 w-full rounded-3xl overflow-hidden mb-4">
                <img src="/images/Candi Prambanan.jpg" alt="Prambanan" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="flex justify-between items-center font-bold px-2">
                <span className="text-lg">Candi Prambanan</span>
              </div>
            </div>
            {/* Card 2 */}
            <div className="group cursor-pointer">
              <div className="h-80 w-full rounded-3xl overflow-hidden mb-4">
                <img src="/images/pantai parangtritis.jpg" alt="Parangtritis" className="w-full h-full object-cover object-bottom group-hover:scale-105 transition duration-500" />
              </div>
              <div className="flex justify-between items-center font-bold px-2">
                <span className="text-lg">Pantai Parangtritis</span>
              </div>
            </div>
            {/* Card 3 */}
            <div className="group cursor-pointer">
              <div className="h-80 w-full rounded-3xl overflow-hidden mb-4">
                <img src="/images/Keraton.jpg" alt="Keraton Yogyakarta" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="flex justify-between items-center font-bold px-2">
                <span className="text-lg">Keraton Yogyakarta</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Explore Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-4 text-xs font-semibold tracking-wider text-gray-500">EXPLORE</div>
          <div className="flex flex-col md:flex-row justify-between mb-12 gap-4 md:gap-8">
            <h2 className="text-3xl md:text-5xl font-bold max-w-lg leading-tight">
              Temukan Destinasi Pilihan Sesuai Gayamu.
            </h2>
            <p className="text-gray-500 max-w-sm text-sm">
              Jelajahi keindahan Yogyakarta melalui berbagai pilihan destinasi yang telah kami kurasi untuk menghadirkan pengalaman wisata yang nyaman dan berkesan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group">
              <img src="/images/wisata.jpg" alt="Air Terjun" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <span className="text-white text-2xl font-semibold">Air Terjun</span>
                <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">See Details</button>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group">
              <img src="/images/pantai.jpg" alt="Pantai" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <span className="text-white text-2xl font-semibold">Pantai</span>
                <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">See Details</button>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group">
              <img src="/images/candi.jpg" alt="Candi" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <span className="text-white text-2xl font-semibold">Candi</span>
                <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">See Details</button>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group">
              <img src="/images/museum.jpg" alt="Museum" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <span className="text-white text-2xl font-semibold">Museum</span>
                <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">See Details</button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Destination Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gray-50">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-4 text-xs font-semibold tracking-wider text-primary">DESTINATION</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Destinasi Favorit!</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-10 text-sm md:text-base">
              Rekomendasi Destinasi Terbaik di Yogyakarta.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left mb-12">
              {[
              { title: 'Malioboro', loc: 'Yogyakarta, Indonesia', price: 'Rp 100.000', image: 'Malioboro.jpg' },
              { title: 'Keraton Yogyakarta', loc: 'Yogyakarta, Indonesia', price: 'Rp 50.000', image: 'keratonjg.jpg' },
              { title: 'Pantai Parangtritis', loc: 'Yogyakarta, Indonesia', price: 'Rp 20.000', image: 'SunsetParanngTritis.jpg' },
              { title: 'Candi Prambanan', loc: 'Yogyakarta, Indonesia', price: 'Rp 150.000', image: 'Prambanan.jpg' },
            ].map((tour, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="h-48">
                  <img src={`/images/${tour.image}`} alt={tour.title} className="w-full h-full object-cover" />
                </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1">{tour.title}</h3>
                    <div className="flex items-center text-gray-500 text-xs mb-3 gap-1">
                      <MapPin size={12} className="text-green-500" /> {tour.loc}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4].map(i => <Star key={i} size={12} fill="currentColor" />)}
                        <Star size={12} fill="currentColor" className="text-yellow-400/50" />
                      </div>
                      <span>4.5/5</span>
                    </div>
                    <div className="font-bold text-lg">{tour.price} <span className="text-sm font-normal text-gray-500">/ Trip</span></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-primary text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-secondary transition mx-auto cursor-pointer">
              Explore more <span>→</span>
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div className="flex-1 w-full relative">
              <div className="h-72 md:h-[600px] rounded-3xl overflow-hidden shadow-lg">
                <img src="/images/Tugujogja.jpg" alt="Process" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 w-full mt-6 md:mt-0">
              <div className="mb-4 text-xs font-semibold tracking-wider text-gray-500">HOW IT WORKS</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12">Proses pembelian tiket</h2>

              <div className="space-y-6">
                {[
                  { title: 'Find your destination', desc: 'Embark a journey to discover your dream destination, where adventure and relaxation await' },
                  { title: 'Book a ticket', desc: 'Ensure a smooth travel experience by booking tickets to your preferred destination via our booking platform' },
                  { title: 'Make payment', desc: 'We offer a variety of payment options to meet your preferences and ensure a hassle free transaction process' },
                  { title: 'Explore destination', desc: 'You\'ll be immersed in a captivating tapestry of sights, sounds and tastes, as you wind your way through the ancient streets' }
                ].map((step, idx) => (
                  <div key={idx} className={`flex gap-6 p-6 rounded-2xl ${idx === 0 ? 'bg-gray-50' : ''}`}>
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-gray-400">
                      O
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer Komplit */}
      <footer className="bg-[#2a3a1f] text-white py-12 md:py-16 px-6 md:px-8 mt-12 w-full border-t border-[#1f2b17]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-12 md:mb-16">
          
          {/* Kiri - Brand & Kontak */}
          <ScrollReveal delay={100}>
            <div className="flex-1 w-full md:max-w-md">
              <h2 className="text-3xl font-bold mb-4 md:mb-6">KEMBARA</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 md:mb-12">
                Don't miss out on our interesting promotions, please follow our social media so you don't miss out on other interesting information.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <span>kembara.nusantara@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>+62 855 5666 000</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tengah - Links */}
          <ScrollReveal delay={300}>
            <div className="flex-1 max-w-xs">
              <h3 className="font-semibold tracking-wider mb-6">LINKS</h3>
              <div className="flex flex-col gap-4 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition">Places</a>
                <a href="#" className="hover:text-white transition">Experiences</a>
                <a href="#" className="hover:text-white transition">How it work</a>
                <a href="#" className="hover:text-white transition">Why us</a>
                <a href="#" className="hover:text-white transition">Craft my trip</a>
              </div>
            </div>
          </ScrollReveal>

          {/* Kanan - Based In & Follow */}
          <ScrollReveal delay={500}>
            <div className="flex-1 max-w-xs">
              <h3 className="font-semibold tracking-wider mb-6">BASED IN</h3>
              <div className="flex flex-col gap-4 text-sm text-gray-300 mb-10">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇮🇩</span>
                  <span>Yogyakarta, Indonesia</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇮🇩</span>
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>

              <h3 className="font-semibold tracking-wider mb-6">FOLLOW</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-400 transition"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-gray-400 transition"><Instagram size={20} /></a>
                <a href="#" className="hover:text-gray-400 transition"><Facebook size={20} /></a>
                <a href="#" className="hover:text-gray-400 transition"><Globe size={20} /></a>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Under Footer */}
        <ScrollReveal delay={700}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 border-t border-gray-100/10 pt-8">
            <div className="flex gap-6 mb-4 md:mb-0">
              <span>2026 All right reserved</span>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
            </div>
            <div>
              <a href="#" className="hover:text-white transition">Term of Service</a>
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
}

export default App;
