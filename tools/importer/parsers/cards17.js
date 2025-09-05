/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards block (could be nested)
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Get all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Table header
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // For each card, extract image and text content
  cardItems.forEach((li) => {
    // Defensive: find image container
    const imgContainer = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imgContainer) {
      // Use the <picture> element directly if present
      const picture = imgContainer.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        // Fallback: use first img
        const img = imgContainer.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Defensive: find body container
    const bodyContainer = li.querySelector('.cards-card-body');
    let textContent = [];
    if (bodyContainer) {
      // Title: h3 or h4 (allow for variations)
      const heading = bodyContainer.querySelector('h3, h4, h2, h1');
      if (heading) textContent.push(heading);

      // Description: all <p> except button-container
      const paragraphs = bodyContainer.querySelectorAll('p:not(.button-container)');
      paragraphs.forEach((p) => textContent.push(p));

      // CTA: <p class="button-container"> (may contain <a>)
      const buttonContainer = bodyContainer.querySelector('p.button-container');
      if (buttonContainer) textContent.push(buttonContainer);
    }

    // Add row: [image, textContent]
    rows.push([
      imageEl,
      textContent
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
