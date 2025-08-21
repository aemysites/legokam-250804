/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all teaser elements in correct order
  const cardTeasers = Array.from(element.querySelectorAll('.cmp-teaser'));
  const rows = [];
  // Header row, exact match to spec
  rows.push(['Cards (cards79)']);
  // Build each card row
  cardTeasers.forEach((teaser) => {
    // --- Image/Icon ---
    let imgElem = null;
    const imageContainer = teaser.querySelector('.cmp-teaser__image');
    if (imageContainer) {
      imgElem = imageContainer.querySelector('img');
    }
    // --- Text (Title, Description, CTA, preserve heading, lists, links) ---
    const textCell = document.createElement('div');
    const contentContainer = teaser.querySelector('.cmp-teaser__content');
    if (contentContainer) {
      // Title: .cmp-teaser__title may be h3 or h4, with text or a child <div>
      let titleElem = contentContainer.querySelector('.cmp-teaser__title');
      if (titleElem && titleElem.textContent.trim()) {
        // Prefer to preserve heading structure (h3/h4 and children)
        if (titleElem.tagName.toLowerCase() === 'h3' || titleElem.tagName.toLowerCase() === 'h4') {
          textCell.appendChild(titleElem);
        } else if (titleElem.firstElementChild && (titleElem.firstElementChild.tagName.toLowerCase() === 'div')) {
          // e.g. <h3><div>Title</div></h3> → append h3 as is
          textCell.appendChild(titleElem);
        } else {
          textCell.appendChild(titleElem);
        }
      }
      // Description: find .cmp-teaser__description (may have h4, ul, li, links)
      const descElem = contentContainer.querySelector('.cmp-teaser__description');
      if (descElem) {
        // If it's a <h4> only, append h4; if <ul>, append ul; else, append all children or text
        const h4 = descElem.querySelector('h4');
        const ul = descElem.querySelector('ul');
        if (h4) {
          textCell.appendChild(h4);
        } else if (ul) {
          textCell.appendChild(ul);
        } else {
          // Append all children or description as is
          Array.from(descElem.childNodes).forEach((n) => textCell.appendChild(n));
        }
      }
    }
    // Add row: [image, textCell]
    rows.push([
      imgElem,
      textCell
    ]);
  });
  // Create block table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
