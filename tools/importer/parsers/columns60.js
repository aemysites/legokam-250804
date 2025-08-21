/* global WebImporter */
export default function parse(element, { document }) {
  // Find the unique .teaser block (based on the HTML structure)
  const teaser = element.querySelector('.teaser.image-left');
  if (!teaser) return;

  // IMAGE COLUMN: find the image (do not clone, just reference)
  let imageCol = null;
  const teaserImage = teaser.querySelector('.cmp-teaser__image');
  if (teaserImage) {
    const img = teaserImage.querySelector('img');
    if (img) {
      imageCol = img;
    } else {
      imageCol = teaserImage;
    }
  }

  // CONTENT COLUMN: gather all teaser content (title, description, CTA)
  const teaserContent = teaser.querySelector('.cmp-teaser__content');
  let contentCol = [];
  if (teaserContent) {
    // Get title (as is, including heading tag)
    const title = teaserContent.querySelector('.cmp-teaser__title');
    if (title) contentCol.push(title);
    // Get description (keep all markup)
    const description = teaserContent.querySelector('.cmp-teaser__description');
    if (description) contentCol.push(description);
    // Get action button (if any)
    const cta = teaserContent.querySelector('.cmp-teaser__action-link');
    if (cta) contentCol.push(cta);
  }

  // Compose the header and rows as in the example
  const headerRow = ['Columns (columns60)'];
  const columnsRow = [contentCol, imageCol];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);
  // Replace the original element
  element.replaceWith(table);
}
