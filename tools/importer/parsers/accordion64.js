/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cmp-accordion in the element's subtree
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;

  // Header row for block table, matching example
  const rows = [['Accordion (accordion64)']];

  // Get all accordion items
  const items = accordion.querySelectorAll(':scope > .cmp-accordion__item');
  items.forEach(item => {
    // Title cell: extract .cmp-accordion__title as element reference
    const titleSpan = item.querySelector('.cmp-accordion__title');
    let titleCell = titleSpan || document.createTextNode('');
    // Content cell: reference the .cmp-text element inside the panel
    const panel = item.querySelector('.cmp-accordion__panel');
    let contentCell;
    if (panel) {
      // Prefer .cmp-text, fallback to panel itself
      const cmpText = panel.querySelector('.cmp-text');
      contentCell = cmpText || panel;
    } else {
      contentCell = document.createTextNode('');
    }
    rows.push([titleCell, contentCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
