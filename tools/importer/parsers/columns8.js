/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure header is correct and matches example
  const headerRow = ['Columns (columns8)'];

  // Find the 2 columns in this block
  // Start by finding .column-container__body (which contains the columns)
  let body = element.querySelector('.column-container__body');
  // Fallback: traverse up if not found
  let current = element;
  let tries = 0;
  while (!body && tries < 4 && current && current.parentElement) {
    current = current.parentElement;
    body = current.querySelector('.column-container__body');
    tries++;
  }

  // If still not found, fallback to the element itself
  if (!body) body = element;

  // Get the direct child columns
  let columns = Array.from(body.querySelectorAll(':scope > .column-container__column'));
  // Fallback: if not found, maybe the element itself is a column
  if (columns.length === 0 && element.classList.contains('column-container__column')) {
    columns = [element];
  }

  // Edge case: if still not found, look for .styled-container as columns
  if (columns.length === 0) {
    columns = Array.from(body.querySelectorAll(':scope > .styled-container'));
  }

  // For each column, extract the meaningful content
  const cells = columns.map((col) => {
    // Content might be several levels deep: look for .cmp-container inside .styled-container, etc.
    let cmpContainer = col.querySelector(':scope > .styled-container > .cmp-container') || col.querySelector(':scope > .cmp-container') || col;

    // Try to get text (heading or paragraph)
    let textEl = cmpContainer.querySelector('.cmp-text') || cmpContainer.querySelector('h2, h3, h4, h5, h6, p');
    // Try to get button
    let buttonEl = cmpContainer.querySelector('a.cmp-button');
    // Compose the cell
    const cellContent = [];
    if (textEl) cellContent.push(textEl);
    if (buttonEl) cellContent.push(buttonEl);
    // If nothing found, use cmpContainer's children
    if (cellContent.length === 0) {
      // If cmpContainer has children, use all of them
      if (cmpContainer.children.length > 0) {
        cellContent.push(...Array.from(cmpContainer.children));
      } else {
        // If not, use cmpContainer itself
        cellContent.push(cmpContainer);
      }
    }
    // If just one element, return it; otherwise return array
    return cellContent.length === 1 ? cellContent[0] : cellContent;
  });

  // Build the table
  const tableData = [headerRow, cells];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
