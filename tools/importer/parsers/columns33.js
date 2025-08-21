/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main teaser element that contains the content
  const teaser = element.querySelector('.cmp-teaser');
  if (!teaser) return;

  // Get the image (first column)
  let imageContent = null;
  const imageCol = teaser.querySelector('.cmp-teaser__image');
  if (imageCol) {
    // Keep the whole cmp-teaser__image div for flexibility
    imageContent = imageCol;
  }

  // Get the text content (second column)
  let textContent = null;
  const contentCol = teaser.querySelector('.cmp-teaser__content');
  if (contentCol) {
    // Use the entire content area so that heading and description remain together
    textContent = contentCol;
  }

  // If both columns are missing, do nothing
  if (!imageContent && !textContent) return;

  // Compose columns, preserving the order as shown in screenshots: image left, text right
  const columns = [imageContent, textContent];

  // Remove any nulls in columns, but always keep number of columns to 2 for structure
  // If one is missing, add an empty string so columns33 always produces 2 columns
  while (columns.length < 2) {
    columns.push('');
  }
  if (columns.length > 2) {
    columns.length = 2;
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns33)'],
    columns
  ], document);
  
  element.replaceWith(table);
}
