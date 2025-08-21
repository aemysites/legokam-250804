/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single cell (one column), regardless of the number of content columns
  const headerRow = ['Columns (columns23)'];

  // Find the columns in the block
  const columnNodes = Array.from(element.querySelectorAll(':scope .column-container__column'));

  // For each column, extract the cmp-container content if present
  const columnCells = columnNodes.map(col => {
    const cmpContainer = col.querySelector('.cmp-container');
    if (cmpContainer && cmpContainer.children.length > 0) {
      // Use all children as content for this cell
      return Array.from(cmpContainer.children);
    }
    return '';
  });

  // The table structure: header row is 1 cell, second row is N cells (N = number of columns)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnCells
  ], document);
  element.replaceWith(table);
}
