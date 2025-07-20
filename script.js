const features = {
  "p": ["+consonantal", "-silabica", "-soante", "+anterior", "-continuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada"],
  "b": ["+consonantal", "-silabica", "-soante", "+anterior", "-continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "t": ["+consonantal", "-silabica", "-soante", "+coronal", "+anterior", "-continuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada"],
  "d": ["+consonantal", "-silabica", "-soante", "+coronal", "+anterior", "-continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "k": ["+consonantal", "-silabica", "-soante", "-anterior", "-continuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada"],
  "g": ["+consonantal", "-silabica", "-soante", "-anterior", "-continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "m": ["+consonantal", "-silabica", "+soante", "+anterior", "-continuo", "+nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "n": ["+consonantal", "-silabica", "+soante", "+coronal", "+anterior", "-continuo", "+nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "ɲ": ["+consonantal", "-silabica", "+soante", "+coronal", "-anterior", "-continuo", "+nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "r": ["+consonantal", "-silabica", "+soante", "+coronal", "+anterior", "-continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "ɾ": ["+consonantal", "-silabica", "+soante", "+coronal", "+anterior", "-continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "f": ["+consonantal", "-silabica", "-soante", "+anterior", "+continuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada"],
  "v": ["+consonantal", "-silabica", "-soante", "+anterior", "+continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "s": ["+consonantal", "-silabica", "-soante", "+coronal", "+anterior", "+continuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada"],
  "z": ["+consonantal", "-silabica", "-soante", "+coronal", "+anterior", "+continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "ʃ": ["+consonantal", "-silabica", "-soante", "+coronal", "-anterior", "+continuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada"],
  "ʒ": ["+consonantal", "-silabica", "-soante", "+coronal", "-anterior", "+continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "x": ["+consonantal", "-silabica", "-soante", "-anterior", "+continuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada"],
  "ɣ": ["+consonantal", "-silabica", "-soante", "-anterior", "+continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "χ": ["+consonantal", "-silabica", "-soante", "-anterior", "+continuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada"],
  "ʁ": ["+consonantal", "-silabica", "-soante", "-anterior", "+continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "h": ["+consonantal", "-silabica", "-soante", "-anterior", "+continuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada"],
  "ɦ": ["+consonantal", "-silabica", "-soante", "-anterior", "+continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "tʃ": ["+consonantal", "-silabica", "-soante", "+coronal", "-anterior", "-continuo", "-nasal", "-lateral", "-vozeado", "+soltura retardada"],
  "dʒ": ["+consonantal", "-silabica", "-soante", "+coronal", "-anterior", "-continuo", "-nasal", "-lateral", "+vozeado", "+soltura retardada"],
  "ɹ": ["+consonantal", "-silabica", "+soante", "+coronal", "+anterior", "+continuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "l": ["+consonantal", "-silabica", "+soante", "+coronal", "+anterior", "-continuo", "-nasal", "+lateral", "+vozeado", "-soltura retardada"],
  "ʎ": ["+consonantal", "-silabica", "+soante", "+coronal", "-anterior", "-continuo", "-nasal", "+lateral", "+vozeado", "-soltura retardada"],

  // Vogais e glides
  "i": ["-consonantal", "+silabica", "+soante", "+continuo", "+alto", "-baixo", "-recuado", "-arredondado", "+vozeado"],
  "ɪ": ["-consonantal", "-silabica", "+soante", "+continuo", "+alto", "-baixo", "-recuado", "-arredondado", "+vozeado"],
  "u": ["-consonantal", "+silabica", "+soante", "+continuo", "+alto", "-baixo", "+recuado", "+arredondado", "+vozeado"],
  "ʊ": ["-consonantal", "-silabica", "+soante", "+continuo", "+alto", "-baixo", "+recuado", "+arredondado", "+vozeado"],
  "e": ["-consonantal", "+silabica", "+soante", "+continuo", "-alto", "-baixo", "-recuado", "-arredondado", "+vozeado"],
  "o": ["-consonantal", "+silabica", "+soante", "+continuo", "-alto", "-baixo", "+recuado", "+arredondado", "+vozeado"],
  "ɛ": ["-consonantal", "+silabica", "+soante", "+continuo", "-alto", "+baixo", "-recuado", "-arredondado", "+vozeado"],
  "ɔ": ["-consonantal", "+silabica", "+soante", "+continuo", "-alto", "+baixo", "+recuado", "+arredondado", "+vozeado"],
  "a": ["-consonantal", "+silabica", "+soante", "+continuo", "-alto", "+baixo", "+recuado", "-arredondado", "+vozeado"],
};

function getSelectedFeatures() {
  return Array.from(document.querySelectorAll(".filters input:checked")).map(input =>
    `${input.dataset.value}${input.name}`
  );
}

function filterPhonemes() {
  const selected = getSelectedFeatures();
  document.querySelectorAll("span[data-phoneme]").forEach(el => {
    const phoneme = el.dataset.phoneme;
    const phonemeFeatures = features[phoneme] || [];
    const matches = selected.every(f => phonemeFeatures.includes(f));
    el.classList.toggle("hidden", !matches);
  });
}

document.querySelectorAll(".filters input").forEach(input =>
  input.addEventListener("change", filterPhonemes)
);
