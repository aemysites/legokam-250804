/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the .cards.block inside the provided element
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Get all <li> (each card)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Header row as required
  const headerRow = ['Cards (cards16)'];
  const rows = [headerRow];

  cardItems.forEach((li) => {
    // Image cell: find the .cards-card-image and use its content (usually <picture>)
    const imageContainer = li.querySelector('.cards-card-image');
    let imageCell = '';
    if (imageContainer) {
      // Use the <picture> or <img> directly
      const picture = imageContainer.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imageContainer.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Text cell: get the .cards-card-body and use its children
    const body = li.querySelector('.cards-card-body');
    let textCell = '';
    if (body) {
      // We'll collect the heading, price, and button (if present)
      const fragments = [];
      // Heading
      const heading = body.querySelector('h5, h4, h3, h2, h1');
      if (heading) fragments.push(heading);
      // Price/description (the first <p> that is NOT the button container)
      const paragraphs = body.querySelectorAll('p');
      paragraphs.forEach((p) => {
        if (!p.classList.contains('button-container')) {
          fragments.push(p);
        }
      });
      // Button (inside <p class="button-container">)
      const buttonContainer = body.querySelector('p.button-container');
      if (buttonContainer) {
        // Use the <a> inside
        const btn = buttonContainer.querySelector('a');
        if (btn) fragments.push(buttonContainer);
      }
      textCell = fragments;
    }

    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
