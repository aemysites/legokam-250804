/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the columns container (the direct child with all columns)
  // The structure is: element > div > div (columns)
  let columnsRow = element.querySelector(':scope > div > div');
  if (!columnsRow) {
    // fallback: maybe the direct child is the columns row
    columnsRow = element.querySelector(':scope > div');
  }
  if (!columnsRow) return;

  // Get all direct column divs
  const columnDivs = Array.from(columnsRow.children).filter(child => child.tagName === 'DIV');
  if (!columnDivs.length) return;

  // Table header
  const headerRow = ['Columns (columns12)'];

  // Each column is a cell in the row
  const contentRow = columnDivs;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
