import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import './StoryScene.css';

type Props = {
  title?: string;
  text?: ReactNode;
  image?: string;
  align?: "left" | "right" | "center";
  overlay?: boolean;
  dark?: boolean;
};

export default function StoryScene({
  title,
  text,
  image,
  align = "left",
  overlay = false,
  dark = false,
}: Props) {
  return (
    <section className="story-scene">
      
      {/* BACKGROUND IMAGE (Full Width Overlay) */}
      {image && overlay && (
        <div className="story-scene__overlay-wrapper">
          <motion.img
            src={image}
            alt={title || "Story Background"}
            className="story-scene__image"
            initial={{ scale: 1.15, filter: "blur(6px)", y: "-2%" }}
            whileInView={{ scale: 1, filter: "blur(0px)", y: "0%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0 }}
            loading="lazy"
          />
          <div className="story-scene__gradient-overlay" />
        </div>
      )}

      {/* BACKGROUND DECORATIONS (Organic Blobs for non-overlay scenes) */}
      {!overlay && (
        <motion.div 
          className="story-scene__organic-blob"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        />
      )}

      {/* CONTENT WRAPPER */}
      <div
        className={`
          story-scene__content-wrapper
          ${align === "right" ? "story-scene__content-wrapper--right" : ""}
          ${align === "center" ? "story-scene__content-wrapper--center" : ""}
        `}
      >
        
        {/* TEXT BOX */}
        <motion.div
          className={`
            story-scene__text-box
            ${dark ? "story-scene__text-box--dark" : "story-scene__text-box--light"}
          `}
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {title && (
            <h2 className="story-scene__title">
              {title}
            </h2>
          )}

          {text && (
            <div className="story-scene__text">
              {text}
            </div>
          )}
        </motion.div>
        
        {/* INLINE IMAGE (For Left/Right Alignment) */}
        {align !== "center" && (
          <div className="story-scene__image-col">
            {image && !overlay && (
              <motion.div
                 className="story-scene__inline-image-wrapper"
                 initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                 whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 viewport={{ once: true }}
              >
                <img
                  src={image}
                  alt="Story Illustration"
                  className="story-scene__inline-image"
                  loading="lazy"
                />
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
