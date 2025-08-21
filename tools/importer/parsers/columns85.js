/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const columnBody = element.querySelector('.column-container__body');
  if (!columnBody) return;

  // Get immediate child columns
  const columns = Array.from(columnBody.querySelectorAll(':scope > .column-container__column'));

  // Gather content for each column
  const contentRow = columns.map(col => {
    // Find the main .cmp-container in this column
    const styled = col.querySelector('.styled-container');
    let content = [];
    if (styled) {
      const cmpContainer = styled.querySelector('.cmp-container');
      if (cmpContainer) {
        content = Array.from(cmpContainer.children);
      }
    }
    // Fallback: if nothing found, use the column itself
    if (!content.length) {
      content = [col];
    }
    // If only one element, just use the element
    return content.length === 1 ? content[0] : content;
  });

  // Table structure: single header cell, then a row with all columns
  const headerRow = ['Columns (columns85)'];
  const tableArray = [headerRow, contentRow];

  const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(blockTable);
}
