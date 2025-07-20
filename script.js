const phonemes = [
  { symbol: "p", manner: "oclusiva", place: "bilabial", features: ["+", "consonantal", "-", "vozeado", "-", "continuo", "+", "anterior"] },
  { symbol: "b", manner: "oclusiva", place: "bilabial", features: ["+", "consonantal", "+", "vozeado", "-", "continuo", "+", "anterior"] },
  { symbol: "t", manner: "oclusiva", place: "alveolar", features: ["+", "consonantal", "-", "vozeado", "-", "continuo", "+", "anterior", "+", "coronal"] },
  { symbol: "d", manner: "oclusiva", place: "alveolar", features: ["+", "consonantal", "+", "vozeado", "-", "continuo", "+", "anterior", "+", "coronal"] },
  { symbol: "k", manner: "oclusiva", place: "velar", features: ["+", "consonantal", "-", "vozeado", "-", "continuo"] },
  { symbol: "g", manner: "oclusiva", place: "velar", features: ["+", "consonantal", "+", "vozeado", "-", "continuo"] },
  { symbol: "m", manner: "nasal", place: "bilabial", features: ["+", "consonantal", "+", "vozeado", "+", "nasal", "+", "soante", "+", "anterior"] },
  { symbol: "n", manner: "nasal", place: "alveolar", features: ["+", "consonantal", "+", "vozeado", "+", "nasal", "+", "soante", "+", "anterior", "+", "coronal"] },
  { symbol: "ɲ", manner: "nasal", place: "palatal", features: ["+", "consonantal", "+", "vozeado", "+", "nasal", "+", "soante"] },
  { symbol: "r", manner: "vibrante", place: "alveolar", features: ["+", "consonantal", "+", "vozeado", "+", "soante", "+", "anterior"] },
  { symbol: "ɾ", manner: "tap", place: "alveolar", features: ["+", "consonantal", "+", "vozeado", "+", "soante", "+", "anterior"] },
  { symbol: "f", manner: "fricativa", place: "labiodental", features: ["+", "consonantal", "-", "vozeado", "+", "continuo", "+", "anterior"] },
  { symbol: "v", manner: "fricativa", place: "labiodental", features: ["+", "consonantal", "+", "vozeado", "+", "continuo", "+", "anterior"] },
  { symbol: "s", manner: "fricativa", place: "alveolar", features: ["+", "consonantal", "-", "vozeado", "+", "continuo", "+", "anterior", "+", "coronal"] },
  { symbol: "z", manner: "fricativa", place: "alveolar", features: ["+", "consonantal", "+", "vozeado", "+", "continuo", "+", "anterior", "+", "coronal"] },
  { symbol: "ʃ", manner: "fricativa", place: "pós-alveolar", features: ["+", "consonantal", "-", "vozeado", "+", "continuo", "+", "coronal"] },
  { symbol: "ʒ", manner: "fricativa", place: "pós-alveolar", features: ["+", "consonantal", "+", "vozeado", "+", "continuo", "+", "coronal"] },
  { symbol: "x", manner: "fricativa", place: "velar", features: ["+", "consonantal", "-", "vozeado", "+", "continuo"] },
  { symbol: "ɣ", manner: "fricativa", place: "velar", features: ["+", "consonantal", "+", "vozeado", "+", "continuo"] },
  { symbol: "χ", manner: "fricativa", place: "uvular", features: ["+", "consonantal", "-", "vozeado", "+", "continuo"] },
  { symbol: "ʁ", manner: "fricativa", place: "uvular", features: ["+", "consonantal", "+", "vozeado", "+", "continuo"] },
  { symbol: "h", manner: "fricativa", place: "glotal", features: ["+", "consonantal", "-", "vozeado", "+", "continuo"] },
  { symbol: "ɦ", manner: "fricativa", place: "glotal", features: ["+", "consonantal", "+", "vozeado", "+", "continuo"] },
  { symbol: "tʃ", manner: "africada", place: "pós-alveolar", features: ["+", "consonantal", "-", "vozeado", "-", "continuo", "+", "soltura", "+", "coronal"] },
  { symbol: "dʒ", manner: "africada", place: "pós-alveolar", features: ["+", "consonantal", "+", "vozeado", "-", "continuo", "+", "soltura", "+", "coronal"] },
  { symbol: "ɹ", manner: "aproximante", place: "alveolar", features: ["+", "consonantal", "+", "vozeado", "+", "soante", "+", "anterior"] },
  { symbol: "l", manner: "lateral", place: "alveolar", features: ["+", "consonantal", "+", "vozeado", "+", "soante", "+", "lateral", "+", "anterior"] },
  { symbol: "ʎ", manner: "lateral", place: "palatal", features: ["+", "consonantal", "+", "vozeado", "+", "soante", "+", "lateral"] },
];

