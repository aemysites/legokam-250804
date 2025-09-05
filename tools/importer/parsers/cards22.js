/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards block
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Get all card items
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Table header
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // For each card, extract image and text content
  cardItems.forEach((li) => {
    // Image cell: find the image container
    const imageContainer = li.querySelector('.cards-card-image');
    let imageCell = '';
    if (imageContainer) {
      // Use the <picture> element directly if present
      const picture = imageContainer.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        // Fallback: use the image itself
        const img = imageContainer.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Text cell: find the body container
    const bodyContainer = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyContainer) {
      // Use the whole body container for resilience
      textCell = bodyContainer;
    }

    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
