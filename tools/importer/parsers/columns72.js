/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, exactly as specified
  const headerRow = ['Columns (columns72)'];

  // Find the pistachio (green) columns block
  const body = element.querySelector('.column-container__body');
  if (!body) return;
  const topColumns = body.querySelectorAll(':scope > .column-container__column');
  if (topColumns.length !== 2) return;

  // The pistachio column is the second top-level column
  const pistachioCol = topColumns[1];

  // Traverse down to get the inner two columns
  const pistachioStyled = pistachioCol.querySelector('.styled-container.bg-color-brand-category-c-light-pistachio');
  if (!pistachioStyled) return;
  const cmpContainer = pistachioStyled.querySelector('.cmp-container');
  if (!cmpContainer) return;
  const colControl = cmpContainer.querySelector('.columncontrol');
  if (!colControl) return;
  const innerContainer = colControl.querySelector('.column-container');
  if (!innerContainer) return;
  const innerBody = innerContainer.querySelector('.column-container__body');
  if (!innerBody) return;
  const innerColumns = innerBody.querySelectorAll(':scope > .column-container__column');
  if (innerColumns.length !== 2) return;

  // First column: heading
  let leftCell = [];
  const leftStyled = innerColumns[0].querySelector('.styled-container .cmp-container');
  if (leftStyled) {
    // Use all children, but typically just the text block (h3)
    // This should preserve the heading formatting
    Array.from(leftStyled.children).forEach((child) => {
      leftCell.push(child);
    });
  }

  // Second column: button
  let rightCell = [];
  const rightStyled = innerColumns[1].querySelector('.styled-container .cmp-container');
  if (rightStyled) {
    // Just one button block
    Array.from(rightStyled.children).forEach((child) => {
      rightCell.push(child);
    });
  }

  // Only proceed if we have some content in both columns
  if (leftCell.length === 0 && rightCell.length === 0) return;

  // Construct the table as per example: header row, then one row with two columns (cells)
  const cells = [
    headerRow,
    [leftCell, rightCell]
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
