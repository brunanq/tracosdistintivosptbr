document.addEventListener('DOMContentLoaded', () => {
  const phonemes = [
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
    { symbol: 'ʎ', type: 'consonant', voiced: true, place: 'palatal', manner: 'lateral' }
  ];

  const places = ['bilabial', 'labiodental', 'alveolar', 'postalveolar', 'alveolopalatal', 'palatal', 'velar', 'uvular', 'glottal'];
  const manners = ['plosive', 'nasal', 'trill', 'tap', 'fricative', 'affricate', 'approximant', 'lateral'];

  // Helper para capitalizar o rótulo
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Cria estrutura para agrupar os fonemas na tabela
  const consonantMap = {};
  manners.forEach(manner => {
    consonantMap[manner] = {};
    places.forEach(place => {
      consonantMap[manner][place] = [];
    });
  });

  phonemes.forEach(p => {
    if (p.type === 'consonant' && consonantMap[p.manner] && consonantMap[p.manner][p.place]) {
      consonantMap[p.manner][p.place].push(p);
    }
  });

  // Referências aos elementos do DOM
  const tableContainer = document.getElementById('ipaGrid');
  const typeFilter = document.getElementById('typeFilter');
  const voicingFilter = document.getElementById('voicingFilter');
  const placeFilter = document.getElementById('placeFilter');
  const mannerFilter = document.getElementById('mannerFilter');

  // Cria a tabela
  function createTable() {
    tableContainer.innerHTML = ''; // limpa antes

    const table = document.createElement('div');
    table.className = 'consonant-chart';

    // Cabeçalho colunas - lugares
    const header = document.createElement('div');
    header.className = 'chart-header';

    const cornerCell = document.createElement('div');
    cornerCell.className = 'corner';
    cornerCell.textContent = '';
    header.appendChild(cornerCell);

    places.forEach(place => {
      const placeCell = document.createElement('div');
      placeCell.className = 'place';
      placeCell.textContent = capitalize(place);
      header.appendChild(placeCell);
    });

    table.appendChild(header);

    // Linhas - modos
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

        // Insere os fonemas nessa célula (cada símbolo dentro de uma span)
        const phonemesInCell = consonantMap[manner][place];
        phonemesInCell.forEach(ph => {
          const span = document.createElement('span');
          span.textContent = ph.symbol;
          span.classList.add('ipa-symbol');
          // Armazena propriedades para filtro
          span.dataset.voiced = ph.voiced;
          span.dataset.place = ph.place;
          span.dataset.manner = ph.manner;
          cell.appendChild(span);
          // Espaço entre símbolos se tiver mais de 1
          cell.appendChild(document.createTextNode(' '));
        });

        row.appendChild(cell);
      });

      table.appendChild(row);
    });

    tableContainer.appendChild(table);
  }

  // Aplica filtros mudando classes dos spans da tabela
  function applyFilters() {
    const allSpans = tableContainer.querySelectorAll('.ipa-symbol');
    const selectedType = typeFilter.value;
    const voicedVal = voicingFilter.value;
    const placeVal = placeFilter.value;
    const mannerVal = mannerFilter.value;

    allSpans.forEach(span => {
      let match = true;

      if (selectedType !== 'all' && selectedType !== 'consonant') {
        match = false; // só temos consoantes na tabela
      }

      if (voicedVal !== 'all' && String(span.dataset.voiced) !== voicedVal) {
        match = false;
      }
      if (placeVal !== 'all' && span.dataset.place !== placeVal) {
        match = false;
      }
      if (mannerVal !== 'all' && span.dataset.manner !== mannerVal) {
        match = false;
      }

      if (match) {
        span.classList.add('match');
        span.classList.remove('no-match');
      } else {
        span.classList.remove('match');
        span.classList.add('no-match');
      }
    });
  }

  // Mostrar/ocultar filtros conforme tipo selecionado (se quiser mais tarde)
  typeFilter.addEventListener('change', () => {
    // Aqui só consoantes, então mantém filtros visíveis
    applyFilters();
  });

  voicingFilter.addEventListener('change', applyFilters);
  placeFilter.addEventListener('change', applyFilters);
  mannerFilter.addEventListener('change', applyFilters);

  createTable();
  applyFilters();
});
