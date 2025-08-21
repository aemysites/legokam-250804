/* global WebImporter */
export default function parse(element, { document }) {
  // Build cells array: header, then each accordion item [title, content]
  const cells = [['Accordion (accordion81)']];

  // Find columns
  const columns = element.querySelectorAll('.column-container__column');
  if (columns.length !== 2) return;
  // Left col: image
  const imageElem = columns[0].querySelector('.cmp-image');
  // Right col: text block
  const textElem = columns[1].querySelector('.cmp-text') || columns[1];

  // Compose content cell: image + text together, as per example
  const contentCell = [];
  if (imageElem) contentCell.push(imageElem);
  if (textElem) contentCell.push(textElem);

  // No accordion title in this html, so title cell is blank string
  cells.push(['', contentCell]);

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
