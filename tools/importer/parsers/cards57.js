/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name exactly as in instructions
  const rows = [['Cards (cards57)']];

  // 2. Find all card columns
  const columns = element.querySelectorAll('.column-container__column');
  columns.forEach((col) => {
    // The card (teaser)
    const teaser = col.querySelector('.teaser');
    if (!teaser) return;
    
    // IMAGE: always in .cmp-teaser__image img
    let img = null;
    const imgContainer = teaser.querySelector('.cmp-teaser__image');
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // If there's no image, fallback to empty string (resilient)
    
    // TEXT: build a fragment that preserves semantic structure
    // Use an existing element for the text cell, to preserve all child formatting
    const content = teaser.querySelector('.cmp-teaser__content');
    // Create a fragment to contain all text elements in order
    const frag = document.createDocumentFragment();
    if (content) {
      // Title: h3 or h4
      const heading = content.querySelector('h3, h4');
      if (heading) {
        frag.appendChild(heading);
      }
      // Description (may be multiple paragraphs)
      const desc = content.querySelector('.cmp-teaser__description');
      if (desc) {
        Array.from(desc.childNodes).forEach((n) => {
          // Avoid whitespace-only nodes
          if (n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim())) {
            frag.appendChild(n);
          }
        });
      }
      // Contact/breeds section (may include <ul>, <p>, etc.)
      const breeds = content.querySelector('.cmp-teaser__contact');
      if (breeds) {
        Array.from(breeds.childNodes).forEach((n) => {
          if (n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim())) {
            frag.appendChild(n);
          }
        });
      }
    }
    // 3. Add row: [img, fragment with all text content]
    rows.push([
      img ? img : '',
      frag
    ]);
  });

  // 4. Create the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
