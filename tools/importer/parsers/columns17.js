/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row must exactly match example
  const headerRow = ['Columns (columns17)'];

  // Find the overall column container body
  const colBody = element.querySelector('.column-container__body');
  if (!colBody) return;

  // Get the first 3 columns for main content
  const colNodes = Array.from(colBody.querySelectorAll(':scope > .column-container__column'));
  // Defensive: ensure there are always 3 columns in the first row
  const contentRow = [0, 1, 2].map(i => {
    const col = colNodes[i];
    if (!col) return '';
    // Content is inside .cmp-container
    const cmp = col.querySelector('.cmp-container');
    return cmp ? cmp : '';
  });

  // Find buttons for row 2 (they appear as columns 1 and 2, so use slice(3,5))
  const buttonRow = [0, 1, 2].map(i => {
    // Columns 3 and 4 (array idx 3 and 4), 3rd cell is always empty
    if (i === 0 && colNodes[3]) {
      const btn = colNodes[3].querySelector('.button');
      return btn ? btn : '';
    }
    if (i === 1 && colNodes[4]) {
      const btn = colNodes[4].querySelector('.button');
      return btn ? btn : '';
    }
    return '';
  });

  // Compose rows
  const rows = [headerRow, contentRow, buttonRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
