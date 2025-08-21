/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards15)'];
  const rows = [];
  // Find all columns containing cards
  const columns = element.querySelectorAll('.column-container__column');
  columns.forEach((col) => {
    const teaser = col.querySelector('.teaser');
    if (!teaser) return;
    // IMAGE: Find first <img> in the .cmp-teaser__image
    let imgCell = null;
    const imgWrap = teaser.querySelector('.cmp-teaser__image img');
    if (imgWrap) imgCell = imgWrap;
    // CONTENT: Title, Description, CTA (always in this order)
    const content = [];
    // Title: find .cmp-teaser__title (may be h3 or h4)
    const titleEl = teaser.querySelector('.cmp-teaser__title');
    if (titleEl) {
      // Use the heading element as is (h3/h4). It may have a div inside for text, so flatten
      let heading = null;
      if (['H3', 'H4'].includes(titleEl.tagName)) {
        // Replace inner div with text, if present
        const div = titleEl.querySelector('div');
        if (div) {
          heading = document.createElement(titleEl.tagName.toLowerCase());
          heading.innerHTML = div.innerHTML;
        } else {
          heading = titleEl;
        }
      } else {
        // Sometimes it's wrapped weirdly, fallback: just use its innerHTML as h4
        heading = document.createElement('h4');
        heading.innerHTML = titleEl.textContent;
      }
      content.push(heading);
    }
    // Description: Usually .cmp-teaser__description or .cmp-teaser__contact
    let desc = teaser.querySelector('.cmp-teaser__description');
    if (!desc) desc = teaser.querySelector('.cmp-teaser__contact');
    if (desc) {
      // Only add meaningful text (ignore empty <p> if present)
      Array.from(desc.childNodes).forEach(node => {
        // Only keep elements with text or links
        if (node.nodeType === Node.ELEMENT_NODE && (node.textContent.trim() !== '' || node.querySelector('a'))) {
          content.push(node);
        }
      });
    }
    // CTA: .cmp-teaser__action-container a or link in desc/contact
    let cta = teaser.querySelector('.cmp-teaser__action-container a');
    if (!cta && desc) {
      cta = desc.querySelector('a');
    }
    // Only add if not already present (sometimes link is within desc and will be added)
    if (cta && (!desc || !Array.from(desc.childNodes).includes(cta))) {
      content.push(cta);
    }
    rows.push([imgCell, content]);
  });
  // Create table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
