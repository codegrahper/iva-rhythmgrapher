import React from 'react';

interface SectionProps {
  id: string;
  number?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  id,
  number,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}) => {
  return (
    <section id={id} className={`content-section ${className}`}>
      {(number || eyebrow || title) && (
        <header className="section-header">
          <div className="section-meta">
            {number && <span className="section-number">{number}</span>}
            {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          </div>
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
          <div className="section-divider" aria-hidden="true" />
        </header>
      )}
      <div className="section-body">{children}</div>
    </section>
  );
};
