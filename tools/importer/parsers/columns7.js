/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct columns from the block
  function getColumns(el) {
    // The structure is: .column-container > .column-container__body > .column-container__column (xN)
    const body = el.querySelector('.column-container > .column-container__body');
    if (!body) return [];
    return Array.from(body.children).filter(child => child.classList.contains('column-container__column'));
  }

  // Compose cell content for each column, referencing main .styled-container if present
  function getCellContent(col) {
    // Look for .styled-container inside the column
    const styledContainer = col.querySelector('.styled-container');
    return styledContainer ? styledContainer : col;
  }

  // Get all columns (usually 2)
  const columns = getColumns(element);
  // If no columns found, fallback to an empty row (edge case)
  const contentRow = columns.length > 0 ? columns.map(getCellContent) : [''];

  // Create the table with proper header
  const headerRow = ['Columns (columns7)'];
  const tableRows = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
