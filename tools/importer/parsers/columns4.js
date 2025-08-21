/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the top-level columns container
  const columnsBody = element.querySelector('.column-container__body');
  if (!columnsBody) return;
  // Find all immediate column elements
  const columns = columnsBody.querySelectorAll(':scope > .column-container__column');
  if (!columns.length) return;

  // For each column, find its main container (either .styled-container or fallback to first child)
  const cellsRow = Array.from(columns).map((col) => {
    // Prefer .styled-container .cmp-container, then .styled-container, then .cmp-container, fallback to first child
    let content = col.querySelector('.styled-container .cmp-container');
    if (!content) content = col.querySelector('.styled-container');
    if (!content) content = col.querySelector('.cmp-container');
    if (!content) content = col.firstElementChild;
    return content || col;
  });

  // Table header must match exactly the block name/variant
  const cells = [
    ['Columns (columns4)'],
    cellsRow
  ];

  // Create the columns block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
