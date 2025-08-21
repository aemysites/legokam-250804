/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the first h1, h2, or h3 in content
  function getMainHeading(container) {
    return container.querySelector('h1, h2, h3');
  }

  // Helper to get background image (not present in this HTML, but ready for reuse)
  function getBackgroundImage(container) {
    // Look for images or background images if present in the future
    // For current examples, there is none
    return null;
  }

  // Find the text block
  let textBlock = element.querySelector('.cmp-text');
  if (!textBlock) {
    textBlock = element.querySelector('.text');
  }
  if (!textBlock) {
    // fallback: use the element itself if neither found
    textBlock = element;
  }

  // Extract main heading and other content
  const heading = getMainHeading(textBlock);
  const contentCell = [];
  if (heading) contentCell.push(heading);
  // Add all paragraphs and subheadings after the main heading
  Array.from(textBlock.children).forEach((child) => {
    if (child === heading) return;
    // skip empty ULs
    if (child.tagName === 'UL' && child.children.length === 0) return;
    // Accept paragraphs, headings, lists (if not empty)
    if (
      child.tagName === 'P' ||
      (/^H[1-6]$/.test(child.tagName) && child !== heading) ||
      (child.tagName === 'UL' && child.children.length > 0)
    ) {
      contentCell.push(child);
    }
  });
  // If no content found, add an empty string to keep table structure
  if (contentCell.length === 0) contentCell.push('');

  // Block table rows
  const headerRow = ['Hero (hero51)'];
  const imageRow = [''];
  const contentRow = [contentCell];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
