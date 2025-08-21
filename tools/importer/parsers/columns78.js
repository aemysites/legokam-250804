/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell spanning all columns, per the example
  const headerRow = ['Columns (columns78)'];

  // Find the .column-container__body and its direct child columns
  const body = element.querySelector('.column-container__body');
  if (!body) return;
  const columns = Array.from(body.children).filter(col => col.classList.contains('column-container__column'));

  // For each column, extract its .cmp-container content (or blank if empty)
  const contentCells = columns.map(col => {
    const styled = col.querySelector('.styled-container');
    if (!styled) return '';
    const cmp = styled.querySelector('.cmp-container');
    if (!cmp || !cmp.childElementCount) return '';
    // If cmp-container has only one child, return that child
    if (cmp.childElementCount === 1) {
      return cmp.firstElementChild;
    }
    // If cmp-container has multiple children, return all as an array
    return Array.from(cmp.children);
  });

  // The block is a table with header (single cell), and one row with N columns
  const tableArr = [headerRow, contentCells];
  const table = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(table);
}
