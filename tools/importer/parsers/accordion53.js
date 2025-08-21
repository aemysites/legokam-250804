/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row
  const headerRow = ['Accordion (accordion53)'];
  const rows = [headerRow];

  // Locate the main accordion container
  let accordion = element.querySelector('.cmp-accordion');
  if (!accordion && element.classList.contains('cmp-accordion')) {
    accordion = element;
  }
  if (!accordion) return; // Defensive guard

  // Get all accordion items
  const items = accordion.querySelectorAll(':scope > .cmp-accordion__item');
  items.forEach(item => {
    // Title: Use the text from the button's .cmp-accordion__title span
    let titleText = '';
    const button = item.querySelector('.cmp-accordion__button');
    if (button) {
      const span = button.querySelector('.cmp-accordion__title');
      if (span) {
        titleText = span.textContent.trim();
      } else {
        titleText = button.textContent.trim();
      }
    }
    // For semantic meaning, wrap title in a <p> (to match example rendering)
    const titleNode = document.createElement('p');
    titleNode.textContent = titleText;

    // Content: Use the first child of .cmp-accordion__panel with text/content
    let contentCell = null;
    const panel = item.querySelector('.cmp-accordion__panel');
    if (panel) {
      // Try to use a div.text, .insurance-rte, or .cmp-text if present
      let contentDiv = panel.querySelector('.insurance-rte, .cmp-text, .text');
      if (contentDiv) {
        contentCell = contentDiv;
      } else {
        // If not found, use all children of panel except script/style/meta
        // (don't clone, use reference)
        const children = Array.from(panel.children).filter(child =>
          child.tagName !== 'SCRIPT' &&
          child.tagName !== 'STYLE' &&
          child.tagName !== 'META'
        );
        if (children.length > 0) {
          contentCell = children.length === 1 ? children[0] : children;
        } else {
          // fallback: use panel itself if it has any text
          contentCell = panel;
        }
      }
    } else {
      // fallback: empty cell
      contentCell = document.createElement('div');
    }

    rows.push([titleNode, contentCell]);
  });

  // Create and replace with Accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
