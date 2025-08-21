/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell
  const headerRow = ['Columns (columns1)'];

  // Get the columns
  const body = element.querySelector('.column-container__body');
  if (!body) return;
  const columnDivs = Array.from(body.querySelectorAll(':scope > .column-container__column'));

  // Get content for each column, include all children of cmp-container
  const cells = columnDivs.map(col => {
    const styledContainer = col.querySelector(':scope > .styled-container');
    if (!styledContainer) return '';
    const cmpContainer = styledContainer.querySelector(':scope > .cmp-container');
    if (!cmpContainer || cmpContainer.childElementCount === 0) {
      return '';
    }
    // Use all children, not just direct children, and include all non-empty content
    const children = Array.from(cmpContainer.children).filter(child => {
      // Only include if there's visible content
      if (child.nodeType === 1) {
        return child.textContent.trim() || child.tagName === 'IMG' || child.tagName === 'A' || child.tagName === 'IFRAME';
      }
      return false;
    });
    if (children.length === 0) return '';
    if (children.length === 1) return children[0];
    return children;
  });

  // Build table: header row then single row with one cell per column
  const tableRows = [headerRow, cells];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}