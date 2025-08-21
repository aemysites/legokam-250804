/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block, matches exactly the example
  const headerRow = ['Accordion (accordion21)'];

  // All accordion items
  const items = element.querySelectorAll('.cmp-accordion__item');
  const rows = [headerRow];

  items.forEach((item) => {
    // Title cell: prefer .cmp-accordion__title span (which preserves inline formatting)
    let titleCell = '';
    const header = item.querySelector('.cmp-accordion__header');
    if (header) {
      const titleSpan = header.querySelector('.cmp-accordion__title');
      if (titleSpan) {
        titleCell = titleSpan;
      } else {
        // fallback to button text
        const button = header.querySelector('button');
        if (button) {
          titleCell = document.createTextNode(button.textContent.trim());
        }
      }
    }

    // Content cell: all content inside the associated panel
    let contentCell = '';
    const panel = item.querySelector('.cmp-accordion__panel');
    if (panel) {
      // The panel usually contains a div.text > div.cmp-text as the main content
      // We'll use the first .cmp-text if it exists, else all children of panel
      const cmpText = panel.querySelector('.cmp-text');
      if (cmpText) {
        contentCell = cmpText;
      } else {
        // get all child nodes (including possible text nodes, elements, etc.)
        contentCell = Array.from(panel.childNodes);
      }
    }

    rows.push([titleCell, contentCell]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
