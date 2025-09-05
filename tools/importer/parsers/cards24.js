/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the product list block
  const productsBlock = element.querySelector('.product-list-page-custom.block');
  if (!productsBlock) return;

  // Find the products list
  const productsList = productsBlock.querySelector('.products .list ol');
  if (!productsList) return;

  // Table header
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // For each product card (li)
  productsList.querySelectorAll(':scope > li').forEach((li) => {
    // Image cell: find the <picture> inside .picture
    let imageCell = '';
    const pictureDiv = li.querySelector('.picture');
    if (pictureDiv) {
      const picture = pictureDiv.querySelector('picture');
      if (picture) imageCell = picture.cloneNode(true);
    }

    // Text cell: build a fragment with title, description, price
    const textCellParts = [];
    // Title (name)
    const nameDiv = li.querySelector('.name');
    if (nameDiv) {
      const nameLink = nameDiv.querySelector('a');
      if (nameLink) {
        const h3 = document.createElement('h3');
        h3.textContent = nameLink.textContent.trim();
        textCellParts.push(h3);
      }
    }
    // Description
    const descDiv = li.querySelector('.description');
    if (descDiv) {
      const descLink = descDiv.querySelector('a');
      if (descLink) {
        const p = document.createElement('p');
        p.textContent = descLink.textContent.trim();
        textCellParts.push(p);
      }
    }
    // Price
    const priceDiv = li.querySelector('.price .price-final');
    if (priceDiv) {
      const priceP = document.createElement('p');
      priceP.innerHTML = `<strong>${priceDiv.textContent.trim()}</strong>`;
      textCellParts.push(priceP);
    }

    // Ensure all text content is included even if not wrapped in <a>
    // (e.g., fallback for missing links)
    if (!nameDiv && li.querySelector('.name')) {
      const h3 = document.createElement('h3');
      h3.textContent = li.querySelector('.name').textContent.trim();
      textCellParts.push(h3);
    }
    if (!descDiv && li.querySelector('.description')) {
      const p = document.createElement('p');
      p.textContent = li.querySelector('.description').textContent.trim();
      textCellParts.push(p);
    }

    rows.push([imageCell, textCellParts]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original block element
  productsBlock.replaceWith(block);
}
