/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block, matches example
  const headerRow = ['Accordion (accordion25)'];

  // Find the actual accordion root
  let accordionRoot = element;
  if (!accordionRoot.classList.contains('cmp-accordion')) {
    accordionRoot = accordionRoot.querySelector('.cmp-accordion');
  }
  if (!accordionRoot) return;

  // Get all accordion items (direct children)
  const items = Array.from(accordionRoot.querySelectorAll(':scope > .cmp-accordion__item'));

  // Parse each accordion item into a row with [title, content]
  const rows = items.map(item => {
    // 1. Title cell: use the .cmp-accordion__title span (reference existing element)
    const titleSpan = item.querySelector('.cmp-accordion__button .cmp-accordion__title');
    const titleCell = titleSpan || document.createTextNode('');

    // 2. Content cell: all content inside [data-cmp-hook-accordion="panel"]
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentCell;
    if (panel) {
      // Gather all non-empty .cmp-text blocks in panel
      const contentParts = [];
      panel.querySelectorAll('.cmp-text').forEach(e => {
        // Only include non-empty .cmp-text blocks
        if (e.textContent.trim() !== '') {
          contentParts.push(e);
        }
      });
      // Also handle any iframe[src] as links (not relevant here, but per guidelines)
      panel.querySelectorAll('iframe[src]').forEach(iframe => {
        const link = document.createElement('a');
        link.href = iframe.src;
        link.textContent = iframe.src;
        contentParts.push(link);
      });
      // Fallback: if no .cmp-texts, add panel's direct children
      if (contentParts.length === 0) {
        Array.from(panel.children).forEach(e => {
          if (e.textContent.trim() !== '') {
            contentParts.push(e);
          }
        });
      }
      // Use array if multiple, single if one
      contentCell = contentParts.length > 1 ? contentParts : (contentParts[0] || document.createTextNode(''));
    } else {
      contentCell = document.createTextNode('');
    }
    return [titleCell, contentCell];
  });

  // Compose table cells: header then content rows
  const tableCells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the block table (reference block, not returning)
  element.parentNode.replaceChild(block, element);
}
