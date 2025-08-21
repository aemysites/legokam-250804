/* global WebImporter */
export default function parse(element, { document }) {
  // Header matches example
  const headerRow = ['Columns (columns95)'];

  // Find the body containing columns
  const colBody = element.querySelector('.column-container__body');
  if (!colBody) return;

  // Get all immediate column elements
  const columnEls = Array.from(colBody.querySelectorAll(':scope > .column-container__column'));

  // For each column, gather all its cmp-container children as the cell content
  const secondRow = columnEls.map(colEl => {
    // Get all direct cmp-container children in this column
    const cmpContainers = Array.from(colEl.querySelectorAll(':scope > .styled-container > .cmp-container'));
    // If there are cmp-containers, return all of them, else fallback to the column element itself
    if (cmpContainers.length > 0) {
      // If only one, return the element; if many, return array
      return cmpContainers.length === 1 ? cmpContainers[0] : cmpContainers;
    } else {
      return colEl;
    }
  });

  // Construct block table
  const tableRows = [headerRow, secondRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original block
  element.replaceWith(blockTable);
}
