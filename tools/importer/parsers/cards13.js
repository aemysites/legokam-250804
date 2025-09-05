/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Header row as required
  const headerRow = ['Cards (cards13)'];
  const rows = [headerRow];

  // Each <li> is a card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find image container and body container
    const imageDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');

    // Defensive: If either is missing, skip this card
    if (!imageDiv || !bodyDiv) return;

    // The image cell: use the whole imageDiv (contains <picture> and <img>)
    // The text cell: use the whole bodyDiv (contains <h5> title)
    rows.push([imageDiv, bodyDiv]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
