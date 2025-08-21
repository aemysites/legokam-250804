/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row must be a single cell: ['Columns (columns80)']
  const headerRow = ['Columns (columns80)']; // Only one cell for header

  // 2. Get immediate columns
  const columnsBody = element.querySelector('.column-container__body');
  if (!columnsBody) return;
  const columns = Array.from(columnsBody.children);
  if (columns.length < 2) return;

  // 3. Extract each column's top-level meaningful content
  function getColumnCell(colEl) {
    const styled = colEl.querySelector('.styled-container');
    if (!styled) return '';
    const cmp = styled.querySelector('.cmp-container');
    if (!cmp) return '';
    // Get all direct children that are elements
    const nodes = Array.from(cmp.children).filter(node => {
      // Only include elements with meaningful content
      if (node.nodeType === 1) {
        // For image or text blocks
        if (node.classList.contains('image') || node.classList.contains('text')) return true;
      }
      return false;
    });
    if (nodes.length === 1) return nodes[0];
    if (nodes.length > 1) return nodes;
    return '';
  }

  const cell0 = getColumnCell(columns[0]);
  const cell1 = getColumnCell(columns[1]);

  // 4. Table rows: header (single cell), then one content row with 2 cells (columns)
  const rows = [headerRow, [cell0, cell1]];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace element with table
  element.replaceWith(table);
}
