/* global WebImporter */
export default function parse(element, { document }) {
  // HEADER
  const headerRow = ['Accordion (accordion88)'];
  // Find the main accordion container
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;
  // Find all top-level accordion items
  const items = accordion.querySelectorAll(':scope > .cmp-accordion__item');
  const rows = [headerRow];
  items.forEach(item => {
    // --- TITLE ---
    let titleEl = null;
    const button = item.querySelector('.cmp-accordion__button');
    if (button) {
      // Use the .cmp-accordion__title (preserves formatting and semantics)
      titleEl = button.querySelector('.cmp-accordion__title');
    }
    // Fallback: just use button text if not found
    if (!titleEl && button) {
      titleEl = document.createElement('span');
      titleEl.textContent = button.textContent.trim();
    }
    // --- CONTENT ---
    let contentEl = null;
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    if (panel) {
      // Prefer .cmp-text if present (the actual content)
      const cmpText = panel.querySelector('.cmp-text');
      if (cmpText) {
        contentEl = cmpText;
      } else {
        // Fallback: reference the panel itself
        contentEl = panel;
      }
    }
    // Always reference the actual element from the document, not clone
    rows.push([
      titleEl || '',
      contentEl || ''
    ]);
  });
  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
