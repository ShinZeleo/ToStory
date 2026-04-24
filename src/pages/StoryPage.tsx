import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GoldButton from '../components/GoldButton';
import QuizPromptModal from '../components/QuizPromptModal';
import { storyTitle, storyParagraphs } from '../data/storyContent';
import { useLocalStorage } from '../hooks/useLocalStorage';
import warriorsImg from '../assets/warriors.png';
import diggingImg from '../assets/digging.png';
import './StoryPage.css';

const illustrationMap: Record<string, string> = {
  warriors: warriorsImg,
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
      <div className="container">
        {/* Badge */}
        <div className="story__badge">
          <GoldButton
            label="Cerita Rakyat"
            onClick={() => navigate('/menu')}
            small
            id="story-back-btn"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>}
          />
        </div>

        {/* Title */}
        <h1 className="story__title">{storyTitle}</h1>

        {/* Content */}
        <div className="story__content">
          {storyParagraphs.map((para, i) => {
            if (para.illustration) {
              return (
                <div
                  key={i}
                  className={`story__illust-block story__illust-block--${para.illustrationPosition}`}
                >
                  <div className="story__illust-img">
                    <img
                      src={illustrationMap[para.illustration]}
                      alt={`Ilustrasi ${para.illustration}`}
                      loading="lazy"
                    />
                    <p className="story__illust-caption">
                      Ilustrasi oleh Carmen Ayu (SMA Lokon Santo Nikolaus Tomohon)
                    </p>
                  </div>
                  <div className="story__illust-text">
                    <p className={`story__paragraph ${para.isQuote ? 'story__paragraph--quote' : ''}`}>
                      {para.text}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <p
                key={i}
                className={`story__paragraph ${para.isQuote ? 'story__paragraph--quote' : ''}`}
              >
                {para.text}
              </p>
            );
          })}

          {/* Axe divider */}
          <div className="story__axe">🪓</div>

          {/* End */}
          <div className="story__end">
            <button
              className="story__end-btn"
              onClick={() => setShowQuizPrompt(true)}
              id="story-finish-btn"
            >
              Selesai Membaca — Lanjutkan
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Prompt Modal */}
      {showQuizPrompt && (
        <QuizPromptModal onClose={() => setShowQuizPrompt(false)} />
      )}
    </motion.div>
  );
}
