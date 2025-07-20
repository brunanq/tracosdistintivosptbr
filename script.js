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

    { symbol: 'tʃ', type: 'consonant', voiced: false, place: 'alveolopalatal', manner: 'affricate' },
    { symbol: 'dʒ', type: 'consonant', voiced: true, place: 'alveolopalatal', manner: 'affricate' },
  ];

  const places = ['bilabial', 'labiodental', 'alveolar', 'postalveolar', 'alveolopalatal', 'palatal', 'velar', 'uvular', 'glottal'];
  const manners = ['plosive', 'nasal', 'trill', 'tap', 'fricative', 'affricate', 'approximant', 'lateral'];

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Organiza fonemas em objeto para lookup
  const phonemeMap = {};
  manners.forEach(manner => {
    phonemeMap[manner] = {};
    places.forEach(place => {
      phonemeMap[manner][place] = [];
    });
  });

  phonemes.forEach(ph => {
    if (phonemeMap[ph.manner] && phonemeMap[ph.manner][ph.place]) {
      phonemeMap[ph.manner][ph.place].push(ph);
    }
  });

  const container = document.getElementById('ipaGrid');
  const voicingFilter = document.getElementById('voicingFilter');
  const placeFilter = document.getElementById('placeFilter');
  const mannerFilter = document.getElementById('mannerFilter');

  function buildTable() {
    container.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'consonant-chart';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Célula vazia canto superior esquerdo
    headerRow.appendChild(document.createElement('th'));

    // Cabeçalho lugares
    places.forEach(place => {
      const th = document.createElement('th');
      th.className = 'place';
      th.textContent = capitalize(place);
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    manners.forEach(manner => {
      const tr = document.createElement('tr');

      // Cabeçalho modo
      const mannerTh = document.createElement('th');
      mannerTh.className = 'manner';
      mannerTh.textContent = capitalize(manner);
      tr.appendChild(mannerTh);

      // Células fonemas
      places.forEach(place => {
        const td = document.createElement('td');
        td.className = 'cell';

        const phonemesHere = phonemeMap[manner][place];
        if (phonemesHere.length === 0) {
          td.classList.add('empty');
        } else {
          phonemesHere.forEach(ph => {
            const div = document.createElement('div');
            div.className = 'phoneme';
            div.textContent = ph.symbol;
            div.dataset.voiced = ph.voiced;
            div.dataset.place = ph.place;
            div.dataset.manner = ph.manner;
            td.appendChild(div);
          });
        }

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
  }

  function applyFilters() {
    const voicingVal = voicingFilter.value;
    const placeVal = placeFilter.value;
    const mannerVal = mannerFilter.value;

    const allCells = container.querySelectorAll('td.cell');
    const allPhonemes = container.querySelectorAll('div.phoneme');

    allPhonemes.forEach(phDiv => {
      let show = true;

      if (voicingVal !== 'all' && String(phDiv.dataset.voiced) !== voicingVal) {
        show = false;
      }
      if (placeVal !== 'all' && phDiv.dataset.place !== placeVal) {
        show = false;
      }
      if (mannerVal !== 'all' && phDiv.dataset.manner !== mannerVal) {
        show = false;
      }

      if (show) {
        phDiv.classList.remove('inactive');
      } else {
        phDiv.classList.add('inactive');
      }
    });

    allCells.forEach(cell => {
      const activePhonemes = cell.querySelectorAll('div.phoneme:not(.inactive)');
      if (activePhonemes.length > 0) {
        cell.classList.remove('dimmed');
      } else {
        cell.classList.add('dimmed');
      }
    });
  }

  voicingFilter.addEventListener('change', applyFilters);
  placeFilter.addEventListener('change', applyFilters);
  mannerFilter.addEventListener('change', applyFilters);

  buildTable();
  applyFilters();
});
