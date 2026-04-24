import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageCarousel.css';

interface CarouselImage {
  src: string;
  alt: string;
  caption: string;
}

interface Props {
  images: CarouselImage[];
  onIndexChange?: (index: number) => void;
}

export default function ImageCarousel({ images, onIndexChange }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<CarouselImage | null>(null);

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <section className="carousel" aria-roledescription="carousel" aria-label="Galeri Foto Desa">
        <div className="carousel__track">
          {images.map((img, i) => (
            <div
              key={i}
              className={`carousel__slide ${i === currentIndex ? 'carousel__slide--active' : ''}`}
              aria-hidden={i !== currentIndex}
              onClick={() => setSelectedImage(img)}
              style={{ cursor: 'zoom-in' }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="carousel__caption">{img.caption}</div>
            </div>
          ))}
        </div>

        <button 
          className="carousel__btn carousel__btn--prev" 
          onClick={handlePrev}
          aria-label="Foto sebelumnya"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button 
          className="carousel__btn carousel__btn--next" 
          onClick={handleNext}
          aria-label="Foto selanjutnya"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="carousel__indicators" aria-hidden="true">
          {images.map((_, i) => (
            <button
              key={i}
              className={`carousel__dot ${i === currentIndex ? 'carousel__dot--active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              tabIndex={-1}
            />
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button className="lightbox-close" aria-label="Tutup foto" onClick={() => setSelectedImage(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <motion.img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="lightbox-img"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="lightbox-caption">{selectedImage.caption}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
