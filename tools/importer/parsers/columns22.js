/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner two column body (should always be present in these blocks)
  let twoColBody = null;
  const twoColCandidates = element.querySelectorAll('.column-container--two-col');
  for (const cand of twoColCandidates) {
    const body = cand.querySelector(':scope > .column-container__body');
    if (body) {
      twoColBody = body;
      break;
    }
  }
  if (!twoColBody) return;

  // Get the two columns
  const columns = Array.from(twoColBody.querySelectorAll(':scope > .column-container__column'));
  if (columns.length !== 2) return;

  function extractMainContent(col) {
    // Get the first .styled-container in this column
    let styled = col.querySelector(':scope > .styled-container');
    if (!styled) return null;
    // Get the .cmp-container within (if any), fallback to styled
    const cmp = styled.querySelector(':scope > .cmp-container');
    return cmp || styled;
  }

  const col1Content = extractMainContent(columns[0]);
  const col2Content = extractMainContent(columns[1]);

  // If content is missing, use empty string to avoid errors
  const cells = [
    ['Columns (columns22)'],
    [col1Content || '', col2Content || '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
