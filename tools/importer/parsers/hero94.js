/* global WebImporter */
export default function parse(element, { document }) {
  // Find the teaser block (most relevant content)
  const teaser = element.querySelector('.cmp-teaser');
  if (!teaser) return;

  // Extract the image (background/visual)
  let imageEl = null;
  const imageContainer = teaser.querySelector('.cmp-teaser__image');
  if (imageContainer) {
    const img = imageContainer.querySelector('img');
    if (img) imageEl = img;
  }

  // Extract the main content (title, description, CTAs)
  const contentParts = [];
  const contentWrapper = teaser.querySelector('.cmp-teaser__content');
  if (contentWrapper) {
    // Title (kept as-is to preserve semantics)
    const title = contentWrapper.querySelector('.cmp-teaser__title');
    if (title) contentParts.push(title);
    // Description (can be paragraphs, lists, etc)
    const desc = contentWrapper.querySelector('.cmp-teaser__description');
    if (desc) contentParts.push(desc);
    // CTAs (action buttons/links)
    const ctas = contentWrapper.querySelector('.cmp-teaser__action-container');
    if (ctas) contentParts.push(ctas);
  }

  // Build table: header, image, content
  const cells = [
    ['Hero (hero94)'],
    [imageEl ? imageEl : ''],
    [contentParts.length > 0 ? contentParts : '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
