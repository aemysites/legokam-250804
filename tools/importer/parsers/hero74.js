/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image element (background image)
  let imageEl = null;
  // .cmp-image__image is likely unique in the block
  const teaserImg = element.querySelector('.cmp-image__image');
  if (teaserImg) {
    imageEl = teaserImg;
  }

  // Find the heading/title (h3.cmp-teaser__title > div)
  let titleEl = null;
  const teaserTitle = element.querySelector('.cmp-teaser__title > div');
  if (teaserTitle && teaserTitle.textContent.trim()) {
    titleEl = document.createElement('h1');
    titleEl.textContent = teaserTitle.textContent.trim();
  }

  // Find CTA/button (a.cmp-teaser__action-link)
  let ctaEl = null;
  const teaserCTA = element.querySelector('a.cmp-teaser__action-link');
  if (teaserCTA) {
    ctaEl = teaserCTA;
  }

  // Compose the table rows
  // 1. Header row
  const headerRow = ['Hero (hero74)'];

  // 2. Image row
  const imageRow = [imageEl ? imageEl : ''];

  // 3. Content row: Title + CTA (button)
  // Following the example: heading, then CTA below (with a <br> to separate if both)
  const contentCell = [];
  if (titleEl) contentCell.push(titleEl);
  if (ctaEl) {
    if (contentCell.length) contentCell.push(document.createElement('br'));
    contentCell.push(ctaEl);
  }
  // If neither, still provide an empty cell
  const contentRow = [contentCell.length ? contentCell : ''];

  // Create table as per instructions
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
