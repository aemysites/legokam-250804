/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns
  const columns = element.querySelectorAll('.column-container__column');
  if (columns.length < 2) return;

  // Left Column: Image (reference the actual <img> element)
  let leftCell = null;
  const img = columns[0].querySelector('img');
  if (img) {
    leftCell = img;
  } else {
    // Fallback: Reference all of left column
    leftCell = columns[0];
  }

  // Right Column: List of styled bullet points (reference the actual boxes)
  const rightCell = document.createElement('div');
  const bulletBoxes = columns[1].querySelectorAll('.main-container.border_rectangular_curved');
  // Defensive: If no bullet boxes, fallback to all content
  if (bulletBoxes.length) {
    bulletBoxes.forEach(box => rightCell.appendChild(box));
  } else {
    // Fallback: Reference entire column
    rightCell.appendChild(columns[1]);
  }

  const headerRow = ['Columns (columns2)'];
  const row = [leftCell, rightCell];
  const cells = [headerRow, row];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
