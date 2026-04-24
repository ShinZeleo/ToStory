import { useNavigate } from 'react-router-dom';
import './QuizPromptModal.css';

interface QuizPromptModalProps {
  onClose: () => void;
}

export default function QuizPromptModal({ onClose }: QuizPromptModalProps) {
  const navigate = useNavigate();

  return (
    <div className="quiz-modal-overlay" onClick={onClose} id="quiz-prompt-overlay">
      <div 
        className="quiz-modal" 
        onClick={(e) => e.stopPropagation()} 
        id="quiz-prompt-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
      >
        <p className="quiz-modal__subtitle">
          Kamu sudah selesai membaca<br />Sejarah Desa Kakaskasen
        </p>
        <h2 className="quiz-modal__title" id="quiz-modal-title">Ingin bermain Quiz?</h2>
        <div className="quiz-modal__actions">
          <button
            className="quiz-modal__btn"
            onClick={() => navigate('/quiz')}
            id="quiz-yes-btn"
          >
            Ya
          </button>
          <button
            className="quiz-modal__btn"
            onClick={onClose}
            id="quiz-no-btn"
          >
            Tidak
          </button>
        </div>
        <button
          className="quiz-modal__home-btn"
          onClick={() => navigate('/')}
          id="quiz-home-btn"
        >
          Kembali ke Home Page
        </button>
      </div>
    </div>
  );
}
