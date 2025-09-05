/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the product list container
  const productsContainer = element.querySelector('.products .list ol');
  if (!productsContainer) return;

  // Table header row
  const headerRow = ['Cards (cards21)'];
  const rows = [headerRow];

  // Get all product list items
  const productItems = productsContainer.querySelectorAll(':scope > li');
  productItems.forEach((li) => {
    // --- Image cell ---
    // Find the product image (picture inside .picture)
    const pictureDiv = li.querySelector('.picture');
    let pictureEl = null;
    if (pictureDiv) {
      const picture = pictureDiv.querySelector('picture');
      if (picture) {
        pictureEl = picture.cloneNode(true);
      }
    }

    // --- Text cell ---
    // Title (from .name > a)
    const nameDiv = li.querySelector('.name');
    let titleText = '';
    if (nameDiv) {
      const nameLink = nameDiv.querySelector('a');
      if (nameLink) {
        titleText = nameLink.textContent.trim();
      }
    }

    // Description (from .description > a)
    const descDiv = li.querySelector('.description');
    let descText = '';
    if (descDiv) {
      const descLink = descDiv.querySelector('a');
      if (descLink) {
        descText = descLink.textContent.trim();
      }
    }

    // Price (from .price .price-final)
    const priceDiv = li.querySelector('.price .price-final');
    let priceText = '';
    if (priceDiv) {
      priceText = priceDiv.textContent.trim();
    }

    // Compose the text cell as a single block of HTML to ensure all text is included
    const textCell = document.createElement('div');
    if (titleText) {
      const titleEl = document.createElement('p');
      titleEl.innerHTML = `<strong>${titleText}</strong>`;
      textCell.appendChild(titleEl);
    }
    if (descText) {
      const descEl = document.createElement('p');
      descEl.textContent = descText;
      textCell.appendChild(descEl);
    }
    if (priceText) {
      const priceEl = document.createElement('p');
      priceEl.innerHTML = `<strong>${priceText}</strong>`;
      textCell.appendChild(priceEl);
    }

    // Add row: [image, text]
    rows.push([
      pictureEl,
      textCell.childNodes.length ? Array.from(textCell.childNodes) : ''
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
