/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const headerRow = ['Hero (hero70)'];

  // --- Row 2: Background Image ---
  let backgroundImgEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    // Prefer the <img> (usually the mobile, but always an image)
    const img = picture.querySelector('img');
    if (img) backgroundImgEl = img;
    else {
      // As a fallback, use the first <source>'s srcset as src
      const source = picture.querySelector('source');
      if (source && source.srcset) {
        const imgEl = document.createElement('img');
        imgEl.src = source.srcset;
        backgroundImgEl = imgEl;
      }
    }
  }
  const imageRow = [backgroundImgEl ? backgroundImgEl : ''];

  // --- Row 3: Content (Heading, Para, Buttons) ---
  const contentEls = [];
  const contentContainer = element.querySelector('.cmp-banner__content');
  if (contentContainer) {
    // Title -- use as-is heading element
    const heading = contentContainer.querySelector('.cmp-banner__heading');
    if (heading) contentEls.push(heading);

    // Paragraph(s)
    const para = contentContainer.querySelector('.cmp-banner__para');
    if (para) contentEls.push(para);

    // Call-to-actions: collect all <a> links from .cmp-banner__btn-container
    const btnContainer = contentContainer.querySelector('.cmp-banner__btn-container');
    if (btnContainer) {
      // Get all anchor tags (likely 2)
      const links = Array.from(btnContainer.querySelectorAll('a'));
      if (links.length > 0) {
        // Use a div to wrap CTAs (for correct layout and structure)
        const ctaDiv = document.createElement('div');
        links.forEach(link => ctaDiv.appendChild(link));
        contentEls.push(ctaDiv);
      }
    }
  }
  const contentRow = [contentEls.length > 0 ? contentEls : ''];

  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
