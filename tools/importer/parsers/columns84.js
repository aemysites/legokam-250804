/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Ensure header row is a single cell
  const headerRow = ['Columns (columns84)'];

  // 2. Get columns from the block (.column-container__body > .column-container__column)
  const body = element.querySelector('.column-container__body');
  let columns = [];
  if (body) {
    columns = Array.from(body.children);
  }

  // 3. For each column, extract ALL content that should be in the column (not just buttons)
  const columnCells = columns.map((col) => {
    // Find all .cmp-container blocks in the column
    const containers = Array.from(col.querySelectorAll('.cmp-container'));

    // Collect all meaningful children from those containers
    let contentNodes = [];

    containers.forEach(container => {
      // Get all direct children that are not separator/spacer/empty
      Array.from(container.children).forEach(node => {
        if (node.classList.contains('separator') || node.classList.contains('cmp-separator')) return;
        if (node.tagName === 'HR') return;
        if (node.nodeType === 1 && node.innerHTML.trim() === '') return;
        contentNodes.push(node);
      });
    });

    // If nothing found, check for button or other direct content in the column
    if (contentNodes.length === 0) {
      // Check for button
      const button = col.querySelector('.cmp-button');
      if (button) {
        contentNodes = [button];
      }
    }

    // If still nothing, leave cell empty
    if (contentNodes.length === 0) {
      return '';
    }
    // If only one node, return it; else, array of nodes
    return contentNodes.length === 1 ? contentNodes[0] : contentNodes;
  });

  // 4. Build rows: header row (single cell), content row (multiple cells, one per column)
  const rows = [headerRow, columnCells];

  // 5. Create table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
