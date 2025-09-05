/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the columns block root
  let columnsBlock = element;
  // If the element is the wrapper, descend to the block
  if (columnsBlock.classList.contains('columns-wrapper')) {
    columnsBlock = columnsBlock.querySelector('.columns.block');
  }
  if (!columnsBlock) return;

  // Get the immediate column divs (should be 2 for this block)
  const columnDivs = Array.from(columnsBlock.querySelectorAll(':scope > div > div'));
  if (columnDivs.length < 2) return;

  // Prepare header row
  const headerRow = ['Columns (columns8)'];

  // Prepare content row: each cell is a column's content
  // Use the entire column div as the cell content for resilience
  const contentRow = columnDivs;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original block with the table
  columnsBlock.replaceWith(table);
}
