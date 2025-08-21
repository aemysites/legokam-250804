/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two columns
  const columnContainerBody = element.querySelector('.column-container__body');
  if (!columnContainerBody) return;
  const columns = Array.from(columnContainerBody.querySelectorAll(':scope > .column-container__column'));
  // If no columns found, do nothing
  if (!columns.length) return;
  // For each column, reference its main content block
  function getContentBlock(col) {
    // Usually content is inside .styled-container > .cmp-container
    const styled = col.querySelector('.styled-container');
    if (!styled) return col;
    const cmpContainer = styled.querySelector('.cmp-container');
    return cmpContainer || styled;
  }
  const cellsRow = columns.map(getContentBlock);
  // Table header row as in the example
  const headerRow = ['Columns (columns58)'];
  const cells = [headerRow, cellsRow];
  // Create the new block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the element
  element.replaceWith(table);
}
