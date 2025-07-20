const consonants = [
  { symbol: 'p', voicing: false, place: 'bilabial', manner: 'plosive' },
  { symbol: 'b', voicing: true, place: 'bilabial', manner: 'plosive' },
  { symbol: 't', voicing: false, place: 'alveolar', manner: 'plosive' },
  { symbol: 'd', voicing: true, place: 'alveolar', manner: 'plosive' },
  { symbol: 'k', voicing: false, place: 'velar', manner: 'plosive' },
  { symbol: 'g', voicing: true, place: 'velar', manner: 'plosive' },
  { symbol: 'm', voicing: true, place: 'bilabial', manner: 'nasal' },
  { symbol: 'n', voicing: true, place: 'alveolar', manner: 'nasal' },
  { symbol: 'ŋ', voicing: true, place: 'velar', manner: 'nasal' },
  { symbol: 'f', voicing: false, place: 'bilabial', manner: 'fricative' },
  { symbol: 'v', voicing: true, place: 'bilabial', manner: 'fricative' },
  { symbol: 's', voicing: false, place: 'alveolar', manner: 'fricative' },
  { symbol: 'z', voicing: true, place: 'alveolar', manner: 'fricative' },
  { symbol: 'x', voicing: false, place: 'velar', manner: 'fricative' },
  { symbol: 'ɣ', voicing: true, place: 'velar', manner: 'fricative' },
];

const places = ['bilabial', 'alveolar', 'velar'];
const manners = ['plosive', 'nasal', 'fricative'];

const typeFilter = document.getElementById('typeFilter');
const voicingFilter = document.getElementById('voicingFilter');
const placeFilter = document.getElementById('placeFilter');
const mannerFilter = document.getElementById('mannerFilter');

function buildConsonantChart() {
  const chart = document.createElement('div');
  chart.className = 'consonant-chart';

  // Cabeçalho com lugares
  const headerRow = document.createElement('div');
  headerRow.className = 'chart-header';

  const corner = document.createElement('div');
  corner.className = 'corner';
  headerRow.appendChild(corner);

  for (const place of places) {
    const th = document.createElement('div');
    th.className = 'place';
    th.textContent = place.charAt(0).toUpperCase() + place.slice(1);
    headerRow.appendChild(th);
  }

  chart.appendChild(headerRow);

  // Linhas por modo de articulação
  for (const manner of manners) {
    const row = document.createElement('div');
    row.className = 'chart-row';

    const mannerCell = document.createElement('div');
    mannerCell.className = 'manner';
    mannerCell.textContent = manner.charAt(0).toUpperCase() + manner.slice(1);
    row.appendChild(mannerCell);

    for (const place of places) {
      const cell = document.createElement('div');
      cell.className = 'cell';

      const matches = consonants.filter(c => c.place === place && c.manner === manner);

      for (const match of matches) {
        const span = document.createElement('div');
        span.className = 'ipa-symbol';
        span.textContent = match.symbol;
        span.dataset.voicing = match.voicing;
        span.dataset.place = match.place;
        span.dataset.manner = match.manner;
        cell.appendChild(span);
      }

      row.appendChild(cell);
    }

    chart.appendChild(row);
  }

  return chart;
}

function applyFilters() {
  const type = typeFilter.value;
  const voicing = voicingFilter.value;
  const place = placeFilter.value;
  const manner = mannerFilter.value;

  const symbols = document.querySelectorAll('.ipa-symbol');

  symbols.forEach(symbol => {
    const symbolVoicing = symbol.dataset.voicing;
    const symbolPlace = symbol.dataset.place;
    const symbolManner = symbol.dataset.manner;

    const matchesVoicing = voicing === 'all' || symbolVoicing === voicing;
    const matchesPlace = place === 'all' || symbolPlace === place;
    const matchesManner = manner === 'all' || symbolManner === manner;

    if (matchesVoicing && matchesPlace && matchesManner) {
      symbol.classList.add('match');
      symbol.classList.remove('no-match');
    } else {
      symbol.classList.remove('match');
      symbol.classList.add('no-match');
    }
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('ipaGrid');
  grid.innerHTML = '';
  grid.appendChild(buildConsonantChart());
  applyFilters();

  // Listeners
  [voicingFilter, placeFilter, mannerFilter].forEach(filter =>
    filter.addEventListener('change', applyFilters)
  );
});
