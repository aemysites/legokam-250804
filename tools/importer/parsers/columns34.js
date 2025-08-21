/* global WebImporter */
export default function parse(element, { document }) {
  // Block header (matches example exactly)
  const headerRow = ['Columns (columns34)'];

  // Find the main column body
  let mainColumnBody = element.querySelector('.column-container__body');
  if (!mainColumnBody) {
    // fallback: look for direct child
    mainColumnBody = element.querySelector('[class*="column-container__body"]');
  }
  if (!mainColumnBody) return;

  // Find direct column children
  const columns = Array.from(mainColumnBody.children).filter(
    c => c.className && c.className.includes('column-container__column')
  );

  // If not enough columns, do nothing
  if (columns.length < 2) return;

  // LEFT COLUMN: Try to find the main text block
  let leftCell = null;
  const leftStyled = columns[0].querySelector('.styled-container');
  if (leftStyled) {
    // Prefer the text block if present
    const cmpText = leftStyled.querySelector('.cmp-text');
    leftCell = cmpText || leftStyled;
  } else {
    // fallback: use all inner content
    leftCell = columns[0];
  }

  // RIGHT COLUMN: Try to find the main image block
  let rightCell = null;
  const rightStyled = columns[1].querySelector('.styled-container');
  if (rightStyled) {
    // Prefer the image block if present
    const cmpImage = rightStyled.querySelector('.cmp-image');
    rightCell = cmpImage || rightStyled;
  } else {
    rightCell = columns[1];
  }

  // Final cells array (header, then one row with two columns)
  const cells = [
    headerRow,
    [leftCell, rightCell]
  ];

  // Create and replace the table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
