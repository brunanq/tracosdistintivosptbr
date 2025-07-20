document.addEventListener('DOMContentLoaded', () => {
  // Todos os traços
  const features = [
    'consonantal', 'silabica', 'soante', 'coronal', 'anterior',
    'continuo', 'nasal', 'lateral', 'aproximante', 'vozeado', 'solturaRetardada',
    'alto', 'baixo', 'recuado', 'arredondado'
  ];

  // Mapa lógico para regras que forçam valores
  // true = marca [+], false = marca [-]
  // mensagem para tooltip explicativa
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

  // Consoantes (com características e local e modo)
  const consonants = [
    { symbol:'p', place:'oclusiva', manner:'oclusiva', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'b', place:'oclusiva', manner:'oclusiva', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'t', place:'alveolar', manner:'oclusiva', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'d', place:'alveolar', manner:'oclusiva', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'k', place:'velar', manner:'oclusiva', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'g', place:'velar', manner:'oclusiva', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'m', place:'bilabial', manner:'nasal', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:false, anterior:true, continuo:false, nasal:true, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'n', place:'alveolar', manner:'nasal', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:true, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'ɲ', place:'palatal', manner:'nasal', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:false, continuo:false, nasal:true, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'r', place:'alveolar', manner:'vibrante', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'ɾ', place:'alveolar', manner:'tap', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'f', place:'labiodental', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'v', place:'labiodental', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'s', place:'alveolar', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'z', place:'alveolar', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'ʃ', place:'postalveolar', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'ʒ', place:'postalveolar', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'x', place:'velar', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'ɣ', place:'velar', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'χ', place:'uvular', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'ʁ', place:'uvular', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'h', place:'glotal', manner:'fricativa', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'ɦ', place:'glotal', manner:'fricativa', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'tʃ', place:'postalveolar', manner:'africada', voiced:false, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:false, solturaRetardada:true, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'dʒ', place:'postalveolar', manner:'africada', voiced:true, features:{consonantal:true, silabica:false, soante:false, coronal:true, anterior:false, continuo:false, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:true, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'ɹ', place:'alveolar', manner:'aproximante', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:false, lateral:false, aproximante:true, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },

    { symbol:'l', place:'alveolar', manner:'lateral', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:true, continuo:false, nasal:false, lateral:true, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
    { symbol:'ʎ', place:'palatal', manner:'lateral', voiced:true, features:{consonantal:true, silabica:false, soante:true, coronal:true, anterior:false, continuo:false, nasal:false, lateral:true, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false} },
  ];

  // Vogais e glides
  const vowels = [
    [ // topo
      {symbol:'i', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:false, arredondado:false}},
      {symbol:'ɪ', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:false, arredondado:false}},
      {symbol:'u', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:true, arredondado:true}},
      {symbol:'ʊ', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:true, baixo:false, recuado:true, arredondado:true}},
    ],
    [ // meio
      {symbol:'e', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:false, arredondado:false}},
      {symbol:'o', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:false, recuado:true, arredondado:true}},
    ],
    [ // baixo
      {symbol:'ɛ', features:{consonantal:false, silabica:true, soante:true, coronal:true, anterior:true, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:false, arredondado:false}},
      {symbol:'ɔ', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:true, arredondado:true}},
      {symbol:'a', features:{consonantal:false, silabica:true, soante:true, coronal:false, anterior:false, continuo:true, nasal:false, lateral:false, aproximante:false, vozeado:true, solturaRetardada:false, alto:false, baixo:true, recuado:true, arredondado:false}},
    ]
  ];

  const places = ['oclusiva', 'labiodental', 'alveolar', 'postalveolar', 'palatal', 'velar', 'uvular', 'glotal'];
  const manners = ['oclusiva', 'nasal', 'vibrante', 'tap', 'fricativa', 'africada', 'lateral', 'aproximante'];

  // Estado dos filtros: 'all' | true | false
  const filters = {};
  features.forEach(f => filters[f] = 'all');

  // Cria filtros no DOM
  const filtersContainer = document.getElementById('filters');
  features.forEach(feature => {
    const group = document.createElement('div');
    group.className = 'filter-group';
    group.dataset.feature = feature;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'feature-name';
    nameSpan.textContent = feature;
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
      // Busca consoante que combina lugar e modo
      const consonant = consonants.find(c => c.place === place && c.manner === manner);
      const td = document.createElement('td');
      if(consonant){
        td.textContent = consonant.symbol;
        td.dataset.symbol = consonant.symbol;
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

  // Atualiza visualização dos filtros e tabela
  function updateHighlight() {
    // Para todas as células com fonemas
    const allTds = [...document.querySelectorAll('table td')];
    allTds.forEach(td => {
      if(td.classList.contains('empty')) return;

      const feat = JSON.parse(td.dataset.features);

      // Verifica se o fonema corresponde a todos os filtros
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

  // Função que exibe o ícone info e pisca o filtro alterado
  function showInfoForFeature(featureName, message) {
    const group = document.querySelector(`.filter-group[data-feature="${featureName}"]`);
    if (!group) return;

    // Remove info antigo para não acumular
    let oldInfo = group.querySelector('.info-icon');
    if (oldInfo) oldInfo.remove();

    // Cria o ícone info
    const info = document.createElement('span');
    info.className = 'info-icon';
    info.innerHTML = 'ℹ';

    // Tooltip
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    info.appendChild(tooltip);

    group.appendChild(info);

    // Adiciona classe blink para animar
    group.classList.add('blink');

    // Remove a animação após 3 segundos
    setTimeout(() => {
      group.classList.remove('blink');
      // Remove o ícone info após 10 segundos (ou ajuste)
      setTimeout(() => {
        if (info.parentNode) info.parentNode.removeChild(info);
      }, 7000);
    }, 3000);
  }

  // Aplica as regras lógicas para manter filtros consistentes
  function applyLogicRules(changedFeature) {
    // Percorre regras para changedFeature
    if(!logicMap[changedFeature]) return;

    const changedVal = filters[changedFeature];
    // Se mudou para 'all', não força nada
    if(changedVal === 'all') return;

    for(const [otherFeature, rule] of Object.entries(logicMap[changedFeature])){
      if(rule.val === changedVal){
        // Só muda se diferente do que já está
        if(filters[otherFeature] !== rule.val){
          filters[otherFeature] = rule.val;

          // Atualiza o input radio no DOM para o filtro alterado
          const input = document.querySelector(`input[name="${otherFeature}"][value="${rule.val}"]`);
          if(input){
            input.checked = true;
          }

          // Mostrar info e piscar
          showInfoForFeature(otherFeature, rule.msg);

          // Chamada recursiva para propagar efeito em cascata
          applyLogicRules(otherFeature);
        }
      }
    }
  }

  // Quando usuário muda filtro manualmente
  filtersContainer.addEventListener('change', e => {
    if(e.target.tagName !== 'INPUT') return;
    const feature = e.target.name;
    const valRaw = e.target.value;
    let val;
    if(valRaw === 'true') val = true;
    else if(valRaw === 'false') val = false;
    else val = 'all';

    // Atualiza filtro
    filters[feature] = val;

    // Aplica lógica para manter coerência
    applyLogicRules(feature);

    // Atualiza tabela
    updateHighlight();
  });

  // Inicializa o destaque
  updateHighlight();
});
