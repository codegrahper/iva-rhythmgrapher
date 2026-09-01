import React from 'react';
import { navigationItems } from '@/content';

export const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <a href="#intro" className="header-logo" aria-label="RhythmGrapher Home">
          RHYTHMGRAPHER
        </a>
        <nav className="header-nav" aria-label="주요 내비게이션">
          <ul className="nav-list">
            {navigationItems.map((item) => (
              <li key={item.href} className="nav-item">
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
