/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the offer-content block
  const offerContent = element.querySelector('.offer-content');
  if (!offerContent) return;

  // Extract left and right sections
  const offerLeft = offerContent.querySelector('.offer-left');
  const offerRight = offerContent.querySelector('.offer-right');

  // Defensive: Gather headline and detail
  let headline, detail;
  if (offerLeft) {
    headline = offerLeft.querySelector('h4');
    detail = offerLeft.querySelector('p');
  }

  // Defensive: Gather CTA
  let cta;
  if (offerRight) {
    cta = offerRight.querySelector('a');
  }

  // Compose content cell for row 3
  const contentCell = [];
  if (headline) contentCell.push(headline);
  if (detail) contentCell.push(detail);
  if (cta) contentCell.push(cta);

  // Table rows
  const headerRow = ['Hero (hero15)'];
  const imageRow = ['']; // No image in this HTML
  const contentRow = [contentCell];

  // Create table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
