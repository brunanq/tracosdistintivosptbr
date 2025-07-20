document.addEventListener('DOMContentLoaded', () => {
  const features = [
    'consonantal', 'silabica', 'soante', 'coronal', 'anterior',
    'continuo', 'nasal', 'lateral', 'aproximante', 'vozeado', 'solturaRetardada',
    'alto', 'baixo', 'recuado', 'arredondado'
  ];

  const logicMap = {
    consonantal: { silabica: { val: false, msg: 'Marcar [+] em consonantal marca [-] em silábico' } },
    silabica: { 
      consonantal: { val: false, msg: 'Marcar [+] em silábico marca [-] em consonantal' },
      soante: { val: true, msg: 'Marcar [+] em silábico marca [+] em soante' },
      continuo: { val: true, msg: 'Marcar [+] em silábico marca [+] em contínuo' },
    },
    soante: { vozeado: { val: true, msg: 'Marcar [+] em soante marca [+] em vozeado' } },
    continuo: { solturaRetardada: { val: false, msg: 'Marcar [+] em contínuo marca [-] em soltura retardada' } },
    solturaRetardada: { continuo: { val: false, msg: 'Marcar [+] em soltura retardada marca [-] em contínuo' } },
    nasal: { 
      lateral: { val: false, msg: 'Marcar [+] em nasal marca [-] em lateral' },
      aproximante: { val: false, msg: 'Marcar [+] em nasal marca [-] em aproximante' },
      silabica: { val: false, msg: 'Marcar [+] em nasal marca [-] em silábico' },
      consonantal: { val: true, msg: 'Marcar [+] em nasal marca [+] em consonantal' },
    },
    lateral: {
      nasal: { val: false, msg: 'Marcar [+] em lateral marca [-] em nasal' },
      aproximante: { val: false, msg: 'Marcar [+] em lateral marca [-] em aproximante' },
      silabica: { val: false, msg: 'Marcar [+] em lateral marca [-] em silábico' },
      consonantal: { val: true, msg: 'Marcar [+] em lateral marca [+] em consonantal' },
    },
    aproximante: {
      lateral: { val: false, msg: 'Marcar [+] em aproximante marca [-] em lateral' },
      nasal: { val: false, msg: 'Marcar [+] em aproximante marca [-] em nasal' },
      silabica: { val: false, msg: 'Marcar [+] em aproximante marca [-] em silábico' },
      consonantal: { val: true, msg: 'Marcar [+] em aproximante marca [+] em consonantal' },
    },
  };

  // Consoantes
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

    { symbol:'ɹ', place:'alveolar', manner:'aproximante', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:true, vozeado:true, solturaRetardada:false} },

    { symbol:'l', place:'alveolar', manner:'lateral', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:true, aproximante:false, vozeado:true, solturaRetardada:false} },

    { symbol:'w', place:'bilabial', manner:'aproximante', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:false, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:true, vozeado:true, solturaRetardada:false} },

    { symbol:'j', place:'palatal', manner:'aproximante', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:true, vozeado:true, solturaRetardada:false} },
  ];

  // Vogais - ordenadas em linhas alto/meio/baixo e colunas anterior/recuado
  // Inclui glides aproximantes alto + anterior/recuado (j,w)

  // Para simplificar, só usei 3x4 (alto, meio, baixo) x (anterior, central, recuado, arredondado)
  // Com as features relevantes

  // Ajustado para 3 linhas (alto, meio, baixo) e 4 colunas (anterior, central, recuado, arredondado)
  const vowels = [
    [ // alto
      { symbol:'i', features:{consonantal:false, silabica:true, soante:true, anterior:true, recuado:false, alto:true, baixo:false, arredondado:false} },
      { symbol:'ɨ', features:{consonantal:false, silabica:true, soante:true, anterior:false, recuado:true, alto:true, baixo:false, arredondado:false} },
      { symbol:'u', features:{consonantal:false, silabica:true, soante:true, anterior:false, recuado:true, alto:true, baixo:false, arredondado:true} },
      { symbol:'ʉ', features:{consonantal:false, silabica:true, soante:true, anterior:false, recuado:true, alto:true, baixo:false, arredondado:true} },
    ],
    [ // meio
      { symbol:'e', features:{consonantal:false, silabica:true, soante:true, anterior:true, recuado:false, alto:false, baixo:false, arredondado:false} },
      { symbol:'ɘ', features:{consonantal:false, silabica:true, soante:true, anterior:false, recuado:true, alto:false, baixo:false, arredondado:false} },
      { symbol:'o', features:{consonantal:false, silabica:true, soante:true, anterior:false, recuado:true, alto:false, baixo:false, arredondado:true} },
      { symbol:'ɵ', features:{consonantal:false, silabica:true, soante:true, anterior:false, recuado:true, alto:false, baixo:false, arredondado:true} },
    ],
    [ // baixo
      { symbol:'a', features:{consonantal:false, silabica:true, soante:true, anterior:true, recuado:false, alto:false, baixo:true, arredondado:false} },
      { symbol:'ɐ', features:{consonantal:false, silabica:true, soante:true, anterior:false, recuado:true, alto:false, baixo:true, arredondado:false} },
      { symbol:'ɑ', features:{consonantal:false, silabica:true, soante:true, anterior:false, recuado:true, alto:false, baixo:true, arredondado:true} },
      { symbol:'ɒ', features:{consonantal:false, silabica:true, soante:true, anterior:false, recuado:true, alto:false, baixo:true, arredondado:true} },
    ]
  ];

  const places = ['bilabial', 'labiodental', 'alveolar', 'postalveolar', 'palatal', 'velar', 'uvular', 'glotal', 'oclusiva'];
  // Aqui uso places mais usadas (porém só as do array dos consonantes acima)

  // Organizar os manners em ordem mais lógica para a tabela
  const manners = [
    'oclusiva',
    'africada',
    'fricativa',
    'nasal',
    'aproximante',
    'lateral',
    'vibrante',
    'tap',
  ];

  // Inicializa estado dos filtros com "all" (neutro)
  const filters = {};
  features.forEach(f => filters[f] = 'all');

  const filtersContainer = document.getElementById('filters');

  // Cria toggles para cada traço
  features.forEach(feature => {
    const group = document.createElement('div');
    group.className = 'filter-group';
    group.dataset.feature = feature;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'feature-name';
    nameSpan.textContent = feature;
    group.appendChild(nameSpan);

    const toggle = document.createElement('div');
    toggle.className = 'toggle-switch pos-neutral';
    toggle.title = 'Clique para alternar: neutro → [+] → [-] → neutro';

    const labelLeft = document.createElement('span');
    labelLeft.className = 'label-left';
    labelLeft.textContent = '[+]';
    toggle.appendChild(labelLeft);

    const labelCenter = document.createElement('span');
    labelCenter.className = 'label-center';
    labelCenter.textContent = '[ ]';
    toggle.appendChild(labelCenter);

    const labelRight = document.createElement('span');
    labelRight.className = 'label-right';
    labelRight.textContent = '[-]';
    toggle.appendChild(labelRight);

    group.appendChild(toggle);
    filtersContainer.appendChild(group);

    toggle.addEventListener('click', () => {
      let state = filters[feature]; // all, true, false
      if(state === 'all') state = true;
      else if(state === true) state = false;
      else state = 'all';
      filters[feature] = state;

      updateToggleUI(feature);
      applyLogicRules(feature);
      updateHighlight();
    });
  });

  function updateToggleUI(feature) {
    const group = document.querySelector(`.filter-group[data-feature="${feature}"]`);
    if(!group) return;
    const toggle = group.querySelector('.toggle-switch');
    const state = filters[feature];
    toggle.classList.remove('pos-neutral', 'pos-plus', 'pos-minus');
    if(state === 'all') toggle.classList.add('pos-neutral');
    else if(state === true) toggle.classList.add('pos-plus');
    else toggle.classList.add('pos-minus');
  }

  // Piscar e info
  function showInfoForFeature(featureName, message) {
    const group = document.querySelector(`.filter-group[data-feature="${featureName}"]`);
    if (!group) return;

    let oldInfo = group.querySelector('.info-icon');
    if (oldInfo) oldInfo.remove();

    const info = document.createElement('span');
    info.className = 'info-icon';
    info.innerHTML = 'ℹ';

    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    info.appendChild(tooltip);

    group.appendChild(info);

    group.classList.add('blink');

    setTimeout(() => {
      group.classList.remove('blink');
      setTimeout(() => {
        if (info.parentNode) info.parentNode.removeChild(info);
      }, 7000);
    }, 3000);
  }

  function applyLogicRules(changedFeature) {
    if(!logicMap[changedFeature]) return;
    const changedVal = filters[changedFeature];
    if(changedVal === 'all') return;

    for(const [otherFeature, rule] of Object.entries(logicMap[changedFeature])){
      if(rule.val === changedVal){
        if(filters[otherFeature] !== rule.val){
          filters[otherFeature] = rule.val;

          updateToggleUI(otherFeature);

          showInfoForFeature(otherFeature, rule.msg);

          // recursivo para regras encadeadas
          applyLogicRules(otherFeature);
        }
      }
    }
  }

  // Atualiza realce nas tabelas
  function updateHighlight() {
    const allTds = [...document.querySelectorAll('table td')];
    allTds.forEach(td => {
      if(td.classList.contains('empty')) return;

      const feat = JSON.parse(td.dataset.features);
      let show = true;
      for(const f in filters){
        if(filters[f] === 'all') continue;
        if(feat[f] !== filters[f]){
          show = false;
          break;
        }
      }

      if(show){
        td.classList.add('highlight');
        td.classList.remove('dimmed');
      } else {
        td.classList.remove('highlight');
        td.classList.add('dimmed');
      }
    });
  }

  // Criação da tabela de consoantes
  const consonantTable = document.getElementById('consonant-table');
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  trHead.appendChild(document.createElement('th'));
  // As colunas de lugar
  const placesOrder = ['bilabial', 'labiodental', 'alveolar', 'postalveolar', 'palatal', 'velar', 'uvular', 'glotal', 'oclusiva'];
  placesOrder.forEach(place => {
    const th = document.createElement('th');
    th.textContent = place;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  consonantTable.appendChild(thead);

  const tbody = document.createElement('tbody');

  const mannersOrder = [
    'oclusiva',
    'africada',
    'fricativa',
    'nasal',
    'aproximante',
    'lateral',
    'vibrante',
    'tap',
  ];

  mannersOrder.forEach(manner => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = manner;
    tr.appendChild(th);

    placesOrder.forEach(place => {
      // Ache o símbolo da consoante com essa place + manner
      const consonant = consonants.find(c => c.place === place && c.manner === manner);
      const td = document.createElement('td');
      if(consonant){
        td.textContent = consonant.symbol;
        td.dataset.features = JSON.stringify(consonant.features);
      } else {
        td.className = 'empty';
        td.textContent = '-';
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
  consonantTable.appendChild(tbody);

  // Tabela vogais (3 linhas alto, meio, baixo e 4 colunas anterior, central, recuado, arredondado)
  const vowelTable = document.getElementById('vowel-table');
  const theadVowel = document.createElement('thead');
  const trVowelHead = document.createElement('tr');
  trVowelHead.appendChild(document.createElement('th')); // linha
  trVowelHead.appendChild(document.createElement('th')); // descrição linha
  ['anterior', 'central', 'recuado', 'arredondado'].forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    trVowelHead.appendChild(th);
  });
  theadVowel.appendChild(trVowelHead);
  vowelTable.appendChild(theadVowel);

  const tbodyVowel = document.createElement('tbody');
  ['alto', 'meio', 'baixo'].forEach((alt, i) => {
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = alt;
    tr.appendChild(th1);

    const th2 = document.createElement('th');
    th2.textContent = i === 0 ? 'topo' : i === 1 ? 'meio' : 'baixo';
    tr.appendChild(th2);

    vowels[i].forEach(vowel => {
      const td = document.createElement('td');
      td.textContent = vowel.symbol;
      td.dataset.features = JSON.stringify(vowel.features);
      tr.appendChild(td);
    });

    tbodyVowel.appendChild(tr);
  });
  vowelTable.appendChild(tbodyVowel);

  updateHighlight();
});
