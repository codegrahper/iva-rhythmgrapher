'use client';

import React, { useState } from 'react';
import { Header, ScrollWorld, ArchiveDrawer } from '@/components';
import { ScrollWorldSection } from '@/components/ScrollWorld/scroll-engine';
import { siteMetadata } from '@/content';

export default function Home() {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [archiveTab, setArchiveTab] = useState<'all' | 'discography' | 'works' | 'bio' | 'contact'>('all');
  const [activeSection, setActiveSection] = useState<string>('INTRO');

  const handleOpenArchive = (tab: 'all' | 'discography' | 'works' | 'bio' | 'contact' = 'all') => {
    setArchiveTab(tab);
    setIsArchiveOpen(true);
  };

  const handleSectionChange = (_idx: number, section: ScrollWorldSection) => {
    setActiveSection(section.label || 'INTRO');
  };

  return (
    <div className="rhythmgrapher-app">
      {/* Editorial Sticky Header */}
      <Header
        onOpenArchive={handleOpenArchive}
        activeSectionLabel={activeSection}
      />

      {/* Main Immersive Scroll World */}
      <main id="main-content" className="scroll-world-container">
        <ScrollWorld
          onOpenArchive={() => handleOpenArchive('all')}
          onSectionChange={handleSectionChange}
        />
      </main>

      {/* Slide-over Archive & Index Drawer */}
      <ArchiveDrawer
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        initialTab={archiveTab}
      />

      {/* Accessible semantic footer */}
      <footer className="accessible-footer sr-only">
        <p>{siteMetadata.copyright}</p>
        <p>{siteMetadata.description}</p>
      </footer>
    </div>
  );
}
