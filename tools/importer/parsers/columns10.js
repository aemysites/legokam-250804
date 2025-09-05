/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if the expected structure exists
  if (!element) return;

  // Header row for the block table
  const headerRow = ['Columns (columns10)'];

  // Find the default content wrapper (left column)
  const defaultContent = element.querySelector('.default-content-wrapper');

  // Find the columns block (right columns)
  const columnsBlock = element.querySelector('.columns.block');

  // Defensive: If either is missing, abort
  if (!defaultContent || !columnsBlock) return;

  // Get all immediate column divs inside the columns block
  // The structure is: .columns.block > div > div > [div, div, ...]
  let columnDivs = [];
  const outerDiv = columnsBlock.querySelector(':scope > div');
  if (outerDiv) {
    columnDivs = Array.from(outerDiv.children);
  }

  // Compose the row: first cell is the left content, then each column
  const row = [defaultContent, ...columnDivs];

  // Build the table
  const cells = [headerRow, row];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
