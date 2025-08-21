/* global WebImporter */
export default function parse(element, { document }) {
  // Get the column container
  const columnContainer = element.querySelector('.column-container__body');
  if (!columnContainer) return;
  const column = columnContainer.querySelector('.column-container__column');
  if (!column) return;

  // Find the styled-container
  const styledContainer = column.querySelector('.styled-container');
  if (!styledContainer) return;
  const cmpContainer = styledContainer.querySelector('.cmp-container');
  if (!cmpContainer) return;

  // Find teaser block
  const teaser = cmpContainer.querySelector('.teaser, .teaser.image-left');
  if (!teaser) return;

  // Left column: all teaser content except image
  const teaserContent = teaser.querySelector('.cmp-teaser__content');
  let leftColumnContent = [];
  if (teaserContent) {
    // Title
    const title = teaserContent.querySelector('.cmp-teaser__title');
    if (title) leftColumnContent.push(title);
    // Description(s)
    const descriptions = teaserContent.querySelectorAll('.cmp-teaser__description');
    descriptions.forEach(desc => leftColumnContent.push(desc));
    // Action container if present (button/link)
    const action = teaserContent.querySelector('.cmp-teaser__action-container');
    if (action) leftColumnContent.push(action);
  }

  // Right column: image element
  let rightColumnContent = null;
  const teaserImage = teaser.querySelector('.cmp-teaser__image');
  if (teaserImage) {
    const img = teaserImage.querySelector('img');
    if (img) rightColumnContent = img;
  }

  // Assemble table as per example: header, then a row with two columns
  const headerRow = ['Columns (columns13)'];
  const contentRow = [leftColumnContent, rightColumnContent];

  // Table creation
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}