import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GoldButton from '../components/GoldButton';
import ImageCarousel from '../components/ImageCarousel';
import { villageItems } from '../data/villageContent';
import kabasaranImg from '../assets/kabasaran.png';
import villageSceneryImg from '../assets/village-scenery.png';
import mountainBgImg from '../assets/mountain-bg.png';
import './AboutVillagePage.css';

const imageMap: Record<string, string> = {
  kabasaran: kabasaranImg,
  volcano: mountainBgImg,
  scenery: villageSceneryImg,
};

const carouselImages = villageItems.map((item) => ({
  src: imageMap[item.image],
  alt: item.title,
  caption: item.title, // Add a generic caption so it shows in lightbox
}));

export default function AboutVillagePage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = villageItems[activeIndex];

  return (
    <motion.div 
      className="about" 
      id="about-page"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      <div className="about__container">
        {/* Badge */}
        <div className="about__badge">
          <GoldButton
            label="Tentang Desa"
            onClick={() => navigate('/menu')}
            small
            id="about-back-btn"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>}
          />
        </div>

        {/* Carousel */}
        <div className="about__carousel-section">
          <ImageCarousel 
            images={carouselImages} 
            onIndexChange={(index) => setActiveIndex(index)}
          />
        </div>

        {/* Synced Content Section */}
        <div className="about__content-sync">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              className="about__content-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="about__content-title">{activeItem.title}</h2>
              <p className="about__content-text">{activeItem.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
