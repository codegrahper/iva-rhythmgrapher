'use client';

import React, { useState, useEffect } from 'react';
import {
  discographyItems,
  workItems,
  bioContent,
  externalLinks,
  contactInfo,
  DiscographyItemData,
} from '@/content';
import { ExternalLink } from '../ExternalLink';

interface ArchiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'all' | 'discography' | 'works' | 'bio' | 'contact';
}

export const ArchiveDrawer: React.FC<ArchiveDrawerProps> = ({
  isOpen,
  onClose,
  initialTab = 'all',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'discography' | 'works' | 'bio' | 'contact'>(initialTab);
  const [selectedAlbum, setSelectedAlbum] = useState<DiscographyItemData | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (selectedAlbum) {
          setSelectedAlbum(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedAlbum, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" role="dialog" aria-modal="true" aria-label="Archive & Index">
      <div className="drawer-backdrop" onClick={onClose} />
      
      <div className="drawer-panel">
        {/* Top Header inside Drawer */}
        <div className="drawer-header">
          <div className="drawer-branding">
            <span className="drawer-tag">ARCHIVE & INDEX</span>
            <h2 className="drawer-title">RHYTHMGRAPHER ARCHIVE</h2>
          </div>

          <div className="drawer-controls">
            <button className="drawer-close-btn" onClick={onClose} aria-label="Close Archive">
              <span className="close-text">CLOSE</span>
              <span className="close-icon">&times;</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <nav className="drawer-tabs" aria-label="Archive Categories">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            ALL ARCHIVE
          </button>
          <button
            className={`tab-btn ${activeTab === 'discography' ? 'active' : ''}`}
            onClick={() => setActiveTab('discography')}
          >
            DISCOGRAPHY ({discographyItems.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'works' ? 'active' : ''}`}
            onClick={() => setActiveTab('works')}
          >
            WORKS ({workItems.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'bio' ? 'active' : ''}`}
            onClick={() => setActiveTab('bio')}
          >
            BIOGRAPHY & TIMELINE
          </button>
          <button
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            CONTACT & LINKS
          </button>
        </nav>

        {/* Main Content Area */}
        <div className="drawer-content">
          {/* SECTION: DISCOGRAPHY */}
          {(activeTab === 'all' || activeTab === 'discography') && (
            <section className="drawer-section">
              <div className="section-title-wrap">
                <span className="sec-num">01</span>
                <h3 className="sec-heading">DISCOGRAPHY</h3>
                <span className="sec-note">4 Major Releases (2012 – 2022)</span>
              </div>

              <div className="discography-grid">
                {discographyItems.map((album) => (
                  <article key={album.id} className="album-card">
                    <div className="album-artwork-box">
                      {album.artwork ? (
                        <img
                          src={album.artwork}
                          alt={album.title}
                          className="album-artwork-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="artwork-placeholder">
                          <span>{album.title}</span>
                        </div>
                      )}
                      <div className="artwork-overlay">
                        <button
                          className="view-detail-btn"
                          onClick={() => setSelectedAlbum(album)}
                        >
                          View Details & Review
                        </button>
                      </div>
                    </div>

                    <div className="album-info">
                      <div className="album-meta-top">
                        <span className="album-year">{album.releaseDate}</span>
                      </div>
                      <h4 className="album-title">{album.title}</h4>
                      {album.tagline && (
                        <p className="album-tagline">{album.tagline}</p>
                      )}

                      <div className="album-quick-links">
                        <button
                          className="inline-detail-trigger"
                          onClick={() => setSelectedAlbum(album)}
                        >
                          Details &amp; Review &rarr;
                        </button>
                        {album.links?.map((link, idx) => (
                          <ExternalLink key={idx} href={link.url} className="quick-link">
                            {link.label}
                          </ExternalLink>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* SECTION: WORKS */}
          {(activeTab === 'all' || activeTab === 'works') && (
            <section className="drawer-section">
              <div className="section-title-wrap">
                <span className="sec-num">02</span>
                <h3 className="sec-heading">WORKS</h3>
                <span className="sec-note">Performance &amp; Scape Series</span>
              </div>

              <div className="works-list">
                {workItems.map((work) => (
                  <article key={work.id} className="work-card">
                    {work.previewMedia && (
                      <div className="work-media-preview">
                        {work.previewMedia.type === 'video' ? (
                          <video
                            src={work.previewMedia.src}
                            poster={work.previewMedia.poster}
                            className="work-video-thumb"
                            muted
                            playsInline
                            loop
                            autoPlay
                          />
                        ) : (
                          <img
                            src={work.previewMedia.src}
                            alt={work.title}
                            className="work-img-thumb"
                            loading="lazy"
                          />
                        )}
                        <span className="media-badge">{work.category}</span>
                      </div>
                    )}

                    <div className="work-content">
                      <div className="work-meta">
                        <span className="work-cat">{work.category}</span>
                      </div>
                      <h4 className="work-title">{work.title}</h4>
                      {work.description && (
                        <p className="work-desc">{work.description}</p>
                      )}
                      {work.note && <p className="work-note">{work.note}</p>}

                      {work.links && (
                        <div className="work-actions">
                          {work.links.map((link, idx) => (
                            <ExternalLink key={idx} href={link.url} className="work-btn-link">
                              {link.label}
                            </ExternalLink>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* SECTION: BIOGRAPHY & TIMELINE */}
          {(activeTab === 'all' || activeTab === 'bio') && (
            <section className="drawer-section">
              <div className="section-title-wrap">
                <span className="sec-num">03</span>
                <h3 className="sec-heading">BIOGRAPHY &amp; TIMELINE</h3>
                <span className="sec-note">Philosophy, Journey &amp; Chronology</span>
              </div>

              <div className="bio-drawer-body">
                <div className="bio-lead-quote">
                  {bioContent.quote.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>

                <div className="bio-paragraphs">
                  {bioContent.bioParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="timeline-groups">
                  {/* Travel */}
                  <div className="timeline-group">
                    <h4 className="group-title">Travel &amp; Exploration (Eurasia 37,478km)</h4>
                    <ul className="timeline-list">
                      {bioContent.history.travel.map((item, idx) => (
                        <li key={idx} className="timeline-item">
                          <span className="t-dot" />
                          <span className="t-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solo Performances */}
                  <div className="timeline-group">
                    <h4 className="group-title">Solo Drum Performance &amp; Grants</h4>
                    <ul className="timeline-list">
                      {bioContent.history.soloPerformances.map((item, idx) => (
                        <li key={idx} className="timeline-item">
                          <span className="t-dot" />
                          <span className="t-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solo & Team Exhibitions */}
                  <div className="timeline-group">
                    <h4 className="group-title">Exhibitions (Solo &amp; Team)</h4>
                    <ul className="timeline-list">
                      {bioContent.history.soloExhibitions.map((item, idx) => (
                        <li key={idx} className="timeline-item">
                          <span className="t-dot" />
                          <span className="t-text">{item}</span>
                        </li>
                      ))}
                      {bioContent.history.teamExhibitions.map((item, idx) => (
                        <li key={idx} className="timeline-item">
                          <span className="t-dot" />
                          <span className="t-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECTION: CONTACT & LINKS */}
          {(activeTab === 'all' || activeTab === 'contact') && (
            <section className="drawer-section">
              <div className="section-title-wrap">
                <span className="sec-num">04</span>
                <h3 className="sec-heading">CONTACT &amp; DIRECT LINKS</h3>
                <span className="sec-note">Education, Journal &amp; Inquiries</span>
              </div>

              <div className="contact-links-grid">
                <div className="links-col">
                  <h4 className="col-subheading">External Platforms</h4>
                  <ul className="drawer-link-rows">
                    {externalLinks.map((link) => (
                      <li key={link.label} className="drawer-link-row">
                        <div className="row-main">
                          <span className="row-cat">{link.category}</span>
                          <ExternalLink href={link.url} className="row-link">
                            {link.label} &nearr;
                          </ExternalLink>
                        </div>
                        {link.description && (
                          <span className="row-desc">{link.description}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="contact-col">
                  <h4 className="col-subheading">Direct Inquiries</h4>
                  <div className="contact-card">
                    <p className="contact-lbl">Email Address</p>
                    <a href={`mailto:${contactInfo.email}`} className="contact-mail">
                      {contactInfo.email}
                    </a>
                    <p className="contact-subnote">{contactInfo.note}</p>
                    <div className="contact-meta-divider" />
                    <p className="copyright-note">
                      &copy; {new Date().getFullYear()} YANGTAESEOK. All Rights Reserved.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Album Detail Modal */}
      {selectedAlbum && (
        <div className="album-detail-modal" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={() => setSelectedAlbum(null)} />
          <div className="modal-box">
            <button className="modal-close-btn" onClick={() => setSelectedAlbum(null)}>
              &times;
            </button>

            <div className="modal-scrollable">
              <div className="modal-top">
                {selectedAlbum.artwork && (
                  <img
                    src={selectedAlbum.artwork}
                    alt={selectedAlbum.title}
                    className="modal-artwork"
                  />
                )}
                <div className="modal-header-meta">
                  <span className="modal-year">{selectedAlbum.releaseDate}</span>
                  <h3 className="modal-title">{selectedAlbum.title}</h3>
                  {selectedAlbum.tagline && (
                    <p className="modal-tagline">{selectedAlbum.tagline}</p>
                  )}
                </div>
              </div>

              {selectedAlbum.description && (
                <div className="modal-section">
                  <h4 className="modal-sec-title">Work Note &amp; Concept</h4>
                  {selectedAlbum.description.map((p, idx) => (
                    <p key={idx} className="modal-p">{p}</p>
                  ))}
                </div>
              )}

              {selectedAlbum.review && (
                <div className="modal-section modal-review">
                  <h4 className="modal-sec-title">Critic Review by {selectedAlbum.review.author}</h4>
                  {selectedAlbum.review.text.map((p, idx) => (
                    <p key={idx} className="modal-p">{p}</p>
                  ))}
                </div>
              )}

              <div className="modal-section">
                <h4 className="modal-sec-title">Credits</h4>
                <ul className="modal-credits">
                  {selectedAlbum.credits.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>

              {selectedAlbum.links && (
                <div className="modal-section">
                  <h4 className="modal-sec-title">Links &amp; Downloads</h4>
                  <div className="modal-links">
                    {selectedAlbum.links.map((link, idx) => (
                      <ExternalLink key={idx} href={link.url} className="modal-link-btn">
                        {link.label}
                      </ExternalLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
