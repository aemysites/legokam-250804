/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards32) block table
  const headerRow = ['Cards (cards32)'];
  const cells = [headerRow];

  // Collect all columns representing cards
  const columns = element.querySelectorAll('.column-container__column');
  columns.forEach((col) => {
    // Find teaser/card
    const teaser = col.querySelector('.cmp-teaser, .teaser');
    if (!teaser) return;

    // Get the image for the card
    let img = null;
    const imgContainer = teaser.querySelector('.cmp-teaser__image img');
    if (imgContainer) {
      img = imgContainer;
    }

    // Assemble the content cell (title and CTA link)
    const teaserContent = teaser.querySelector('.cmp-teaser__content');
    const contentParts = [];
    if (teaserContent) {
      // Title (keep exact HTML structure)
      const title = teaserContent.querySelector('.cmp-teaser__title');
      if (title) contentParts.push(title);
      // CTA link
      const actionLink = teaserContent.querySelector('.cmp-teaser__action-link');
      if (actionLink) {
        // Always reference the existing element from the DOM
        const ctaDiv = document.createElement('div');
        ctaDiv.appendChild(actionLink);
        contentParts.push(ctaDiv);
      }
    }

    // Add the row to the cells array
    cells.push([
      img,
      contentParts
    ]);
  });

  // Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
