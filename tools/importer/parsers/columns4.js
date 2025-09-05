/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the default content and columns wrapper
  const defaultContent = element.querySelector('.default-content-wrapper');
  const columnsWrapper = element.querySelector('.columns-wrapper');
  let columnsBlock;
  if (columnsWrapper) {
    columnsBlock = columnsWrapper.querySelector('.columns.block');
  }

  // Defensive: fallback if columnsBlock is not found
  let columnsInner;
  if (columnsBlock) {
    // The first child of columnsBlock is a <div> containing all columns
    columnsInner = columnsBlock.querySelector(':scope > div');
  }

  // Get all column <div>s (each contains a heading and a list)
  let columnDivs = [];
  if (columnsInner) {
    columnDivs = Array.from(columnsInner.children);
  }

  // Compose the header row
  const headerRow = ['Columns (columns4)'];

  // Compose the content row
  // First cell: the default content (logo, address, etc)
  // Next cells: each column's content
  const rowCells = [];
  if (defaultContent) {
    rowCells.push(defaultContent);
  } else {
    // fallback: empty cell
    rowCells.push('');
  }
  // Add each column div as a cell
  if (columnDivs.length > 0) {
    columnDivs.forEach((col) => {
      rowCells.push(col);
    });
  }

  // Compose the table data
  const cells = [headerRow, rowCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
