/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all top-level li elements inside the nav's ul
  const ul = element.querySelector('ul');
  let contentRow = [];
  if (ul) {
    contentRow = Array.from(ul.children).map(li => {
      // For each li, extract all content except screen-reader text
      const a = li.querySelector('a');
      if (a) {
        // Remove screen-reader-only span from the link
        const srSpan = a.querySelector('.cmp-link__screen-reader-only');
        if (srSpan) srSpan.remove();
        // Build a fragment with any text nodes in li and the link itself
        const fragments = [];
        li.childNodes.forEach(node => {
          if (
            node.nodeType === Node.TEXT_NODE &&
            node.textContent.trim() &&
            node !== a
          ) {
            fragments.push(document.createTextNode(node.textContent.trim()));
          }
        });
        fragments.push(a);
        return fragments.length === 1 ? fragments[0] : fragments;
      }
      // Fallback: use li text if no link
      return li.textContent.trim();
    });
  }
  // Header row MUST be exactly one cell (not multiple columns)
  const headerRow = ['Columns (columns42)'];
  // Table: header row, then one row with N columns for each nav item
  const tableArray = [headerRow, contentRow.length ? contentRow : ['']];
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}
