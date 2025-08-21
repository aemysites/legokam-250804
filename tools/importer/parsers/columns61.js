/* global WebImporter */
export default function parse(element, { document }) {
  // The block header must match exactly
  const headerRow = ['Columns (columns61)'];

  // Find the columns within the block
  const columnContainerBody = element.querySelector('.column-container__body');
  if (!columnContainerBody) return;
  const columns = Array.from(columnContainerBody.querySelectorAll(':scope > .column-container__column'));
  if (columns.length < 2) return;

  // Each column may have a .cmp-container or not; we want to reference the innermost cmp-container if present
  function getColumnCellContent(col) {
    // Try to grab the .cmp-container that holds the column content
    const cmp = col.querySelector(':scope > .styled-container > .cmp-container');
    if (cmp) return cmp;
    // Fallback to the column itself if no cmp-container
    return col;
  }
  const leftCellContent = getColumnCellContent(columns[0]);
  const rightCellContent = getColumnCellContent(columns[1]);

  // Compose the table, referencing the existing elements
  const cells = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
