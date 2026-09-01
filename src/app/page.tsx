import React from 'react';
import {
  Header,
  Section,
  DiscographyItem,
  WorkItem,
  ExternalLink,
  Footer,
} from '@/components';
import {
  introContent,
  rhythmgrapherConcept,
  bioContent,
  discographyItems,
  workItems,
  externalLinks,
  contactInfo,
} from '@/content';

export default function Home() {
  return (
    <>
      <Header />
      <main className="main-content">
        {/* 01 — INTRO */}
        <section id="intro" className="content-section intro-section">
          <div className="intro-content">
            <h1 className="intro-title">{introContent.title}</h1>
            <p className="intro-subtitle">{introContent.subtitle}</p>
            <span className="intro-indicator" aria-hidden="true">
              {introContent.indicator}
            </span>
          </div>
        </section>

        {/* 02 — RHYTHMGRAPHER */}
        <Section
          id="rhythmgrapher"
          number="02"
          eyebrow={rhythmgrapherConcept.eyebrow}
          title={rhythmgrapherConcept.title}
        >
          <div className="concept-body">
            <div className="concept-breakdown">
              <span className="concept-plus">{rhythmgrapherConcept.breakdown[0]}</span>
              <span className="concept-word">{rhythmgrapherConcept.breakdown[1]}</span>
              <span className="concept-word">{rhythmgrapherConcept.breakdown[2]}</span>
            </div>
            <p className="concept-note">{rhythmgrapherConcept.note}</p>
          </div>
        </Section>

        {/* 03 — BIO */}
        <Section id="bio" number="03" eyebrow="BIOGRAPHY" title="BIO">
          <div className="bio-body">
            <blockquote className="bio-quote">
              {bioContent.quote.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </blockquote>

            <div className="bio-narrative">
              {bioContent.bioParagraphs.map((para, idx) => (
                <p key={idx} className="bio-paragraph">
                  {para}
                </p>
              ))}
            </div>

            <div className="bio-records">
              {/* Discography History */}
              <div className="bio-record-group">
                <h3 className="bio-group-title">Discography</h3>
                <ul className="bio-record-list">
                  {bioContent.history.discography.map((item, idx) => (
                    <li key={idx} className="bio-record-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solo Exhibition */}
              <div className="bio-record-group">
                <h3 className="bio-group-title">Solo Exhibition</h3>
                <ul className="bio-record-list">
                  {bioContent.history.soloExhibitions.map((item, idx) => (
                    <li key={idx} className="bio-record-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Travel */}
              <div className="bio-record-group">
                <h3 className="bio-group-title">Travel</h3>
                <ul className="bio-record-list">
                  {bioContent.history.travel.map((item, idx) => (
                    <li key={idx} className="bio-record-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solo Performance */}
              <div className="bio-record-group">
                <h3 className="bio-group-title">Solo Performance</h3>
                <ul className="bio-record-list">
                  {bioContent.history.soloPerformances.map((item, idx) => (
                    <li key={idx} className="bio-record-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team Exhibition */}
              <div className="bio-record-group">
                <h3 className="bio-group-title">Team Exhibition</h3>
                <ul className="bio-record-list">
                  {bioContent.history.teamExhibitions.map((item, idx) => (
                    <li key={idx} className="bio-record-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* 04 — DISCOGRAPHY */}
        <Section
          id="discography"
          number="04"
          eyebrow="DISCOGRAPHY"
          title="DISCOGRAPHY"
        >
          <div className="discography-list">
            {discographyItems.map((item) => (
              <DiscographyItem key={item.id} item={item} />
            ))}
          </div>
        </Section>

        {/* 05 — WORKS */}
        <Section id="works" number="05" eyebrow="WORKS" title="WORKS">
          <div className="works-grid">
            {workItems.map((item) => (
              <WorkItem key={item.id} item={item} />
            ))}
          </div>
        </Section>

        {/* 06 — LINKS / CONTACT */}
        <Section
          id="links"
          number="06"
          eyebrow="CONNECT"
          title="LINKS / CONTACT"
        >
          <div id="contact" className="links-contact-body">
            <div className="links-group">
              <ul className="links-nav-list">
                {externalLinks.map((link) => (
                  <li key={link.label} className="link-row">
                    <span className="link-name">
                      <ExternalLink href={link.url}>{link.label} ↗</ExternalLink>
                    </span>
                    {link.description && (
                      <span className="link-desc">{link.description}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-box">
              <h3 className="sub-heading">Direct Inquiries</h3>
              <p className="contact-email">
                <a href={`mailto:${contactInfo.email}`} className="text-link">
                  {contactInfo.email}
                </a>
              </p>
              <p className="contact-note">{contactInfo.note}</p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
