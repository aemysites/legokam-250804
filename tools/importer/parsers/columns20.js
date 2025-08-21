/* global WebImporter */
export default function parse(element, { document }) {
  // Header row - must match the requested block name exactly
  const headerRow = ['Columns (columns20)'];

  // Get the cmp-teaser block within our element
  const cmpTeaser = element.querySelector('.cmp-teaser');

  // Defensive: If not found, fallback to searching from element
  // But in all expected input, cmpTeaser should exist
  // Structure: cmp-teaser__image (image left) and cmp-teaser__content (text right)

  // Find direct children for columns
  let imageCol = null;
  let contentCol = null;

  if (cmpTeaser) {
    imageCol = cmpTeaser.querySelector('.cmp-teaser__image');
    contentCol = cmpTeaser.querySelector('.cmp-teaser__content');
  }

  // Defensive fallback if missing
  if (!imageCol) {
    imageCol = element.querySelector('.cmp-teaser__image');
  }
  if (!contentCol) {
    contentCol = element.querySelector('.cmp-teaser__content');
  }

  // Both columns should exist. If one is missing, put empty div to preserve column structure.
  if (!imageCol) {
    imageCol = document.createElement('div');
  }
  if (!contentCol) {
    contentCol = document.createElement('div');
  }

  // Structure: [left col, right col] for row 2, matching the screenshot (image left, text right)
  const row2 = [imageCol, contentCol];
  const cells = [headerRow, row2];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
