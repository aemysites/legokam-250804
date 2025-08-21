/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the example: 'Columns (columns26)'
  const headerRow = ['Columns (columns26)'];

  // Select columns: .column-container__column are the direct column wrappers
  const columns = element.querySelectorAll('.column-container__column');

  // For each column, we want to extract the meaningful child content.
  // We reference the content elements directly from the DOM.
  const contentCells = Array.from(columns).map((col) => {
    // Each column has a .styled-container > .cmp-container
    const styled = col.querySelector('.styled-container');
    if (styled) {
      const cmpContainer = styled.querySelector('.cmp-container');
      if (cmpContainer) {
        // If there's only one child, return it directly, else return array of children
        const nodes = Array.from(cmpContainer.childNodes).filter(node => {
          if (node.nodeType === Node.ELEMENT_NODE) return true;
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) return true;
          return false;
        });
        if (nodes.length === 1) {
          return nodes[0];
        } else if (nodes.length > 1) {
          return nodes;
        }
      }
    }
    // Fallback: reference the column itself
    return col;
  });

  // Build the table structure
  const rows = [
    headerRow,
    contentCells
  ];
  
  // Create the block table using the provided helper
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
