import type { ReactNode } from 'react';
import './GoldButton.css';

interface GoldButtonProps {
  label: string;
  onClick: () => void;
  small?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function GoldButton({ 
  label, 
  onClick, 
  small, 
  className = '', 
  id, 
  'aria-label': ariaLabel,
  icon,
  iconPosition = 'left'
}: GoldButtonProps) {
  return (
    <button
      className={`gold-btn ${small ? 'gold-btn--small' : ''} ${className}`}
      onClick={onClick}
      id={id}
      aria-label={ariaLabel || label}
    >
      <span className="gold-btn__sparkle" />
      <span className="gold-btn__sparkle" />
      <span className="gold-btn__sparkle" />
      <span className="gold-btn__sparkle" />
      
      {icon && iconPosition === 'left' && (
        <span className="gold-btn__icon gold-btn__icon--left">{icon}</span>
      )}
      
      <span className="gold-btn__text">{label}</span>
      
      {icon && iconPosition === 'right' && (
        <span className="gold-btn__icon gold-btn__icon--right">{icon}</span>
      )}
    </button>
  );
}
