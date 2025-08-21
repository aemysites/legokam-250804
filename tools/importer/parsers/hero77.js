/* global WebImporter */
export default function parse(element, { document }) {
  // Find the teaser block
  const teaser = element.querySelector('.teaser, .cmp-teaser');
  if (!teaser) return;

  // Get the image (background visual)
  let imageEl = undefined;
  const teaserImageDiv = teaser.querySelector('.cmp-teaser__image');
  if (teaserImageDiv) {
    const img = teaserImageDiv.querySelector('img');
    if (img) imageEl = img;
  }

  // Get the headline/title
  let titleEl = undefined;
  const h3 = teaser.querySelector('.cmp-teaser__title');
  if (h3) {
    // Some implementations wrap the title text in a <div>, some not
    const inner = h3.querySelector('div') || h3;
    if (inner && inner.textContent && inner.textContent.trim()) {
      titleEl = document.createElement('h2');
      titleEl.textContent = inner.textContent.trim();
    }
  }

  // Get the CTA/button (link)
  let ctaEl = undefined;
  const cta = teaser.querySelector('.cmp-teaser__action-link');
  if (cta) ctaEl = cta;

  // Compose the rows for the block table
  const headerRow = ['Hero (hero77)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [
    [titleEl, ctaEl].filter(Boolean) // Only include non-empty elements
  ];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
