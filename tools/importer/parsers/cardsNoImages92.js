/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate card columns
  const cols = element.querySelectorAll(':scope .column-container__column');
  const rows = [];
  // Header row (matches example exactly)
  rows.push(['Cards (cardsNoImages92)']);
  cols.forEach(col => {
    // Card content is the first .styled-container > .cmp-container > .cmp-text
    const cardContainer = col.querySelector('.styled-container');
    if (!cardContainer) return;
    const cmpContainer = cardContainer.querySelector('.cmp-container');
    if (!cmpContainer) return;
    const cmpText = cmpContainer.querySelector('.cmp-text');
    if (cmpText) {
      rows.push([cmpText]);
    }
  });
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}