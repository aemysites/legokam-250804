/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one cell, block name
  const cells = [['Columns (columns93)']];

  // Identify the columns
  const columns = Array.from(element.querySelectorAll(':scope .column-container__column'));

  // For each column, extract content
  const row = columns.map(col => {
    // Try to find .cmp-container inside each column
    const cmpContainer = col.querySelector('.cmp-container');
    if (cmpContainer) {
      // If iframe present, create a link to src
      const iframe = cmpContainer.querySelector('iframe[src]');
      if (iframe) {
        const link = document.createElement('a');
        link.href = iframe.src;
        link.textContent = iframe.title || 'YouTube Video';
        return link;
      }
      // If cmp-text present, use it
      const cmpText = cmpContainer.querySelector('.cmp-text');
      if (cmpText) return cmpText;
      return cmpContainer;
    }
    // Fallback to column element itself
    return col;
  });

  // Add one row with both columns' content
  cells.push(row);

  // Create and replace with block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
