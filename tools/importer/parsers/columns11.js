/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two columns inside the column-container__body
  const columnBody = element.querySelector('.column-container__body');
  if (!columnBody) return;
  const columns = Array.from(columnBody.querySelectorAll(':scope > .column-container__column'));
  if (columns.length === 0) return;

  // For each column, grab all top-level .styled-container children and put their content in a <div>
  const columnCells = columns.map(col => {
    // Get all top-level .styled-container nodes in this column
    const styleds = Array.from(col.querySelectorAll(':scope > .styled-container'));
    if (styleds.length === 1) {
      return styleds[0];
    } else if (styleds.length > 1) {
      // combine them into a wrapper
      const wrapper = document.createElement('div');
      styleds.forEach(child => wrapper.appendChild(child));
      return wrapper;
    } else {
      // fallback: if no styled-container, just empty cell
      return document.createElement('div');
    }
  });

  // Ensure at least one cell per column
  if (columnCells.length === 0) return;

  // Header row must match the example exactly
  const headerRow = ['Columns (columns11)'];

  // Compose the table rows
  const cells = [
    headerRow,
    columnCells
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
