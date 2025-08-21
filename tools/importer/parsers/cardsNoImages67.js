/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as per example
  const headerRow = ['Cards (cardsNoImages67)'];

  // Find all immediate card columns
  const columns = Array.from(element.querySelectorAll(':scope .column-container__column'));
  const rows = [headerRow];

  columns.forEach((col) => {
    // Find cmp-container within the column
    const cmpContainer = col.querySelector('.cmp-container');
    if (!cmpContainer) return;

    // Find the text block (contains headings/paragraphs)
    const textBlock = cmpContainer.querySelector('.cmp-text');
    // Find the button (CTA) anchor
    const buttonBlock = cmpContainer.querySelector('.cmp-button');

    const cellContent = [];

    if (textBlock) {
      // Use only the meaningful children (skip blank headings/paragraphs)
      Array.from(textBlock.children).forEach((child) => {
        if (
          (child.tagName === 'H3' || child.tagName === 'P') &&
          child.textContent.replace(/\u00a0|\s+/g, '') === ''
        ) {
          // skip empty heading/paragraph
          return;
        }
        cellContent.push(child);
      });
    }
    if (buttonBlock) {
      cellContent.push(buttonBlock);
    }

    rows.push([cellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
