/* global WebImporter */
export default function parse(element, { document }) {
  // Header must match example (with variant)
  const headerRow = ['Columns (columns3)'];

  // Get the column elements. Defensive: only direct children, not nested
  const colElems = Array.from(element.querySelectorAll(':scope > .column-container > .column-container__body > .column-container__column'));

  // For each column, reference its main content container (cmp-container)
  const colCells = colElems.map(col => {
    // For resilience, reference the immediate child cmp-container (all column content)
    const cmpContainer = col.querySelector('.styled-container .cmp-container');
    // If not found, fall back to entire column
    return cmpContainer || col;
  });

  // Confirm semantic meaning: all text, headings, lists, links, and formatting is referenced by referencing the cmp-container
  // No Section Metadata table in the example, so none is created
  // No markdown, all HTML elements
  // Only 1 table to create, first row is header, second is columns
  // Table header EXACTLY matches example

  // Edge case: If columns missing, handle with empty string for that cell
  const ncols = 2; // The HTML structure is 2 columns
  for (let i = colCells.length; i < ncols; i++) {
    colCells.push(document.createElement('div')); // empty cell
  }

  const cells = [
    headerRow,
    colCells
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
