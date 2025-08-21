/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: single cell as required
  const headerRow = ['Columns (columns54)'];

  // Find all columns
  const body = element.querySelector('.column-container__body');
  if (!body) return;
  const colEls = Array.from(body.querySelectorAll(':scope > .column-container__column'));

  // For each column, extract its main content element
  const columnContents = colEls.map(colEl => {
    // Find deepest .cmp-container with actual content
    let content = colEl;
    let styled = content.querySelector('.styled-container.container.responsivegrid');
    if (styled) content = styled;
    let cmp = content.querySelector(':scope > .cmp-container');
    if (cmp) content = cmp;
    // If there's a nested styled-container, go deeper
    let deepStyled = content.querySelector('.styled-container.container.responsivegrid');
    if (deepStyled) {
      let deepCmp = deepStyled.querySelector(':scope > .cmp-container');
      if (deepCmp && deepCmp.children.length > 0) content = deepCmp;
    }
    // Collect all contentful children
    const children = Array.from(content.children).filter(child => child.textContent.trim() || child.querySelector('*'));
    if (children.length === 0) return '';
    if (children.length === 1) return children[0];
    return children;
  });

  // Second row: one cell per column
  const contentRow = columnContents;

  // Compose table: first row is single header cell, second row is N columns
  const tableRows = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
