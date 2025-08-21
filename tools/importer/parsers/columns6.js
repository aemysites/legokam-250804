/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first teaser block inside the main element
  const teaser = element.querySelector('.cmp-teaser');
  if (!teaser) return;

  // Get the teaser content (title, description, action link)
  const teaserContent = teaser.querySelector('.cmp-teaser__content');
  const leftColumnEls = [];
  if (teaserContent) {
    const teaserTitle = teaserContent.querySelector('.cmp-teaser__title');
    if (teaserTitle) leftColumnEls.push(teaserTitle);
    const teaserDesc = teaserContent.querySelector('.cmp-teaser__description');
    if (teaserDesc) leftColumnEls.push(teaserDesc);
    const teaserAction = teaserContent.querySelector('.cmp-teaser__action-link');
    if (teaserAction) leftColumnEls.push(teaserAction);
  }

  // Get the teaser image block (contains actual img)
  const teaserImage = teaser.querySelector('.cmp-teaser__image');

  // Prepare rows for the columns block table
  // Header must be a single cell (one column)
  const headerRow = ['Columns (columns6)'];
  // Content row must have two cells for two columns
  const contentRow = [leftColumnEls, teaserImage];

  const cells = [
    headerRow,
    contentRow
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
