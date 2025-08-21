/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row matches *exactly* as required
  const cells = [['Cards (cards12)']];

  // Get all columns (each one may contain a card)
  const columns = element.querySelectorAll('.column-container__column');
  columns.forEach(col => {
    // Find the teaser card inside this column
    const teaser = col.querySelector('.teaser');
    if (!teaser) return;

    // Get the image (first <img> in the teaser)
    const imgEl = teaser.querySelector('img') || '';

    // Get the main content area for the card
    const content = teaser.querySelector('.cmp-teaser__content');
    const textCellContent = [];
    if (content) {
      // Preserve all headings, descriptions, CTA links in order
      // Avoid markdown or hardcoded values
      Array.from(content.children).forEach(child => {
        // Only skip elements that are empty (no visible text nor children)
        if (
          child.nodeType === 1 &&
          (child.textContent.trim() !== '' || child.querySelector('*'))
        ) {
          textCellContent.push(child);
        }
      });
    }
    // Add the row if either an image or text content is present
    if (imgEl || textCellContent.length) {
      cells.push([imgEl, textCellContent]);
    }
  });

  // Create table using referenced nodes
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
