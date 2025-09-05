/* global WebImporter */
export default function parse(element, { document }) {
  // Find the product list
  const productsList = element.querySelector('.products .list > ol');
  if (!productsList) return;

  // Table header row
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // For each product card (li)
  productsList.querySelectorAll(':scope > li').forEach((li) => {
    // Image cell: get the <picture> or <img> inside .picture
    let imageCell = null;
    const pictureDiv = li.querySelector('.picture');
    if (pictureDiv) {
      const pic = pictureDiv.querySelector('picture');
      if (pic) {
        imageCell = pic.cloneNode(true);
      } else {
        const img = pictureDiv.querySelector('img');
        if (img) imageCell = img.cloneNode(true);
      }
    }

    // Text cell: include all text content (title, description, price)
    const textCell = document.createElement('div');
    // Title
    const nameDiv = li.querySelector('.name');
    if (nameDiv && nameDiv.textContent.trim()) {
      const h3 = document.createElement('h3');
      h3.textContent = nameDiv.textContent.trim();
      textCell.appendChild(h3);
    }
    // Description
    const descDiv = li.querySelector('.description');
    if (descDiv && descDiv.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = descDiv.textContent.trim();
      textCell.appendChild(p);
    }
    // Price
    const priceDiv = li.querySelector('.price .price-final');
    if (priceDiv && priceDiv.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = priceDiv.textContent.trim();
      textCell.appendChild(strong);
    }

    // Add row: [image, text]
    rows.push([
      imageCell,
      textCell
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
