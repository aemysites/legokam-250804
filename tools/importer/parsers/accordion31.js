/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion root within the given element
  let accordion = element.querySelector('.cmp-accordion');
  if (!accordion) {
    if (element.classList.contains('cmp-accordion')) {
      accordion = element;
    } else {
      // Try to find it deeper in children if possible
      accordion = element.querySelector('.cmp-accordion');
      if (!accordion) return;
    }
  }

  // Setup the table header row
  const headerRow = ['Accordion (accordion31)'];
  const rows = [headerRow];

  // Each accordion item -> a row with two cells: title, content
  const items = accordion.querySelectorAll(':scope > .cmp-accordion__item');
  items.forEach(item => {
    // Title cell: .cmp-accordion__title inside the button
    let titleNode = item.querySelector('.cmp-accordion__button .cmp-accordion__title');
    let titleCell;
    if (titleNode) {
      // Use the span directly as title cell (preserve possible formatting)
      titleCell = titleNode;
    } else {
      // Fallback: get text from header button if possible
      const btn = item.querySelector('.cmp-accordion__button');
      if (btn) {
        titleCell = document.createElement('div');
        titleCell.textContent = btn.textContent.trim();
      } else {
        // Fallback: use a generic indicator
        titleCell = document.createElement('div');
        titleCell.textContent = 'Accordion Item';
      }
    }

    // Content cell: everything in the .cmp-accordion__panel
    const panel = item.querySelector('.cmp-accordion__panel');
    let contentCell;
    if (panel) {
      // If the panel contains exactly one .cmp-text, use that element directly
      const cmpText = panel.querySelector('.cmp-text');
      if (cmpText && cmpText.parentElement === panel) {
        contentCell = cmpText;
      } else {
        // If not, gather all direct children of the panel (could be container, grid, etc.)
        const children = Array.from(panel.children).filter(child => child.nodeType === 1);
        if (children.length === 1) {
          contentCell = children[0];
        } else if (children.length > 1) {
          // Multiple children: put them in a div
          contentCell = document.createElement('div');
          children.forEach(child => contentCell.appendChild(child));
        } else {
          // No children, fallback: create an empty div
          contentCell = document.createElement('div');
        }
      }
    } else {
      // No panel found, fallback to empty div
      contentCell = document.createElement('div');
    }

    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
