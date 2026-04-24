import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import StoryPage from './pages/StoryPage';
import QuizPage from './pages/QuizPage';
import AboutVillagePage from './pages/AboutVillagePage';
import './App.css';

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <div className="app">
      {showHeader && <Header />}
      <AnimatePresence mode="wait">
        <Routes key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/about" element={<AboutVillagePage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
