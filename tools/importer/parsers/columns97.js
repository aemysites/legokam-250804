/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract teaser block's content for a column
  function extractTeaserContent(teaser) {
    const parts = [];
    // Image (if present)
    const img = teaser.querySelector('.cmp-teaser__image img');
    if (img) parts.push(img);
    // Title (h2/h3)
    const title = teaser.querySelector('.cmp-teaser__title');
    if (title) parts.push(title);
    // Description
    const desc = teaser.querySelector('.cmp-teaser__description');
    if (desc) parts.push(desc);
    // Action links/buttons
    const actions = teaser.querySelector('.cmp-teaser__action-container');
    if (actions && actions.children.length) {
      parts.push(...Array.from(actions.querySelectorAll('a')));
    }
    return parts.length ? parts : '';
  }

  // Get all columns
  const columns = Array.from(
    element.querySelectorAll(
      ':scope > div > div.column-container__body > div.column-container__column'
    )
  );
  // Build array of column contents
  const colCells = columns.map((col) => {
    const cmpContainer = col.querySelector('.cmp-container');
    if (cmpContainer) {
      const teaser = cmpContainer.querySelector('.teaser');
      if (teaser) {
        return extractTeaserContent(teaser);
      }
    }
    return '';
  });

  // The header row must be a single cell/column, followed by one row with all columns' content as separate cells
  const cells = [
    ['Columns (columns97)'], // header row: 1 cell only
    colCells // body row: 1 cell per column (can be empty)
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
