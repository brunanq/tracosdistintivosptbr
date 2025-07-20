const featureState = {};
const rules = {
  'consonantal': { '+': { 'silábica': '-' } },
  'silábica': {
    '+': { 'consonantal': '-', 'soante': '+', 'contínuo': '+' }
  },
  'soante': { '+': { 'vozeado': '+' } },
  'contínuo': { '+': { 'soltura retardada': '-' } },
  'soltura retardada': { '+': { 'contínuo': '-' } },
  'nasal': { '+': { 'lateral': '-', 'aproximante': '-' } },
  'lateral': { '+': { 'nasal': '-', 'aproximante': '-' } },
  'aproximante': { '+': { 'nasal': '-', 'lateral': '-' } }
};

const phonemeFeatures = {
  // Consoantes (apenas exemplos — adicione os demais conforme necessário)
  'p': ['+consonantal', '-silábica', '-soante', '+anterior', '-contínuo', '-nasal', '-lateral', '-vozeado', '-soltura retardada'],
  'b': ['+consonantal', '-silábica', '-soante', '+anterior', '-contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada'],
  't': ['+consonantal', '-silábica', '-soante', '+anterior', '-contínuo', '-nasal', '-lateral', '-vozeado', '-soltura retardada'],
  'd': ['+consonantal', '-silábica', '-soante', '+anterior', '-contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada'],
  'm': ['+consonantal', '-silábica', '+soante', '+anterior', '-contínuo', '+nasal', '-lateral', '+vozeado', '-soltura retardada'],
  'n': ['+consonantal', '-silábica', '+soante', '+anterior', '-contínuo', '+nasal', '-lateral', '+vozeado', '-soltura retardada'],
  'ɲ': ['+consonantal', '-silábica', '+soante', '+coronal', '-contínuo', '+nasal', '-lateral', '+vozeado', '-soltura retardada'],
  'l': ['+consonantal', '-silábica', '+soante', '+coronal', '-contínuo', '-nasal', '+lateral', '+vozeado', '-soltura retardada'],
  'ʎ': ['+consonantal', '-silábica', '+soante', '+coronal', '-contínuo', '-nasal', '+lateral', '+vozeado', '-soltura retardada'],
  's': ['+consonantal', '-silábica', '-soante', '+anterior', '+contínuo', '-nasal', '-lateral', '-vozeado', '-soltura retardada'],
  'z': ['+consonantal', '-silábica', '-soante', '+anterior', '+contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada'],
  'tʃ': ['+consonantal', '-silábica', '-soante', '+coronal', '-contínuo', '-nasal', '-lateral', '-vozeado', '+soltura retardada'],
  'dʒ': ['+consonantal', '-silábica', '-soante', '+coronal', '-contínuo', '-nasal', '-lateral', '+vozeado', '+soltura retardada'],

  // Vogais e glides
  'i': ['-consonantal', '+silábica', '+soante', '-coronal', '+contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada', '+alto', '-baixo', '-recuado', '-arredondado'],
  'ɪ': ['-consonantal', '-silábica', '+soante', '-coronal', '+contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada', '+alto', '-baixo', '-recuado', '-arredondado'],
  'u': ['-consonantal', '+silábica', '+soante', '-coronal', '+contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada', '+alto', '-baixo', '+recuado', '+arredondado'],
  'ʊ': ['-consonantal', '-silábica', '+soante', '-coronal', '+contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada', '+alto', '-baixo', '+recuado', '+arredondado'],
  'a': ['-consonantal', '+silábica', '+soante', '-coronal', '+contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada', '-alto', '+baixo', '+recuado', '-arredondado'],
  'e': ['-consonantal', '+silábica', '+soante', '-coronal', '+contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada', '-alto', '-baixo', '-recuado', '-arredondado'],
  'o': ['-consonantal', '+silábica', '+soante', '-coronal', '+contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada', '-alto', '-baixo', '+recuado', '+arredondado'],
  'ɛ': ['-consonantal', '+silábica', '+soante', '-coronal', '+contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada', '-alto', '+baixo', '-recuado', '-arredondado'],
  'ɔ': ['-consonantal', '+silábica', '+soante', '-coronal', '+contínuo', '-nasal', '-lateral', '+vozeado', '-soltura retardada', '-alto', '+baixo', '+recuado', '+arredondado']
};

function applyRules(changedFeature, value) {
  const affected = rules[changedFeature]?.[value];
  if (!affected) return;
  Object.entries(affected).forEach(([key, val]) => {
    featureState[key] = val;
    const input = document.querySelector(`input[name="${key}"][value="${val}"]`);
    if (input) input.checked = true;
  });
}

function updateHighlights() {
  const activeFeatures = Object.entries(featureState);
  document.querySelectorAll('[data-phoneme]').forEach(el => {
    const phoneme = el.dataset.phoneme;
    const features = phonemeFeatures[phoneme] || [];
    const matches = activeFeatures.every(([feat, val]) => features.includes(`${val}${feat}`));
    el.classList.toggle('highlight', matches);
  });
}

document.querySelectorAll('.filter input').forEach(input => {
  input.addEventListener('change', () => {
    featureState[input.name] = input.value;
    applyRules(input.name, input.value);
    updateHighlights();
  });
});