const vowels = [
  { symbol: "i", row: 1, col: 1, features: ["+", "alto", "-", "baixo", "-", "recuado"] },
  { symbol: "u", row: 1, col: 2, features: ["+", "alto", "-", "baixo", "+", "recuado", "+", "arredondado"] },
  { symbol: "e", row: 2, col: 1, features: ["-", "alto", "-", "baixo", "-", "recuado"] },
  { symbol: "o", row: 2, col: 2, features: ["-", "alto", "-", "baixo", "+", "recuado", "+", "arredondado"] },
  { symbol: "ɛ", row: 3, col: 1, features: ["-", "alto", "+", "baixo", "-", "recuado"] },
  { symbol: "ɔ", row: 3, col: 2, features: ["-", "alto", "+", "baixo", "+", "recuado", "+", "arredondado"] },
  { symbol: "a", row: 3, col: 2, features: ["-", "alto", "+", "baixo", "+", "recuado"] },
];

function createChart() {
  const chart = document.getElementById("consonant-chart");
  const manners = [...new Set(phonemes.map(p => p.manner))];
  const places = [...new Set(phonemes.map(p => p.place))];

  // Cabeçalho
  const headerRow = document.createElement("div");
  headerRow.className = "chart-row";
  headerRow.innerHTML = `<div class="chart-header"></div>` + 
    places.map(p => `<div class="chart-header">${p}</div>`).join("");
  chart.appendChild(headerRow);

  // Linhas
  manners.forEach(manner => {
    const row = document.createElement("div");
    row.className = "chart-row";

    const label = document.createElement("div");
    label.className = "manner-label";
    label.textContent = manner;
    row.appendChild(label);

    places.forEach(place => {
      const cell = document.createElement("div");
      cell.className = "chart-cell";

      const matches = phonemes.filter(p => p.manner === manner && p.place === place);
      matches.forEach(p => {
        const span = document.createElement("span");
        span.className = "phoneme";
        span.textContent = p.symbol;
        span.dataset.features = JSON.stringify(p.features);
        cell.appendChild(span);
      });

      row.appendChild(cell);
    });

    chart.appendChild(row);
  });
}

function createVowelChart() {
  const container = document.getElementById("vowel-chart");
  const grid = document.createElement("div");
  grid.className = "vowel-grid";

  vowels.forEach(v => {
    const cell = document.createElement("div");
    cell.className = "vowel-cell vowel";
    cell.textContent = v.symbol;
    cell.dataset.features = JSON.stringify(v.features);
    grid.appendChild(cell);
  });

  container.appendChild(grid);
}

function applyFilters() {
  const checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
  const selectedFeatures = checked.map(input => `${input.value}${input.dataset.feature}`);

  const allPhonemes = document.querySelectorAll(".phoneme, .vowel");
  allPhonemes.forEach(el => {
    const feats = JSON.parse(el.dataset.features);
    const match = selectedFeatures.every(sf => feats.includes(sf[0]) && feats.includes(sf.slice(1)));
    el.classList.toggle("highlight", match);
  });
}

document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener("change", applyFilters);
});

createChart();
createVowelChart();
