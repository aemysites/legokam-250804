/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two column blocks
  const columns = Array.from(element.querySelectorAll('.column-container__column'));
  if (columns.length !== 2) return; // Defensive check

  // Column 1: Should contain the image block
  let leftContent;
  // Find the .styled-container (contains the image)
  leftContent = columns[0].querySelector('.styled-container') || columns[0];

  // Column 2: Should contain the text block
  let rightContent;
  // Find the .styled-container (contains the set of text features)
  rightContent = columns[1].querySelector('.styled-container') || columns[1];

  // Table header matches the block name exactly
  const headerRow = ['Columns (columns82)'];
  const tableRows = [headerRow, [leftContent, rightContent]];

  // Create table and replace original element
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
