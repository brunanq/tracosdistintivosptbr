document.addEventListener('DOMContentLoaded', () => {
  const phonemes = [
    // Consonants (só os que você passou)
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

    // Affricates
    { symbol: 'tʃ', type: 'consonant', voiced: false, place: 'alveolopalatal', manner: 'affricate' },
    { symbol: 'dʒ', type: 'consonant', voiced: true, place: 'alveolopalatal', manner: 'affricate' },
  ];

  // Listas para ordem de lugares e modos
  const places = ['bilabial', 'labiodental', 'alveolar', 'postalveolar', 'alveolopalatal', 'palatal', 'velar', 'uvular', 'glottal'];
  const manners = ['plosive', 'nasal', 'trill', 'tap', 'fricative', 'affricate', 'approximant', 'lateral'];

  // Função utilitária para capitalizar
  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Mapa para armazenar fonemas por manner/place
  const phonemeMap = {};
  manners.forEach(manner => {
    phonemeMap[manner] = {};
    places.forEach(place => {
      phonemeMap[manner][place] = [];
    });
  });

  // Preenche o mapa só com fonemas que você colocou
  phonemes.forEach(p => {
    if (phonemeMap[p.manner] && phonemeMap[p.manner][p.place]) {
      phonemeMap[p.manner][p.place].push(p);
    }
  });

  // Referências para filtros e container da tabela
  const container = document.getElementById('ipaGrid');
  const typeFilter = document.getElementById('typeFilter');
  const voicingFilter = document.getElementById('voicingFilter');
  const placeFilter = document.getElementById('placeFilter');
  const mannerFilter = document.getElementById('mannerFilter');

  // Função para montar a tabela completa
  function buildTable() {
    container.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'consonant-chart';

    // Cabeçalho - lugares
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');

    headRow.appendChild(document.createElement('th')); // Canto vazio
    places.forEach(place => {
      const th = document.createElement('th');
      th.textContent = capitalize(place);
      th.className = 'place';
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    // Corpo - modos e fonemas
    const tbody = document.createElement('tbody');

    manners.forEach(manner => {
      const tr = document.createElement('tr');
      const mannerTh = document.createElement('th');
      mannerTh.textContent = capitalize(manner);
      mannerTh.className = 'manner';
      tr.appendChild(mannerTh);

      places.forEach(place => {
        const td = document.createElement('td');
        td.className = 'cell';

        // Adiciona fonemas na célula
        const phonemesHere = phonemeMap[manner][place];

        if (phonemesHere.length === 0) {
          td.classList.add('empty');
        } else {
          phonemesHere.forEach(ph => {
            const span = document.createElement('span');
            span.className = 'phoneme';
            span.textContent = ph.symbol;
            // Guarda atributos para filtros
            span.dataset.voiced = ph.voiced;
            span.dataset.place = ph.place;
            span.dataset.manner = ph.manner;
            td.appendChild(span);
          });
        }
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
  }

  // Função que aplica filtros e destaca as células/fonemas
  function applyFilters() {
    const selectedType = typeFilter.value;
    const voicingVal = voicingFilter.value;
    const placeVal = placeFilter.value;
    const mannerVal = mannerFilter.value;

    // Todas as células e fonemas
    const allCells = container.querySelectorAll('td.cell');
    const allPhonemes = container.querySelectorAll('span.phoneme');

    allPhonemes.forEach(span => {
      let show = true;

      // Tipo (consoante/vogal)
      if (selectedType !== 'all' && 'consonant' !== selectedType) {
        // só temos consoantes, então se filtra vogais, esconda tudo
        show = false;
      }

      // Voicing
      if (show && voicingVal !== 'all' && String(span.dataset.voiced) !== voicingVal) {
        show = false;
      }
      // Place
      if (show && placeVal !== 'all' && span.dataset.place !== placeVal) {
        show = false;
      }
      // Manner
      if (show && mannerVal !== 'all' && span.dataset.manner !== mannerVal) {
        show = false;
      }

      // Aplica classe
      if (show) {
        span.classList.remove('inactive');
      } else {
        span.classList.add('inactive');
      }
    });

    // Agora destacamos células completas que têm pelo menos um fonema ativo
    allCells.forEach(td => {
      const phonemesInCell = td.querySelectorAll('span.phoneme:not(.inactive)');
      if (phonemesInCell.length > 0) {
        td.classList.remove('dimmed');
      } else {
        td.classList.add('dimmed');
      }
    });
  }

  // Evento para mostrar/ocultar filtros conforme tipo selecionado
  typeFilter.addEventListener('change', () => {
    const val = typeFilter.value;
    // Como só temos consoantes, manter os filtros consonantais sempre visíveis
    applyFilters();
  });

  voicingFilter.addEventListener('change', applyFilters);
  placeFilter.addEventListener('change', applyFilters);
  mannerFilter.addEventListener('change', applyFilters);

  // Inicializa tabela e filtros
  buildTable();
  applyFilters();
});
