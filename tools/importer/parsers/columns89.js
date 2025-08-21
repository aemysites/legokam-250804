/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the prompt
  const headerRow = ['Columns (columns89)'];

  // Find the columns inside the block
  const body = element.querySelector('.column-container__body');
  if (!body) return;

  // Get all columns (direct children)
  const columns = Array.from(body.querySelectorAll(':scope > .column-container__column'));

  // For each column, flatten to its main content for resilience
  const contentRow = columns.map((col) => {
    // The visible content for each column is inside .styled-container (which holds a .cmp-container)
    const styled = col.querySelector('.styled-container');
    if (!styled) return '';
    const cmpContainer = styled.querySelector('.cmp-container');
    if (!cmpContainer) return '';

    // Gather all direct children that are not empty or irrelevant
    // Exclude empty newpar divs or pure separators
    const children = Array.from(cmpContainer.children).filter(child => {
      // Remove newpar placeholder divs or empty separators
      if (child.classList.contains('newpar')) return false;
      if (child.classList.contains('separator')) return false;
      // Otherwise keep
      return true;
    });
    if (children.length === 0) {
      return '';
    }
    // If only one, return it directly; otherwise, return as array
    return children.length === 1 ? children[0] : children;
  });

  // Compose the cells array for the block
  const cells = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element with the block
  element.replaceWith(block);
}
