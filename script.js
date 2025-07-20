document.addEventListener('DOMContentLoaded', () => {
  // Todos os traços que vamos filtrar
  const features = [
    'consonantal', 'silabica', 'soante', 'coronal', 'anterior',
    'continuo', 'nasal', 'lateral', 'vozeado', 'solturaRetardada',
    'alto', 'baixo', 'recuado', 'arredondado'
  ];

  // Relações lógicas para manter consistência dos filtros
  const logicMap = {
    consonantal: { silabica: false },
    silabica: { consonantal: false, soante: true, continuo: true },
    soante: { vozeado: true },
    continuo: { solturaRetardada: false },
    solturaRetardada: { continuo: false },
    nasal: { lateral: false, aproximante: false, silabica: false, consonantal: true },
    lateral: { nasal: false, aproximante: false, silabica: false, consonantal: true },
    aproximante: { lateral: false, nasal: false, silabica: false, consonantal: true },
  };

  // Lista de consoantes e traços
  const consonants = [
    { symbol:'p', place:'oclusiva', manner:'oclusiva', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:false, solturaRetardada:false} },
    { symbol:'b', place:'oclusiva', manner:'oclusiva', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'t', place:'alveolar', manner:'oclusiva', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:false, solturaRetardada:false} },
    { symbol:'d', place:'alveolar', manner:'oclusiva', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'k', place:'velar', manner:'oclusiva', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:false, nasal:false, lateral:false, vozeado:false, solturaRetardada:false} },
    { symbol:'g', place:'velar', manner:'oclusiva', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:false, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'m', place:'bilabial', manner:'nasal', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:false, anterior:true, continuo:false, nasal:true, lateral:false, vozeado:true, solturaRetardada:false} },
    { symbol:'n', place:'alveolar', manner:'nasal', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:true, lateral:false, vozeado:true, solturaRetardada:false} },
    { symbol:'ɲ', place:'palatal', manner:'nasal', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:false, continuo:false, nasal:true, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'r', place:'alveolar', manner:'vibrante', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'ɾ', place:'alveolar', manner:'tap', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'f', place:'labiodental', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:false, solturaRetardada:false} },
    { symbol:'v', place:'labiodental', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'s', place:'alveolar', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:false, solturaRetardada:false} },
    { symbol:'z', place:'alveolar', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'ʃ', place:'postalveolar', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:false, solturaRetardada:false} },
    { symbol:'ʒ', place:'postalveolar', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'x', place:'velar', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:false, solturaRetardada:false} },
    { symbol:'ɣ', place:'velar', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'χ', place:'uvular', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:false, solturaRetardada:false} },
    { symbol:'ʁ', place:'uvular', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'h', place:'glotal', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:false, solturaRetardada:false} },
    { symbol:'ɦ', place:'glotal', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'tʃ', place:'postalveolar', manner:'africada', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:false, nasal:false, lateral:false, vozeado:false, solturaRetardada:true} },
    { symbol:'dʒ', place:'postalveolar', manner:'africada', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:false, nasal:false, lateral:false, vozeado:true, solturaRetardada:true} },

    { symbol:'ɹ', place:'alveolar', manner:'aproximante', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:true, solturaRetardada:false} },

    { symbol:'l', place:'alveolar', manner:'lateral', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:false, lateral:true, vozeado:true, solturaRetardada:false} },
    { symbol:'ʎ', place:'palatal', manner:'lateral', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:false, continuo:false, nasal:false, lateral:true, vozeado:true, solturaRetardada:false} },
  ];

  // Vogais e glides, matriz para facilitar tabela
  const vowels = [
    [ // topo
      {symbol:'i', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:false, arredondado:false}},
      {symbol:'ɪ', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:false, arredondado:false}},
      {symbol:'u', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:true, arredondado:true}},
      {symbol:'ʊ', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:true, arredondado:true}},
    ],
    [ // meio
      {symbol:'e', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false}},
      {symbol:'o', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:true, arredondado:true}},
    ],
    [ // baixo
      {symbol:'ɛ', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:false, arredondado:false}},
      {symbol:'ɔ', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:true, arredondado:true}},
      {symbol:'a', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:true, arredondado:false}},
    ]
  ];

  // Colunas e linhas para a tabela consonantal
  const places = ['oclusiva', 'labiodental', 'alveolar', 'postalveolar', 'palatal', 'velar', 'uvular', 'glotal'];
  const manners = ['oclusiva', 'nasal', 'vibrante', 'tap', 'fricativa', 'africada', 'lateral', 'aproximante'];

  // Guarda estado dos filtros: 'all' | true | false
  const filters = {};
  features.forEach(f => filters[f] = 'all');

  // Cria filtros no DOM
  const filtersContainer = document.getElementById('filters');
  features.forEach(feature => {
    const group = document.createElement('div');
    group.className = 'filter-group';
    group.dataset.feature = feature;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = feature;
    nameSpan.style.minWidth = '120px';
    group.appendChild(nameSpan);

    ['true', 'false', 'all'].forEach(val => {
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = feature;
      input.value = val;
      input.id = `${feature}_${val}`;
      if(val === 'all') input.checked = true;
      group.appendChild(input);

      const label = document.createElement('label');
      label.htmlFor = input.id;
      label.textContent = val === 'true' ? '[+]' : (val === 'false' ? '[-]' : '[ ]');
      group.appendChild(label);
    });

    filtersContainer.appendChild(group);
  });

  // Cria tabela consonantal
  const consonantTable = document.getElementById('consonant-table');
  // Cabeçalho
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

  // Corpo da tabela
  const tbody = document.createElement('tbody');

  manners.forEach(manner => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = manner;
    tr.appendChild(th);

    places.forEach(place =>
