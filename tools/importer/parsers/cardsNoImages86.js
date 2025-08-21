/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cardsNoImages86)'];
  // Obtain all card columns
  const columns = element.querySelectorAll('.column-container__column');
  const rows = [headerRow];

  columns.forEach((column) => {
    // Collect all cmp-text blocks (text and ctas) in order, as seen in the HTML
    const textBlocks = column.querySelectorAll(':scope .cmp-text');
    const content = [];
    textBlocks.forEach(tb => content.push(tb));
    rows.push([content]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
