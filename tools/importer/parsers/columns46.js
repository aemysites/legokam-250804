/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .columncontrol block
  const columnControl = element.querySelector('.columncontrol');
  if (!columnControl) return;

  // Find the container with columns
  const colBody = columnControl.querySelector('.column-container__body');
  if (!colBody) return;

  // Get all the direct column elements
  const columns = Array.from(colBody.querySelectorAll(':scope > .column-container__column'));

  // Each column may have a single content wrapper
  const cells = columns.map((col) => {
    const contentContainer = col.querySelector(':scope > .styled-container');
    return contentContainer ? contentContainer : '';
  });

  // Header row: single cell as per example
  const headerRow = ['Columns (columns46)'];

  // Build the table as per requirements: header row (single cell), then one row with N columns
  const tableData = [headerRow, cells];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
