/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards87) block header
  const headerRow = ['Cards (cards87)'];
  const tableRows = [headerRow];
  // Find all immediate card columns
  const columns = Array.from(element.querySelectorAll(':scope .column-container__column'));
  columns.forEach((col) => {
    // Each column is expected to have a single card/teaser
    const teaser = col.querySelector('.teaser, .cmp-teaser');
    if (!teaser) return;

    // --- Image cell ---
    let imageCell = null;
    const imgContainer = teaser.querySelector('.cmp-teaser__image .cmp-image');
    if (imgContainer) {
      const img = imgContainer.querySelector('img');
      if (img) {
        imageCell = img;
      }
    }

    // --- Text cell: Heading, Description, CTA (as in example) ---
    const textCellParts = [];
    const content = teaser.querySelector('.cmp-teaser__content');
    if (content) {
      // Title (could be a heading or a div)
      const title = content.querySelector('.cmp-teaser__title');
      if (title) {
        // Some titles are in <div><h3>...</h3></div> or <div>...</div>
        let extractedTitle = null;
        // Try to find a heading (h1-h6) inside .cmp-teaser__title
        const heading = title.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          extractedTitle = heading;
        } else if (title.querySelector('div')) {
          extractedTitle = title.querySelector('div');
        } else {
          extractedTitle = title;
        }
        if (extractedTitle) textCellParts.push(extractedTitle);
      }
      // Description (could include paragraphs, lists, etc)
      const desc = content.querySelector('.cmp-teaser__description');
      if (desc) textCellParts.push(desc);
      // CTA (the primary action button, if present)
      const actionContainer = content.querySelector('.cmp-teaser__action-container');
      if (actionContainer) {
        // Only include the first link for the CTA (as in example)
        const cta = actionContainer.querySelector('a');
        if (cta) textCellParts.push(cta);
      }
    }
    // Add the card row: image left, text right (as per spec)
    tableRows.push([
      imageCell,
      textCellParts
    ]);
  });
  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
