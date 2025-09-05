/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the teaser block (the actual hero block)
  const teaser = element.querySelector('.teaser');
  if (!teaser) return;

  // --- Row 1: Header ---
  const headerRow = ['Hero (hero9)'];

  // --- Row 2: Background Image ---
  let bgImgCell = '';
  const bgDiv = teaser.querySelector('.background');
  if (bgDiv) {
    // Find the <img> inside the <picture>
    const picture = bgDiv.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        bgImgCell = img;
      }
    }
  }

  // --- Row 3: Content ---
  const fgDiv = teaser.querySelector('.foreground');
  let contentCell = [];
  if (fgDiv) {
    const textDiv = fgDiv.querySelector('.text');
    if (textDiv) {
      // Eyebrow (subheading)
      const eyebrow = textDiv.querySelector('.eyebrow');
      if (eyebrow) contentCell.push(eyebrow);
      // Title (heading)
      const titleDiv = textDiv.querySelector('.title');
      if (titleDiv) {
        const h3 = titleDiv.querySelector('h3, h1, h2');
        if (h3) contentCell.push(h3);
      }
      // Description (paragraph)
      const descDiv = textDiv.querySelector('.long-description');
      if (descDiv) {
        const p = descDiv.querySelector('p');
        if (p) contentCell.push(p);
      }
      // CTA (button/link)
      const ctaDiv = textDiv.querySelector('.cta');
      if (ctaDiv) {
        const a = ctaDiv.querySelector('a');
        if (a) contentCell.push(a);
      }
    }
  }

  // Build table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
