import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GoldButton from '../components/GoldButton';
import { useLocalStorage } from '../hooks/useLocalStorage';
import mountainBg from '../assets/mountain-bg.png';
import './MenuPage.css';

export default function MenuPage() {
  const navigate = useNavigate();
  const [hasReadStory] = useLocalStorage('tostory_hasRead', false);
  const [highScore] = useLocalStorage('tostory_highScore', 0);

  return (
    <motion.div 
      className="menu" 
      id="menu-page"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="menu__mountain"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      <div className="menu__content">
        <GoldButton
          label={`Baca Cerita Rakyat ${hasReadStory ? '✅' : ''}`}
          onClick={() => navigate('/story')}
          id="btn-read-story"
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>}
        />
        <GoldButton
          label={`Mulai Kuis ${highScore > 0 ? `(Skor: ${highScore})` : ''}`}
          onClick={() => navigate('/quiz')}
          id="btn-start-quiz"
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>}
        />
        <GoldButton
          label="Tentang Desa"
          onClick={() => navigate('/about')}
          id="btn-about-village"
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>}
        />
      </div>
    </motion.div>
  );
}
