import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GoldButton from '../components/GoldButton';
import QuizPromptModal from '../components/QuizPromptModal';
import { storyTitle, storyScenes } from '../data/storyContent';
import { useLocalStorage } from '../hooks/useLocalStorage';
import StoryScene from '../components/StoryScene';
import './StoryPage.css';

// Import images
import mountainBg from '../assets/mountain-bg.png';
import warriorsImg from '../assets/warriors.png';
import villageScenery from '../assets/village-scenery.png';
import diggingImg from '../assets/digging.png';

const imageMap: Record<string, string> = {
  mountain: mountainBg,
  warriors: warriorsImg,
  village: villageScenery,
  digging: diggingImg,
};

export default function StoryPage() {
  const [showQuizPrompt, setShowQuizPrompt] = useState(false);
  const [, setHasReadStory] = useLocalStorage('tostory_hasRead', false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showQuizPrompt) {
      setHasReadStory(true);
    }
  }, [showQuizPrompt, setHasReadStory]);

  return (
    <motion.div
      className="story"
      id="story-page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="story__badge story__badge--floating">
        <GoldButton
          label="Cerita Rakyat"
          onClick={() => navigate('/menu')}
          small
          id="story-back-btn"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          }
        />
      </div>

      <div className="story__cinematic-content">
        
        {storyScenes.map((scene, index) => (
          <StoryScene
            key={index}
            title={index === 0 ? storyTitle : undefined}
            text={
              <>
                {scene.paragraphs.map((p, pIndex) => (
                  <p 
                    key={pIndex} 
                    className={p.isQuote ? "story-scene__quote" : "story-scene__paragraph"}
                    style={pIndex > 0 ? { marginTop: '1.5rem' } : undefined}
                  >
                    {p.text}
                  </p>
                ))}
              </>
            }
            image={scene.illustration ? imageMap[scene.illustration] : undefined}
            align={scene.align}
            overlay={index === 0}
            dark={index === 0}
          />
        ))}

        <div className="story__end-section">
          <div className="story__axe">🪓</div>

          <div className="story__end">
            <motion.button
              className="story__end-btn"
              onClick={() => setShowQuizPrompt(true)}
              id="story-finish-btn"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              Selesai Membaca — Lanjutkan
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.button>
          </div>
        </div>

      </div>

      {showQuizPrompt && (
        <QuizPromptModal onClose={() => setShowQuizPrompt(false)} />
      )}
    </motion.div>
  );
}
