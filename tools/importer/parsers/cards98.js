/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards98)'];

  // Get all card columns
  const columns = Array.from(element.querySelectorAll('.column-container__column'));

  const cardRows = columns.map(col => {
    // First cell: Image
    const imageEl = col.querySelector('.cmp-image');

    // Second cell: Text and CTA
    const textEl = col.querySelector('.cmp-text');
    const btnEl = col.querySelector('.cmp-button');

    // Compose the contents for the text cell
    let textCellItems = [];
    if (textEl) textCellItems.push(textEl);
    if (btnEl) textCellItems.push(btnEl);
    // If neither, use empty string
    if (textCellItems.length === 0) textCellItems = [''];

    // If image missing, use empty string
    const imageCell = imageEl ? imageEl : '';

    return [imageCell, textCellItems];
  });

  // Compose final table structure
  const tableData = [headerRow, ...cardRows];

  // Create the block table and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
