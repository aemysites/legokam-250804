/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we have a column container
  const columnContainer = element.querySelector('.column-container[data-component="column-control"]');
  if (!columnContainer) return;

  // The header row, must match example
  const headerRow = ['Columns (columns96)'];

  // Find the .column-container__body which contains the columns
  const body = columnContainer.querySelector('.column-container__body');
  if (!body) return;

  // Get all direct child columns
  const columns = Array.from(body.children).filter(child => child.classList.contains('column-container__column'));

  // For each column, collect the rendered content
  const contentRow = columns.map(col => {
    // Reference all direct children of the column (usually styled-container)
    // We want to preserve all text, images, lists, etc.
    const children = Array.from(col.children);
    // If there's only one child, just return it; if more, return array
    if (children.length === 1) return children[0];
    if (children.length > 1) return children;
    // If empty, return empty string (edge case)
    return '';
  });

  // Structure: header, then one content row matching columns
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}
