/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row
  const headerRow = ['Cards (cardsNoImages14)'];
  const rows = [headerRow];

  // Select all columns for the cards
  const cardColumns = element.querySelectorAll(':scope .column-container__column');
  cardColumns.forEach((col) => {
    // Look for a styled container (the card content)
    const styledContainer = col.querySelector('.styled-container');
    if (!styledContainer) return; // Skip empty columns or placeholders
    const cmpContainer = styledContainer.querySelector('.cmp-container');
    if (!cmpContainer || cmpContainer.childElementCount === 0) return; // Skip empty cards

    // The text content is typically the child of cmp-container
    let cardContent = null;
    // Try to find .cmp-text (actual card content)
    cardContent = cmpContainer.querySelector('.cmp-text');
    // Fallback: if no .cmp-text but cmp-container has children, use inner part
    if (!cardContent && cmpContainer.children.length > 0) {
      cardContent = cmpContainer.children[0];
    }
    // Only add non-empty content
    if (cardContent && (cardContent.textContent.trim() !== '' || cardContent.querySelector('a, h1, h2, h3, h4, h5, h6, p'))) {
      rows.push([cardContent]);
    }
  });

  // Create and replace with the structured table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
