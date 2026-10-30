'use client';

import React from 'react';
import { externalLinks } from '@/content';

interface HeaderProps {
  onOpenArchive: (tab?: 'all' | 'discography' | 'works' | 'bio' | 'contact') => void;
  activeSectionLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenArchive,
  activeSectionLabel,
}) => {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand */}
        <div className="header-brand-wrap">
          <a href="#intro" className="header-logo" aria-label="RhythmGrapher Home">
            <span className="logo-main">RHYTHMGRAPHER</span>
            <span className="logo-sub">양태석 &bull; 리듬을 그리는 사람</span>
          </a>
        </div>

        {/* Center tracker */}
        {activeSectionLabel && (
          <div className="header-scene-indicator">
            <span className="scene-dot" />
            <span className="scene-title">{activeSectionLabel}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="header-actions">
          <nav className="header-quick-nav" aria-label="Archive Categories">
            <button
              className="quick-nav-btn"
              onClick={() => onOpenArchive('discography')}
            >
              DISCOGRAPHY
            </button>
            <button
              className="quick-nav-btn"
              onClick={() => onOpenArchive('works')}
            >
              WORKS
            </button>
            <button
              className="quick-nav-btn"
              onClick={() => onOpenArchive('bio')}
            >
              BIO
            </button>
          </nav>

          {/* Direct External Links on Desktop */}
          <div className="header-external-pills">
            {externalLinks.slice(0, 2).map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="header-pill-link"
              >
                {link.label} &nearr;
              </a>
            ))}
          </div>

          {/* Main Editorial Menu Button */}
          <button
            className="menu-trigger-btn"
            onClick={() => onOpenArchive('all')}
            aria-label="Open Full Archive Index"
          >
            <span className="menu-icon-bars" aria-hidden="true">
              <span className="bar" />
              <span className="bar" />
            </span>
            <span className="menu-text">INDEX &amp; MENU</span>
          </button>
        </div>
      </div>
    </header>
  );
};
