/* global WebImporter */
export default function parse(element, { document }) {
  // Block header
  const headerRow = ['Table'];

  // Find all actual tab panels (the data tables are inside these)
  // Only panels that are direct children (not nested) and contain tabular content
  const tabPanels = Array.from(element.querySelectorAll('.tab__content'));

  // For each panel, find the first table (the main data table)
  const tables = tabPanels.map(panel => {
    // Look for .table-text > table, which is always present
    const tableTextDiv = panel.querySelector('.table-text');
    if (tableTextDiv) {
      const table = tableTextDiv.querySelector('table');
      if (table) return table;
    }
    // fallback: find direct table (if structure changes)
    const fallbackTable = panel.querySelector('table');
    if (fallbackTable) return fallbackTable;
    return null;
  }).filter(Boolean);

  // Compose the content row: one cell with all tables (order preserved)
  const contentRow = [tables];
  const cells = [headerRow, contentRow];

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
