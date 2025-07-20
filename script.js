document.addEventListener('DOMContentLoaded', () => {
  const features = [
    'consonantal', 'silabica', 'soante', 'coronal', 'anterior',
    'continuo', 'nasal', 'lateral', 'vozeado', 'solturaRetardada',
    'alto', 'baixo', 'recuado', 'arredondado'
  ];

  // Regras lógicas para sincronizar filtros
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

  // Lista aproximante para lógica
  const approximantes = ['aproximante'];

  // Fonemas consonantais
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

  // Vogais e glides, em matriz para tabela
  const vowels = [
    [
      {symbol:'i', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:false, arredondado:false}},
      {symbol:'ɪ', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:false, arredondado:false}},
      {symbol:'u', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:true, arredondado:true}},
      {symbol:'ʊ', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:true, arredondado:true}},
    ],
    [
      {symbol:'e', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false}},
      {symbol:'o', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:true, arredondado:true}},
    ],
    [
      {symbol:'ɛ', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:false, arredondado:false}},
      {symbol:'ɔ', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:true, arredondado:true}},
      {symbol:'a', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:true, arredondado:false}},
    ]
  ];

  // Locais e modos para tabela consonantal
  const places = ['oclusiva', 'labiodental', 'alveolar', 'postalveolar', 'palatal', 'velar', 'uvular', 'glotal'];
  const manners = ['oclusiva', 'nasal', 'vibrante', 'tap', 'fricativa', 'africada', 'lateral', 'aproximante'];

  // Estado dos filtros: 'all' (neutro) | true | false
  const filters = {};
  features.forEach(f => filters[f] = 'all');

  // Container filtros
  const filtersContainer = document.getElementById('filters');

  // Criar filtros com toggle-switch
  features.forEach(feature => {
    const group = document.createElement('div');
    group.className = 'filter-group';
    group.dataset.feature = feature;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = feature;
    nameSpan.className = 'filter-name';
    group.appendChild(nameSpan);

    const toggle = document.createElement('div');
    toggle.className = 'toggle-switch pos-neutral';
    toggle.title = 'Clique para alternar: neutro → [+] → [-] → neutro';
    group.appendChild(toggle);

    // clique no toggle cicla estado
    toggle.addEventListener('click', () => {
      const current = getFilterValueFromClass(toggle);
      let next;
      if (current === 'all') next = true;
      else if (current === true) next = false;
      else next = 'all';
      setFilterValue(toggle, next);
      filters[feature] = next;

      // Aplica lógica para consistência dos filtros
      applyLogic(feature, next);

      // Atualiza as tabelas
      updateTables();
    });

    filtersContainer.appendChild(group);
  });

  // Funções para ler e setar filtro baseado na classe do toggle
  function getFilterValueFromClass(toggle) {
    if (toggle.classList.contains('pos-neutral')) return 'all';
    if (toggle.classList.contains('pos-plus')) return true;
    if (toggle.classList.contains('pos-minus')) return false;
    return 'all';
  }

  function setFilterValue(toggle, val) {
    toggle.classList.remove('pos-neutral', 'pos-plus', 'pos-minus');
    if (val === 'all') toggle.classList.add('pos-neutral');
    else if (val === true) toggle.classList.add('pos-plus');
    else toggle.classList.add('pos-minus');
  }

  // Aplica regras de lógica para manter consistência dos filtros e pisca info
  function applyLogic(changedFeature, changedValue) {
    // Checar o logicMap
    if (!logicMap[changedFeature]) return;

    for (const [relatedFeature, shouldBe] of Object.entries(logicMap[changedFeature])) {
      if (filters[relatedFeature] === shouldBe) continue; // já ok

      filters[relatedFeature] = shouldBe;
      // Atualiza toggle correspondente
      const group = filtersContainer.querySelector(`.filter-group[data-feature="${relatedFeature}"]`);
      if (!group) continue;
      const toggle = group.querySelector('.toggle-switch');
      if (!toggle) continue;

      setFilterValue(toggle, shouldBe);

      // Pisca toggle e mostra tooltip info
      pulseInfo(toggle, changedFeature, relatedFeature, shouldBe);
    }
  }

  // Piscar toggle e mostrar info tooltip
  function pulseInfo(toggle, changedFeature, relatedFeature, shouldBe) {
    const originalTitle = toggle.title;
    // Montar mensagem da lógica
    const sign = shouldBe === true ? '[+]' : (shouldBe === false ? '[-]' : '[ ]');
    const message = `Devido a "${changedFeature}" = ${sign}, o traço "${relatedFeature}" foi marcado como ${sign}.`;

    // Criar ícone info se não existir
    let infoIcon = toggle.querySelector('.info-icon');
    if (!infoIcon) {
      infoIcon = document.createElement('span');
      infoIcon.className = 'info-icon';
      infoIcon.textContent = 'ⓘ';
      infoIcon.style.position = 'absolute';
      infoIcon.style.right = '-25px';
      infoIcon.style.top = '50%';
      infoIcon.style.transform = 'translateY(-50%)';
      infoIcon.style.color = '#444';
      infoIcon.style.fontWeight = 'bold';
      infoIcon.style.cursor = 'help';
      infoIcon.title = message;
      toggle.appendChild(infoIcon);
    } else {
      infoIcon.title = message; // atualiza mensagem se já existe
    }

    // Animação piscar (usar classe)
    toggle.classList.add('pulse');
    setTimeout(() => {
      toggle.classList.remove('pulse');
      // opcional: remove infoIcon após algum tempo
      setTimeout(() => {
        if (infoIcon.parentNode) infoIcon.parentNode.removeChild(infoIcon);
      }, 4000);
    }, 1000);
  }

  // Animação CSS para pulse (adicione no CSS também!)
  const stylePulse = document.createElement('style');
  stylePulse.textContent = `
    .pulse {
      animation: pulseGlow 1s ease;
    }
    @keyframes pulseGlow {
      0% { box-shadow: 0 0 8px 3px #3cb371; }
      50% { box-shadow: 0 0 16px 6px #3cb371; }
      100% { box-shadow: 0 0 8px 3px #3cb371; }
    }
  `;
  document.head.appendChild(stylePulse);

  // Criar tabelas consonantal e vocálica
  const consonantTable = document.getElementById('consonant-table');
  const vowelTable = document.getElementById('vowel-table');

  // Função para atualizar as tabelas com base nos filtros
  function updateTables() {
    updateConsonantTable();
    updateVowelTable();
  }

  // --- Tabela Consoantes ---

  function updateConsonantTable() {
    consonantTable.innerHTML = '';

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

    // Corpo
    const tbody = document.createElement('tbody');

    manners.forEach(manner => {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.textContent = manner;
      tr.appendChild(th);

      places.forEach(place => {
        // Procurar fonemas com place e manner
        const matching = consonants.filter(c => c.place === place && c.manner === manner);
        if (matching.length === 0) {
          const td = document.createElement('td');
          td.classList.add('empty');
          td.textContent = '-';
          tr.appendChild(td);
        } else {
          // Pode ter vários fonemas (ex: p e b)
          const td = document.createElement('td');
          td.innerHTML = matching.map(c => {
            // Checa se fonema passa no filtro
            const show = passesFilters(c.features);
            const cls = show ? 'highlighted' : 'dimmed';
            return `<span class="${cls}" title="Fonema: ${c.symbol}">${c.symbol}</span>`;
          }).join(' ');
          tr.appendChild(td);
        }
      });

      tbody.appendChild(tr);
    });

    consonantTable.appendChild(tbody);
  }

  // --- Tabela Vogais ---

  function updateVowelTable() {
    vowelTable.innerHTML = '';

    // Cabeçalho simples
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    trHead.appendChild(document.createElement('th'));
    const colHeaders = ['1', '2', '3', '4'];
    colHeaders.forEach(ch => {
      const th = document.createElement('th');
      th.textContent = ch;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    vowelTable.appendChild(thead);

    const tbody = document.createElement('tbody');

    vowels.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      // linha 1 = topo, 2 = meio, 3 = baixo
      if (rowIndex === 0) th.textContent = 'Alto';
      else if (rowIndex === 1) th.textContent = 'Médio';
      else if (rowIndex === 2) th.textContent = 'Baixo';
      tr.appendChild(th);

      for (let col = 0; col < 4; col++) {
        const phoneme = row[col];
        const td = document.createElement('td');
        if (!phoneme) {
          td.classList.add('empty');
          td.textContent = '-';
        } else {
          const show = passesFilters(phoneme.features);
          td.classList.add(show ? 'highlighted' : 'dimmed');
          td.textContent = phoneme.symbol;
          td.title = `Fonema: ${phoneme.symbol}`;
        }
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    });

    vowelTable.appendChild(tbody);
  }

  // Função que decide se um fonema passa nos filtros
  function passesFilters(featuresPhoneme) {
    for (const [feat, val] of Object.entries(filters)) {
      if (val === 'all') continue;
      if (featuresPhoneme[feat] !== val) return false;
    }
    return true;
  }

  // Inicializa tabelas
  updateTables();
});
