/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct columns (cards)
  const cardColumns = element.querySelectorAll('.column-container__column');
  const rows = [];
  // Header row, exactly as in the example
  rows.push(['Cards (cards43)']);

  // For each card, extract image, title and CTA
  cardColumns.forEach(col => {
    // Find the teaser (card container)
    const teaser = col.querySelector('.teaser');
    if (!teaser) return;
    // Find image element (mandatory)
    const imgContainer = teaser.querySelector('.cmp-teaser__image img');
    // Find title (mandatory)
    const titleDiv = teaser.querySelector('.cmp-teaser__title > div');
    // Find CTA link (optional)
    const cta = teaser.querySelector('.cmp-teaser__action-link');

    // 1st cell: image element itself, referenced
    const imgCell = imgContainer || '';

    // 2nd cell: structured content
    const contentCellParts = [];
    if (titleDiv && titleDiv.textContent.trim()) {
      // Use heading element to preserve semantic meaning
      const h4 = teaser.querySelector('.cmp-teaser__title');
      if (h4) {
        contentCellParts.push(h4);
      } else {
        // fallback: create heading from title text
        const h4new = document.createElement('h4');
        h4new.textContent = titleDiv.textContent.trim();
        contentCellParts.push(h4new);
      }
    }
    // No explicit description in this HTML (only title)
    // CTA link, if present
    if (cta) {
      // Reference the actual link element
      contentCellParts.push(cta);
    }
    // If nothing present in cell, fallback to empty string
    const contentCell = contentCellParts.length ? contentCellParts : '';
    // Compose the row
    rows.push([imgCell, contentCell]);
  });
  // Create and replace the table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}