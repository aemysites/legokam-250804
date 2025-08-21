/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns container body
  let columnsBody = element.querySelector('.column-container__body');
  if (!columnsBody) columnsBody = element;
  // Get all column elements
  const columns = Array.from(columnsBody.children).filter(col => col.classList.contains('column-container__column'));
  // Fallback if not found
  if (columns.length === 0) {
    // fallback: just children divs
    for (const child of columnsBody.children) {
      if (child.tagName === 'DIV') columns.push(child);
    }
  }
  // For each column, get its main content as an array of its top-level children
  const contentCells = columns.map(col => {
    // Try to locate the deepest meaningful content wrapper
    let content = col.querySelector('.styled-container, .cmp-container');
    if (!content) content = col;
    // Collect all top-level elements inside content, skipping empty whitespace and script/style
    return Array.from(content.childNodes).filter(node => {
      if (node.nodeType === 1) {
        // Element
        return node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE';
      }
      if (node.nodeType === 3) {
        // Text node: skip if only whitespace
        return node.textContent.trim().length > 0;
      }
      return false;
    });
  });
  // If a column contains only one meaningful element, unwrap from array
  const finalCells = contentCells.map(cellArr => (cellArr.length === 1 ? cellArr[0] : cellArr));
  // Table header exactly as required
  const headerRow = ['Columns (columns55)'];
  const rows = [headerRow, finalCells];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
