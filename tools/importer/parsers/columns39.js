/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Columns (columns39)'];

  // The block organizes its columns in .column-container__column
  // Each .column-container__column may contain content in .cmp-container
  // Some of these have .text.section inside .cmp-text
  const columns = Array.from(element.querySelectorAll('.column-container__column'));

  // Prepare the columns: for each, reference the actual content element, or an empty string if blank
  const cells = columns.map((col) => {
    // Each column contains .styled-container > .cmp-container
    const container = col.querySelector('.cmp-container');
    if (!container || container.children.length === 0) {
      // If there's no content, produce an empty string
      return '';
    }
    // If there is a .cmp-text .text.section, that's the intended block content
    const textSection = container.querySelector('.cmp-text .text.section');
    if (textSection) {
      // Reference entire textSection element (contains img, text, formatting)
      return textSection;
    }
    // Otherwise, reference the container itself (may be empty or may contain other structure)
    return container;
  });

  // The block is one table: header row, content row, with N columns
  const tableData = [headerRow, cells];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
