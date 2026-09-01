import React from 'react';
import { WorkItemData } from '@/content';
import { ExternalLink } from './ExternalLink';

interface WorkItemProps {
  item: WorkItemData;
}

export const WorkItem: React.FC<WorkItemProps> = ({ item }) => {
  return (
    <article id={item.id} className="work-item">
      <div className="item-header">
        <span className="item-category">{item.category}</span>
        <h3 className="item-title">{item.title}</h3>
      </div>

      {item.description && (
        <p className="item-description-text">{item.description}</p>
      )}

      {item.links && item.links.length > 0 && (
        <div className="item-links">
          <ul className="links-list">
            {item.links.map((link, index) => (
              <li key={index} className="link-item">
                <ExternalLink href={link.url}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.note && <p className="item-note">{item.note}</p>}
    </article>
  );
};
