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

  // Consoantes e vogais idem versão anterior (omitido aqui por brevidade, usar mesmo array)

  // Estado dos filtros: 'all' | true | false
  const filters = {};
  features.forEach(f => filters[f] = 'all');

  const filtersContainer = document.getElementById('filters');

  // Cria toggle-switch para cada traço
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

    // Labels [+] [ ] [-]
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

    // Clique alterna entre os três estados
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

  // Função piscar e info igual versão anterior
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

          // Atualiza toggle visualmente
          updateToggleUI(otherFeature);

          showInfoForFeature(otherFeature, rule.msg);

          applyLogicRules(otherFeature);
        }
      }
    }
  }

  // --- Resto do código igual: montar tabelas e função updateHighlight ---
  // Aqui colar os arrays consonants, vowels, places, manners e montar as tabelas
  // (igual ao código anterior)

  // Função updateHighlight:
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

  // Montar as tabelas consonantTable e vowelTable (copiar o código anterior)

  // Repetir código para criar tabelas como na versão anterior, colar aqui...

  // Criar tabela consonantal
  const consonantTable = document.getElementById('consonant-table');
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  trHead.appendChild(document.createElement('th'));
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

  // Criar tabela vogais
  const vowelTable = document.getElementById('vowel-table');
  const theadVowel = document.createElement('thead');
  const trVowelHead = document.createElement('tr');
  trVowelHead.appendChild(document.createElement('th'));
  trVowelHead.appendChild(document.createElement('th'));
  ['anterior', 'recuado'].forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    trVowelHead.appendChild(th);
  });
  theadVowel.appendChild(trVowelHead);
  vowelTable.appendChild(theadVowel);

  const tbodyVowel = document.createElement('tbody');
  const vowelRowsLabels = ['alto', 'meio', 'baixo'];
  vowels.forEach((row, i) => {
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = vowelRowsLabels[i];
    tr.appendChild(th1);

    const th2 = document.createElement('th');
    th2.textContent = i === 0 ? 'topo' : i === 1 ? 'meio' : 'baixo';
    tr.appendChild(th2);

    row.forEach(vowel => {
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
