const consonants = [
  { symbol: 'p', voicing: false, place: 'bilabial', manner: 'plosive', type: 'consonant' },
  { symbol: 'b', voicing: true, place: 'bilabial', manner: 'plosive', type: 'consonant' },
  { symbol: 'm', voicing: true, place: 'bilabial', manner: 'nasal', type: 'consonant' },
  { symbol: 't', voicing: false, place: 'alveolar', manner: 'plosive', type: 'consonant' },
  { symbol: 'd', voicing: true, place: 'alveolar', manner: 'plosive', type: 'consonant' },
  { symbol: 'n', voicing: true, place: 'alveolar', manner: 'nasal', type: 'consonant' },
  { symbol: 's', voicing: false, place: 'alveolar', manner: 'fricative', type: 'consonant' },
  { symbol: 'z', voicing: true, place: 'alveolar', manner: 'fricative', type: 'consonant' },
  { symbol: 'k', voicing: false, place: 'velar', manner: 'plosive', type: 'consonant' },
  { symbol: 'g', voicing: true, place: 'velar', manner: 'plosive', type: 'consonant' },
  { symbol: 'ŋ', voicing: true, place: 'velar', manner: 'nasal', type: 'consonant' },
];

const manners = ['plosive', 'nasal', 'fricative'];
const places = ['bilabial', 'alveolar', 'velar'];

function renderTable() {
  const table = document.createElement('table');
  table.className = 'consonant-chart';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  const cornerCell = document.createElement('th');
  cornerCell.className = 'corner';
  cornerCell.textContent = '';
  headerRow.appendChild(cornerCell);

  for (const place of places) {
    const th = document.createElement('th');
    th.className = 'place';
    th.textContent = place;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  for (const manner of manners) {
    const row = document.createElement('tr');

    const mannerCell = document.createElement('td');
    mannerCell.className = 'manner';
    mannerCell.textContent = manner;
    row.appendChild(mannerCell);

    for (const place of places) {
      const td = document.createElement('td');
      td.className = 'cell';

      const matching = consonants.filter(
        c => c.place === place && c.manner === manner
      );

      for (const consonant of matching) {
        const span = document.createElement('span');
        span.textContent = consonant.symbol;
        span.className = 'ipa-symbol';
        span.dataset.voicing = consonant.voicing;
        span.dataset.place = consonant.place;
        span.dataset.manner = consonant.manner;
        td.appendChild(span);
      }

      row.appendChild(td);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  const container = document.getElementById('ipaGrid');
  container.innerHTML = '';
  container.appendChild(table);
}

function applyFilters() {
  const voicing = document.getElementById('voicingFilter').value;
  const place = document.getElementById('placeFilter').value;
  const manner = document.getElementById('mannerFilter').value;

  const symbols = document.querySelectorAll('.ipa-symbol');
  symbols.forEach(symbol => {
    const matches =
      (voicing === 'all' || symbol.dataset.voicing === voicing) &&
      (place === 'all' || symbol.dataset.place === place) &&
      (manner === 'all' || symbol.dataset.manner === manner);

    symbol.classList.toggle('match', matches);
  });
}

function setupFilters() {
  document.getElementById('typeFilter').addEventListener('change', e => {
    const type = e.target.value;
    document.getElementById('consonantFilters').style.display =
      type === 'consonant' ? 'block' : 'none';
  });

  document.querySelectorAll('.filters select').forEach(select => {
    select.addEventListener('change', applyFilters);
  });
}

renderTable();
setupFilters();
applyFilters();
