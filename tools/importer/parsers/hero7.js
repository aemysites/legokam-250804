/* global WebImporter */
export default function parse(element, { document }) {
  // Find background image (picture or img)
  let bgImgEl = null;
  const backgroundDiv = element.querySelector('.background');
  if (backgroundDiv) {
    bgImgEl = backgroundDiv.querySelector('picture') || backgroundDiv.querySelector('img');
  }

  // Find text content (eyebrow, title, subheading, cta)
  let eyebrow = '', title = '', subheading = '', cta = '';
  const foregroundDiv = element.querySelector('.foreground');
  if (foregroundDiv) {
    const textDiv = foregroundDiv.querySelector('.text');
    if (textDiv) {
      // Eyebrow
      const eyebrowEl = textDiv.querySelector('.eyebrow');
      if (eyebrowEl) eyebrow = eyebrowEl.cloneNode(true);
      // Title
      const titleEl = textDiv.querySelector('.title');
      if (titleEl) title = titleEl.cloneNode(true);
      // Subheading (not present in sample, but check for h4/h5/h6)
      const subheadingEl = textDiv.querySelector('h4, h5, h6');
      if (subheadingEl) subheading = subheadingEl.cloneNode(true);
      // CTA
      const ctaEl = textDiv.querySelector('.cta');
      if (ctaEl && ctaEl.textContent.trim()) cta = ctaEl.cloneNode(true);
    }
  }

  // Compose content cell for row 3
  const contentFrag = document.createElement('div');
  if (eyebrow) contentFrag.appendChild(eyebrow);
  if (title) contentFrag.appendChild(title);
  if (subheading) contentFrag.appendChild(subheading);
  if (cta) contentFrag.appendChild(cta);

  // Table rows
  const headerRow = ['Hero (hero7)'];
  const imageRow = [bgImgEl ? bgImgEl : ''];
  const contentRow = [contentFrag];

  // Ensure always 3 rows (header, image, content)
  const cells = [headerRow, imageRow, contentRow];
  while (cells.length < 3) cells.push(['']);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
