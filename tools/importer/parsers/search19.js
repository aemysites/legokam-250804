/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header
  const headerRow = ['Search (search19)'];

  // The second row must contain the absolute URL to the query index
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.textContent = queryIndexUrl;

  // Extract all visible text from the source html (for flexibility)
  // We'll grab all visible text nodes inside the element
  const cellContent = [link];

  // Helper to collect visible text from all elements
  function collectVisibleText(el) {
    // Only collect text from elements that are visible and not script/style
    if (el.nodeType === Node.ELEMENT_NODE && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
      // If the element is hidden via class or style, skip
      const style = window.getComputedStyle ? window.getComputedStyle(el) : {};
      if (el.classList.contains('hidden') || style.display === 'none' || style.visibility === 'hidden') {
        return;
      }
      // If the element has direct text
      if (el.childNodes.length) {
        el.childNodes.forEach((child) => {
          collectVisibleText(child);
        });
      }
    } else if (el.nodeType === Node.TEXT_NODE) {
      const text = el.textContent.trim();
      if (text) {
        cellContent.push(document.createElement('br'));
        cellContent.push(text);
      }
    }
  }

  // Only collect from the main content area (not the whole element)
  const mainSection = element.querySelector('.product-list-page-container');
  if (mainSection) {
    collectVisibleText(mainSection);
  } else {
    collectVisibleText(element);
  }

  const cells = [headerRow, [cellContent]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
