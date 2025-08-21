/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main column container body
  const columnContainerBody = element.querySelector('.column-container__body');
  if (!columnContainerBody) return;
  // Get the immediate children (columns)
  const columns = Array.from(columnContainerBody.querySelectorAll(':scope > .column-container__column'));

  // For each column, grab all direct children inside its styled-container (preserves semantic meaning)
  const columnCells = columns.map(col => {
    const styledContainer = col.querySelector(':scope > .styled-container');
    if (!styledContainer) return '';
    const cmpContainer = styledContainer.querySelector(':scope > .cmp-container');
    if (!cmpContainer) return '';
    const contentElements = Array.from(cmpContainer.children).filter(node => {
      return node.textContent.trim().length > 0 || node.querySelector('img') || node.querySelector('blockquote');
    });
    return contentElements.length === 1 ? contentElements[0] : contentElements;
  });

  // Need to create a header row with a single cell, but in the generated table the <th> needs to span all body columns
  // Since WebImporter.DOMUtils.createTable does not provide colspan API, patch the <th> after table creation
  const headerRow = ['Columns (columns10)'];
  const tableCells = [
    headerRow,
    columnCells
  ];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  // Set colspan on the header cell so it visually/semantically spans all columns
  const th = table.querySelector('th');
  if (th) th.setAttribute('colspan', columnCells.length);
  element.replaceWith(table);
}
