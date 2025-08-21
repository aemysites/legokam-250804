/* global WebImporter */
export default function parse(element, { document }) {
  // Find body with columns
  const body = element.querySelector('.column-container__body');
  if (!body) return;

  // Get all columns with content (quote__container)
  const columns = Array.from(body.querySelectorAll(':scope > .column-container__column'));
  const cellsRow = [];
  columns.forEach(col => {
    const quote = col.querySelector('.quote__container');
    if (quote) cellsRow.push(quote);
  });

  // If no quote columns found, do not proceed (example always has content)
  if (cellsRow.length === 0) return;

  // Header row is a single cell (one column)
  const cells = [
    ['Columns (columns27)'], // single-cell row for header
    cellsRow // second row: as many columns as needed
  ];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
