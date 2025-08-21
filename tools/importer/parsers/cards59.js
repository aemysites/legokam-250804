/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as described
  const rows = [['Cards (cards59)']];

  // Find all direct card columns
  const columns = element.querySelectorAll(':scope .column-container__column');
  columns.forEach((col) => {
    // We only create rows for columns that have teaser blocks (cards)
    const teaser = col.querySelector('.teaser');
    if (!teaser) return;

    // IMAGE CELL: Find the image/icon (mandatory)
    let imageCell = '';
    const imageWrapper = teaser.querySelector('.cmp-teaser__image .cmp-image');
    if (imageWrapper) {
      const img = imageWrapper.querySelector('img');
      if (img) {
        imageCell = img;
      }
    }

    // TEXT CELL: Title and Description
    const textCell = document.createElement('div');
    // Title (optional, styled as heading)
    const title = teaser.querySelector('.cmp-teaser__title');
    if (title) {
      // Use the original heading element if present, or fall back to inner text
      let headingElement = null;
      if (title.tagName.match(/^H/i)) {
        headingElement = title;
      } else {
        // If not a heading, wrap text in <strong> for semantic emphasis (matches example's bold)
        headingElement = document.createElement('strong');
        // Use the inner text of a <div> if present, otherwise all text
        const titleDiv = title.querySelector('div');
        headingElement.textContent = titleDiv ? titleDiv.textContent.trim() : title.textContent.trim();
      }
      textCell.appendChild(headingElement);
    }

    // Description (optional)
    const desc = teaser.querySelector('.cmp-teaser__description');
    if (desc) {
      // Use the original element to preserve formatting
      // Remove leading/trailing <br>s and unnecessary whitespace
      // Only keep paragraphs with content
      const paragraphs = Array.from(desc.querySelectorAll('p')).filter(p => p.textContent.trim());
      paragraphs.forEach((p) => {
        // Avoid duplicating <strong> if title already present
        textCell.appendChild(p);
      });
    }

    // Push the card row
    rows.push([imageCell, textCell]);
  });

  // Replace original element with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
