/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the .background and .foreground containers
  const backgroundDiv = element.querySelector('.background');
  let backgroundContent = null;
  if (backgroundDiv) {
    // Use the entire background div (contains <picture> and <img>)
    backgroundContent = backgroundDiv;
  }

  // Foreground: contains .text (title, description, cta)
  const foregroundDiv = element.querySelector('.foreground');
  let foregroundContent = null;
  if (foregroundDiv) {
    // Use the entire foreground div (contains .text, which has title, desc, cta)
    foregroundContent = foregroundDiv;
  }

  // Build the table rows
  const headerRow = ['Hero (hero18)'];
  const backgroundRow = [backgroundContent];
  const contentRow = [foregroundContent];

  const cells = [headerRow, backgroundRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
