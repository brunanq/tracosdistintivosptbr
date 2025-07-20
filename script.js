document.addEventListener('DOMContentLoaded', () => {
  const features = [
    'consonantal', 'silabica', 'soante', 'coronal', 'anterior',
    'continuo', 'nasal', 'lateral', 'aproximante', 'vozeado',
    'solturaRetardada', 'alto', 'baixo', 'recuado', 'arredondado'
  ];

  // Relações lógicas para manter consistência dos filtros
  // true = [+], false = [-]
  // Se o usuário marca + em uma chave, os filtros na lista serão ajustados
  const logicMap = {
    consonantal: { silabica: false },
    silabica: { consonantal: false, soante: true, continuo: true },
    soante: { vozeado: true },
    continuo: { solturaRetardada: false },
    solturaRetardada: { continuo: false },
    nasal: { lateral: false, aproximante: false, silabica: false, consonantal: true },
    lateral: { nasal: false, aproximante: false, silabica: false, consonantal: true },
    aproximante: { lateral: false, nasal: false, silabica: false, consonantal: true }
  };

  // Todas as consoantes com seus lugares, modos, vozeamento e traços
  const consonants = [
    { symbol:'p', place:'oclusiva', manner:'oclusiva', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false} },
    { symbol:'b', place:'oclusiva', manner:'oclusiva', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'t', place:'alveolar', manner:'oclusiva', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false} },
    { symbol:'d', place:'alveolar', manner:'oclusiva', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'k', place:'velar', manner:'oclusiva', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false} },
    { symbol:'g', place:'velar', manner:'oclusiva', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'m', place:'bilabial', manner:'nasal', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:false, anterior:true, continuo:false, nasal:true, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },
    { symbol:'n', place:'alveolar', manner:'nasal', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:true, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },
    { symbol:'ɲ', place:'palatal', manner:'nasal', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:false, continuo:false, nasal:true, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'r', place:'alveolar', manner:'vibrante', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'ɾ', place:'alveolar', manner:'tap', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'f', place:'labiodental', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false} },
    { symbol:'v', place:'labiodental', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'s', place:'alveolar', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false} },
    { symbol:'z', place:'alveolar', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'ʃ', place:'postalveolar', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false} },
    { symbol:'ʒ', place:'postalveolar', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'x', place:'velar', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false} },
    { symbol:'ɣ', place:'velar', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'χ', place:'uvular', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false} },
    { symbol:'ʁ', place:'uvular', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'h', place:'glotal', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false} },
    { symbol:'ɦ', place:'glotal', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'tʃ', place:'postalveolar', manner:'africada', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:true} },
    { symbol:'dʒ', place:'postalveolar', manner:'africada', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:true} },

    { symbol:'ɹ', place:'alveolar', manner:'aproximante', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:true, vozeado:true, solturaRetardada:false} },

    { symbol:'l', place:'alveolar', manner:'lateral', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:false, lateral:true, aproximante:false, vozeado:true, solturaRetardada:false} },
    { symbol:'ʎ', place:'palatal', manner:'lateral', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:false, continuo:false, nasal:false, lateral:true, aproximante:false, vozeado:true, solturaRetardada:false} },
  ];

  // Vogais e glides organizados em linhas para tabela
  const vowels = [
    [
      {symbol:'i', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:false, arredondado:false}},
      {symbol:'ɪ', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:true, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:false, arredondado:false}},
      {symbol:'u', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:true, arredondado:true}},
      {symbol:'ʊ', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:true, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:true, arredondado:true}},
    ],
    [
      {symbol:'e', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false}},
      {symbol:'o', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:true, arredondado:true}},
    ],
    [
      {symbol:'ɛ', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:false, arredondado:false}},
      {symbol:'ɔ', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:true, arredondado:true}},
      {symbol:'a', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:true, arredondado:false}},
    ],
  ];

  const places = ['oclusiva', 'labiodental', 'alveolar', 'postalveolar', 'palatal', 'velar', 'uvular', 'glotal'];
  const manners = ['oclusiva', 'nasal', 'vibrante', 'tap', 'fricativa', 'africada', 'lateral', 'aproximante'];

  const filtersContainer = document.getElementById('filters');
  const consonantTable = document.getElementById('consonant-table');
  const vowelTable = document.getElementById('vowel-table');

  // Estado dos filtros, valores: true = [+], false = [-], 'all' = neutro
  const filters = {};
  features.forEach(f => filters[f] = 'all');

  // Cria filtros
  function createFilters() {
    features.forEach(feature => {
      const group = document.createElement('div');
      group.className = 'filter-group';
      group.dataset.feature = feature;

      const nameSpan = document.createElement('span');
      nameSpan.textContent = feature;
      group.appendChild(nameSpan);

      ['true', 'false', 'all'].forEach(val => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = feature;
        input.value = val;
        input.id = `${feature}_${val}`;
        if (val === 'all') input.checked = true;

        input.addEventListener('change', () => {
          setFilter(feature, val);
          applyLogic(feature, val === 'true');
          updateHighlight();
        });

        group.appendChild(input);

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = val === 'true' ? '[+]' : val === 'false' ? '[-]' : '[ ]';
        group.appendChild(label);
      });

      filtersContainer.appendChild(group);
    });
  }

  // Aplica regras lógicas para manter coerência dos filtros
  function applyLogic(changedFeature, isTrue) {
    if (!(changedFeature in logicMap)) return;

    const related = logicMap[changedFeature];
    for (const [feat, val] of Object.entries(related)) {
      // Atualiza o filtro relacionado para val (true ou false) se ainda não estiver setado assim
      if (filters[feat] !== val) {
        filters[feat] = val;
        // Atualiza o input visualmente
        const radioTrue = document.getElementById(`${feat}_true`);
        const radioFalse = document.getElementById(`${feat}_false`);
        const radioAll = document.getElementById(`${feat}_all`);
        if (val === true) {
          radioTrue.checked = true;
        } else if (val === false) {
          radioFalse.checked = true;
        }
        // Recursivamente aplica lógica para os filtros afetados
        applyLogic(feat, val);
      }
    }
  }

  // Atualiza estado do filtro e desmarca neutro
  function setFilter(feature, val) {
    if (val === 'true') filters[feature] = true;
    else if (val === 'false') filters[feature] = false;
    else filters[feature] = 'all';
  }

  // Verifica se um fonema corresponde ao filtro
  function matchFeatures(fonema) {
    for (const [feature, val] of Object.entries(filters)) {
      if (val === 'all') continue; // neutro, ignora
      if (feature in fonema.features) {
        if (fonema.features[feature] !== val) return false;
      }
    }
    return true;
  }

  // Monta tabela consonantal
  function buildConsonantTable() {
    consonantTable.innerHTML = '';

    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    trHead.appendChild(document.createElement('th')); // canto vazio
    places.forEach(place => {
      const th = document.createElement('th');
      th.textContent = place;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    consonantTable.appendChild(thead);

    const tbody = document.createElement('tbody');
    manners.forEach(manner => {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.textContent = manner;
      tr.appendChild(th);

      places.forEach(place => {
        // Procura fonema que bate com lugar e modo
        const fonema = consonants.find(c => c.place === place && c.manner === manner);
        const td = document.createElement('td');
        if (fonema) {
          td.textContent = fonema.symbol;
          td.dataset.symbol = fonema.symbol;
          td.dataset.features = JSON.stringify(fonema.features);
          td.classList.add('phoneme');
          td.fonema = fonema; // referência para fácil acesso
        } else {
          td.classList.add('empty');
          td.textContent = '-';
        }
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
    consonantTable.appendChild(tbody);
  }

  // Monta tabela vogais
  function buildVowelTable() {
    vowelTable.innerHTML = '';

    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    trHead.appendChild(document.createElement('th')); // canto vazio
    trHead.appendChild(document.createElement('th')); // vazio 2
    vowelTable.appendChild(thead);
    thead.appendChild(trHead);

    const tbody = document.createElement('tbody');

    vowels.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell.symbol;
        td.dataset.symbol = cell.symbol;
        td.dataset.features = JSON.stringify(cell.features);
        td.classList.add('phoneme');
        td.fonema = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    vowelTable.appendChild(tbody);
  }

  // Atualiza o highlight dos fonemas conforme os filtros
  function updateHighlight() {
    const phonemes = document.querySelectorAll('.phoneme');
    phonemes.forEach(td => {
      const fonema = td.fonema;
      if (matchFeatures(fonema)) {
        td.classList.remove('dimmed');
      } else {
        td.classList.add('dimmed');
      }
    });
  }

  // Inicializa tudo
  createFilters();
  buildConsonantTable();
  buildVowelTable();
  updateHighlight();
});
