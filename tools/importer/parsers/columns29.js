/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column with block name
  const headerRow = ['Columns (columns29)'];

  // Find the immediate column elements
  const columnEls = Array.from(element.querySelectorAll(':scope > .column-container > .column-container__body > .column-container__column'));

  // For each column, get its main content
  const contentCells = columnEls.map(col => {
    // Find the styled-container > cmp-container inside each column
    const cmpContainer = col.querySelector('.cmp-container');
    if (cmpContainer) {
      // Get all direct children of cmpContainer that are not empty
      const children = Array.from(cmpContainer.children).filter(child => child.innerHTML && child.innerHTML.trim() !== '');
      if (children.length === 1) {
        return children[0];
      } else if (children.length > 1) {
        return children;
      }
    }
    // Fallback to the column itself
    return col;
  });

  // The table: header row (1 col), then the content row (n col)
  const rows = [headerRow, contentCells];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
