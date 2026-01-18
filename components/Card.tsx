
import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

const isGlassTheme = import.meta.env.VITE_THEME === 'glass';

const Card: React.FC<CardProps> = ({ title, children, className = "", footer }) => {
  return (
    <div className={`bg-card text-card-foreground rounded-xl border border-border shadow-sm overflow-hidden ${className} ${isGlassTheme ? 'glass-card' : ''}`}>
      {title && (
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-secondary border-t border-border">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
