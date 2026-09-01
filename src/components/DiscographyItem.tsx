import React from 'react';
import { DiscographyItemData } from '@/content';
import { ExternalLink } from './ExternalLink';

interface DiscographyItemProps {
  item: DiscographyItemData;
}

export const DiscographyItem: React.FC<DiscographyItemProps> = ({ item }) => {
  return (
    <article id={item.id} className="discography-item">
      <div className="item-header">
        <h3 className="item-title">{item.title}</h3>
        {item.releaseDate && (
          <span className="item-date">{item.releaseDate}</span>
        )}
      </div>

      {item.tagline && (
        <blockquote className="item-tagline">
          <p>{item.tagline}</p>
        </blockquote>
      )}

      {item.description && item.description.length > 0 && (
        <div className="item-description">
          {item.description.map((paragraph, index) => (
            <p key={index} className="desc-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {item.review && (
        <div className="item-review">
          <h4 className="sub-heading">Review by {item.review.author}</h4>
          <div className="review-body">
            {item.review.text.map((paragraph, index) => (
              <p key={index} className="review-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {item.credits && item.credits.length > 0 && (
        <div className="item-credits">
          <h4 className="sub-heading">Credits</h4>
          <ul className="credits-list">
            {item.credits.map((credit, index) => (
              <li key={index} className="credit-line">
                {credit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.links && item.links.length > 0 && (
        <div className="item-links">
          <h4 className="sub-heading">Links</h4>
          <ul className="links-list">
            {item.links.map((link, index) => (
              <li key={index} className="link-item">
                <ExternalLink href={link.url}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};
