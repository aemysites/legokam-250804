/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Find all columns
  const mainBody = element.querySelector('.column-container__body');
  if (!mainBody) return;
  
  // List all column containers
  const columns = Array.from(mainBody.querySelectorAll(':scope > .column-container__column'));
  
  // Build the content row, referencing existing elements only
  const contentRow = columns.map((col) => {
    // Find the direct .cmp-container
    const cmp = col.querySelector(':scope > .styled-container > .cmp-container');
    if (!cmp) return '';
    // Filter out empty cmp-containers
    const relevantChildren = Array.from(cmp.children).filter(node => {
      // Exclude containers that are empty (could happen if extra div exists)
      if (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim() === '' && !node.querySelector('img,a,button')) {
        return false;
      }
      return true;
    });
    // If only one relevant child, return it directly; else return array
    if (relevantChildren.length === 1) {
      return relevantChildren[0];
    }
    if (relevantChildren.length > 1) {
      return relevantChildren;
    }
    return '';
  });

  // Table: first row = header, second row = columns
  const tableRows = [
    ['Columns (columns91)'],
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  
  element.replaceWith(table);
}
