/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container of cards
  if (!element || !element.querySelectorAll) return;

  // Table header row as required
  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  // Each card is a <button> child of the main element
  const cardButtons = element.querySelectorAll(':scope > button');

  cardButtons.forEach((btn) => {
    // Image: inside a wrapper div, always present
    const imgWrapper = btn.querySelector('.quiz-option-img-wrapper-cover');
    let imgEl = null;
    if (imgWrapper) {
      imgEl = imgWrapper.querySelector('img');
    }

    // Description: span with class
    const descEl = btn.querySelector('.quiz-option-description');

    // Defensive: only add row if both image and description exist
    if (imgEl && descEl) {
      // First cell: image element
      // Second cell: description element (text only)
      rows.push([
        imgEl,
        descEl
      ]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
