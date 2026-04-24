import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import GoldButton from '../components/GoldButton';
import { quizQuestions } from '../data/storyContent';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './QuizPage.css';

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [highScore, setHighScore] = useLocalStorage('tostory_highScore', 0);

  const question = quizQuestions[currentQ];
  const isCorrect = selected === question?.correctIndex;

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null) return;
      setSelected(index);
      if (index === question.correctIndex) {
        setScore((s) => s + 1);
      }
    },
    [selected, question]
  );

  const handleNext = useCallback(() => {
    if (currentQ + 1 >= quizQuestions.length) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  }, [currentQ]);

  const handleRestart = useCallback(() => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }, []);

  const progress = ((currentQ + (selected !== null ? 1 : 0)) / quizQuestions.length) * 100;

  useEffect(() => {
    if (finished) {
      if (score > highScore) {
        setHighScore(score);
      }

      const percentage = Math.round((score / quizQuestions.length) * 100);
      if (percentage >= 80) {
        // Fire confetti!
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
      }
    }
  }, [finished, score, highScore, setHighScore]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  if (finished) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    let message = 'Terus belajar, kamu pasti bisa!';
    if (percentage >= 80) message = 'Luar biasa! Kamu menguasai cerita ini!';
    else if (percentage >= 60) message = 'Bagus! Pengetahuanmu cukup baik!';

    return (
      <motion.div 
        className="quiz" 
        id="quiz-page"
        initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.4 }}
      >
        <div className="quiz__container">
          <div className="quiz__badge">
            <GoldButton
              label="Cerita Rakyat"
              onClick={() => navigate('/menu')}
              small
              id="quiz-back-btn"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>}
            />
          </div>

          <div className="quiz__question-card quiz__results">
            <div className="quiz__results-score">{score}/{quizQuestions.length}</div>
            <div className="quiz__results-label">Skor Akhir — {percentage}%</div>
            <p className="quiz__results-msg">{message}</p>
            <div className="quiz__results-actions">
              <button
                className="quiz__results-btn quiz__results-btn--primary"
                onClick={handleRestart}
                id="quiz-retry-btn"
              >
                Coba Lagi
              </button>
              <button
                className="quiz__results-btn quiz__results-btn--secondary"
                onClick={() => navigate('/menu')}
                id="quiz-home-btn"
              >
                Kembali ke Menu
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="quiz" 
      id="quiz-page"
      initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.4 }}
    >
      <div className="quiz__container">
        {/* Badge */}
        <div className="quiz__badge">
          <GoldButton
            label="Cerita Rakyat"
            onClick={() => navigate('/menu')}
            small
            id="quiz-back-btn"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>}
          />
        </div>

        {/* Progress */}
        <div className="quiz__progress">
          <div className="quiz__progress-bar">
            <div className="quiz__progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="quiz__progress-text">
            {currentQ + 1} / {quizQuestions.length}
          </span>
        </div>

        {/* Question */}
        <div className="quiz__question-card" key={currentQ}>
          <p className="quiz__question">{question.question}</p>
        </div>

        {/* Options */}
        <div className="quiz__options" key={`opts-${currentQ}`}>
          {question.options.map((opt, i) => {
            let stateClass = '';
            if (selected !== null) {
              if (i === question.correctIndex) stateClass = 'quiz__option--correct';
              else if (i === selected) stateClass = 'quiz__option--incorrect';
              else stateClass = 'quiz__option--disabled';
            }

            return (
              <button
                key={i}
                className={`quiz__option ${stateClass}`}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                id={`quiz-option-${i}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {selected !== null && (
          <>
            <div
              className={`quiz__feedback ${
                isCorrect ? 'quiz__feedback--correct' : 'quiz__feedback--incorrect'
              }`}
            >
              {isCorrect ? '✅ Benar! Jawaban kamu tepat.' : `❌ Salah. Jawaban yang benar: "${question.options[question.correctIndex]}"`}
            </div>
            <button
              className="quiz__next-btn"
              onClick={handleNext}
              id="quiz-next-btn"
            >
              {currentQ + 1 >= quizQuestions.length ? 'Lihat Hasil' : 'Pertanyaan Berikutnya →'}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
