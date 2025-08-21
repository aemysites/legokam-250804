/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct columns
  function getColumnElements(root) {
    return Array.from(root.querySelectorAll(':scope > .column-container__column'));
  }

  // Identify columns
  let body = element.querySelector('.column-container__body');
  if (!body) body = element;
  const columns = getColumnElements(body);
  const rows = [['Cards (cards50)']]; // header

  columns.forEach(col => {
    // IMAGE: get first <img> in this column
    const img = col.querySelector('img');

    // TITLE: get .cmp-link__anchor > .cmp-image__title
    let titleLink = col.querySelector('.cmp-link__anchor');
    let titleSpan = titleLink ? titleLink.querySelector('.cmp-image__title') : null;
    let title = '';
    let href = '';
    if (titleSpan) {
      title = titleSpan.textContent.trim();
      href = titleLink.getAttribute('href') || '';
    }
    // fallback
    if (!title && titleLink) {
      title = titleLink.textContent.trim();
      href = titleLink.getAttribute('href') || '';
    }

    // DESCRIPTION: robustly get any text that is not part of the title or link
    // 1. Look for <p> tags within column
    let descriptionFragments = [];
    const ps = Array.from(col.querySelectorAll('p'));
    ps.forEach(p => {
      if (p.textContent.trim()) descriptionFragments.push(p.textContent.trim());
    });
    // 2. If no <p>, look for other non-link, non-img text below the link
    if (descriptionFragments.length === 0 && titleLink) {
      // Get all siblings after the link's parent (usually .cmp-link)
      let linkDiv = titleLink.closest('.cmp-link');
      if (linkDiv) {
        let found = false;
        for (let child of linkDiv.parentNode.childNodes) {
          if (found) {
            if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
              descriptionFragments.push(child.textContent.trim());
            } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'A' && child.tagName !== 'IMG') {
              if (child.textContent.trim()) descriptionFragments.push(child.textContent.trim());
            }
          }
          if (child === linkDiv) found = true;
        }
      }
    }

    // Compose cell: title (strong in link), then description below if present
    const textCellContent = [];
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title;
      if (href) {
        const a = document.createElement('a');
        a.href = href;
        a.appendChild(strong);
        textCellContent.push(a);
      } else {
        textCellContent.push(strong);
      }
    }
    if (descriptionFragments.length) {
      descriptionFragments.forEach(txt => {
        const p = document.createElement('p');
        p.textContent = txt;
        textCellContent.push(p);
      });
    }
    rows.push([
      img,
      textCellContent.length === 1 ? textCellContent[0] : textCellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
