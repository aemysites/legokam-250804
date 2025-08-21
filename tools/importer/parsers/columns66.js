/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example
  const headerRow = ['Columns (columns66)'];

  // Find the teaser block
  const teaser = element.querySelector('.cmp-teaser');
  if (!teaser) return;

  // COLUMN 1: The teaser image (just the <img> element)
  let leftImage = null;
  const imageContainer = teaser.querySelector('.cmp-teaser__image');
  if (imageContainer) {
    leftImage = imageContainer.querySelector('img');
  }

  // COLUMN 2: All textual/action content
  let rightContent = null;
  const contentContainer = teaser.querySelector('.cmp-teaser__content');
  if (contentContainer) {
    rightContent = document.createElement('div');
    // Append title
    const title = contentContainer.querySelector('.cmp-teaser__title');
    if (title) rightContent.appendChild(title);
    // Append description
    const desc = contentContainer.querySelector('.cmp-teaser__description');
    if (desc) rightContent.appendChild(desc);
    // Append actions
    const actions = contentContainer.querySelector('.cmp-teaser__action-container');
    if (actions) rightContent.appendChild(actions);
    // Append contact
    const contact = contentContainer.querySelector('.cmp-teaser__contact');
    if (contact) rightContent.appendChild(contact);
  }

  // Compose the table rows: first row is header, second is two columns
  const cells = [
    headerRow,
    [leftImage, rightContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
