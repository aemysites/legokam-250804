/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the element is not empty
  if (!element) return;

  // Block table header - must match example exactly
  const headerRow = ['Accordion (accordion16)'];
  const cells = [headerRow];

  // Get all accordion items - immediate children with class 'cmp-accordion__item'
  const items = Array.from(element.querySelectorAll(':scope .cmp-accordion__item'));

  // Edge case: if there are no items, output only the header
  if (items.length === 0) {
    const emptyTitle = document.createElement('div');
    emptyTitle.textContent = '';
    const emptyContent = document.createElement('div');
    emptyContent.textContent = '';
    cells.push([emptyTitle, emptyContent]);
  }

  items.forEach(item => {
    // Title cell: get the button title text as a <div> element
    const button = item.querySelector('.cmp-accordion__button');
    let titleContent;
    if (button) {
      // Reference the .cmp-accordion__title span directly if present
      const titleSpan = button.querySelector('.cmp-accordion__title');
      if (titleSpan) {
        titleContent = titleSpan;
      } else {
        // If missing, fallback to button's textContent
        const fallbackDiv = document.createElement('div');
        fallbackDiv.textContent = button.textContent.trim();
        titleContent = fallbackDiv;
      }
    } else {
      // If button missing, fallback to empty
      const emptyDiv = document.createElement('div');
      emptyDiv.textContent = '';
      titleContent = emptyDiv;
    }

    // Content cell: reference the main content block directly
    let contentBlock = null;
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    if (panel) {
      // Reference the main .cmp-text block inside panel, if present
      const textBlock = panel.querySelector('.cmp-text');
      if (textBlock) {
        contentBlock = textBlock;
      } else {
        // Fallback: reference the panel itself
        contentBlock = panel;
      }
    } else {
      // Fallback: empty div
      const emptyDiv = document.createElement('div');
      emptyDiv.textContent = '';
      contentBlock = emptyDiv;
    }

    cells.push([titleContent, contentBlock]);
  });

  // No Section Metadata block is needed (not in example)

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
