/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct card columns from column-container
  function getDirectColumnElements(container) {
    const body = container.querySelector('.column-container__body');
    if (!body) return [];
    return Array.from(body.children).filter(col => col.classList.contains('column-container__column'));
  }

  // Locate column-container
  let container = element.querySelector('.column-container');
  if (!container && element.classList.contains('column-container')) {
    container = element;
  }
  if (!container) return;

  const columns = getDirectColumnElements(container);
  // Table header matches example
  const cells = [['Cards (cards83)']];

  columns.forEach(col => {
    const teaser = col.querySelector('.teaser');
    if (!teaser) return;

    // IMAGE: use existing <img> element
    let imgEl = teaser.querySelector('.cmp-teaser__image img');

    // TEXT: extract title, then (optional) description, then CTA
    let title = '', description = '', cta = null;
    const titleContainer = teaser.querySelector('.cmp-teaser__title');
    if (titleContainer) {
      // Titles may be in h4 or div inside .cmp-teaser__title
      let titleElm = titleContainer.querySelector('h4') || titleContainer.querySelector('div');
      title = titleElm ? titleElm.textContent.trim() : titleContainer.textContent.trim();
    }
    // Try to find description: any text node under .cmp-teaser__content that's not inside .cmp-teaser__action-container or .cmp-teaser__title
    let descText = '';
    const content = teaser.querySelector('.cmp-teaser__content');
    if (content) {
      // Walk all child nodes
      Array.from(content.childNodes).forEach(node => {
        if (
          node.nodeType === Node.TEXT_NODE &&
          node.textContent.trim() &&
          node.parentElement === content
        ) {
          descText += node.textContent.trim() + ' ';
        }
      });
      // Sometimes description is inside a <div> after the title
      Array.from(content.children).forEach(child => {
        if (
          !child.classList.contains('cmp-teaser__title') &&
          !child.classList.contains('cmp-teaser__action-container') &&
          child.tagName !== 'H4'
        ) {
          descText += child.textContent.trim() + ' ';
        }
      });
    }
    description = descText.trim();

    // CTA: use existing <a> element
    cta = teaser.querySelector('.cmp-teaser__action-link');
    // Compose text cell
    const textParts = [];
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title;
      textParts.push(strong);
    }
    if (description) {
      // Add line break if both title and description exist
      if (title) textParts.push(document.createElement('br'));
      const descSpan = document.createElement('span');
      descSpan.textContent = description;
      textParts.push(descSpan);
    }
    if (cta) {
      // Add line break if there's any previous content
      if (title || description) textParts.push(document.createElement('br'));
      textParts.push(cta);
    }

    cells.push([imgEl, textParts]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
