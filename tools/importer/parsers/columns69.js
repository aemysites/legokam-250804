/* global WebImporter */
export default function parse(element, { document }) {
  // Find all columns in the block
  // Column structure: .column-container__column is the direct child of .column-container__body
  const body = element.querySelector('.column-container__body');
  const columns = body ? Array.from(body.children).filter(child => child.classList.contains('column-container__column')) : [];
  
  // If not found, fallback to all .column-container__column in case of structure variation
  const cols = columns.length > 0 ? columns : Array.from(element.querySelectorAll('.column-container__column'));

  // Extract the main content from each column
  // Strategy: Reference the deepest .cmp-container if present, else the column itself
  const contentCells = cols.map(col => {
    // Find the styled container (with .cmp-container)
    let cmp = col.querySelector('.cmp-container');
    if (cmp) {
      // If .cmp-container found, check if it has any meaningful content
      // (If it's empty, fallback to column itself)
      if (cmp.textContent.trim() || cmp.querySelector('img,a,button,ul,ol,h1,h2,h3,h4,h5,h6,p,span')) {
        return cmp;
      }
    }
    // If no .cmp-container or it's empty, fallback to column itself
    return col;
  }).filter(cell => {
    // Only keep meaningful cells (remove empty columns)
    if (!cell) return false;
    // Check for visible content
    return (
      cell.querySelector('h1,h2,h3,h4,h5,h6,p,ul,ol,img,a,button,span') ||
      (cell.textContent && cell.textContent.trim().length > 0)
    );
  });

  // Only build the block if we have meaningful columns
  if (contentCells.length > 0) {
    const headerRow = ['Columns (columns69)'];
    const blockTable = WebImporter.DOMUtils.createTable([
      headerRow,
      contentCells
    ], document);
    element.replaceWith(blockTable);
  }
}
