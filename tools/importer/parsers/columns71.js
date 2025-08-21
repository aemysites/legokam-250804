/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, must match example exactly
  const headerRow = ['Columns (columns71)'];

  // Get banner block main content (left column)
  const cmpContent = element.querySelector('.cmp-banner__content');
  const leftColumnContent = [];
  if (cmpContent) {
    // Heading (h1)
    const heading = cmpContent.querySelector('.cmp-banner__heading');
    if (heading) leftColumnContent.push(heading);
    // Paragraph(s)
    const para = cmpContent.querySelector('.cmp-banner__para');
    if (para) leftColumnContent.push(para);
    // Button(s)
    const btn = cmpContent.querySelector('.cmp-banner__btn-container .cmp-button__text');
    if (btn) leftColumnContent.push(btn);
  }

  // Get banner image (right column)
  let image = null;
  // The <picture> element contains sources and an <img> fallback
  const picture = element.querySelector('picture');
  if (picture) {
    // Prefer <img> inside <picture>
    image = picture.querySelector('img');
  }

  // Compose table: header row then single row with two columns
  const cells = [
    headerRow,
    [leftColumnContent, image || '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}