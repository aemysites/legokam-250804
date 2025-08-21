/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matching exactly
  const headerRow = ['Columns (columns90)'];

  // Find the main columns body container
  const colBody = element.querySelector('.column-container__body');
  if (!colBody) return;

  // Get all immediate column elements
  const columns = Array.from(colBody.querySelectorAll(':scope > .column-container__column'));

  // For each column, include ALL content: gather all direct children of column
  const cells = columns.map(col => {
    // For resilience, get all children of the .column-container__column
    const children = Array.from(col.children);
    // If only one child, return it directly
    if (children.length === 1) {
      return children[0];
    } else if (children.length > 1) {
      return children;
    } else {
      // fallback: if column is empty, return itself
      return col;
    }
  });

  // Compose the block table: header + one row of columns
  const tableCells = [headerRow, cells];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
