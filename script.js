(() => {
  const consonants = [
    { symbol: 'p', manner: 'oclusiva', place: 'oclusiva', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:false, soltura_retardada:true, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'b', manner: 'oclusiva', place: 'oclusiva', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:true, soltura_retardada:true, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 't', manner: 'oclusiva', place: 'alveolar', features: { consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:false, soltura_retardada:true, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'd', manner: 'oclusiva', place: 'alveolar', features: { consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:true, soltura_retardada:true, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'k', manner: 'oclusiva', place: 'velar', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:false, nasal:false, lateral:false, vozeado:false, soltura_retardada:true, alto:false, baixo:false, recuado:true, arredondado:false } },
    { symbol: 'g', manner: 'oclusiva', place: 'velar', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:false, nasal:false, lateral:false, vozeado:true, soltura_retardada:true, alto:false, baixo:false, recuado:true, arredondado:false } },

    { symbol: 'm', manner: 'nasal', place: 'bilabial', features: { consonantal:true, silabica:false, soante:true, coronal:false, anterior:true, continuo:false, nasal:true, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'n', manner: 'nasal', place: 'alveolar', features: { consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:true, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'ɲ', manner: 'nasal', place: 'palatal', features: { consonantal:true, silabica:false, soante:true, coronal:false, anterior:false, continuo:false, nasal:true, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },

    { symbol: 'r', manner: 'vibrante', place: 'alveolar', features: { consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'ɾ', manner: 'tap', place: 'alveolar', features: { consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },

    { symbol: 'f', manner: 'fricativa', place: 'labiodental', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:false, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'v', manner: 'fricativa', place: 'labiodental', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 's', manner: 'fricativa', place: 'alveolar', features: { consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:false, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'z', manner: 'fricativa', place: 'alveolar', features: { consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'ʃ', manner: 'fricativa', place: 'pós-alveolar', features: { consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:false, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'ʒ', manner: 'fricativa', place: 'pós-alveolar', features: { consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'x', manner: 'fricativa', place: 'velar', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:false, soltura_retardada:false, alto:false, baixo:false, recuado:true, arredondado:false } },
    { symbol: 'ɣ', manner: 'fricativa', place: 'velar', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:true, arredondado:false } },
    { symbol: 'χ', manner: 'fricativa', place: 'uvular', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:false, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'ʁ', manner: 'fricativa', place: 'uvular', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'h', manner: 'fricativa', place: 'glotal', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:false, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'ɦ', manner: 'fricativa', place: 'glotal', features: { consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },

    { symbol: 'tʃ', manner: 'africada', place: 'pós-alveolar', features: { consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:false, nasal:false, lateral:false, vozeado:false, soltura_retardada:true, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'dʒ', manner: 'africada', place: 'pós-alveolar', features: { consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:false, nasal:false, lateral:false, vozeado:true, soltura_retardada:true, alto:false, baixo:false, recuado:false, arredondado:false } },

    { symbol: 'ɹ', manner: 'aproximante', place: 'alveolar', features: { consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },

    { symbol: 'l', manner: 'lateral', place: 'alveolar', features: { consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:true, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
    { symbol: 'ʎ', manner: 'lateral', place: 'palatal', features: { consonantal:true, silabica:false, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:true, vozeado:true, soltura_retardada:false, alto:false, baixo:false, recuado:false, arredondado:false } },
  ];

  const placesOrder = ['oclusiva', 'labiodental', 'alveolar', 'pós-alveolar', 'palatal', 'velar', 'uvular', 'glotal'];
  const mannersOrder = ['oclusiva', 'nasal', 'vibrante', 'tap', 'fricativa', 'africada', 'lateral', 'aproximante'];

  const placeNames = {
    'oclusiva': 'Oclusiva',
    'labiodental': 'Labiodental',
    'alveolar': 'Alveolar',
    'pós-alveolar': 'Pós-alveolar',
    'palatal': 'Palatal',
    'velar': 'Velar',
    'uvular': 'Uvular',
    'glotal': 'Glotal'
  };
  const mannerNames = {
    'oclusiva': 'Oclusiva',
    'nasal': 'Nasal',
    'vibrante': 'Vibrante',
    'tap': 'Tap',
    'fricativa': 'Fricativa',
    'africada': 'Africada',
    'lateral': 'Lateral',
    'aproximante': 'Aproximante'
  };

  const tbody = document.querySelector('#consonant-table tbody');
  mannersOrder.forEach(manner => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = mannerNames[manner] || manner;
    tr.appendChild(th);

    placesOrder.forEach(place => {
      const td = document.createElement('td');
      td.classList.add('phoneme-cell');
      const consonantsFiltered = consonants.filter(c => c.manner === manner && c.place === place);
      if (consonantsFiltered.length) {
        td.textContent = consonantsFiltered.map(c => `[${c.symbol}]`).join(' ');
        td.dataset.features = JSON.stringify(consonantsFiltered[0].features);
        td.dataset.manner = manner;
        td.dataset.place = place;
      } else {
        td.classList.add('empty');
        td.textContent = '';
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  function consonantMatchesFilters(features, filters) {
    for (const f in filters) {
      if (filters[f] === null) continue;
      const val = features[f] || false;
      if (val !== filters[f]) return false;
    }
    return true;
  }

  function aplicarLogicas(filtros) {
    if (filtros.silabica === true) filtros.consonantal = false;
    if (filtros.consonantal === true) filtros.silabica = false;
    if (filtros.silabica === true) filtros.continuo = true;
    if (filtros.nasal === true) {
      filtros.lateral = false;
      filtros.aproximante = false;
    }
    if (filtros.soante === true) {
      if (!(filtros.nasal || filtros.lateral || filtros.aproximante)) {
        filtros.nasal = true;
      }
    }
    if (filtros.soante === true) filtros.vozeado = true;
    if (filtros.continuo === true) filtros.soltura_retardada = false;

    if (filtros.anterior === true) {
      filtros.allowedPlaces = ['oclusiva', 'labiodental', 'alveolar'];
    } else {
      filtros.allowedPlaces = null;
    }
    return filtros;
  }

  function updateConsonantTable(filtros) {
    const tds = document.querySelectorAll('#consonant-table td.phoneme-cell');
    tds.forEach(td => {
      const features = JSON.parse(td.dataset.features || '{}');
      let matches = consonantMatchesFilters(features, filtros);
      if (filtros.allowedPlaces) {
        if (!filtros.allowedPlaces.includes(td.dataset.place)) matches = false;
      }
      td.classList.toggle('inactive', !matches);
    });
  }

  function getFilters() {
    const inputs = document.querySelectorAll('#consonant-filters input[type=checkbox]');
    let filtros = {};
    inputs.forEach(input => {
      if (input.checked) filtros[input.dataset.feature] = true;
      else filtros[input.dataset.feature] = null;
    });
    return filtros;
  }

  function setupFilters() {
    const inputs = document.querySelectorAll('#consonant-filters input[type=checkbox]');
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        let filtros = getFilters();
        filtros = aplicarLogicas(filtros);
        if (filtros.consonantal === false) {
          document.querySelector('input[data-feature="consonantal"]').checked = false;
        }
        if (filtros.silabica === true) {
          document.querySelector('input[data-feature="silabica"]').checked = true;
          document.querySelector('input[data-feature="consonantal"]').checked = false;
        }
        updateConsonantTable(filtros);
      });
    });
    updateConsonantTable(aplicarLogicas(getFilters()));
  }

  setupFilters();

})();
