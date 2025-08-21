/* global WebImporter */
export default function parse(element, { document }) {
  // Find the table inside the source
  // The required block structure is: one table, with the header 'Table (striped)',
  // and all tabular content (the table) as a single cell in the second row

  // Find the .table-text block that contains the <table>
  let tableText = element.querySelector('.table-text');
  if (!tableText) {
    // fallback: look for a table anywhere in the element
    tableText = element.querySelector('table')?.parentElement;
  }

  // Find the <table> itself
  let tableEl = null;
  if (tableText) {
    tableEl = tableText.querySelector('table');
  } else {
    tableEl = element.querySelector('table');
  }

  // If there's no table, do nothing
  if (!tableEl) return;

  // Make sure all associated text content (headings, instructions, etc.) is included
  // We'll look for any sibling .cmp-text blocks that are not the table itself and include their content above the table
  let tableContentParts = [];
  // 1. Any preceding .cmp-texts in the same parent as .table-text
  let contentContainer = tableText?.parentElement || element;
  let cmpTexts = Array.from(contentContainer.querySelectorAll('.cmp-text'));
  for (const cmp of cmpTexts) {
    // Only include blocks that are not the table itself
    if (cmp !== tableText.querySelector('.cmp-text') && cmp !== tableEl && cmp.innerText.trim() && !cmp.querySelector('table')) {
      tableContentParts.push(cmp);
    }
  }
  // If the tableText itself contains extra text nodes before/after the table, include them
  if (tableText) {
    for (const child of Array.from(tableText.childNodes)) {
      if (child.nodeType === Node.ELEMENT_NODE && child.tagName === 'TABLE') continue;
      if (child.nodeType === Node.TEXT_NODE && !child.textContent.trim()) continue;
      if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains('cmp-text')) continue;
      if (child.nodeType === Node.ELEMENT_NODE || child.nodeType === Node.TEXT_NODE) {
        tableContentParts.push(child);
      }
    }
  }

  // Now, add the table itself last
  tableContentParts.push(tableEl);

  // Compose the cells array
  const cells = [['Table (striped)'], [tableContentParts.length === 1 ? tableEl : tableContentParts]];

  // Replace the original element with the new block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
