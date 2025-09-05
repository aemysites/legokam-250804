/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate children of the main section
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Find the form container (left column)
  let leftCol = null;
  let rightCol = null;

  // The form is inside a .form-wrapper
  leftCol = children.find((child) => child.classList.contains('form-wrapper'));
  // The image is inside .default-content-wrapper
  rightCol = children.find((child) => child.classList.contains('default-content-wrapper'));

  // Defensive fallback: if not found, try to use first/second child
  if (!leftCol && children.length > 0) leftCol = children[0];
  if (!rightCol && children.length > 1) rightCol = children[1];

  // Table header
  const headerRow = ['Columns (columns14)'];

  // Table content row: two columns, left is the form, right is the image
  const contentRow = [leftCol, rightCol];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
