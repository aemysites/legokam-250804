/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per instruction and example
  const headerRow = ['Columns (columns73)'];

  // Defensive: Find the inner pistachio column (contains the two column block)
  const pistachioCol = element.querySelector('.styled-column-container.bg-color-brand-category-c-light-pistachio');
  if (!pistachioCol) return;

  // Find the two-column block inside pistachio
  const innerColumnControl = pistachioCol.querySelector('.columncontrol.column-container--two-col');
  if (!innerColumnControl) return;
  const innerBody = innerColumnControl.querySelector('.column-container__body');
  if (!innerBody) return;
  const innerColumns = innerBody.querySelectorAll(':scope > .column-container__column');
  if (innerColumns.length < 2) return;

  // Left column: find the text block (cmp-text)
  let textBlock = innerColumns[0].querySelector('.cmp-text');
  // Defensive: fallback to all children if no cmp-text
  if (!textBlock) {
    // Use all children of the left column as a fragment
    const frag = document.createDocumentFragment();
    [...innerColumns[0].children].forEach(child => frag.appendChild(child));
    textBlock = frag;
  }

  // Right column: find the button (cmp-button)
  let buttonBlock = innerColumns[1].querySelector('.cmp-button');
  // Defensive: fallback to all children if no button
  if (!buttonBlock) {
    const frag = document.createDocumentFragment();
    [...innerColumns[1].children].forEach(child => frag.appendChild(child));
    buttonBlock = frag;
  }

  // Compose table rows: as per example, two columns (text, button)
  const secondRow = [textBlock, buttonBlock];

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
