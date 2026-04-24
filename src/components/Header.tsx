import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import InfoModal from './InfoModal';
import bgmFile from '../assets/bgm.mp3';
import './Header.css';

const modalContent = {
  about: (
    <>
      <p><strong>ToStory</strong> adalah sebuah platform interaktif untuk melestarikan cerita rakyat dan budaya desa-desa di Indonesia, dimulai dari Desa Kakaskasen 2, Tomohon, Sulawesi Utara.</p>
      <p>Proyek ini dikembangkan untuk memperkenalkan kekayaan warisan budaya lokal kepada generasi muda melalui cara yang modern dan menyenangkan.</p>
    </>
  ),
  privacy: (
    <>
      <p>Kami sangat menghargai privasi Anda. Platform ini <strong>tidak mengumpulkan data pribadi</strong>, seperti nama, email, atau lokasi Anda.</p>
      <p>Progres kuis dan riwayat baca Anda mungkin disimpan secara lokal di peramban (browser) Anda, dan tidak dikirimkan ke server mana pun.</p>
    </>
  ),
  terms: (
    <>
      <p>Dengan menggunakan platform ToStory, Anda setuju untuk menghargai karya budaya dan intelektual yang disajikan di sini.</p>
      <p>Seluruh aset cerita, teks, dan ilustrasi dilindungi hak cipta dan tidak boleh disalin atau digunakan untuk tujuan komersial tanpa izin.</p>
    </>
  )
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'terms' | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isHome = location.pathname === '/' || location.pathname === '/menu';

  useEffect(() => {
    // Try to auto-play or handle audio context on mount
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Optimistic UI update
      setIsPlaying(true);
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
        setIsPlaying(false); // Revert if failed
        alert("Gagal memutar audio. Pastikan browser Anda mengizinkan pemutaran otomatis.");
      });
    }
  };

  const handleLangClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const openModal = (modal: 'about' | 'privacy' | 'terms') => {
    setActiveModal(modal);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={bgmFile} type="audio/mpeg" />
      </audio>

      <header className="header" id="main-header" role="banner">
        <button 
          className="header__logo" 
          onClick={() => navigate('/')}
          aria-label="Kembali ke halaman utama ToStory"
        >
          ToStory
        </button>
        
        <nav className="header__nav" aria-label="Navigasi Utama">
          {/* Desktop Links */}
          <div className="header__desktop-links">
            <button className="header__nav-link" onClick={() => openModal('about')} style={{background:'none', border:'none', cursor:'pointer'}} aria-label="Tentang Kami">Tentang Kami</button>
            <span className="header__separator" />
            <button className="header__nav-link" onClick={() => openModal('privacy')} style={{background:'none', border:'none', cursor:'pointer'}} aria-label="Kebijakan Privasi">Kebijakan Privasi</button>
            <span className="header__separator" />
            <button className="header__nav-link" onClick={() => openModal('terms')} style={{background:'none', border:'none', cursor:'pointer'}} aria-label="Syarat & Ketentuan">Syarat &amp; Ketentuan</button>
          </div>

          {!isHome && (
            <button
              className="header__nav-link header__nav-link--home"
              onClick={() => navigate('/menu')}
              aria-label="Kembali ke menu utama"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>
          )}

          {/* Audio Toggle */}
          <button 
            className="header__audio-btn" 
            onClick={toggleAudio}
            aria-label={isPlaying ? "Matikan musik" : "Nyalakan musik"}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            )}
          </button>
          
          {/* Language Toggle */}
          <button className="header__lang" id="lang-selector" onClick={handleLangClick} aria-label="Ganti bahasa (saat ini Bahasa Indonesia)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            ID
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button 
            className="header__hamburger" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Buka menu navigasi"
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="header__mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <button onClick={() => openModal('about')}>Tentang Kami</button>
            <button onClick={() => openModal('privacy')}>Kebijakan Privasi</button>
            <button onClick={() => openModal('terms')}>Syarat &amp; Ketentuan</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal && (
          <InfoModal
            title={
              activeModal === 'about' ? 'Tentang Kami' : 
              activeModal === 'privacy' ? 'Kebijakan Privasi' : 'Syarat & Ketentuan'
            }
            content={modalContent[activeModal]}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            className="toast-msg"
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
          >
            English version coming soon! 🌍
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
