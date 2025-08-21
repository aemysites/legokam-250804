/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const columnsBody = element.querySelector('.column-container__body');
  if (!columnsBody) return;
  // Get all direct column children
  const columns = Array.from(columnsBody.children).filter(col => col.classList.contains('column-container__column'));
  if (!columns.length) return;
  // Table: [header row], [one row with all columns side by side]
  const cells = [
    ['Columns (columns65)'],
    columns // this gives a single row with 3 columns side by side
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}