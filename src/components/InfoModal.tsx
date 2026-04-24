import { useEffect } from 'react';
import { motion } from 'framer-motion';
import './InfoModal.css';

interface InfoModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

export default function InfoModal({ title, content, onClose }: InfoModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="info-modal-overlay" onClick={onClose}>
      <motion.div
        className="info-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <button 
          className="info-modal__close" 
          onClick={onClose}
          aria-label="Tutup popup"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="info-modal__title" id="info-modal-title">{title}</h2>
        <div className="info-modal__content">
          {content}
        </div>
      </motion.div>
    </div>
  );
}
