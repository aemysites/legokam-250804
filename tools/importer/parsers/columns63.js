/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required by block spec
  const headerRow = ['Columns (columns63)'];

  // Find the main column container body
  const colBody = element.querySelector('.column-container__body');
  // Defensive: fallback to direct .column-container__column children if needed
  let colElements = [];
  if (colBody) {
    colElements = Array.from(colBody.children);
  } else {
    colElements = Array.from(element.querySelectorAll('.column-container__column'));
  }

  // For each column, extract the direct content (the main child .styled-container or .cmp-container)
  const contentCells = colElements.map((col) => {
    // Try to find the most specific content block
    let content = col.querySelector('.styled-container, .cmp-container');
    if (!content) {
      // Fallback: use all child nodes in a wrapper
      const wrapper = document.createElement('div');
      Array.from(col.childNodes).forEach(node => wrapper.appendChild(node));
      content = wrapper;
    }
    return content;
  });

  // The final table: header, then row with each column's content in a cell
  const tableData = [
    headerRow,
    contentCells
  ];

  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
