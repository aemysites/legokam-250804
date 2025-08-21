/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion root element
  let accordionRoot = element.querySelector('.faq-accordion.accordion.panelcontainer .cmp-accordion');
  if (!accordionRoot) {
    // fallback: find any .cmp-accordion within this block
    accordionRoot = element.querySelector('.cmp-accordion');
  }
  if (!accordionRoot) {
    // If not present, do nothing
    return;
  }

  // Get all accordion items
  const items = accordionRoot.querySelectorAll(':scope > .cmp-accordion__item');
  const rows = [];
  // Header row: EXACT match to example
  rows.push(['Accordion (accordion9)']);

  items.forEach((item) => {
    // Title cell: preserve semantic formatting
    const titleSpan = item.querySelector('.cmp-accordion__title');
    let titleCell;
    if (titleSpan) {
      // For semantic meaning, use a <p> and retain innerHTML (keeps strong/em/links if present)
      const p = document.createElement('p');
      // Reference existing nodes; if titleSpan has children, append them, else use textContent
      if (titleSpan.childNodes.length > 0) {
        titleSpan.childNodes.forEach((node) => p.append(node));
      } else {
        p.textContent = titleSpan.textContent;
      }
      titleCell = p;
    } else {
      // fallback: use header or button text
      const header = item.querySelector('.cmp-accordion__header');
      if (header && header.textContent) {
        const p = document.createElement('p');
        p.textContent = header.textContent.trim();
        titleCell = p;
      } else {
        const p = document.createElement('p');
        p.textContent = item.textContent.trim();
        titleCell = p;
      }
    }

    // Content cell: reference all relevant children inside the panel
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentCell = '';
    if (panel) {
      // Gather all ELEMENT_NODE children (except script/style), referencing them directly
      const contentElements = [];
      panel.childNodes.forEach((child) => {
        if (
          child.nodeType === 1 &&
          child.tagName !== 'SCRIPT' &&
          child.tagName !== 'STYLE'
        ) {
          contentElements.push(child);
        }
      });
      // If no element children, fallback to text only
      if (contentElements.length) {
        contentCell = contentElements.length === 1 ? contentElements[0] : contentElements;
      } else if (panel.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = panel.textContent.trim();
        contentCell = p;
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
