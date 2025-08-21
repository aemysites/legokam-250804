/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell with the block name
  const headerRow = ['Columns (columns56)'];

  // Find the direct column elements (should be 4)
  let columns = Array.from(element.querySelectorAll(':scope .column-container__column'));
  // If not found, fallback to all with class
  if (!columns.length) {
    columns = Array.from(element.querySelectorAll('.column-container__column'));
  }

  // For each column, reference the main content block inside cmp-container
  const columnCells = columns.map(col => {
    // Get the cmp-container
    const container = col.querySelector('.cmp-container');
    // If cmp-container exists and has children, use the first child (the main block)
    if (container && container.children.length) {
      return container.children[0];
    }
    // Fallback: use the whole column
    return col;
  });

  // Compose the table: header is ONE cell, then a row with all columns as cells
  const tableRows = [
    headerRow,
    columnCells,
  ];

  // Create and replace
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
