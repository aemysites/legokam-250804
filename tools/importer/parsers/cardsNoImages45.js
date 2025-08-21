/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as required
  const headerRow = ['Cards (cardsNoImages45)'];
  const cells = [headerRow];

  // Get all card columns in order
  const columns = element.querySelectorAll('.column-container__body > .column-container__column');
  columns.forEach((col) => {
    // Card content is inside .styled-container
    const cardContainer = col.querySelector('.styled-container');
    // The card's blocks are in .cmp-text inside .text.insurance-rte
    const textBlocks = cardContainer.querySelectorAll('.cmp-text');
    // Create a wrapper for all content in this card
    const cardContent = document.createElement('div');
    textBlocks.forEach((block) => {
      // Append all child nodes except empty p/span or those with only &nbsp;
      Array.from(block.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Skip empty paragraphs or spans
          if ((node.tagName === 'P' || node.tagName === 'SPAN') && (!node.textContent.trim() || node.innerHTML.trim() === '&nbsp;')) {
            return;
          }
          cardContent.appendChild(node); // Reference existing node (no clone)
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          cardContent.appendChild(node); // Reference text node
        }
      });
    });
    // Push the card as a new row, single column
    cells.push([cardContent]);
  });

  // Create and insert the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
