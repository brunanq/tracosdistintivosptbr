document.addEventListener('DOMContentLoaded', () => {
  const phonemes = [
    { symbol: 'p', type: 'consonant', voiced: 'false', place: 'bilabial', manner: 'plosive' },
    { symbol: 'b', type: 'consonant', voiced: 'true', place: 'bilabial', manner: 'plosive' },
    { symbol: 't', type: 'consonant', voiced: 'false', place: 'alveolar', manner: 'plosive' },
    { symbol: 'd', type: 'consonant', voiced: 'true', place: 'alveolar', manner: 'plosive' },
    { symbol: 'k', type: 'consonant', voiced: 'false', place: 'velar', manner: 'plosive' },
    { symbol: 'g', type: 'consonant', voiced: 'true', place: 'velar', manner: 'plosive' },
    { symbol: 'm', type: 'consonant', voiced: 'true', place: 'bilabial', manner: 'nasal' },
    { symbol: 'n', type: 'consonant', voiced: 'true', place: 'alveolar', manner: 'nasal' },
    { symbol: 'r', type: 'consonant', voiced: 'true', place: 'alveolar', manner: 'trill' },
    { symbol: 'ɾ', type: 'consonant', voiced: 'true', place: 'alveolar', manner: 'tap' },
    { symbol: 'f', type: 'consonant', voiced: 'false', place: 'labiodental', manner: 'fricative' },
    { symbol: 'v', type: 'consonant', voiced: 'true', place: 'labiodental', manner: 'fricative' },
    { symbol: 's', type: 'consonant', voiced: 'false', place: 'alveolar', manner: 'fricative' },
    { symbol: 'z', type: 'consonant', voiced: 'true', place: 'alveolar', manner: 'fricative' },
    { symbol: 'tʃ', type: 'consonant', voiced: 'false', place: 'alveolopalatal', manner: 'affricate' },
    { symbol: 'dʒ', type: 'consonant', voiced: 'true', place: 'alveolopalatal', manner: 'affricate' },
    { symbol: 'ʃ', type: 'consonant', voiced: 'false', place: 'postalveolar', manner: 'fricative' },
    { symbol: 'ʒ', type: 'consonant', voiced: 'true', place: 'postalveolar', manner: 'fricative' },
    { symbol: 'x', type: 'consonant', voiced: 'false', place: 'velar', manner: 'fricative' },
    { symbol: 'ɣ', type: 'consonant', voiced: 'true', place: 'velar', manner: 'fricative' },
    { symbol: 'χ', type: 'consonant', voiced: 'false', place: 'uvular', manner: 'fricative' },
    { symbol: 'ʁ', type: 'consonant', voiced: 'true', place: 'uvular', manner: 'fricative' },
    { symbol: 'h', type: 'consonant', voiced: 'false', place: 'glottal', manner: 'fricative' },
    { symbol: 'ɦ', type: 'consonant', voiced: 'true', place: 'glottal', manner: 'fricative' },
    { symbol: 'ɹ', type: 'consonant', voiced: 'true', place: 'alveolar', manner: 'approximant' },
    { symbol: 'l', type: 'consonant', voiced: 'true', place: 'alveolar', manner: 'lateral' },
    { symbol: 'ʎ', type: 'consonant', voiced: 'true', place: 'palatal', manner: 'lateral' },
  ];

  const places = ['bilabial', 'labiodental', 'alveolar', 'postalveolar', 'alveolopalatal', 'palatal', 'velar', 'uvular', 'glottal'];
  const manners = ['plosive', 'nasal', 'trill', 'tap', 'fricative', 'affricate', 'approximant', 'lateral'];

  // Mapa consonantes (manner x place)
  const consonantMap = {};
  manners.forEach(manner => {
    consonantMap[manner] = {};
    places.forEach(place => {
      consonantMap[manner][place] = [];
    });
  });

  phonemes.forEach(p => {
    if (p.type === 'consonant') {
      if (consonantMap[p.manner] && consonantMap[p.manner][p.place]) {
        consonantMap[p.manner][p.place].push(p);
      }
    }
  });

  const tableContainer = document.getElementById('ipaGrid');
  tableContainer.innerHTML = '';

  // Cabeçalho com lugares de articulação
  const header = document.createElement('div');
  header.className = 'chart-header';
  header.innerHTML = `<div class="corner"></div>` + places.map(place => `<div class="place">${capitalize(place)}</div>`).join('');
  tableContainer.appendChild(header);

  // Linhas: cada manner + células com os símbolos dentro
  manners.forEach(manner => {
    const row = document.createElement('div');
    row.className = 'chart-row';

    const mannerCell = document.createElement('div');
    mannerCell.className = 'manner';
    mannerCell.textContent = capitalize(manner);
    row.appendChild(mannerCell);

    places.forEach(place => {
      const cell = document.createElement('div');
      cell.className = 'cell';

      consonantMap[manner][place].forEach(ph => {
        const span = document.createElement('span');
        span.className = 'ipa-symbol';
        span.textContent = ph.symbol;
        span.dataset.type = ph.type;
        span.dataset.voiced = ph.voiced;
        span.dataset.place = ph.place;
        span.dataset.manner = ph.manner;
        cell.appendChild(span);
        cell.appendChild(document.createElement('br'));
      });

      row.appendChild(cell);
    });

    tableContainer.appendChild(row);
  });

  // Filtros
  const typeFilter = document.getElementById('typeFilter');
  const consonantFilters = {
    voicing: document.getElementById('voicingFilter'),
    place: document.getElementById('placeFilter'),
    manner: document.getElementById('mannerFilter'),
  };
  const consonantDiv = document.getElementById('consonantFilters');
  const vowelDiv = document.getElementById('vowelFilters');

  function applyFilters() {
    const allSymbols = document.querySelectorAll('#ipaGrid .ipa-symbol');
    const selectedType = typeFilter.value;

    allSymbols.forEach(el => {
      el.classList.remove('match', 'no-match');
    });

    allSymbols.forEach(el => {
      let match = true;

      if (selectedType !== 'all' && el.dataset.type !== selectedType) {
        match = false;
      }

      if (el.dataset.type === 'consonant') {
        if (consonantFilters.voicing.value !== 'all' && el.dataset.voiced !== consonantFilters.voicing.value) {
          match = false;
        }
        if (consonantFilters.place.value !== 'all' && el.dataset.place !== consonantFilters.place.value) {
          match = false;
        }
        if (consonantFilters.manner.value !== 'all' && el.dataset.manner !== consonantFilters.manner.value) {
          match = false;
        }
      }

      if (match) {
        el.classList.add('match');
      } else {
        el.classList.add('no-match');
      }
    });
  }

  typeFilter.addEventListener('change', () => {
    const selected = typeFilter.value;
    consonantDiv.style.display = selected === 'consonant' ? 'flex' : 'none';
    vowelDiv.style.display = selected === 'vowel' ? 'flex' : 'none';
    applyFilters();
  });

  Object.values(consonantFilters).forEach(f =>
    f.addEventListener('change', applyFilters)
  );

  applyFilters();

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
