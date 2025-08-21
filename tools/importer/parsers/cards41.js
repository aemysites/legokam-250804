/* global WebImporter */
export default function parse(element, { document }) {
  // Header row (single column, exact text)
  const headerRow = ['Cards (cards41)'];

  // Find all card columns robustly
  let columns = Array.from(element.querySelectorAll('.column-container__column'));
  if (columns.length === 0) {
    columns = Array.from(element.querySelectorAll('.styled-container, .container'));
  }

  // Build card rows: each must be [image/icon, text+cta]
  const cardRows = columns.map((col) => {
    let cardContainer = col.querySelector('.styled-container, .container');
    if (!cardContainer) cardContainer = col;

    // Image/icon cell: first <img> in cardContainer, or empty
    const imageEl = cardContainer.querySelector('img');
    const imageCell = imageEl ? imageEl : '';

    // Text cell: .cmp-text blocks + CTA button
    const textBlocks = Array.from(cardContainer.querySelectorAll('.cmp-text'));
    const buttonEl = cardContainer.querySelector('.button a.cmp-button');
    let contentCell = [];
    if (textBlocks.length) contentCell.push(...textBlocks);
    if (buttonEl) contentCell.push(buttonEl);
    // Fallback: use all children except first img if no .cmp-text or button found
    if (contentCell.length === 0) {
      contentCell = Array.from(cardContainer.children).filter(child => child !== imageEl);
    }
    // If only one element, unwrap from array
    const textCell = contentCell.length > 1 ? contentCell : (contentCell[0] || '');

    // Always two columns per card
    return [imageCell, textCell];
  });

  // Assemble table: header + rows, each card as [img, text]
  const rows = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
