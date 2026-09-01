import React from 'react';
import { siteMetadata } from '@/content';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <a href="#intro" className="back-to-top">
            ↑ Top of Page
          </a>
        </div>
        <div className="footer-bottom">
          <p className="copyright">{siteMetadata.copyright}</p>
          <p className="architecture-note">
            Phase 1 Semantic Content Architecture &bull; Minimal Editorial View
          </p>
        </div>
      </div>
    </footer>
  );
};
