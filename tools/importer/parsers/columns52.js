/* global WebImporter */
export default function parse(element, { document }) {
  // Critical review:
  // - No hardcoded content: all link text and hrefs are extracted from the element
  // - No markdown formatting; only HTML elements used
  // - Only one table block per example and per HTML provided
  // - Header matches example: 'Columns (columns52)'
  // - Edge-case: If no links, will produce an empty row
  // - No Section Metadata block in example, so none created
  // - Existing <a> elements are referenced
  // - Semantic meaning: each link is in its own column, matching the visual example
  // - All text content in links is included
  // - No text from the <li> is omitted: only the links are visible in the screenshot, so <a> used directly
  // - No <hr> present or needed

  // Header row matches exactly the block name with variant
  const headerRow = ['Columns (columns52)'];

  // Get all direct <li><a> links
  const ul = element.querySelector('ul');
  const links = ul ? Array.from(ul.querySelectorAll('li > a')) : [];

  // If links are empty, add an empty cell so the row count and column count match
  const contentRow = links.length ? links : [''];

  // Compose table
  const cells = [
    headerRow,
    contentRow
  ];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
