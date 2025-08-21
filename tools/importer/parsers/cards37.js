/* global WebImporter */
export default function parse(element, { document }) {
  // Utility: Gather the image element in a teaser card
  function getTeaserImage(teaser) {
    const img = teaser.querySelector('.cmp-teaser__image img');
    return img || '';
  }
  // Utility: Gather the teaser card text content (title + description, preserve block structure)
  function getTeaserText(teaser) {
    const content = teaser.querySelector('.cmp-teaser__content');
    if (!content) return '';
    const parts = [];
    const title = content.querySelector('.cmp-teaser__title');
    if (title) parts.push(title);
    const desc = content.querySelector('.cmp-teaser__description');
    if (desc) parts.push(desc);
    return parts;
  }
  // rows array for table, starting with correct header
  const rows = [['Cards (cards37)']];
  // Find all columns in the cards row (each .column-container__column)
  const columns = element.querySelectorAll('.column-container__body > .column-container__column');
  for (const col of columns) {
    // Check for teaser card (image, title, description)
    const teaser = col.querySelector('.cmp-teaser');
    if (teaser) {
      const img = getTeaserImage(teaser);
      const textContent = getTeaserText(teaser);
      rows.push([img, textContent]);
      continue;
    }
    // Check for text-only card (with .cmp-text)
    const cmpText = col.querySelector('.cmp-text');
    if (cmpText) {
      rows.push(['', cmpText]);
      continue;
    }
    // Check for button (call to action)
    const cmpButton = col.querySelector('.cmp-button');
    if (cmpButton) {
      rows.push(['', cmpButton]);
      continue;
    }
    // If the column is truly empty, skip
    if (col.textContent.trim() === '' && !col.querySelector('img,a')) {
      continue;
    }
    // Fallback: preserve any other content in the cell
    rows.push(['', col]);
  }
  // Build table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
