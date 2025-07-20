document.addEventListener('DOMContentLoaded', () => {
  const phonemes = [
    // Consoantes
    { symbol: 'p', type: 'consonant', voiced: false, place: 'bilabial', manner: 'plosive' },
    { symbol: 'b', type: 'consonant', voiced: true, place: 'bilabial', manner: 'plosive' },
    { symbol: 't', type: 'consonant', voiced: false, place: 'alveolar', manner: 'plosive' },
    { symbol: 'd', type: 'consonant', voiced: true, place: 'alveolar', manner: 'plosive' },
    { symbol: 'k', type: 'consonant', voiced: false, place: 'velar', manner: 'plosive' },
    { symbol: 'g', type: 'consonant', voiced: true, place: 'velar', manner: 'plosive' },
    { symbol: 'm', type: 'consonant', voiced: true, place: 'bilabial', manner: 'nasal' },
    { symbol: 'n', type: 'consonant', voiced: true, place: 'alveolar', manner: 'nasal' },
    { symbol: 'r', type: 'consonant', voiced: true, place: 'alveolar', manner: 'trill' },
    { symbol: 'ɾ', type: 'consonant', voiced: true, place: 'alveolar', manner: 'tap' },
    { symbol: 'f', type: 'consonant', voiced: false, place: 'labiodental', manner: 'fricative' },
    { symbol: 'v', type: 'consonant', voiced: true, place: 'labiodental', manner: 'fricative' },
    { symbol: 's', type: 'consonant', voiced: false, place: 'alveolar', manner: 'fricative' },
    { symbol: 'z', type: 'consonant', voiced: true, place: 'alveolar', manner: 'fricative' },
    { symbol: 'tʃ', type: 'consonant', voiced: false, place: 'alveolopalatal', manner: 'affricate' },
    { symbol: 'dʒ', type: 'consonant', voiced: true, place: 'alveolopalatal', manner: 'affricate' },
    { symbol: 'ʃ', type: 'consonant', voiced: false, place: 'postalveolar', manner: 'fricative' },
    { symbol: 'ʒ', type: 'consonant', voiced: true, place: 'postalveolar', manner: 'fricative' },
    { symbol: 'x', type: 'consonant', voiced: false, place: 'velar', manner: 'fricative' },
    { symbol: 'ɣ', type: 'consonant', voiced: true, place: 'velar', manner: 'fricative' },
    { symbol: 'χ', type: 'consonant', voiced: false, place: 'uvular', manner: 'fricative' },
    { symbol: 'ʁ', type: 'consonant', voiced: true, place: 'uvular', manner: 'fricative' },
    { symbol: 'h', type: 'consonant', voiced: false, place: 'glottal', manner: 'fricative' },
    { symbol: 'ɦ', type: 'consonant', voiced: true, place: 'glottal', manner: 'fricative' },
    { symbol: 'ɹ', type: 'consonant', voiced: true, place: 'alveolar', manner: 'approximant' },
    { symbol: 'l', type: 'consonant', voiced: true, place: 'alveolar', manner: 'lateral' },
    { symbol: 'ʎ', type: 'consonant', voiced: true, place: 'palatal', manner: 'lateral' },

    // Vogais (para o filtro funcionar)
    { symbol: 'i', type: 'vowel', height: 'high', backness: 'front', rounded: false },
    { symbol: 'u', type: 'vowel', height: 'high', backness: 'back', rounded: true },
    { symbol: 'e', type: 'vowel', height: 'mid', backness: 'front', rounded: false },
    { symbol: 'o', type: 'vowel', height: 'mid', backness: 'back', rounded: true },
    { symbol: 'ɛ', type: 'vowel', height: 'low', backness: 'front', rounded: false },
    { symbol: 'a', type: 'vowel', height: 'low', backness: 'back', rounded: false },
    { symbol: 'ɔ', type: 'vowel', height: 'low', backness: 'back', rounded: true },
  ];

  // Lugares e modos que aparecem na tabela
  const places = ['bilabial', 'labiodental', 'alveolar', 'postalveolar', 'alveolopalatal', 'palatal', 'velar', 'uvular', 'glottal'];
  const manners = ['plosive', 'nasal', 'trill', 'tap', 'fricative', 'affricate', 'approximant', 'lateral'];

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Agrupar consoantes por manner x place para tabela
  const consonants = phonemes.filter(p => p.type === 'consonant');
  const consonantMap = {};
  manners.forEach(manner => {
    consonantMap[manner] = {};
    places.forEach(place => {
      consonantMap[manner][place] = [];
    });
  });
  consonants.forEach(p => {
    if (consonantMap[p.manner] && consonantMap[p.manner][p.place]) {
      consonantMap[p.manner][p.place].push(p.symbol);
    }
  });

  // Montar tabela simples
  const tableContainer = document.getElementById('consonantTableContainer');
  const table = document.createElement('div');
  table.className = 'consonant-chart';

  const header = document.createElement('div');
  header.className = 'chart-header';
  header.innerHTML = `<div class="corner"></div>` + places.map(place => `<div class="place">${capitalize(place)}</div>`).join('');
  table.appendChild(header);

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
      cell.innerHTML = consonantMap[manner][place].join('<br>') || '';
      row.appendChild(cell);
    });

    table.appendChild(row);
  });

  tableContainer.appendChild(table);

  // Grid de todos os fonemas para filtro visual
  const grid = document.getElementById('ipaGrid');

  // Referências filtros
  const typeFilter = document.getElementById('typeFilter');
  const consonantFilters = {
    voicing: document.getElementById('voicingFilter'),
    place: document.getElementById('placeFilter'),
    manner: document.getElementById('mannerFilter'),
  };
  const vowelFilters = {
    height: document.getElementById('heightFilter'),
    backness: document.getElementById('backnessFilter'),
    rounded: document.getElementById('roundedFilter'),
  };
  const consonantDiv = document.getElementById('consonantFilters');
  const vowelDiv = document.getElementById('vowelFilters');

  // Renderiza grid simples com todos os fonemas
  function renderGrid() {
    grid.innerHTML = '';
    phonemes.forEach(ph => {
      const div = document.createElement('div');
      div.classList.add('ipa-symbol');
      div.textContent = ph.symbol;
      div.dataset.type = ph.type;
      grid.appendChild(div);
    });
    applyFilters();
  }

  // Aplica filtros: apenas destaca os que batem com o filtro
  function applyFilters() {
    const allSymbols = document.querySelectorAll('.ipa-symbol');
    const selectedType = typeFilter.value;

    allSymbols.forEach(el => el.classList.remove('match'));

    phonemes.forEach((ph, i) => {
      let match = true;

      if (selectedType !== 'all' && ph.type !== selectedType) match = false;

      if (ph.type === 'consonant') {
        if (consonantFilters.voicing.value !== 'all' && String(ph.voiced) !== consonantFilters.voicing.value) match = false;
        if (consonantFilters.place.value !== 'all' && ph.place !== consonantFilters.place.value) match = false;
        if (consonantFilters.manner.value !== 'all' && ph.manner !== consonantFilters.manner.value) match = false;
      }

      if (ph.type === 'vowel') {
        if (vowelFilters.height.value !== 'all' && ph.height !== vowelFilters.height.value) match = false;
        if (vowelFilters.backness.value !== 'all' && ph.backness !== vowelFilters.backness.value) match = false;
        if (vowelFilters.rounded.value !== 'all' && String(ph.rounded) !== vowelFilters.rounded.value) match = false;
      }

      if (match) {
        grid.children[i].classList.add('match');
      }
    });
  }

  // Atualiza visibilidade dos filtros dependendo do tipo
  typeFilter.addEventListener('change', () => {
    const selected = typeFilter.value;
    consonantDiv.style.display = selected === 'consonant' ? 'flex' : 'none';
    vowelDiv.style.display = selected === 'vowel' ? 'flex' : 'none';
    applyFilters();
  });

  // Adiciona evento para aplicar filtros quando mudam
  [...Object.values(consonantFilters), ...Object.values(vowelFilters)].forEach(filter => {
    filter.addEventListener('change', applyFilters);
  });

  // Inicia a renderização
  renderGrid();
});
