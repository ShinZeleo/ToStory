import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import mountainBg from '../assets/mountain-bg.png';
import bookCover from '../assets/book-cover.png';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${3 + Math.random() * 4}px`,
    duration: `${8 + Math.random() * 12}s`,
    delay: `${Math.random() * 8}s`,
  }));

  return (
    <motion.div 
      className="landing" 
      onClick={() => navigate('/menu')} 
      id="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Particles */}
      <div className="landing__particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="landing__particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Mountain */}
      <div
        className="landing__mountain"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      {/* Hero */}
      <div className="landing__hero">
        <div className="landing__book">
          <img src={bookCover} alt="Cerita Rakyat Book Cover" />
          <div className="landing__book-title">
            <h1>
              Cerita<br />Rakyat
            </h1>
          </div>
        </div>
        <div className="landing__subtitle">Desa Kakaskasen 2</div>
      </div>

      {/* Scroll hint */}
      <div className="landing__hint">
        <span>Ketuk untuk melanjutkan</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </motion.div>
  );
}
