/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header as specified
  const headerRow = ['Columns (columns62)'];

  // 2. Find the column nodes (two columns)
  const columns = Array.from(
    element.querySelectorAll(':scope .column-container__column')
  );

  // 3. For each column, gather all content elements directly under .cmp-container
  //    (for this block, each column has one .cmp-container with a single child)
  const contentCells = columns.map((col) => {
    // Find .cmp-container inside this column
    const container = col.querySelector(':scope > .styled-container > .cmp-container');
    // If cmp-container exists and has one direct child, use that
    if (container && container.children.length === 1) {
      return container.firstElementChild;
    }
    // Otherwise, fallback to the cmp-container itself (rare - for resilience)
    if (container) return container;
    // If all else fails, fallback to the column
    return col;
  });

  // 4. Compose the table as per example (header + row with 2 columns)
  const cells = [headerRow, contentCells];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // 5. Replace original element with the block table
  element.replaceWith(table);
}
