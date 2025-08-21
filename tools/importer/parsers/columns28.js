/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match example
  const headerRow = ['Columns (columns28)'];

  // Get content and image wrappers
  const content = element.querySelector('.cmp-teaser__content');
  const imageWrapper = element.querySelector('.cmp-teaser__image');

  // Build the left cell: should contain all visible content (title, description, button)
  const leftCellParts = [];
  if (content) {
    // Title (using h4 with inner div)
    const title = content.querySelector('.cmp-teaser__title');
    if (title) leftCellParts.push(title);
    // Description (may contain multiple paragraphs)
    const desc = content.querySelector('.cmp-teaser__description');
    if (desc) leftCellParts.push(desc);
    // Action button(s)
    const action = content.querySelector('.cmp-teaser__action-container');
    if (action) leftCellParts.push(action);
  }

  // Build the right cell: should be just the image (wrapper contains the image)
  const rightCellParts = [];
  if (imageWrapper) rightCellParts.push(imageWrapper);

  // Final table structure: 2 columns, 2 rows (header and content)
  const cells = [
    headerRow,
    [leftCellParts, rightCellParts]
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
