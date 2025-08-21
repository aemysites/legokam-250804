/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the table header matches the example exactly
  const headerRow = ['Columns (columns76)'];

  // Find the teaser block (contains both content and image)
  const teaser = element.querySelector('.cmp-teaser, .teaser');
  if (!teaser) return;

  // Extract teaser content: headline + button
  const teaserContent = teaser.querySelector('.cmp-teaser__content');
  // Extract teaser image
  const teaserImage = teaser.querySelector('.cmp-teaser__image');

  // Compose table: header, then one row with two columns (content | image)
  const cells = [
    headerRow,
    [teaserContent, teaserImage]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
